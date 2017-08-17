excpectionAdd();

$(function() {
    $('.first-tool-img').bind('click', function() {
        if($('.first-tool-img').attr('src') == "../images/display-unusual.png") {
            $('.first-tool-img').attr('src', "../images/close-unusual.png");
            showMaker();
        } else {
            $('.first-tool-img').attr('src', "../images/display-unusual.png");
            hideMaker();
        }
    })
});

/**
 * [excpectionAdd 添加异常点]
 * @return {[none]} [none]
 */
function excpectionAdd() {
    var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
    // 形成异常形成数据
    var obj = {
        minLongitude: 112.62357,
        minLatitude: 22.490739,
        maxLongitude: 114.069097,
        maxLatitude: 23.978401,
        timeStart: timeSel[0].value + '-' + timeSel[1].value + '-' + timeSel[2].value + ' ' + timeSel[3].value + ':' + timeSel[4].value + ':' + '00',
        timeEnd: timeSel[5].value + '-' + timeSel[6].value + '-' + timeSel[7].value + ' ' + timeSel[8].value + ':' + timeSel[9].value + ':' + '00'
    }


    $.ajax({
        type: "post",
        url: 'http://ip:80/estimation/trafficexception',
        data: JSON.stringify(obj),
        dataType: "json",
        async: false,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            for (var i = 0; i < data.exceptions.length; i++) {
                addMarkerWarm(data.exceptions[i]);
            };
            hideMaker();    //隐藏标记点
        },
    });
}

/**
 * [addMarkerWarm 创建坐标点向其中添加]
 * @param {[object]} data [里面存储坐标点的坐标等信息]
 */
function addMarkerWarm(data) {
    var pt = new BMap.Point(data.longitude, data.latitude);
    var myIcon = new BMap.Icon("../images/unusual-point.png", new BMap.Size(40,85));   //创建一个覆盖物
    myIcon.setName("0"); //对这个图标设定它的name属性值为0；
    var marker2 = new BMap.Marker(pt, {
        icon: myIcon
    }); // 创建标注
    marker2.disableMassClear();
    map.addOverlay(marker2); // 将标注添加到地图中
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
    var bs = map.getBounds(); //获取可视区域
    var bssw = bs.getSouthWest(); //可视区域左下角
    var bsne = bs.getNorthEast(); //可视区域右上角
    // console.log("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);
    var point = new BMap.Point(bsne.lng - 0.0002, bssw.lat + 0.0002);
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