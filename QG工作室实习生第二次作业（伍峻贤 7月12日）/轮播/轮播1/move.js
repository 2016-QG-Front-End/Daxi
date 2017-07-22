var li = document.getElementsByTagName("li");
var animated = false;
var v = 0;
var k = 0;
window.onload = function () {
        
        // 存储各图片的位置数据
        var  statu = [
            { zIndex: 1, width: 120, height: 150, top: 71, left: 134, $opacity: 0.5 },
            { zIndex: 2, width: 130, height: 170, top: 61, left: 0, $opacity: 0.6 },
            { zIndex: 3, width: 170, height: 218, top: 37, left: 110, $opacity: 0.7 },
            { zIndex: 4, width: 224, height: 288, top: 0, left: 262, $opacity: 1 },
            { zIndex: 3, width: 170, height: 218, top: 37, left: 468, $opacity: 0.7 },
            { zIndex: 2, width: 130, height: 170, top: 61, left: 620, $opacity: 0.6 },
            { zIndex: 1, width: 120, height: 150, top: 71, left: 496, $opacity: 0.5 }
         ],
         prev = document.getElementById("prev"),
         next = document.getElementById("next"),
         index;

         prev.onclick = function () {
            if (animated) {
                return ;
            }
            animated = true;
            moving ("prev");
         }

         next.onclick = function () {
            if (animated) {
                return ;
            }
            animated = true;
            moving ("next");
         }

         function moving (judge) {  
            if (judge == "prev"){
                move(li[k], statu, parseInt(li[k].getAttribute("index"))); 
            } else {
                MoveNext(li[k], statu, parseInt(li[k].getAttribute("index")))
            }
         }
}

function move(obj1, obj2, num) {
        
        amtition (obj1, obj2, num,);
        function amtition (obj1, obj2, num) {
            if (num == 1) {
                obj1.style.height = obj2[obj2.length-1].height + "px";
                obj1.style.width = obj2[obj2.length-1].width + "px";
                obj1.style.left = obj2[obj2.length-1].left + "px";
                obj1.style.zIndex = obj2[obj2.length-1].zIndex;

                obj1.setAttribute("index", 7);
                // alert("112");
                amtition(li[++k], obj2, parseInt(li[k].getAttribute("index")));
                v++;
                return ;

            }
            var speed1,
                speed3,
                speed4,
                speed2;

            if ((parseInt(obj1.style.height) != obj2[num-2].height)) {
                if ((parseInt(obj1.style.height) - obj2[num-2].height) > 0) {
                    speed1 = -2;
                } else {
                    speed1 = 2;
                }
                
            }

            if (parseInt(obj1.style.width) != obj2[num-2].width) {
                if((parseInt(obj1.style.width) - obj2[num-2].width) > 0) {
                    speed2 = -2;
                } else {
                    speed2 = 2;
                }
                
            }

            if (parseInt(obj1.style.left) != obj2[num-2].left){
                
                if ((parseInt(obj1.style.left) - obj2[num-2].left) > 0) {
                    speed3 = -2;
                } else {
                    speed3 = 2;
                }
            }
            
            if (parseInt(obj1.style.top) != obj2[num-2].top) {
                if ((parseInt(obj1.style.top) - obj2[num-2].top) > 0) {
                    speed4 = -1;
                } else {
                    speed4 = 1;
                }
            }

            obj1.style.height = (speed1 + parseInt(obj1.style.height)) + "px";
            obj1.style.width = (speed2 + parseInt(obj1.style.width)) + "px";
            obj1.style.left = (speed3 + parseInt(obj1.style.left)) + "px";
            obj1.style.top = (speed4 + parseInt(obj1.style.top)) + "px";

            if ((parseInt(obj1.style.height) == obj2[num-2].height) && (parseInt(obj1.style.width) == obj2[num-2].width) && (parseInt(obj1.style.left) == obj2[num-2].left) && (parseInt(obj1.style.top) == obj2[num-2].top)) {
                obj1.style.zIndex = obj2[num-2].zIndex;
                
                num--;

                obj1.setAttribute("index", num);

                if(num == 6) {
                    num = 0 ;
                }
                v++;
                if (v == 7) {
                    v = 0;
                    k = 0;
                    animated = false;
                    return ;
                }
                // alert("113");
                move(li[++k], obj2,  parseInt(li[k].getAttribute("index")));
            } else {
                setTimeout(amtitioning, 2);
                function amtitioning () {
                    amtition (obj1 , obj2 , num);
                }
            }
        }

        
}

function MoveNext(obj1, obj2, num) {
        
        amtitionNext (obj1, obj2, num,);
        function amtitionNext (obj1, obj2, num) {
            if (num == 7) {
                obj1.style.height = obj2[0].height + "px";
                obj1.style.width = obj2[0].width + "px";
                obj1.style.left = obj2[0].left + "px";
                obj1.style.zIndex = obj2[0].zIndex;
                v++;
                obj1.setAttribute("index", 1);
                // alert("112");
                if (v == 7) {
                    v = 0;
                    k = 0;
                    animated = false;
                    return ;
                }
                amtitionNext (li[++k], obj2, parseInt(li[k].getAttribute("index")));
                
                return ;

            }
            var speed1,
                speed3,
                speed4,
                speed2;

            if ((parseInt(obj1.style.height) != obj2[num].height)) {
                if ((parseInt(obj1.style.height) - obj2[num].height) > 0) {
                    speed1 = -2;
                } else {
                    speed1 = 2;
                }
                
            }

            if (parseInt(obj1.style.width) != obj2[num].width) {
                if((parseInt(obj1.style.width) - obj2[num].width) > 0) {
                    speed2 = -2;
                } else {
                    speed2 = 2;
                }
                
            }

            if (parseInt(obj1.style.left) != obj2[num].left){
                
                if ((parseInt(obj1.style.left) - obj2[num].left) > 0) {
                    speed3 = -2;
                } else {
                    speed3 = 2;
                }
            }
            
            if (parseInt(obj1.style.top) != obj2[num].top) {
                if ((parseInt(obj1.style.top) - obj2[num].top) > 0) {
                    speed4 = -1;
                } else {
                    speed4 = 1;
                }
            }

            obj1.style.height = (speed1 + parseInt(obj1.style.height)) + "px";
            obj1.style.width = (speed2 + parseInt(obj1.style.width)) + "px";
            obj1.style.left = (speed3 + parseInt(obj1.style.left)) + "px";
            obj1.style.top = (speed4 + parseInt(obj1.style.top)) + "px";

            if ((parseInt(obj1.style.height) == obj2[num].height) && (parseInt(obj1.style.width) == obj2[num].width) && (parseInt(obj1.style.left) == obj2[num].left) && (parseInt(obj1.style.top) == obj2[num].top)) {
                obj1.style.zIndex = obj2[num].zIndex;
                
                num++;

                obj1.setAttribute("index", num);

                if(num == 6) {
                    num = 0 ;
                }
                v++;
                if (v == 7) {
                    v = 0;
                    k = 0;
                    animated = false;
                    return ;
                }
                // alert("113");
                MoveNext(li[++k], obj2,  parseInt(li[k].getAttribute("index")));
            } else {
                setTimeout(amtitioningNext, 2);
                function amtitioningNext () {
                    amtitionNext (obj1 , obj2 , num);
                }
            }
        }

        
}