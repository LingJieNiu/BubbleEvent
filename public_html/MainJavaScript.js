function getStyle(obj, attr){
 return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}
function startMove(obj,attr,iTarget){
 var iSpeed = 0;
 var sty = 0;
 clearInterval(obj.timer);
 obj.timer = setInterval(function(){
  sty = parseInt(getStyle(obj,attr));//top
  console.log("the sty is: ",sty);
  console.log("the itarget is: ",iTarget);
  iSpeed = (iTarget - sty)/3;
  iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
  if(Math.abs(iTarget - sty)>3){
	  var temp=sty + iSpeed + 'px';
	  console.log("the temp is: ",temp);
   obj.style[attr] = sty + iSpeed + 'px';
  }else{
   clearInterval(obj.timer);
   obj.style[attr] = iTarget + 'px';
  }
 },30);
}
//获取className兼容ie
function getClassName(tag, className){
 if(document.getElementsByClassName){
  return document.getElementsByClassName(className);
 }else{
  var rel = [];
  var nodes = document.getElementsByTagName(tag);
  //document.getElementById("console1").innerHTML = nodes;
  for(var i=0; i<nodes.length; i++){
   var tagClassName = nodes[i].className.split(/\s+/);
   for(var j=0; j<tagClassName.length; j++){
    if(tagClassName[j] == className){
     rel.push(nodes[i]);
     break;
    }
   }
  }
  return rel;
 }
}



function gunPing(){
 var aDiv = document.getElementById('gp');
 var oDiv = document.getElementById('gunping');
 var oDiv_div = getClassName('div', 'page');
 //console.log("the oDiv_div length is: ",oDiv_div.length);
 var aHeight = document.documentElement.clientHeight;
 var iNum = 0;
  
 fnHeight();
 //页面高度
 function fnHeight(){
  for(var i=0; i<oDiv_div.length; i++){
   oDiv_div[i].style.height = aHeight + 'px';
  }
  aDiv.style.height = aHeight + 'px';
 }
 //ff滚轮事件
 if(document.addEventListener){
  document.addEventListener('DOMMouseScroll',scrollFunc,false);
 }
 //ie滚轮事件
 document.onmousewheel = scrollFunc;
  
 function scrollFunc(e){
  e = e || window.event;
  if(e.wheelDelta<0 || e.detail>0){
   if(iNum > -oDiv_div.length+1){
    iNum--;
   }
  }else{
   if(iNum<0){
    iNum++
   }
  }
  startMove(oDiv,'top',iNum*aHeight);
 }
  
 //改变窗口大小
 window.onresize = function(){
  aHeight = document.documentElement.clientHeight;
  fnHeight();
  oDiv.style.top = iNum*aHeight + 'px';
 }
  
}
window.onload = function(){
 gunPing();
}







		


		

