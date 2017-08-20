$(function() {
    //当大于1300px时
    // 时间驱动 从搜索框变为设置路线
    $('.search-line').bind('click', function() {
        $('.search-place').hide(2000);
        $('.search-place-line').fadeIn(1000);
        map.clearOverlays(); //清除图层覆盖物
        $('.searchPlace').val('');

    })

    // 时间驱动 从设置路线变为搜索框
    $('.search-line-img').bind('click', function() {
        $('.search-place').show(1000);
        $('.search-place-line').fadeOut(2000);
        map.clearOverlays(); //清除图层覆盖物
        $('.startPlace').val('');
        $('.endPlace').val('');
    })

    // 当小于1300px时
    // 时间驱动 从搜索框变为设置路线
    $('.min-search-line').bind('click', function() {

          $('.search-place').hide(2000);
        $('.search-place-line').fadeIn(1000);

        map.clearOverlays(); //清除图层覆盖物
    })

    $('.start-place').bind('focus', function() { //为startPlace的输入框添加焦点驱动
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'none');
        }
    })

    // 时间驱动 从设置路线变为搜索框
    $('.start-place').bind('blur', function() { //为startPlace的输入框添加失去焦点驱动
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            map.clearOverlays(); //清除图层覆盖物
            getDrivingLine($('.start-place').val(), $('.end-place').val());
            
        }
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'block');
        }
    })

    $('.start-place').bind('keyup', function(e) {   //为startPlace的输入框添加回车驱动
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.start-place').trigger('blur');
        }   
    });

    $('.end-place').bind('focus', function() { //为endPlace的输入框添加焦点驱动
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'none');
        }
    })

    $('.end-place').bind('blur', function() { //为end-place的输入框添加失去焦点驱动
        if (($('.start-place').val().length != 0) && ($('.end-place').val().length != 0)) { //判断是否能进行检索
            map.clearOverlays(); //清除图层覆盖物
            getDrivingLine($('.start-place').val(), $('.end-place').val());
            
        }
        var jud = judgePhone();
        if(jud) {
            $('.tool').css('display', 'block');
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
    var timeStart = document.getElementById('timeStart').getElementsByTagName('select');
    var plans = {   //申明一个用于传递的变量
        road: [],
        time: timeStart[0].value + '-' + timeStart[1].value + '-' + timeStart[2].value + ' ' + timeStart[3].value + ':' + timeStart[4].value + ':' + '00'
    };
    
    var options = { //设置搜索用的参数

        //搜索成功后的回调函数
        onSearchComplete: function(results) {

            //判断是否为成功
            if (driving.getStatus() == BMAP_STATUS_SUCCESS) {   
                //用于获取路线
                for (var j = 0; j < results.getNumPlans(); j++) {     
                    var plan = results.getPlan(j); //获取驾车计划
                    for (var k = 0; k < plan.getNumRoutes(); k++) {
                        var route = plan.getRoute(k); // 获取方案的驾车线路
                        var obj = { //开始的地点
                            x: results.getStart().point.lng,
                            y: results.getStart().point.lat
                        }
                        addMarkersLine(obj, 'start');
                        var s = [];
                        s.push(obj);
                        for (var i = 0; i < route.getNumSteps(); i++) {
                            var step = route.getStep(i).getPosition(); // 获取每个关键步骤
                            var objNew = {
                                x: step.lng,
                                y: step.lat
                            }
                            s.push(objNew);
                        }
                        var objEnd = { //结束的地点
                            x: results.getEnd().point.lng,
                            y: results.getEnd().point.lat
                        }
                        addMarkersLine(objEnd, 'end');
                        s.push(objEnd);
                        plans.road.push(s);
                    }
                }

            }

            // 请求路线
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
                    if (data.state == 1) { //判断是否成功

                        //画出路线
                        addRoute(plans.roads[data.data.index]);  

                        //为路线添加信息
                        addMessage(data.data.time, data.data.driveTime, plans.roads[data.data.index][Math.floor(plans.roads[data.data.index].length/2)]);
                    } else if (data.state == 2) {
                        alert('时间为空');
                    } else if (data.state == 3) {
                        alert('起始时间大于终止时间');
                    } else if (data.state == 4) {
                        alert('请求时间段超出范围');
                    } else if (data.state == 5) {
                        alert('请求时间段超出范围');
                    } else if (data.state == 6) {
                        alert('请求时间点太过超前');
                    } else if (data.state == 7) {
                        alert('区域范围为空');
                    } else if (data.state == 7) {
                        alert('请求坐标点为空');
                    } else if (data.state == 10) {
                        alert('路径的途径点为空');
                    } else if (data.state == 11) {
                        alert('跨天请求');
                    } else if (data.state == 12) {
                        alert('请求参数为空');
                    } else if (data.state == 13) {
                        alert('无法预测');
                    } else {
                        alert('请求出现错误');
                    }
         
                    
                },
            });
        }
    };
    var driving = new BMap.DrivingRoute('广州市番禺区', options);
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
        var pt = new BMap.Point(data.x, data.y);
        if (str == 'start') {
            var myIcon = new BMap.Icon("../images/distination_point_blue.png", new BMap.Size(40,85)); //创建一个覆盖物
            map.panTo(pt);
        } else {
            var myIcon = new BMap.Icon("../images/distination_point_green.png", new BMap.Size(40,85)); //创建一个覆盖物
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
        var points = new BMap.Point(point.x, point.y);
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
        ,"location" : '广州市番禺区'
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
        {"input" : "endPlace",
        "location" : '广州市番禺区'
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
