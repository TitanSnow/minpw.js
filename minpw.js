// minpw.js - Minimalist Python multimedia framework implement for Web (JavaScript)
//
// Copyright 2017 TitanSnow
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

;(function(outside){
	"use strict"
	function wrapperConstructor(cls){
		return new cls(Array.prototype.slice.call(arguments,1))
	}
	;(function implementExceptions(){
		class BaseException{
			constructor(args){
				this.args=args
			}
		}
		outside.BaseException=wrapperConstructor.bind(null,BaseException)
		class ValueError extends BaseException{}
		outside.ValueError=wrapperConstructor.bind(null,ValueError)
	})()
	;(function implementList(ArrayName){
		function at2(pos,val){
			if(pos<0)
				this[this.length+pos]=val
			else
				this[pos]=val
		}
		class list extends outside[ArrayName]{}
		list.prototype.at=function(pos){
			if(arguments.length==2)
				return at2.call(this,arguments[0],arguments[1])
			if(pos<0)
				return this[this.length+pos]
			else
				return this[pos]
		}
		list.prototype.in=function(x){
			return this.indexOf(x)!=-1
		}
		list.prototype.not_in=function(x){
			return this.indexOf(x)==-1
		}
		list.prototype.extend=function(lst){
			var that=this
			lst.forEach(function(e){
				that.push(e)
			})
		}
		list.prototype.times=function(n){
			if(n<=0){
				this.clear()
				return
			}
			var len=this.length
			var k,i
			for(k=1;k<n;++k)
				for(i=0;i<len;++i)
					this.push(this[i])
		}
		list.prototype.len=function(){
			return this.length
		}
		list.prototype.min=function(){
			var mx=Infinity
			this.forEach(function(e){
				mx=Math.min(e,mx)
			})
			return mx
		}
		list.prototype.max=function(){
			var mx=-Infinity
			this.forEach(function(e){
				mx=Math.max(e,mx)
			})
			return mx
		}
		list.prototype.index=function(x,i,j){
			if(arguments.length==1){
				i=0
				j=this.length
			}else if(arguments.length==2){
				j=this.length
			}
			if(j<0) j=this.length+j
			var pos=this.indexOf(x,i)
			if(pos==-1||pos>=j)
				throw outside.ValueError(x+" is not in list")
			return pos
		}
		list.prototype.count=function(x){
			var ans=0
			this.forEach(function(e){
				if(e==x) ++ans
			})
			return ans
		}
		list.prototype.append=function(x){
			this.push(x)
		}
		list.prototype.clear=function(){
			this.splice(0)
		}
		list.prototype.copy=function(){
			return this.slice(0)
		}
		list.prototype.insert=function(i,x){
			this.splice(i,0,x)
		}
		list.prototype.remove=function(x){
			this.splice(this.index(x),1)
		}
		var key
		for(key in list.prototype)
			if(list.prototype.hasOwnProperty(key))
				outside[ArrayName].prototype[key]=list.prototype[key]
		outside.list=function(arr){
			return arr
		}
		outside.tuple=function(arr){
			return arr
		}
		outside.range=function(l,r){
			if(arguments.length==1){
				r=l;
				l=0;
			}
			var i,lst=[]
			for(i=l;i<r;++i)
				lst.append(i)
			return lst
		}
	})("Array")
	class Random{
		random(){
			return Math.random();
		}
		randint(l,r){
			return parseInt(this.random()*(r-l+1)+l);
		}
		choice(list){
			return list[this.randint(0,list.length-1)];
		}
		randrange(){
			return this.choice(outside.range.apply(null,Array.prototype.slice.call(arguments,0)))
		}
		uniform(a,b){
			return a+(b-a)*this.random()
		}
	}
	outside.random=new Random()
	class Pygame{
		constructor(){
			this.event=[]
			this.event.get=function(){
				var es=[];
				while(this.length)
					es.push(this.shift());
				return es;
			}
			this.Color=function(){
				var arr=Array.prototype.slice.call(arguments,0)
				Object.defineProperty(arr,"r",{
					__proto__:null,
					get:function(){
						return this[0]
					},
					set:function(x){
						this[0]=x
					}
				})
				Object.defineProperty(arr,"g",{
					__proto__:null,
					get:function(){
						return this[1]
					},
					set:function(x){
						this[1]=x
					}
				})
				Object.defineProperty(arr,"b",{
					__proto__:null,
					get:function(){
						return this[2]
					},
					set:function(x){
						this[2]=x
					}
				})
				Object.defineProperty(arr,"a",{
					__proto__:null,
					get:function(){
						return this[3]
					},
					set:function(x){
						this[3]=x
					}
				})
				return arr
			}
			// TODO: implement Rect
			class Surface{
				constructor(size){
					size=size[0]
					this.context=document.createElement("canvas").getContext("2d")
					this.canvas.width=size[0]
					this.canvas.height=size[1]
				}
				get width(){
					return parseInt(this.canvas.width)
				}
				set width(x){
					this.canvas.width=x
				}
				get height(){
					return parseInt(this.canvas.height)
				}
				set height(x){
					this.canvas.height=x
				}
				get canvas(){
					return this.context.canvas
				}
				blit(suf,pos){
					this.context.drawImage(suf.canvas,Math.round(pos[0]),Math.round(pos[1]))
				}
				fill(color){
					this.context.save()
					this.context.fillStyle="rgb("+color[0]+","+color[1]+","+color[2]+")"
					this.context.fillRect(0,0,Math.round(this.width),Math.round(this.height))
					this.context.restore()
				}
				// TODO: implement get_rect()
			}
			this.Surface=wrapperConstructor.bind(null,Surface)
		}
		init(){
			var key
			for(key in this)
				if(this.hasOwnProperty(key))
					if(this[key].hasOwnProperty("init"))
						if(typeof(this[key].init)=="function")
							this[key].init(this)
		}
	}
	outside.pygame=new Pygame()
})(window);
