/**
 * @kalidokit v1.1.0
 * Blendshape and kinematics solver for Mediapipe/Tensorflow.js Face, Eyes, Pose, and Finger tracking models.
 * 
 * @license
 * Copyright (c) 2020-2021 yeemachine
 * SPDX-License-Idntifier: MIT 
 * https://github.com/yeemachine/kalidokit#readme
 */
(function(u,x){typeof exports=="object"&&typeof module!="undefined"?x(exports):typeof define=="function"&&define.amd?define(["exports"],x):(u=typeof globalThis!="undefined"?globalThis:u||self,x(u.Kalidokit={}))})(this,function(u){"use strict";const x=(n,t,e)=>Math.max(Math.min(n,e),t),p=(n,t,e)=>(x(n,t,e)-t)/(e-t),R={Face:{eye:{l:1,r:1},mouth:{x:0,y:0,shape:{A:0,E:0,I:0,O:0,U:0}},head:{x:0,y:0,z:0,width:.3,height:.6,position:{x:.5,y:.5,z:0}},brow:0,pupil:{x:0,y:0}},Pose:{RightUpperArm:{x:0,y:0,z:-1.25},LeftUpperArm:{x:0,y:0,z:1.25},RightLowerArm:{x:0,y:0,z:0},LeftLowerArm:{x:0,y:0,z:0},LeftUpperLeg:{x:0,y:0,z:0},RightUpperLeg:{x:0,y:0,z:0},RightLowerLeg:{x:0,y:0,z:0},LeftLowerLeg:{x:0,y:0,z:0},LeftHand:{x:0,y:0,z:0},RightHand:{x:0,y:0,z:0},Spine:{x:0,y:0,z:0},Hips:{position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}}},RightHand:{RightWrist:{x:-.13,y:-.07,z:-1.04},RightRingProximal:{x:0,y:0,z:-.13},RightRingIntermediate:{x:0,y:0,z:-.4},RightRingDistal:{x:0,y:0,z:-.04},RightIndexProximal:{x:0,y:0,z:-.24},RightIndexIntermediate:{x:0,y:0,z:-.25},RightIndexDistal:{x:0,y:0,z:-.06},RightMiddleProximal:{x:0,y:0,z:-.09},RightMiddleIntermediate:{x:0,y:0,z:-.44},RightMiddleDistal:{x:0,y:0,z:-.06},RightThumbProximal:{x:-.23,y:-.33,z:-.12},RightThumbIntermediate:{x:-.2,y:-.199,z:-.0139},RightThumbDistal:{x:-.2,y:.002,z:.15},RightLittleProximal:{x:0,y:0,z:-.09},RightLittleIntermediate:{x:0,y:0,z:-.225},RightLittleDistal:{x:0,y:0,z:-.1}},LeftHand:{LeftWrist:{x:-.13,y:-.07,z:-1.04},LeftRingProximal:{x:0,y:0,z:.13},LeftRingIntermediate:{x:0,y:0,z:.4},LeftRingDistal:{x:0,y:0,z:.049},LeftIndexProximal:{x:0,y:0,z:.24},LeftIndexIntermediate:{x:0,y:0,z:.25},LeftIndexDistal:{x:0,y:0,z:.06},LeftMiddleProximal:{x:0,y:0,z:.09},LeftMiddleIntermediate:{x:0,y:0,z:.44},LeftMiddleDistal:{x:0,y:0,z:.066},LeftThumbProximal:{x:-.23,y:.33,z:.12},LeftThumbIntermediate:{x:-.2,y:.25,z:.05},LeftThumbDistal:{x:-.2,y:.17,z:-.06},LeftLittleProximal:{x:0,y:0,z:.17},LeftLittleIntermediate:{x:0,y:0,z:.4},LeftLittleDistal:{x:0,y:0,z:.1}}};var Y=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",clamp:x,remap:p,RestingDefault:R});class i{constructor(t,e,r){var o,a,h,s,y,l;if(Array.isArray(t)){this.x=(o=t[0])!=null?o:0,this.y=(a=t[1])!=null?a:0,this.z=(h=t[2])!=null?h:0;return}if(!!t&&typeof t=="object"){this.x=(s=t.x)!=null?s:0,this.y=(y=t.y)!=null?y:0,this.z=(l=t.z)!=null?l:0;return}this.x=t!=null?t:0,this.y=e!=null?e:0,this.z=r!=null?r:0}negative(){return new i(-this.x,-this.y,-this.z)}add(t){return t instanceof i?new i(this.x+t.x,this.y+t.y,this.z+t.z):new i(this.x+t,this.y+t,this.z+t)}subtract(t){return t instanceof i?new i(this.x-t.x,this.y-t.y,this.z-t.z):new i(this.x-t,this.y-t,this.z-t)}multiply(t){return t instanceof i?new i(this.x*t.x,this.y*t.y,this.z*t.z):new i(this.x*t,this.y*t,this.z*t)}divide(t){return t instanceof i?new i(this.x/t.x,this.y/t.y,this.z/t.z):new i(this.x/t,this.y/t,this.z/t)}equals(t){return this.x==t.x&&this.y==t.y&&this.z==t.z}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){return new i(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}length(){return Math.sqrt(this.dot(this))}distance(t,e=3){return Math.sqrt(e===2?Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2):Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2)+Math.pow(this.z-t.z,2))}lerp(t,e){return t.subtract(this).multiply(e).add(this)}unit(){return this.divide(this.length())}min(){return Math.min(Math.min(this.x,this.y),this.z)}max(){return Math.max(Math.max(this.x,this.y),this.z)}toAngles(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}}angleTo(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}toArray(t){return[this.x,this.y,this.z].slice(0,t||3)}clone(){return new i(this.x,this.y,this.z)}init(t,e,r){return this.x=t,this.y=e,this.z=r,this}static negative(t,e=new i){return e.x=-t.x,e.y=-t.y,e.z=-t.z,e}static add(t,e,r=new i){return e instanceof i?(r.x=t.x+e.x,r.y=t.y+e.y,r.z=t.z+e.z):(r.x=t.x+e,r.y=t.y+e,r.z=t.z+e),r}static subtract(t,e,r=new i){return e instanceof i?(r.x=t.x-e.x,r.y=t.y-e.y,r.z=t.z-e.z):(r.x=t.x-e,r.y=t.y-e,r.z=t.z-e),r}static multiply(t,e,r=new i){return e instanceof i?(r.x=t.x*e.x,r.y=t.y*e.y,r.z=t.z*e.z):(r.x=t.x*e,r.y=t.y*e,r.z=t.z*e),r}static divide(t,e,r=new i){return e instanceof i?(r.x=t.x/e.x,r.y=t.y/e.y,r.z=t.z/e.z):(r.x=t.x/e,r.y=t.y/e,r.z=t.z/e),r}static cross(t,e,r=new i){return r.x=t.y*e.z-t.z*e.y,r.y=t.z*e.x-t.x*e.z,r.z=t.x*e.y-t.y*e.x,r}static unit(t,e){let r=t.length();return e.x=t.x/r,e.y=t.y/r,e.z=t.z/r,e}static fromAngles(t,e){return new i(Math.cos(t)*Math.cos(e),Math.sin(e),Math.sin(t)*Math.cos(e))}static randomDirection(){return i.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))}static min(t,e){return new i(Math.min(t.x,e.x),Math.min(t.y,e.y),Math.min(t.z,e.z))}static max(t,e){return new i(Math.max(t.x,e.x),Math.max(t.y,e.y),Math.max(t.z,e.z))}static lerp(t,e,r){return e instanceof i?e.subtract(t).multiply(r).add(t):(e-t)*r+t}static fromArray(t){return Array.isArray(t)?new i(t[0],t[1],t[2]):new i(t.x,t.y,t.z)}static angleBetween(t,e){return t.angleTo(e)}static angleBetweenVertices(t,e,r){t.subtract(e),r.subtract(e)}static distance(t,e,r){return Math.sqrt(r===2?Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2):Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)+Math.pow(t.z-e.z,2))}static toDegrees(t){return t*(180/Math.PI)}static normalizeAngle(t){let e=Math.PI*2,r=t%e;return r=r>Math.PI?r-e:r<-Math.PI?e+r:r,r/Math.PI}static normalizeRadians(t){return t>=Math.PI/2&&(t-=2*Math.PI),t<=-Math.PI/2&&(t+=2*Math.PI,t=Math.PI-t),t/Math.PI}static find2DAngle(t,e,r,o){var a=o-e,h=r-t,s=Math.atan2(a,h);return s}static findRotation(t,e,r=!0){return r?new i(i.normalizeRadians(i.find2DAngle(t.z,t.x,e.z,e.x)),i.normalizeRadians(i.find2DAngle(t.z,t.y,e.z,e.y)),i.normalizeRadians(i.find2DAngle(t.x,t.y,e.x,e.y))):new i(i.find2DAngle(t.z,t.x,e.z,e.x),i.find2DAngle(t.z,t.y,e.z,e.y),i.find2DAngle(t.x,t.y,e.x,e.y))}static rollPitchYaw(t,e,r){if(!r)return new i(i.normalizeAngle(i.find2DAngle(t.z,t.y,e.z,e.y)),i.normalizeAngle(i.find2DAngle(t.z,t.x,e.z,e.x)),i.normalizeAngle(i.find2DAngle(t.x,t.y,e.x,e.y)));let o=e.subtract(t),a=r.subtract(t),s=o.cross(a).unit(),y=o.unit(),l=s.cross(y),z=Math.asin(s.x)||0,g=Math.atan2(-s.y,s.z)||0,d=Math.atan2(-l.x,y.x)||0;return new i(i.normalizeAngle(g),i.normalizeAngle(z),i.normalizeAngle(d))}static angleBetween3DCoords(t,e,r){t instanceof i||(t=new i(t),e=new i(e),r=new i(r));const o=t.subtract(e),a=r.subtract(e),h=o.unit(),s=a.unit(),y=h.dot(s),l=Math.acos(y);return i.normalizeRadians(l)}}const D=n=>{let t={r:i.findRotation(n[11],n[13]),l:i.findRotation(n[12],n[14])};t.r.y=i.angleBetween3DCoords(n[12],n[11],n[13]),t.l.y=i.angleBetween3DCoords(n[11],n[12],n[14]);let e={r:i.findRotation(n[13],n[15]),l:i.findRotation(n[14],n[16])};e.r.y=i.angleBetween3DCoords(n[11],n[13],n[15]),e.l.y=i.angleBetween3DCoords(n[12],n[14],n[16]),e.r.z=x(e.r.z,-2.14,0),e.l.z=x(e.l.z,-2.14,0);let r={r:i.findRotation(i.fromArray(n[15]),i.lerp(i.fromArray(n[17]),i.fromArray(n[19]),.5)),l:i.findRotation(i.fromArray(n[16]),i.lerp(i.fromArray(n[18]),i.fromArray(n[20]),.5))},o=H(t.r,e.r,r.r,"Right"),a=H(t.l,e.l,r.l,"Left");return{UpperArm:{r:o.UpperArm,l:a.UpperArm},LowerArm:{r:o.LowerArm,l:a.LowerArm},Hand:{r:o.Hand,l:a.Hand},Unscaled:{UpperArm:t,LowerArm:e,Hand:r}}},H=(n,t,e,r="Right")=>{const o=r==="Right"?1:-1;return n.z*=-2.3*o,n.y*=Math.PI*o,n.y-=Math.max(t.x),n.y-=-o*Math.max(t.z,0),n.x-=.3*o,t.z*=-2.14*o,t.y*=2.14*o,t.x*=2.14*o,n.x=x(n.x,-.5,Math.PI),t.x=x(t.x,-.3,.3),e.y=x(e.z*2,-.6,.6),e.z=e.z*-2.3*o,{UpperArm:n,LowerArm:t,Hand:e}},B=(n,t)=>{let e=i.fromArray(t[23]),r=i.fromArray(t[24]),o=i.fromArray(t[11]),a=i.fromArray(t[12]),h=e.lerp(r,1),s=o.lerp(a,1),y=h.distance(s),l={position:{x:x(-1*(h.x-.65),-1,1),y:0,z:x(y-1,-2,0)}};l.rotation=i.rollPitchYaw(n[23],n[24]),l.rotation.y>.5&&(l.rotation.y-=2),l.rotation.y+=.5,l.rotation.z>0&&(l.rotation.z=1-l.rotation.z),l.rotation.z<0&&(l.rotation.z=-1-l.rotation.z);let z=p(Math.abs(l.rotation.y),.2,.4);l.rotation.z*=1-z,l.rotation.x=0;let g=i.rollPitchYaw(n[11],n[12]);g.y>.5&&(g.y-=2),g.y+=.5,g.z>0&&(g.z=1-g.z),g.z<0&&(g.z=-1-g.z);let d=p(Math.abs(g.y),.2,.4);return g.z*=1-d,g.x=0,k(l,g)},k=(n,t)=>(n.rotation.x*=Math.PI,n.rotation.y*=Math.PI,n.rotation.z*=Math.PI,n.worldPosition={x:n.position.x*(.5+1.8*-n.position.z),y:0,z:n.position.z*(.1+n.position.z*-2)},t.x*=Math.PI,t.y*=Math.PI,t.z*=Math.PI,{Hips:n,Spine:t}),C=n=>{let t={r:i.findRotation(n[23],n[25]),l:i.findRotation(n[24],n[26])};t.r.z=x(t.r.z-.5,-.5,0),t.r.y=0,t.l.z=x(t.l.z-.5,-.5,0),t.l.y=0;let e={r:i.findRotation(n[25],n[27]),l:i.findRotation(n[26],n[28])};e.r.x=i.angleBetween3DCoords(n[23],n[25],n[27]),e.r.y=0,e.r.z=0,e.l.x=i.angleBetween3DCoords(n[24],n[26],n[28]),e.l.y=0,e.l.z=0;let r=m(t.r,e.r,"Right"),o=m(t.l,e.l,"Left");return{UpperLeg:{r:r.UpperLeg,l:o.UpperLeg},LowerLeg:{r:r.LowerLeg,l:o.LowerLeg},Unscaled:{UpperArm:t,LowerLeg:e}}},m=(n,t,e="Right")=>{let r=e==="Right"?1:-1;return n.z=n.z*-2.3*r,n.x=x(n.z*.1*r,-.5,Math.PI),t.x=t.x*-2.14*1.3,{UpperLeg:n,LowerLeg:t}};class A{constructor(){}static solve(t,e,{runtime:r="mediapipe",video:o=null,imageSize:a=null,enableLegs:h=!0}={}){var w,I;if(!t&&!e){console.error("Need both World Pose and Pose Landmarks");return}if(o){const f=typeof o=="string"?document.querySelector(o):o;a={width:f.videoWidth,height:f.videoHeight}}r==="tfjs"&&a&&(t.forEach((f,M)=>{f.visibility=f.score}),e.forEach((f,M)=>{f.x/=a.width,f.y/=a.height,f.z=0,f.visibility=f.score}));let s=D(t),y=B(t,e),l=h?C(t):null,z=t[15].y>-.1||t[15].visibility<.23||.995<e[15].y,g=t[16].y>-.1||t[16].visibility<.23||.995<e[16].y,d=((w=t[23])==null?void 0:w.visibility)<.63||y.Hips.position.z>-.4,L=((I=t[24])==null?void 0:I.visibility)<.63||y.Hips.position.z>-.4;return s.UpperArm.l=s.UpperArm.l.multiply(g?0:1),s.UpperArm.l.z=g?R.Pose.LeftUpperArm.z:s.UpperArm.l.z,s.UpperArm.r=s.UpperArm.r.multiply(z?0:1),s.UpperArm.r.z=z?R.Pose.RightUpperArm.z:s.UpperArm.r.z,s.LowerArm.l=s.LowerArm.l.multiply(g?0:1),s.LowerArm.r=s.LowerArm.r.multiply(z?0:1),s.Hand.l=s.Hand.l.multiply(g?0:1),s.Hand.r=s.Hand.r.multiply(z?0:1),h&&l&&(l.UpperLeg.l=l.UpperLeg.l.multiply(L?0:1),l.UpperLeg.r=l.UpperLeg.r.multiply(d?0:1),l.LowerLeg.l=l.LowerLeg.l.multiply(L?0:1),l.LowerLeg.r=l.LowerLeg.r.multiply(d?0:1)),{RightUpperArm:s.UpperArm.r,RightLowerArm:s.LowerArm.r,LeftUpperArm:s.UpperArm.l,LeftLowerArm:s.LowerArm.l,RightHand:s.Hand.r,LeftHand:s.Hand.l,RightUpperLeg:h&&l?l.UpperLeg.r:R.Pose.RightUpperLeg,RightLowerLeg:h&&l?l.LowerLeg.r:R.Pose.RightLowerLeg,LeftUpperLeg:h&&l?l.UpperLeg.l:R.Pose.LeftUpperLeg,LeftLowerLeg:h&&l?l.LowerLeg.l:R.Pose.LeftLowerLeg,Hips:y.Hips,Spine:y.Spine}}}A.calcArms=D,A.calcHips=B,A.calcLegs=C;class S{constructor(){}static solve(t,e="Right"){if(!t){console.error("Need Hand Landmarks");return}let r=[new i(t[0]),new i(t[e==="Right"?17:5]),new i(t[e==="Right"?5:17])],o=i.rollPitchYaw(r[0],r[1],r[2]);o.y=o.z,o.y-=.4;let a={};return a[e+"Wrist"]={x:o.x,y:o.y,z:o.z},a[e+"RingProximal"]={x:0,y:0,z:i.angleBetween3DCoords(t[0],t[13],t[14])},a[e+"RingIntermediate"]={x:0,y:0,z:i.angleBetween3DCoords(t[13],t[14],t[15])},a[e+"RingDistal"]={x:0,y:0,z:i.angleBetween3DCoords(t[14],t[15],t[16])},a[e+"IndexProximal"]={x:0,y:0,z:i.angleBetween3DCoords(t[0],t[5],t[6])},a[e+"IndexIntermediate"]={x:0,y:0,z:i.angleBetween3DCoords(t[5],t[6],t[7])},a[e+"IndexDistal"]={x:0,y:0,z:i.angleBetween3DCoords(t[6],t[7],t[8])},a[e+"MiddleProximal"]={x:0,y:0,z:i.angleBetween3DCoords(t[0],t[9],t[10])},a[e+"MiddleIntermediate"]={x:0,y:0,z:i.angleBetween3DCoords(t[9],t[10],t[11])},a[e+"MiddleDistal"]={x:0,y:0,z:i.angleBetween3DCoords(t[10],t[11],t[12])},a[e+"ThumbProximal"]={x:0,y:0,z:i.angleBetween3DCoords(t[0],t[1],t[2])},a[e+"ThumbIntermediate"]={x:0,y:0,z:i.angleBetween3DCoords(t[1],t[2],t[3])},a[e+"ThumbDistal"]={x:0,y:0,z:i.angleBetween3DCoords(t[2],t[3],t[4])},a[e+"LittleProximal"]={x:0,y:0,z:i.angleBetween3DCoords(t[0],t[17],t[18])},a[e+"LittleIntermediate"]={x:0,y:0,z:i.angleBetween3DCoords(t[17],t[18],t[19])},a[e+"LittleDistal"]={x:0,y:0,z:i.angleBetween3DCoords(t[18],t[19],t[20])},a=X(a,e),a}}const X=(n,t="Right")=>{const e=t==="Right"?1:-1;let r=["Ring","Index","Little","Thumb","Middle"],o=["Proximal","Intermediate","Distal"];return n[t+"Wrist"].x=x(n[t+"Wrist"].x*2*e,-.3,.3),n[t+"Wrist"].y=x(n[t+"Wrist"].y*2.3,t==="Right"?-1.2:-.6,t==="Right"?.6:1.6),n[t+"Wrist"].z=n[t+"Wrist"].z*-2.3*e,r.forEach(a=>{o.forEach(h=>{let s=n[t+a+h];if(a==="Thumb"){let y={x:h==="Proximal"?2.2:0,y:h==="Proximal"?2.2:h==="Intermediate"?.7:1,z:.5},l={x:h==="Proximal"?1.2:-.2,y:h==="Proximal"?1.1*e:.1*e,z:.2*e},z={x:0,y:0,z:0};h==="Proximal"?(z.z=x(l.z+s.z*-Math.PI*y.z*e,t==="Right"?-.6:-.3,t==="Right"?.3:.6),z.x=x(l.x+s.z*-Math.PI*y.x,-.6,.3),z.y=x(l.y+s.z*-Math.PI*y.y*e,t==="Right"?-1:-.3,t==="Right"?.3:1)):(z.z=x(l.z+s.z*-Math.PI*y.z*e,-2,2),z.x=x(l.x+s.z*-Math.PI*y.x,-2,2),z.y=x(l.y+s.z*-Math.PI*y.y*e,-2,2)),s.x=z.x,s.y=z.y,s.z=z.z}else s.z=x(s.z*-Math.PI*e,t==="Right"?-Math.PI:0,t==="Right"?0:Math.PI)})}),n},N=n=>{let t=new i(n[21]),e=new i(n[251]),r=new i(n[397]),o=new i(n[172]),a=r.lerp(o,.5);return{vector:[t,e,a],points:[t,e,r,o]}},K=n=>{const t=N(n).vector;let e=i.rollPitchYaw(t[0],t[1],t[2]),r=t[0].lerp(t[1],.5),o=t[0].distance(t[1]),a=r.distance(t[2]);return e.x*=-1,e.z*=-1,{y:e.y*Math.PI,x:e.x*Math.PI,z:e.z*Math.PI,width:o,height:a,position:r.lerp(t[2],.5),normalized:{y:e.y,x:e.x,z:e.z},degrees:{y:e.y*180,x:e.x*180,z:e.z*180}}},P={eye:{left:[130,133,160,159,158,144,145,153],right:[263,362,387,386,385,373,374,380]},brow:{left:[35,244,63,105,66,229,230,231],right:[265,464,293,334,296,449,450,451]},pupil:{left:[468,469,470,471,472],right:[473,474,475,476,477]}},U=(n,t="left",{high:e=.85,low:r=.55}={})=>{let o=P.eye[t],a=T(n[o[0]],n[o[1]],n[o[2]],n[o[3]],n[o[4]],n[o[5]],n[o[6]],n[o[7]]),s=x(a/.285,0,2);return{norm:p(s,r,e),raw:s}},T=(n,t,e,r,o,a,h,s)=>{n=new i(n),t=new i(t),e=new i(e),r=new i(r),o=new i(o),a=new i(a),h=new i(h),s=new i(s);const y=n.distance(t,2),l=e.distance(a,2),z=r.distance(h,2),g=o.distance(s,2);return(l+z+g)/3/y},E=(n,t="left")=>{const e=new i(n[P.eye[t][0]]),r=new i(n[P.eye[t][1]]),o=e.distance(r,2),a=e.lerp(r,.5),h=new i(n[P.pupil[t][0]]),s=a.x-h.x,y=a.y-o*.075-h.y;let l=s/(o/2),z=y/(o/4);return l*=4,z*=4,{x:l,y:z}},O=(n,t,{enableWink:e=!0,maxRot:r=.5}={})=>{n.r=x(n.r,0,1),n.l=x(n.l,0,1);const o=Math.abs(n.l-n.r),a=e?.8:1.2,h=n.l<.3&&n.r<.3,s=n.l>.6&&n.r>.6;return t>r?{l:n.r,r:n.r}:t<-r?{l:n.l,r:n.l}:{l:o>=a&&!h&&!s?n.l:n.r>n.l?i.lerp(n.r,n.l,.95):i.lerp(n.r,n.l,.05),r:o>=a&&!h&&!s?n.r:n.r>n.l?i.lerp(n.r,n.l,.95):i.lerp(n.r,n.l,.05)}},Z=(n,{high:t=.85,low:e=.55}={})=>{if(n.length!==478)return{l:1,r:1};const r=U(n,"left",{high:t,low:e}),o=U(n,"right",{high:t,low:e});return{l:r.norm||0,r:o.norm||0}},G=n=>{if(n.length!==478)return{x:0,y:0};{const t=E(n,"left"),e=E(n,"right");return{x:(t.x+e.x)*.5||0,y:(t.y+e.y)*.5||0}}},W=(n,t="left")=>{let e=P.brow[t],r=T(n[e[0]],n[e[1]],n[e[2]],n[e[3]],n[e[4]],n[e[5]],n[e[6]],n[e[7]]),o=1.15,a=.125,h=.07,s=r/o-1;return(x(s,h,a)-h)/(a-h)},J=n=>{if(n.length!==478)return 0;{const t=W(n,"left"),e=W(n,"right");return(t+e)/2||0}},Q=n=>{const t=new i(n[133]),e=new i(n[362]),r=new i(n[130]),o=new i(n[263]),a=t.distance(e),h=r.distance(o),s=new i(n[13]),y=new i(n[14]),l=new i(n[61]),z=new i(n[291]),g=s.distance(y),d=l.distance(z);let L=g/a,w=d/h;L=p(L,.15,.7),w=p(w,.45,.9),w=(w-.3)*2;const I=w,f=p(g/a,.17,.5);let M=x(p(I,0,1)*2*p(f,.2,.7),0,1),$=f*.4+f*(1-M)*.6,F=f*p(1-M,0,.3)*.1,v=p(F,.2,1)*(1-M)*.3,j=(1-M)*p(f,.3,1)*.4;return{x:w||0,y:L||0,shape:{A:$||0,E:v||0,I:M||0,O:j||0,U:F||0}}};class q{constructor(){}static solve(t,{runtime:e="tfjs",video:r=null,imageSize:o=null,smoothBlink:a=!1,blinkSettings:h=[]}={}){if(!t){console.error("Need Face Landmarks");return}if(r){const d=typeof r=="string"?document.querySelector(r):r;o={width:d.videoWidth,height:d.videoHeight}}e==="mediapipe"&&o&&t.forEach(d=>{d.x*=o.width,d.y*=o.height,d.z*=o.width});let s=K(t),y=Q(t);h=h.length>0?h:e==="tfjs"?[.55,.85]:[.35,.5];let l=Z(t,{high:h[1],low:h[0]});a&&(l=O(l,s.y));let z=G(t),g=J(t);return{head:s,eye:l,brow:g,pupil:z,mouth:y}}}q.stabilizeBlink=O;const c=null;u.Face=q,u.Hand=S,u.HandKeys=c,u.IFaceSolveOptions=c,u.IHips=c,u.IPoseSolveOptions=c,u.ISolveOptions=c,u.LR=c,u.Pose=A,u.Results=c,u.TFVectorPose=c,u.THand=c,u.THandUnsafe=c,u.TPose=c,u.Utils=Y,u.Vector=i,u.XYZ=c,Object.defineProperty(u,"__esModule",{value:!0}),u[Symbol.toStringTag]="Module"});
