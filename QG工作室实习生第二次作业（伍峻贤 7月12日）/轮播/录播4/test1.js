window.onload = function () {
    var oBox = document.getElementById("box"),
        oShow = document.getElementById("show"),
        oUl = oBox.getElementsByTagName("ul")[0],
        oLi = oUl.getElementsByTagName("li"),
        prev = document.getElementById("prev"),
        next = document.getElementById("next"),
        oImg = oUl.getElementsByTagName("img");

        oShow.off = false;
        oShow.src = [];
        oShow.inow = 0;

        for (var i = 0; i < oImg.length; i++) {
            oShow.src.push(oImg[i].src);
        }

        next.onclick = function () {
            if (oShow.off) {
                return ;
            }
            oShow.off = true;
            var iNext = oShow.inow + 1;
            if (iNext >= oShow.src.length) {
                iNext = 0;
            }
            move (iNext);
        }
        prev.onclick = function () {
            if (oShow.off) {
                return ;
            }
            oShow.off = true;
            var iNext = oShow.inow - 1;
            if (iNext < 0) {
                iNext = oShow.src.length - 1;
            }
            move (iNext);
        }

        function move(iNext) {
            var em1 = oShow.getElementsByClassName("em1"),
                em2 = oShow.getElementsByClassName("em2"),
                oDiv = oShow.getElementsByTagName("div");

                for (var i = 0; i < em1.length; i++) {
                    em1[i].style.backgroundImage = "url(" + oShow.src[oShow.inow] +")";
                    em2[i].style.backgroundImage = "url(" + oShow.src[iNext] +")";
                }

                oShow.style.display = "block";
                oLi[oShow.inow].style.display = "none";

                for (var i = 0; i<oDiv.length; i += 2) {
                    var time = 50*i;
                    oDiv[i].style.transform = "rotateX(0deg)";
                    oDiv[i+1].style.transform = "rotateX(0deg)";

                    setTimer(oDiv[i], time, "move1");
                    setTimer(oDiv[i+1], time, "move2");
                }


                function setTimer (obj, time, name) {
                    obj.timer = setTimeout(function () {
                        clearTimeout(obj.timer);
                        obj.style.animation = name + " 1.5s";
                        obj.style.transform = "rotateX(180deg)";
                        obj.timer = setTimeout(function () {
                            obj.style.animation = "";
                            clearTimeout(obj.timer);
                            obj.timer = null;
                        }, 1500);
                    }, time);
                }

                setTimeout(function () {
                    oShow.inow = iNext;
                    oLi[oShow.inow].style.display = "block";
                    oShow.style.display = "none";
                    oShow.off = false;
                }, oShow.src.length*50+1500);
        }


}