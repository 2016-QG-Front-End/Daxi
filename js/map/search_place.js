$(function() {
    $('.search-images').bind('click', function() {

        
        // var range = getBoundary('广州');
        // if(local) {
        //     local.clearResults();
        // }
        map.clearOverlays();//清除图层覆盖物
        searchPlaceAlo($('.searchPlace').val());
        $('.searchPlace').val('');

        // alert(local.getResults());
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'block');
        }
    });

    $('.searchPlace').bind('focus', function() {
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'none');
        }
    });

    $('.searchPlace').bind('blur', function() {
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'block');
        }
    });
    $('.searchPlace').bind('keyup', function(e) {
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.search-images').trigger('click');
        }   
    });

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "searchPlace"
        ,"location" : '广州市'
    });

    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;

    });

    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        
        // searchPlaceAlo(myValue);
        $(".search-images").trigger('click');
    });

    // function setPlace(){
    //     map.clearOverlays();    //清除地图上所有覆盖物
    //     function myFun(){
    //         var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
    //         console.log(pp);
    //         var myIcon = new BMap.Icon("../images/distination-point_blue.png", new BMap.Size(40,85));
    //         var marker2 = new BMap.Marker(pp,{icon:myIcon});  // 创建标注
    //         map.addOverlay(marker2); // 将标注添加到地图中
    //         map.panTo(pp); //移到当前位置
    //     }
    //     var local = new BMap.LocalSearch(map, { //智能搜索
    //       onSearchComplete: myFun
    //     });
    //     local.search(myValue);
    //     G("searchResultPanel").style.display = "none";
    // }

    function searchPlaceAlo(str) {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
            if (!local.getResults()) {
                return ;
            }
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            var myIcon = new BMap.Icon("../images/distination-point_blue.png", new BMap.Size(40,85));
            var marker2 = new BMap.Marker(pp,{icon:myIcon});  // 创建标注
            map.addOverlay(marker2); // 将标注添加到地图中
            map.panTo(pp); //移到当前位置
        }
        var local = new BMap.LocalSearch('广州市', { //智能搜索
          onSearchComplete: myFun
        });
        local.search(str);
        G("searchResultPanel").style.display = "none";
    }
})

function G(id) {
    return document.getElementById(id);
}
