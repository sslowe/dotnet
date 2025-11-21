using System;
using UnityEngine;
using CircularBuffer;
using System.Runtime.InteropServices;

class EnvelopeFollower : MonoBehaviour
{
    
    public int windowSize = 256;

    public float attackGain = 10f;
    public float releaseGain = 50f;
    protected float m_EnvelopeSample = 0f;

    public enum DetectionMode
    {
        Peak,
        Rms
    }

    public DetectionMode m_DetectMode = DetectionMode.Rms;
    protected IEnvelopeDetection m_Detector;

    private FMOD.DSP_READ_CALLBACK mReadCallback;
    private FMOD.DSP mCaptureDSP;
    private float[] mDataBuffer;
    private GCHandle mObjHandle;
    private uint mBufferLength;
    private int mChannels = 0;

    public float sample = 0f;

    [AOT.MonoPInvokeCallback(typeof(FMOD.DSP_READ_CALLBACK))]
    static FMOD.RESULT CaptureDSPReadCallback(ref FMOD.DSP_STATE dsp_state, IntPtr inbuffer, IntPtr outbuffer, uint length, int inchannels, ref int outchannels)
    {
        FMOD.DSP_STATE_FUNCTIONS functions = (FMOD.DSP_STATE_FUNCTIONS)Marshal.PtrToStructure(dsp_state.functions, typeof(FMOD.DSP_STATE_FUNCTIONS));

        IntPtr userData;
        functions.getuserdata(ref dsp_state, out userData);

        GCHandle objHandle = GCHandle.FromIntPtr(userData);
        EnvelopeFollower obj = objHandle.Target as EnvelopeFollower;

        // Save the channel count out for the update function
        obj.mChannels = inchannels;

        // Copy the incoming buffer to process later
        int lengthElements = (int)length * inchannels;
        Marshal.Copy(inbuffer, obj.mDataBuffer, 0, lengthElements);

        // Copy the inbuffer to the outbuffer so we can still hear it
        Marshal.Copy(obj.mDataBuffer, 0, outbuffer, lengthElements);

        return FMOD.RESULT.OK;
    }

    void Awake()
    {
         switch(m_DetectMode) {
            case DetectionMode.Peak:
                m_Detector = new DetectPeak();
                break;

            case DetectionMode.Rms:
                m_Detector = new DetectRms(windowSize);
                break;
        }

        attackGain /= 1000f;
        releaseGain /= 1000f;
    }

    void Start()
    {

        // Assign the callback to a member variable to avoid garbage collection
        mReadCallback = CaptureDSPReadCallback;

        // Allocate a data buffer large enough for 8 channels, pin the memory to avoid garbage collection
        uint bufferLength;
        int numBuffers;
        FMODUnity.RuntimeManager.CoreSystem.getDSPBufferSize(out bufferLength, out numBuffers);
        mDataBuffer = new float[bufferLength * 8];
        mBufferLength = bufferLength;

        // Get a handle to this object to pass into the callback
        mObjHandle = GCHandle.Alloc(this);
        if (mObjHandle != null)
        {
            // Define a basic DSP that receives a callback each mix to capture audio
            FMOD.DSP_DESCRIPTION desc = new FMOD.DSP_DESCRIPTION();
            desc.numinputbuffers = 1;
            desc.numoutputbuffers = 1;
            desc.read = mReadCallback;
            desc.userdata = GCHandle.ToIntPtr(mObjHandle);

            // Create an instance of the capture DSP and attach it to the master channel group to capture all audio
            FMOD.ChannelGroup masterCG;
            if (FMODUnity.RuntimeManager.CoreSystem.getMasterChannelGroup(out masterCG) == FMOD.RESULT.OK)
            {
                if (FMODUnity.RuntimeManager.CoreSystem.createDSP(ref desc, out mCaptureDSP) == FMOD.RESULT.OK)
                {
                    if (masterCG.addDSP(0, mCaptureDSP) != FMOD.RESULT.OK)
                    {
                        Debug.LogWarningFormat("FMOD: Unable to add mCaptureDSP to the master channel group");
                    }
                }
                else
                {
                    Debug.LogWarningFormat("FMOD: Unable to create a DSP: mCaptureDSP");
                }
            }
            else
            {
                Debug.LogWarningFormat("FMOD: Unable to create a master channel group: masterCG");
            }
        }
        else
        {
            Debug.LogWarningFormat("FMOD: Unable to create a GCHandle: mObjHandle");
        }
    }

    void OnDestroy()
    {
        if (mObjHandle != null)
        {
            // Remove the capture DSP from the master channel group
            FMOD.ChannelGroup masterCG;
            if (FMODUnity.RuntimeManager.CoreSystem.getMasterChannelGroup(out masterCG) == FMOD.RESULT.OK)
            {
                if (mCaptureDSP.hasHandle())
                {
                    masterCG.removeDSP(mCaptureDSP);

                    // Release the DSP and free the object handle
                    mCaptureDSP.release();
                }
            }
            mObjHandle.Free();
        }
    }

    void Update()
    {

        if (mChannels != 0)
        {
            float[][] envelopeData = new float[mChannels][];
 
            if (mChannels > 1) {
                float[][] channels;
                DeinterleaveBuffer(mDataBuffer, out channels, mChannels);
                for (int n = 0; n < mChannels; ++n) {
                    GetEnvelope(channels[n], out envelopeData[n]);
                }                
            } else if (mChannels == 1) {
                GetEnvelope(mDataBuffer, out envelopeData[0]);
            }
            float m_sample = 0;
            for (int n = 0; n < mChannels; ++n) {
                m_sample = Math.Max(m_sample, envelopeData[n][256]);
            }
            sample = m_sample;
        }
    }

    public void GetEnvelope (float[] audioData, out float[] envelope)
    {
        envelope = new float[audioData.Length];
    
        m_Detector.Buffer = audioData;
    
        m_EnvelopeSample = 0f;

        for (int i = 0; i < audioData.Length; ++i) {
            float envIn = m_Detector[i];
            if(!float.IsNaN(envIn)) {
                if (m_EnvelopeSample < envIn) {
                    m_EnvelopeSample = envIn + attackGain * (m_EnvelopeSample - envIn);
                } else {
                    m_EnvelopeSample = envIn + releaseGain * (m_EnvelopeSample - envIn);
                }
        
                envelope[i] = m_EnvelopeSample;
            } else {
                m_EnvelopeSample = 0;
                envelope[i] = m_EnvelopeSample;
            }
            
        }
    }

    public void DeinterleaveBuffer (float[] source, out float[][] output, int sourceChannels)
    {
        int channelLength = source.Length / sourceChannels;
    
        output = new float[sourceChannels][];
    
        for (int i = 0; i < sourceChannels; ++i) {
            output[i] = new float[channelLength];
    
            for (int j = 0; j < channelLength; ++j) {
                output[i][j] = source[j*sourceChannels+i];
            }
        }
    }
}

public interface IEnvelopeDetection
{
    float[] Buffer { set; get; }
    float this [int index] { get; }
 
    void Reset ();
}

public class DetectPeak : IEnvelopeDetection
{
    private float[] m_Buffer;
 
    /// <summary>
    /// Sets the buffer to extract envelope data from. The original buffer data is held by reference (not copied).
    /// </summary>
    public float[] Buffer
    {
        set { m_Buffer = value; }
        get { return m_Buffer; }
    }
 
    /// <summary>
    /// Returns the envelope data at the specified position in the buffer.
    /// </summary>
    public float this [int index]
    {
        get { return Mathf.Abs(m_Buffer[index]); }
    }
 
    public DetectPeak () {}
    public void Reset () {}
}

public class DetectRms : IEnvelopeDetection
{
    private float[] m_Buffer;
    private int m_windowSize;
    private int m_Iter;
    private float m_LastTotal;
    private CircularBuffer<float> m_RmsWindow;
 
    /// <summary>
    /// Sets the buffer to extract envelope data from. The original buffer data is held by reference (not copied).
    /// </summary>
    public float[] Buffer
    {
        set { m_Buffer = value; }
        get { return m_Buffer; }
    }
 
    public float this [int index]
    {
        get {
            float sampleSquared = m_Buffer[index] * m_Buffer[index];
            float total = 0f;
            float rmsValue;
    
            if (m_Iter < m_RmsWindow.Capacity-1) {
                total = m_LastTotal + sampleSquared;
                rmsValue = Mathf.Sqrt((1f / (index+1)) * total);
            } else {
                total = m_LastTotal + sampleSquared - m_RmsWindow.Front();
                rmsValue = Mathf.Sqrt((1f / m_RmsWindow.Capacity) * total);
            }
    
            m_RmsWindow.PushBack(sampleSquared);
            m_LastTotal = total;
            m_Iter++;
    
            return rmsValue;
        }
    }
 
    public DetectRms (int windowSize)
    {
        m_Iter = 0;
        m_LastTotal = 0f;
        m_windowSize = windowSize;
        m_RmsWindow = new CircularBuffer<float>(m_windowSize);
    }
    
    public void Reset ()
    {
        m_Iter = 0;
        m_LastTotal = 0f;
        m_RmsWindow = new CircularBuffer<float>(m_windowSize);
    }
}