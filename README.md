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
