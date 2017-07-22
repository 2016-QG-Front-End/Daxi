window.onload = function () {
    var playPhoto = document.getElementById("playPhoto"),
        next = document.getElementById("next"),
        prev = document.getElementById("prev"),
        buttons = document.getElementById('buttons').getElementsByTagName('span'),
        index = 1,
        animated = false;

        next.onclick = function () {
            if (animated) {
                    return;
            }

            if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
            animate(-300);
            showButton();
        };
        prev.onclick = function () {
             if (animated) {
                    return;
            }
            
            if (index == 1) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
            animate(300);
            showButton();
        };

        function showButton() {
            for (var i = 0; i < buttons.length ; i++) {
                if( buttons[i].className == 'on'){
                    buttons[i].className = '';
                    break;
                }
            }
            buttons[index - 1].className = 'on';
        }

        function animate (offset) {
            animated = true;

            var time = 300,
                speed = offset/10,
                newLeft = parseInt(playPhoto.style.left) + offset;
                
            function go () {
                if (((parseInt(playPhoto.style.left) > newLeft) && speed < 0) || ((parseInt(playPhoto.style.left) < newLeft) && speed > 0)){
                    playPhoto.style.left = speed + parseInt(playPhoto.style.left) + "px";
                    setTimeout(go, 10);
                } else {
                    playPhoto.style.left = newLeft + 'px';
                    var left = parseInt(playPhoto.style.left);
                    if(left >= 0){
                        playPhoto.style.left = -1200 + "px";
                    }
                    if(left <= -1500) {
                        playPhoto.style.left = '-300px';
                    }
                    animated = false;    
                }
            }
                go();
        }

        for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -300 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }
}

