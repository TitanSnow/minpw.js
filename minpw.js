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
	;(function implementExceptions(){
		class Exception{}
		outside.ValueError=new Exception()
	})()
	;(function implementList(list){
		function at2(pos,val){
			if(pos<0)
				this[this.length+pos]=val
			else
				this[pos]=val
		}
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
		list.prototype.add=function(lst){
			var that=this
			lst.forEach(function(e){
				that.push(e)
			})
		}
		list.prototype.multiply=function(n){
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
			if(j<0) j=this.length+j;
			var pos=this.indexOf(x,i)
			if(pos==-1||pos>=j)
				throw outside.ValueError
			return pos
		}
		list.prototype.count=function(x){
			var ans=0
			this.forEach(function(e){
				if(e==x) ++ans
			})
			return ans
		}
		// TODO: add more method
	})(Array)
	class Pygame{
		// TODO: implement
	}
	outside.pygame=new Pygame()
})(window);
