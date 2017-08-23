excpectionAdd(0);
var time = new Date(2017, 1, 3, 17, 50, 55); 
$(function() {
    $('.unusual').bind('click', function() {
        if($('.unusual').attr('stat') == "off") {
            $('.unusual').attr('stat','on');
            $('.unusual span').text('关闭异常');
            console.log("open ");
            showMaker();
        } else {
            $('.unusual').attr('stat', "off");
            $('.unusual span').text('显示异常');
            console.log("close");
            hideMaker();
        }
    })
});


/**
 * [excpectionAdd 添加异常点]
 * @param  {[Boolean]} bool [布尔值用来判断是动态异常点还是静态]
 * @return {[none}      [none]
 */
function excpectionAdd(bool) {
    // var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
    // 形成异常形成数据
    map.clearOverlays();
    if (bool == 1) {
        var obj = {
            minX: 112.62357,
            minY: 22.490739,
            maxX: 114.069097,
            maxY: 23.978401,
            timeStart: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':00',
            timeEnd: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':15'
        }
    } else if (bool == 2) {
        var obj = {
            minX: 112.62357,
            minY: 22.490739,
            maxX: 114.069097,
            maxY: 23.978401,
            timeStart: $('#picktime').val() + ':00',
            timeEnd: $('#picktime').val() + ':15'
        }
    } else {
        var obj = {
            minX: 112.62357,
            minY: 22.490739,
            maxX: 114.069097,
            maxY: 23.978401,
            timeStart:  $('.first-input-secondChange').val() + ":00",
            timeEnd:  $('.second-input-secondChange').val() + ":00"
        }
    }
    
    $.ajax({
        type: "post",
        url: 'http://ip:80/estimation/trafficexception',
        data: JSON.stringify(obj),
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            if (data.state == 1) {
                for (var i = 0; i < data.data.length; i++) {
                    addMarkerWarm(data.data[i]);
                };
                hideMaker();    //隐藏标记点
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
// var obj = {
//     x: 113.262232,
//     y: 23.154345,
//     exception: '异常',
//     reason: '11111'
// }
// addMarkerWarm(obj);
/**
 * [addMarkerWarm 创建坐标点向其中添加]
 * @param {[object]} data [里面存储坐标点的坐标等信息]
 */
function addMarkerWarm(data) {
    var pt = new BMap.Point(data.x, data.y);
    var myIcon = new BMap.Icon("../images/unusual-point.png", new BMap.Size(40,85));   //创建一个覆盖物
    myIcon.setName("0"); //对这个图标设定它的name属性值为0；
    var marker2 = new BMap.Marker(pt, {
        icon: myIcon
    }); // 创建标注
    marker2.disableMassClear();
    map.addOverlay(marker2); // 将标注添加到地图中
    // hideMaker();
    addClickHandler(data.exception, data.reason, marker2);
}

/**
 * [addClickHandler 添加点的时间监听]
 * @param {[string]} headTit [异常点的标题]
 * @param {[string]} content [异常点的内容]
 * @param {[obj]} marker  [异常点]
 */
function addClickHandler(headTit, content, marker) {
    marker.addEventListener("click", function(e) {  //添加时间驱动机制
        openInfo(headTit, content, e)
    });
}

/**
 * [openInfo 为异常点的事件监听添加信息窗口]
 * @param {[string]} headTit [异常点的标题]
 * @param {[string]} content [异常点的内容]
 * @param  {[object]} e       [鼠标时间的详细信息]
 * 
 */
function openInfo(headTit, content, e) {
    var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: headTit, // 信息窗口标题
        // enableMessage:true//设置允许信息窗发送短息
    };
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    // var bs = map.getBounds(); //获取可视区域
    // var bssw = bs.getSouthWest(); //可视区域左下角
    // var bsne = bs.getNorthEast(); //可视区域右上角
    // // console.log("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);
    // var point = new BMap.Point(bsne.lng - 0.0002, bssw.lat + 0.0002);
    var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}

/**
 * [hideMaker 隐藏异常点]
 * @return {[none]} 
 */
function hideMaker() {
    var allmap = map.getOverlays();//获取全部的覆盖物
    var map_length = allmap.length;
    for (var i = 0; i < map_length; i++) {
        if (allmap[i].toString() == "[object Marker]") {
            //console.log(i);
            if (allmap[i].getIcon().name == '0') {
                allmap[i].hide();   //隐藏名字为0的覆盖物
            }
        }

    }
}

/**
 * [showMaker 展示异常点]
 * 
 */
function showMaker() {
    var allmap = map.getOverlays(); //获取全部的覆盖物
    var map_length = allmap.length;
    for (var i = 0; i < map_length; i++) {
        if (allmap[i].toString() == "[object Marker]") {
            //console.log(i);
            if (allmap[i].getIcon().name == '0') {
                allmap[i].show();   //显示名字为0的覆盖物
            }
        }

    }
}

/**
 * [deleteMaker 删除异常点]
 * 
 */
function deleteMaker() {
    var allmap = map.getOverlays(); //获取全部的覆盖物
    var map_length = allmap.length;
    for (var i = 0; i < map_length; i++) {
        if (allmap[i].toString() == "[object Marker]") {
            //console.log(i);
            if (allmap[i].getIcon().name == '0') {
                allmap[i].enableMassClear();    //将name为0的覆盖物设置为可清除状态
                map.removeOverlay(allmap[i]);   //清除覆盖物
            }
        }
    }
}