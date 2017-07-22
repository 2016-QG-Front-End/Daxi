window.onload = function () {
    // body..
    //获取节点
    var conatiner = document.getElementById("conatiner"),
        stage = document.getElementById("stage"),
        animated = false,
        num,
        reg=/\-?[0-9]+/g;
        
    conatiner.onclick = function () {
        if (animated) {
            return ;
        }
        animated = true;
        Move();
    };

    function Move() {
        var rotateY = conatiner.style.transform;

        num = parseInt(rotateY.match(reg)) - 12; // 获取rotateY中的值

        conatiner.style.transform = "rotateY(" + num + "deg)";
        if ((num % 72) != 0) {
            setTimeout(Move, 50);
        } else {
            animated = false;
        }
    };
}