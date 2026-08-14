---
title: "29 Before 29 #10: Practice My Soldering"
subtitle: these kits won’t build themselves
summary: Soldering is a metaphor for life, I think? The solder is, uhm, the friends we made along the way, and the iron is the... is the... oh, I don’t know. Forget it. Let’s talk about robots or something.
publishedAt: "2026-08-09"
---
I'm Endeavor-ing clear into the weekend this week. One way or another, this list is getting crossed off. Head back to [my first post](/posts/document-everything) to catch up on the series thus far.

Today’s post continues my pattern of taking what are ostensibly straightforward tasks and using them as a springboard to overshare. I’ve been meaning to brush up on my soldering and have some cool gadgets that are currently just bare PCBs, so I built one. But we all know it’s not going to be as simple as that, don’t we?

No fewer than eight arms were involved in the completion of this task.

## Difficult Wares

Hardware has a reputation among software folk as being distinctly challenging in a way that software is not. In the real world, things have a tendency to fail in non-deterministic fashion, something existentially frightening to many who are accustomed to the controlled precision of the digital realm. With software, if something works once, you can be (mostly) certain that it will work again in the future, a guarantee that goes out of the window once you leave the confines of the computer. 

Perhaps due to my longstanding love for [all things music tech](/posts/set-up-my-studio), I have always been fascinated by hardware. Despite the inherent challenges, the plus side of hardware's messy nature is that messy solutions can often suffice. Take the [SLORK speaker](/posts/what-i-learned-in-slorking-school-is) I built with my father for example, which was nothing more than a couple of stereo amplifiers in a salad bowl. Honestly, the real thing isn’t much more refined, just add two more speakers and swap out the plastic bowl from Target with a wooden one from IKEA (oh, and make all six channels individually addressable).

That roughshod productivity was never on greater display than it was over my summer as a visiting student researcher at UC Berkeley’s BAIR, not only in the way it typified my approach, but also in the very nature of the project I found myself working on. As a part of Pieter Abbeel’s Robot Learning Lab, I assisted in the research and application of reinforcement learning algorithms to robotics platforms. One thing about robots is that they are **expensive**. The [PR2 robots](https://en.wikipedia.org/wiki/Willow_Garage#Robots) that were the standard for the lab at the time had a list price of $400,000, putting them out of reach for all but the most well-funded laboratories. The project I joined was an attempt to pilot a low-cost alternative and demonstrate the potential for running the same types of reinforcement learning experiments on a far more accessible platform.

What made this robot unique was that it was basically the mechanical equivalent of two kids in a trench coat. To create our low-cost “mobile manipulator,” we took a [TurtleBot](https://en.wikipedia.org/wiki/TurtleBot) (think Roomba), zip-tied a small robotic arm on top, and gave it an identity crisis. I quite literally spent several weeks in the Robot Operating System ([ROS](https://www.ros.org/)) convincing the two robots that they were just confused and that, no, they were one and the same all along. Our expressed intent was to train the robot to identify and pick up toys left on the ground, but the true value of the work was in troubleshooting and documenting the process.

You’d be confused too if your arm was on top of your head.

I was fortunate to land on a project that was so well-matched to my sensibilities as pertain hardware specifically, and there was one anecdote from the summer that exemplified that fit more than any other. Throughout the summer, I had the sense of being several steps behind even my undergraduate peers in the lab. They all had taken actual courses on AI and reinforcement learning and had longer track records in the lab and knew how to do fancy things like model parts for 3D printers. But at the same time, I think there were many ways in which my comparative scrappiness served me well.

Before we could train the robot to do the task well, I needed to devise a hard-coded routine that enable it to do the task *poorly* that we could use for training data. Once we had finally gotten the robot to a stage where we could actually give it a test run at the toy cleaning task, I quickly discovered a problem one of those failure modes that you only uncover once you’re up and running in the real world: the stuffed toys would often manage to get caught in the wheels of the TurtleBot and derail the run entirely. Had I any experience with CAD at that point in time, I might have designed a custom part for the purpose, but alas. My solution was far more manual: I went down to the local ACE Hardware, bought a sheet of copper, and spent the evening trimming and shaping a set of deflectors for the front wheels.

Fresh kicks.

Ok, I believe I’ve distracted us all from the task at hand for long enough. Allow me to show you what I’ve been working on to practice my soldering. Cue drumroll:

Pausing for oohs and aahs.

So, what is it? Well, I hate to keep you waiting with bated breath, but I’m saving the big reveal for my next post. The suspense is killing you, I know. You won’t be waiting long. I’ll be back before you can say TurtleBot ten times fast.