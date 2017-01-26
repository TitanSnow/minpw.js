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
	var python=outside.python={
		None:null,
		True:true,
		False:false,
		init:function(){
			var key
			for(key in this)
				if(this.hasOwnProperty(key)&&key!="init")
					outside[key]=this[key]
		}
	}
	function wrapperConstructor(cls){
		return new cls(Array.prototype.slice.call(arguments,1))
	}
	var BaseException,Exception
	;(function implementExceptions(){
		BaseException=Exception=class{
			constructor(args){
				this.args=args
			}
		}
		python.BaseException=wrapperConstructor.bind(null,BaseException)
		python.Exception=wrapperConstructor.bind(null,Exception)
		class ValueError extends BaseException{}
		python.ValueError=wrapperConstructor.bind(null,ValueError)
	})()
	;(function implementList(Array){
		function at2(pos,val){
			if(pos<0)
				this[this.length+pos]=val
			else
				this[pos]=val
		}
		class list extends Array{}
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
				throw python.ValueError(x+" is not in list")
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
				Array.prototype[key]=list.prototype[key]
		outside.list=function(arr){
			return arr
		}
		outside.tuple=function(arr){
			return arr
		}
		outside.range=function(l,r){
			if(arguments.length==1){
				r=l
				l=0
			}
			var i,lst=[]
			for(i=l;i<r;++i)
				lst.append(i)
			return lst
		}
		outside.len=function(arr){
			return arr.len()
		}
	})(outside.Array)
	class Random{
		random(){
			return Math.random()
		}
		randint(l,r){
			return parseInt(this.random()*(r-l+1)+l)
		}
		choice(list){
			return list[this.randint(0,list.length-1)]
		}
		randrange(){
			return this.choice(outside.range.apply(null,Array.from(arguments)))
		}
		uniform(a,b){
			return a+(b-a)*this.random()
		}
	}
	outside.random=new Random()
	class Pygame{
		constructor(){
			var that=this
			this.event=[]
			this.event.get=function(){
				var es=[]
				while(this.length)
					es.push(this.shift())
				return es
			}
			class PygameError extends Exception{}
			this.error=wrapperConstructor.bind(null,PygameError)
			this.Color=function(){
				var arr=Array.from(arguments)
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
						if(this.length==4) return this[3]
						else return 255
					},
					set:function(x){
						this[3]=x
					}
				})
				Object.defineProperty(arr,"a01",{
					__proto__:null,
					get:function(){
						return this.a/255
					},
					set:function(x){
						this.a=Math.round(x*255)
					}
				})
				return arr
			}
			this.Rect=function(x,y,w,h){
				var obj=[x,y,w,h]
				Object.defineProperty(obj,"x",{
					__proto__:null,
					get:function(){
						return this[0]
					},
					set:function(x){
						this[0]=x
					}
				})
				Object.defineProperty(obj,"y",{
					__proto__:null,
					get:function(){
						return this[1]
					},
					set:function(x){
						this[1]=x
					}
				})
				Object.defineProperty(obj,"w",{
					__proto__:null,
					get:function(){
						return this[2]
					},
					set:function(x){
						this[2]=x
					}
				})
				Object.defineProperty(obj,"h",{
					__proto__:null,
					get:function(){
						return this[3]
					},
					set:function(x){
						this[3]=x
					}
				})
				Object.defineProperty(obj,"width",{
					__proto__:null,
					get:function(){
						return this.w
					},
					set:function(x){
						this.w=x
					}
				})
				Object.defineProperty(obj,"height",{
					__proto__:null,
					get:function(){
						return this.h
					},
					set:function(x){
						this.h=x
					}
				})
				Object.defineProperty(obj,"left",{
					__proto__:null,
					get:function(){
						return this.x
					},
					set:function(x){
						this.x=x
					}
				})
				Object.defineProperty(obj,"top",{
					__proto__:null,
					get:function(){
						return this.y
					},
					set:function(x){
						this.y=x
					}
				})
				Object.defineProperty(obj,"right",{
					__proto__:null,
					get:function(){
						return this.x+this.w
					}
				})
				Object.defineProperty(obj,"bottom",{
					__proto__:null,
					get:function(){
						return this.y+this.h
					}
				})
				return obj
			}
			function blit3(suf,pos,area){
				area=that.Rect.apply(null,area)
				this.context.drawImage(suf.canvas,area.x,area.y,area.w,area.h,pos[0],pos[1],area.w,area.h)
			}
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
				blit(suf,pos,area){
					if(arguments.length>=3)
						blit3.call(this,suf,pos,area)
					else
						this.context.drawImage(suf.canvas,Math.round(pos[0]),Math.round(pos[1]))
				}
				fill(color){
					this.context.save()
					color=that.Color.apply(that,color)
					this.context.fillStyle="rgba("+color.r+","+color.g+","+color.b+","+color.a01+")"
					this.context.fillRect(0,0,Math.round(this.width),Math.round(this.height))
					this.context.restore()
				}
				get_rect(){
					return that.Rect(0,0,this.width,this.height)
				}
				convert(){return this}
				convert_alpha(){return this}
				copy(){
					var suf=new Surface([[this.width,this.height]])
					suf.context.drawImage(this.canvas,0,0)
					return suf
				}
				get_size(){
					return [this.width,this.height]
				}
				get_width(){
					return this.width
				}
				get_height(){
					return this.height
				}
			}
			this.Surface=wrapperConstructor.bind(null,Surface)
			class Image extends Surface{
				constructor(img){
					img=img[0]
					super([[img.width,img.height]])
					this.context.drawImage(img,0,0)
				}
			}
			this.Image=wrapperConstructor.bind(null,Image)
			this.image={
				init(){
					this.load=function load(src,callback){
						if(arguments.length==1){
							return new Promise(function(resolve,reject){
								load(src,resolve)
							})
						}
						var img=document.createElement("img")
						img.src=src
						img.alt=""
						img.onload=function(){
							var image=that.Image(img)
							callback(image)
						}
					}
				}
			}
			this.display={
				get_init:function(){
					return false
				},
				init:function(pygame){
					this.get_init=function(){
						return true
					}
					var that2=this
					this.set_mode=function(size){
						var screen
						if(typeof(that2.get_surface)!="function"){
							screen=pygame.Surface(size)
							document.body.appendChild(screen.canvas)
							that2.get_surface=function(){
								return screen
							}
							screen.fill([0,0,0])
							return screen
						}
						screen=that2.get_surface()
						screen.width=size[0]
						screen.height=size[1]
						screen.fill([0,0,0])
						return screen
					}
					this.flip=this.update=function(){}
					this.set_caption=function(st){
						var ns=document.getElementsByTagName("title")
						if(ns.length==0){
							var nd=document.createElement("title")
							nd.textContent=st
							document.head.appendChild(nd)
						}else{
							ns[0].textContent=st
						}
					}
					this.get_caption=function(){
						var ns=document.getElementsByTagName("title")
						if(ns.length!=0)
							return ns[0].textContent
					}
					function toggleFullScreen(ele) {
						if (!document.fullscreenElement &&    // alternative standard method
							!document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
							if (ele.requestFullscreen) {
								ele.requestFullscreen();
							} else if (ele.mozRequestFullScreen) {
								ele.mozRequestFullScreen();
							} else if (ele.webkitRequestFullscreen) {
								ele.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
							}
							return true
						} else {
							if (document.cancelFullScreen) {
								document.cancelFullScreen();
							} else if (document.mozCancelFullScreen) {
								document.mozCancelFullScreen();
							} else if (document.webkitCancelFullScreen) {
								document.webkitCancelFullScreen();
							}
							return false
						}
					}
					this.toggle_fullscreen=function(){
						return toggleFullScreen(that2.get_surface().canvas)
					}
				}
			}
			this.time={
				init:function(pygame){
					this.delay=this.wait=function wait(time,callback){
						if(arguments.length==1){
							return new Promise(function(resolve,reject){
								wait(time,resolve)
							})
						}
						setTimeout(callback,time)
					}
					class Clock{
						tick(fps,callback){
							if(fps!=60)
								throw pygame.error("fps must be 60")
							if(arguments.length==1){
								return new Promise((function(resolve,reject){
									this.tick(fps,resolve)
								}).bind(this))
							}
							requestAnimationFrame(callback)
						}
						tick_busy_loop(fps,callback){
							return this.tick.apply(this,Array.from(arguments))
						}
						get_fps(){
							return 60
						}
					}
					this.Clock=wrapperConstructor.bind(null,Clock)
					var init_time=Date.now()
					this.get_ticks=function(){
						return Date.now()-init_time
					}
					var timers={}
					this.set_timer=function(eventid,time){
						if(time==0){
							clearInterval(timers[eventid])
						}else{
							timers[eventid]=setInterval(function(){
								pygame.event.push({type:eventid})
							},time)
						}
					}
				},
				get_ticks:function(){
					return 0
				}
			}
			this.font={
				init:function(pygame){
					var that2=this
					this.get_init=function(){
						return true
					}
					this.get_default_font=function(){
						return "sans-serif"
					}
					class Font{
						constructor(args){
							this.fontname=args[0]
							this.fontsize=args[1]
						}
						size(text){
							var context=document.createElement("canvas").getContext("2d")
							if(this.fontname==null)
								context.font=this.fontsize+"px "+that2.get_default_font()
							else
								context.font=this.fontsize+"px "+this.fontname
							context.textBaseline="top"
							return pygame.Rect(0,0,Math.max(Math.ceil(context.measureText(text).width),1),this.fontsize)
						}
						render(text,antialias,color,background){
							var rect=this.size(text)
							var suf=pygame.Surface([rect.w,rect.h])
							if(background!=null){
								suf.fill(background)
							}
							suf.context.save()
							if(this.fontname==null)
								suf.context.font=this.fontsize+"px "+that2.get_default_font()
							else
								suf.context.font=this.fontsize+"px "+this.fontname
							suf.context.textBaseline="top"
							color=that.Color.apply(that,color)
							suf.context.fillStyle="rgba("+color.r+","+color.g+","+color.b+","+color.a01+")"
							suf.context.fillText(text,0,0)
							suf.context.restore()
							return suf
						}
					}
					this.Font=wrapperConstructor.bind(null,Font)
				},
				get_init(){
					return false
				}
			}
			this.transform={
				init:function(pygame){
					this.flip2=function(suf,suf_source,xbool,ybool){
						var ctx=suf.context
						ctx.save()
						var dx,dy
						if(xbool)
							dx=-1
						else
							dx=1
						if(ybool)
							dy=-1
						else
							dy=1
						ctx.scale(dx,dy)
						ctx.globalCompositeOperation="copy"
						ctx.drawImage(suf_source.canvas,Math.min(0,suf.width*dx),Math.min(0,suf.height*dy))
						ctx.restore()
					}
					this.flip_ip=function(suf,xbool,ybool){
						this.flip2(suf,suf,xbool,ybool)
					}
					this.flip=function(suf,xbool,ybool){
						var new_suf=pygame.Surface([suf.width,suf.height])
						this.flip2(new_suf,suf,xbool,ybool)
						return new_suf
					}
					this.scale2=function(suf,suf_source,size,size_source){
						var dw=size[0]
						var dh=size[1]
						var ow=size_source[0]
						var oh=size_source[1]
						var rw=dw/ow
						var rh=dh/oh
						var ctx=suf.context
						ctx.save()
						ctx.scale(rw,rh)
						ctx.globalCompositeOperation="copy"
						ctx.drawImage(suf_source.canvas,0,0)
						ctx.restore()
					}
					//this.scale_ip=function(suf,size){
					//	var w=size[0]
					//	var h=size[1]
					//	var ow=suf.width
					//	var oh=suf.height
					//	suf.width=Math.max(ow,w)
					//	suf.height=Math.max(oh,h)
					//	this.scale2(suf,suf,size,[ow,oh])
					//	suf.width=w
					//	suf.height=h
					//}
					this.smoothscale=this.scale=function(suf,size,suf_dest){
						if(arguments.length!=3)
							suf_dest=pygame.Surface(size)
						this.scale2(suf_dest,suf,size,[suf.width,suf.height])
						return suf_dest
					}
					this.scale2x=function(suf,suf_dest){
						var arg=Array.from(arguments)
						arg.insert(1,[suf.width*2,suf.height*2])
						return this.scale.apply(this,arg)
					}
				}
			}
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
