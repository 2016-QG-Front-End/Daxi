$(function() {
    $('.search-line').bind('click', function() {
        $('.search-place').css("display", 'none');
        $('.search-place-line').css('display', 'block');
        map.clearOverlays(); //清除图层覆盖物
        $('.searchPlace').val('');

    })

    $('.search-line-img').bind('click', function() {
        $('.search-place').css("display", 'block');
        $('.search-place-line').css('display', 'none');
        map.clearOverlays(); //清除图层覆盖物
        $('.startPlace').val('');
        $('.endPlace').val('');
    })

    $('.start-place').bind('blur', function() { //为startPlace的输入框添加时间驱动
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            getDrivingLine($('.start-place').val(), $('.end-place').val());
            map.clearOverlays(); //清除图层覆盖物
        }
    })

    $('.start-place').bind('keyup', function(e) {   //为startPlace的输入框添加回车驱动
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.start-place').trigger('blur');
        }   
    });

    $('.end-place').bind('blur', function() { //为end-place的输入框添加时间驱动
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            getDrivingLine($('.start-place').val(), $('.end-place').val());
            map.clearOverlays(); //清除图层覆盖物
        }
    })

    $('.end-place').bind('keyup', function(e) {   //为end-place的输入框添加回车驱动
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.end-place').trigger('blur');
        }   
    });
});
/**
 * [getDrivingLine 获取驾车路线并把路线下昂后台请求]
 * @param  {[String]} str1 [起始地点]
 * @param  {[String]} str2 [结束地点]
 * 
 */
function getDrivingLine(str1, str2) {
    var plans = {
        road: [],
        timeStart: timeSel[0].value + '-' + timeSel[1].value + '-' + timeSel[2].value + ' ' + timeSel[3].value + ':' + timeSel[4].value + ':' + '00',
        timeEnd: timeSel[5].value + '-' + timeSel[6].value + '-' + timeSel[7].value + ' ' + timeSel[8].value + ':' + timeSel[9].value + ':' + '00'
    };
    map.clearOverlays(); //清除图层覆盖物
    var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
    var options = {
        onSearchComplete: function(results) {
            if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                for (var j = 0; j < results.getNumPlans(); j++) {
                    var plan = results.getPlan(j); //获取驾车计划
                    for (var k = 0; k < getNumRoutes(); k++) {
                        var route = plan.getRoute(k); // 获取方案的驾车线路
                        var obj = { //开始的地点
                            lng: results.getStart().point.lng,
                            lat: results.getStart().point.lat
                        }
                        var s = [];
                        s.push(obj);
                        for (var i = 0; i < route.getNumSteps(); i++) {
                            var step = route.getStep(i).getPosition(); // 获取每个关键步骤
                            var objNew = {
                                lng: step.lng,
                                lat: step.lat
                            }
                            s.push(objNew);
                        }
                        var objEnd = { //结束的地点
                            lng: results.getEnd().point.lng,
                            lat: results.getEnd().point.lat
                        }
                        s.push(objEnd);
                        plans.road.push(s);
                    }
                }

            }
            $.ajax({
                type: "post",
                url: 'http://ip:80/estimation/drivetime',
                data: JSON.stringify(plans),
                dataType: "json",
                async: false,
                contentType: "application/json",
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    addRoute(plans.roads[data.index]);
                    addMessage(data.time, data.driveTime, plans.roads[data.index][Math.floor(plans.roads[data.index].length/2)]);
                },
            });
        }
    };
    var driving = new BMap.DrivingRoute(map, options);
    driving.search(str1, str2);

    /**
     * [addRoute 将路线添加到地图中]
     * @param {[Array]} path [从起始到结束的各点的位置]
     */
    function addRoute(path) {
        map.addOverlay(new BMap.Polyline(path, {
            strokeColor: '#42CB5A',
            enableClicking: false
        }));
        addMarkersLine(path[0], 'start');
        addMarkersLine(path[path.length - 1], 'end');
    }

    /**
     * [addMarkersLine 添加起始地点和结束地点的坐标]
     * @param {[object]} data [存有地点的位置]
     * @param {[string]} str  [用于判断是起始点还是结束点]
     */
    function addMarkersLine(data, str) {
        var pt = new BMap.Point(data.longitude, data.latitude);
        if (str == 'start') {
            var myIcon = new BMap.Icon("../images/distination-point_blue.png", new BMap.Size(45, 76)); //创建一个覆盖物
        } else {
            var myIcon = new BMap.Icon("../images/distination-point_green.png", new BMap.Size(45, 76)); //创建一个覆盖物
        }

        var marker2 = new BMap.Marker(pt, {
            icon: myIcon
        }); // 创建标注
        map.addOverlay(marker2); // 将标注添加到地图中

    }

    /**
     * [addMessage 将形成信息添加到地图上]
     * @param {[String]} str1  [存有到达时间]
     * @param {[String]} str2  [存有所耗费的时间]
     * @param {[object]} point [将信息加到地图上的经纬度]
     */
    function addMessage(str1, str2, point) {
        var opts = {
            width: 250, // 信息窗口宽度
            height: 80, // 信息窗口高度
            title: "预测时间", // 信息窗口标题

        };
        var content =   '<div style="margin:0;line-height:20px;padding:2px;">' +
                        '到达时间：' + str1 + '<br/>耗时：' + str2 + '<br/>' +
                        '</div>';
        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
        map.openInfoWindow(infoWindow, point); //开启信息窗口

    }
}

/**
 * [路线开始地点用于搜索提示]
 * 
 * 
 */
$(function() {
    var acStart = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "startPlace"
        ,"location" : '广州市'
    });

    acStart.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
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
        // G("searchlinePanelStart").innerHTML = str;
        G("searchlinePanelEnd").style.display = 'none';

    });

    var myValueStart;
    acStart.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
        myValueStart = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchlinePanelStart").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValueStart = " + myValueStart;
        G("searchlinePanelStart").style.display = 'none';
        $(".start-place").val(myValueStart);
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            getDrivingLine($('.start-place').val(), $('.end-place').val());
        }
    });

})

/**
 * 用于结束地点的检索提醒
 */
$(function() {
    var acEnd = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" : "endPlace"
        ,"location" : '广州市'
    });

    acEnd.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
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
        // G("searchlinePanelEnd").innerHTML = str;
        G("searchlinePanelEnd").style.display = 'none';
    });

    var myValueStart;
    acEnd.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
        myValueStart = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchlinePanelEnd").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValueStart = " + myValueStart;
        G("searchlinePanelEnd").style.display = 'none';
        $(".end-place").val(myValueStart);
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            getDrivingLine($('.start-place').val(), $('.end-place').val());
        }
    });

})