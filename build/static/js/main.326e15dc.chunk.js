(this.webpackJsonpwebsite_robot_spital=this.webpackJsonpwebsite_robot_spital||[]).push([[0],{29:function(e,t,n){e.exports=n(40)},34:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var o=n(1),l=n.n(o),a=n(17),r=n.n(a),c=(n(34),n(56)),d=n(19),m=n.n(d),s=n(22),i=n.n(s),u=n(24),E=n.n(u),p=n(20),w=n.n(p),y=n(21),g=n.n(y),b=n(23),h=n.n(b);var f,k=function(){return l.a.createElement("div",null,l.a.createElement(c.a,{maxWidth:"md",id:"container"},l.a.createElement("img",{id:"logoproiect",src:"logo_proiect.png",height:"100",alt:"Xeo Hospital Robot"}),l.a.createElement("img",{src:"http://192.168.0.125:81/stream.mjpg",width:"640",height:"480",alt:"stream video"}),l.a.createElement("table",{id:"arrow-table"},l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null,l.a.createElement(m.a,{id:"up-arrow"})),l.a.createElement("td",null)),l.a.createElement("tr",null,l.a.createElement("td",null,l.a.createElement(w.a,{id:"left-arrow"})),l.a.createElement("td",null,l.a.createElement(g.a,{id:"space-arrow"})),l.a.createElement("td",null,l.a.createElement(i.a,{id:"right-arrow"}),l.a.createElement(h.a,{id:"stop-arrow"}))),l.a.createElement("tr",null,l.a.createElement("td",null),l.a.createElement("td",null,l.a.createElement(E.a,{id:"down-arrow"})),l.a.createElement("td",null)))))},B=n(27),I=n(25),v=n.n(I),_=n(26),C=n.n(_);Object(B.a)({palette:{primary:v.a,secondary:C.a}});function W(e){f.send(e)}r.a.render(l.a.createElement(k,null),document.getElementById("appbody"));var j,x,J="connected";console.log("websockets connected"),x="websockets connected","WebSocket"in window&&((f=new WebSocket("ws://192.168.0.125:8765")).onopen=function(){W(x)}),document.addEventListener("keydown",(function(e){var t=e.keyCode?e.keyCode:e.which;console.log(t),J=j,"38"==t&&(j="front",document.getElementById("up-arrow").style.color="#34eb71"),"39"==t&&(j="right",document.getElementById("right-arrow").style.color="#34eb71"),"40"==t&&(j="back",document.getElementById("down-arrow").style.color="#34eb71"),"37"==t&&(j="left",document.getElementById("left-arrow").style.color="#34eb71"),"32"==t&&(j="stop",document.getElementById("space-arrow").style.color="#ff0000"),J!=j&&(console.log(j),W(j))}),!1),document.addEventListener("keyup",(function(e){var t=e.keyCode?e.keyCode:e.which;console.log(t),J=j,"38"==t&&(j="stop",document.getElementById("up-arrow").style.color="#000000"),"39"==t&&(j="stop",document.getElementById("right-arrow").style.color="#000000"),"40"==t&&(j="stop",document.getElementById("down-arrow").style.color="#000000"),"37"==t&&(j="stop",document.getElementById("left-arrow").style.color="#000000"),"32"==t&&(j="stop",document.getElementById("space-arrow").style.color="#000000"),j="stop",console.log(j),W(j)}),!1)}},[[29,1,2]]]);
//# sourceMappingURL=main.326e15dc.chunk.js.map