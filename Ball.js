class Ball{constructor(a,b,c,d,e,f=[1,2],g){Object.assign(this,{x:a,y:b,vx:c,vy:d,r:e,ri:f,fill:g,ORIGINAL:{r:e,vx:c,vy:d}}),this.radiusUpdate()}update(a){(this.x+this.r>=cWidth||0>=this.x-this.r)&&(this.vx=-this.vx),(this.y+this.r>=cHeight||0>=this.y-this.r)&&(this.vy=-this.vy);const b=this.x+this.vx;this.x=b+this.r<cWidth?0<b-this.r?b:this.r:cWidth-this.r;const c=this.y+this.vy;this.y=c+this.r<cHeight?0<c-this.r?c:this.r:cHeight-this.r,this.#draw(a)}#draw(a){a.beginPath(),this.ri[0]=mousePos&&Math.abs(this.x-mousePos.x)<mouseRadius&&Math.abs(this.y-mousePos.y)<mouseRadius?this.ri[0]<this.ri[1]?this.ri[0]+.06:this.ri[1]:1<this.ri[0]-.05?this.ri[0]-.02:1,a.arc(this.x,this.y,this.r*this.ri[0],0,2*Math.PI,!1),a.fillStyle=this.fill,a.fill()}radiusUpdate(){this.r=2<=sizeFraction?this.ORIGINAL.r*Math.pow(sizeFraction,.5)/1.5:.15>sizeFraction?this.ORIGINAL.r*Math.pow(sizeFraction,.5)/.3:this.ORIGINAL.r}}