
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
        var jud;
        jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'block');
        }
    });

    $('.searchPlace').bind('focus', function() {
        var jud;
        jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'none');
        }
    });

    $('.searchPlace').bind('blur', function() {
        var jud;
        jud = judgePhone();

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
    /**
     * [searchPlaceAlo 用于获得和搜索地点]
     * @param  {[string]} str [地点的名字]
     * @return {[none]}     [description]
     */
    function searchPlaceAlo(str) {
        map.clearOverlays();    //清除地图上所有覆盖物
        /**
         * [myFun 搜索成功后调用的函数]
         * @return {[none]}
         */
        function myFun(){   //搜索成功后调用的函数
            if (!local.getResults()) {//判断是否有搜索结果
                return ;
            }
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            var myIcon = new BMap.Icon("../images/icon/start.ico", new BMap.Size(48,100));
            var marker2 = new BMap.Marker(pp,{icon:myIcon});  // 创建标注
            map.addOverlay(marker2); // 将标注添加到地图中
            map.panTo(pp); //移到当前位置
            /*
            可加函数
             */
            clearInterval(dynmcID);
            map.removeOverlay(heatmapOverlay);
            
            clearInterval(intervalId);
            isCheck = 1;
            longitude = pp.lng;
            latitude = pp.lat;
            var end = time.Format('yyyy-MM-dd hh:mm:ss');//格式化当前时间
            var start = new Date(time.getTime() - 1000*60*5).Format('yyyy-MM-dd hh:mm:ss')//将开始时间设为5分钟之前，并格式化

            showFlowChange(start, end);//调用查看柱状图和饼状图的函数
            showUserAtio(start, end);
        }
        var local = new BMap.LocalSearch('广州市', { //智能搜索
          onSearchComplete: myFun
        });
        local.search(str); //搜索使用的api
        G("searchResultPanel").style.display = "none";
    }
})

function G(id) {
    return document.getElementById(id);
}
