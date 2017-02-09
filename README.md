# minpw.js
Minimalist Python multimedia framework implement for Web (JavaScript)
## Write in JS, Do as Py
Sometimes you have to write in JavaScript to make it run on browser but you just like Python's simple like this -- get a random list then count "0": (Forgive me, I know there're fascinating ways, but I prefer writing clearly)
```Python
lst=[]
for i in range(100):
	lst.append(random.randint(0,100))
cnt0=lst.count(0)
```
So, you write this in JS:
```JavaScript
var lst=[]
for(let i of range(100))
	lst.append(random.randint(0,100))
var cnt0=lst.count(0)
```
Oops, there's no range(), no append(), no count(), no randint()! You may look for ways to do this in JS (such as using <code>lst.splice(lst.indexOf(x),1)</code> instead of <code>lst.remove(x)</code>), or wanna keep you long long code (When you're porting code, you'll realize this). If you're the second, you may come up with the idea of finding a translator from Py to JS. You may find Pyjs, but it's heavy and you can hardly mix the generated code with other JS code together. So it's not suitable for light project.

Then it's the time for minpw.js to work with you. minpw.js is a library written in pure JavaScript(ES6). It do not wanna perform Py in every way but just most used ways, to help get started from Py to JS, or port code from Py to JS. Coder can write in JS and use the similar functions or modules in Py. The second code fragment can run perfectly with minpw.js
## Quick Start
Include minpw.js in html file
```HTML
<script src="minpw.js"></script>
```
I recommand make you JS code in strict mode
```JavaScript
"use strict"
```
Then init (optional)
```JavaScript
python.init()
```
Write you code! :)
```JavaScript
var lst=[]
for(let i of range(100))
	lst.append(random.randint(0,100))
var cnt0=lst.count(0)
```
## Available Modules
minpw.js is developing, and will not be finished in long long time. minpw.js's original purpose is to port a game based on pygame onto Web, so pygame module considers first. (Forgive me)

* built-in list, tuple, range ...
* random
* pygame
	* event
	* Surface
	* image
	* display
	* time
	* font
	* transform
	* ...

All of this are part not full because minpw.js is *MIN*. (Maybe another reason: I'm lazy)

I look forward to getting a pull request from you because it's impossible to write all modules by one person :=}
## Need Help!!!
I think my code is clear and I write it in ES6 then they will not look like a mess. Although there're few comments, ... (ok, I'm just not used to writing comments) So, waiting for your issues or pull requests for a new module or some lines fixing. Or, easier, a star.
## LICENSE
Apache License 2.0, see the header of the script file
## Introduction to Pygame in JS
Pygame module is the most important in minpw.js and even minpw.js might just be a pygame port but not python. Here is code I found at [Introduction to Pygame](https://pygame.org/docs/tut/PygameIntro.html)
```Python
import sys, pygame
pygame.init()

size = width, height = 320, 240
speed = [2, 2]
black = 0, 0, 0

screen = pygame.display.set_mode(size)

ball = pygame.image.load("ball.bmp")
ballrect = ball.get_rect()

while 1:
	for event in pygame.event.get():
		if event.type == pygame.QUIT: sys.exit()

	ballrect = ballrect.move(speed)
	if ballrect.left < 0 or ballrect.right > width:
		speed[0] = -speed[0]
	if ballrect.top < 0 or ballrect.bottom > height:
		speed[1] = -speed[1]

	screen.fill(black)
	screen.blit(ball, ballrect)
	pygame.display.flip()
```
This section will port it to web and may give you some ideas

First part
```Python
import sys, pygame
pygame.init()
```
In JS I import module in html file (<code>"import"</code> in ES6? No one support up to now). JS code:
```JavaScript
"use strict"
pygame.init()
```
Next
```Python
size = width, height = 320, 240
speed = [2, 2]
black = 0, 0, 0

screen = pygame.display.set_mode(size)
```
Little syntax modification
```JavaScript
var width,height
var size = [width=320, height=240]
var speed = [2, 2]
var black = [0, 0, 0]

var screen = pygame.display.set_mode(size)
```
Next
```Python
ball = pygame.image.load("ball.bmp")
ballrect = ball.get_rect()
```
In JS everything is asynchronous so you need callback function
```JavaScript
pygame.image.load("ball.bmp").then(function(ball){
var ballrect = ball.get_rect()
```
Traditional callback and new await/async in ES7 is also supported

Next
```Python
while 1:
	for event in pygame.event.get():
		if event.type == pygame.QUIT: sys.exit()

	ballrect = ballrect.move(speed)
	if ballrect.left < 0 or ballrect.right > width:
		speed[0] = -speed[0]
	if ballrect.top < 0 or ballrect.bottom > height:
		speed[1] = -speed[1]

	screen.fill(black)
	screen.blit(ball, ballrect)
	pygame.display.flip()
```
Seems that there is nothing amazing just mind that game loop should be aync:
```JavaScript
var clock=pygame.time.Clock();
(function loop(){
	clock.tick(60).then(loop)
	ballrect = ballrect.move(speed)
	if(ballrect.left < 0 || ballrect.right > width)
		speed[0] = -speed[0]
	if(ballrect.top < 0 || ballrect.bottom > height)
		speed[1] = -speed[1]

	screen.fill(black)
	screen.blit(ball, ballrect)
	pygame.display.flip()
})()
```
All is done! You get it to be online! Full code is below
```JavaScript
addEventListener("load",function(){
"use strict"
pygame.init()

var width,height
var size = [width=320, height=240]
var speed = [2, 2]
var black = [0, 0, 0]

var screen = pygame.display.set_mode(size)

pygame.image.load("ball.bmp").then(function(ball){
	var ballrect = ball.get_rect()
	var clock=pygame.time.Clock();

	(function loop(){
		clock.tick(60).then(loop)
		ballrect = ballrect.move(speed)
		if(ballrect.left < 0 || ballrect.right > width)
			speed[0] = -speed[0]
		if(ballrect.top < 0 || ballrect.bottom > height)
			speed[1] = -speed[1]

		screen.fill(black)
		screen.blit(ball, ballrect)
		pygame.display.flip()
	})()
})
})
```
### Note
1. Surface is a wrapper of HTML5 canvas so it won't run on old browsers. Most of the functions and methods are just simple wrappers of native interfaces so it's no doubt that they're fast. Some high-level ones like blur have algorithms written in JS so they might be slower. Mind that some will access pixel data so make sure the resources are in the same domain.
2. Minpw.js does not listen events. That means, you need to listen events by yourself. When a event which you expect happens, put it to event queue like this:
	```JavaScript
	// first define the event
	window.KEYDOWN=0            // could be any value you like
	window.K_s    =1            // feel free
	key("s",function(e){        // I use a lib, keymaster.js to listen keyboard events so that no worry about keycode anymore
	                            // this lib could be found at madrobby/keymaster on github
		e.preventDefault()      // to prevent default action that browser does
		pygame.event.append({   // Then push it back to event queue
			type:KEYDOWN,       // "type" points out type of event
			key:K_s             // "key"  points out key that pressed
		})
	})

	// Next I will show you how to get events in pygame's way
	for(let e of pygame.event.get()){    // New for-loop in ES6
		if(e.type==KEYDOWN)              // Look the type
			// Do something
		else if(...){
			// Peek the event
			pygame.event.append(e)       // If just peek, throw it back
		}
	}
```
3. If something you looked but not found, open a issue.
