var li = document.getElementsByTagName("li");
window.onload = function () {
    
      var  statu = [
            { zIndex: 1, width: 120, height: 150, top: 71, left: 134, $opacity: 0.5 },
            { zIndex: 2, width: 130, height: 170, top: 61, left: 0, $opacity: 0.6 },
            { zIndex: 3, width: 170, height: 218, top: 37, left: 110, $opacity: 0.7 },
            { zIndex: 4, width: 224, height: 288, top: 0, left: 262, $opacity: 1 },
            { zIndex: 3, width: 170, height: 218, top: 37, left: 468, $opacity: 0.7 },
            { zIndex: 2, width: 130, height: 170, top: 61, left: 620, $opacity: 0.6 },
            { zIndex: 1, width: 120, height: 150, top: 71, left: 496, $opacity: 0.5 }
         ],
         index;
         
         setInterval(move(li[0], statu, parseInt(li[0].getAttribute("index"))), 2000);
         
         setTimeout("alert('5 seconds!')",5000);

}

function move(obj1, obj2, num) {
        
        function amtition (obj1, obj2, num) {
            if (num == 1) {
                obj1.style.height = obj2[obj2.length-1].height + "px";
                obj1.style.width = obj2[obj2.length-1].width + "px";
                obj1.style.left = obj2[obj2.length-1].left + "px";
                obj1.style.zIndex = obj2[obj2.length-1].zIndex;

                obj1.setAttribute("index", 7);
                return;
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
                    return ;
                }
                move(li[num+1], obj2, num+2);
            } else {
                setTimeout(amtition (obj1, obj2, num), 3000);

            }
        }

        amtition (obj1, obj2, num);
}