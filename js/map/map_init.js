// 百度地图API功能
var map = new BMap.Map("GuangZhouMap", {
    minZoom: 10,
    maxZoom: 18
}); // 创建Map实例
map.centerAndZoom(new BMap.Point(113.262232, 23.154345), 14); // 初始化地图,设置中心点坐标和地图级别
// 添加定位控件

// 这里是关键，在Icon对象的原型中添加属性和方法，用来标记对应的图标,用这个在遍历对象的时候获取到对应的覆盖物
BMap.Icon.prototype.name = "";
BMap.Icon.prototype.setName = function(name){
    this.name = name;
}

changeMapStyle('light')

/**
 * [changeMapStyle 改变地图样式]
 * @param  {[string]} style [样式的名字]
 * 
 */
function changeMapStyle(style) {
    map.setMapStyle({
        style: style
    });

}

//设置一个数组存储每个区的名字和‘广州市’
var administrativeArea = new Array("越秀区", "海珠区", "荔湾区", '天河区', '白云区', '黄埔区', '花都区', '番禺区', '南沙区', '从化区', '增城区', '广州');

/**
 * [获取一进去就获取当前]
 */
$(function() {
    map.enableScrollWheelZoom(); //开启鼠标滚轮缩放

    // 这个注释里面的内容可以用于获取用于当前地址
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //         var pt = new BMap.Point(r.point.lng, r.point.lat);
    //         var myIcon = new BMap.Icon("../images/my-location-point.png", new BMap.Size(40,40));
    //         myIcon.setName("1"); //对这个图标设定它的name属性值为1；
    //         var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
    //         marker2.disableMassClear();
    //         map.addOverlay(marker2); // 将标注添加到地图中
    //         map.panTo(r.point); //移到当前位置
    //         //alert('您的位置：'+r.point.lng+','+r.point.lat);
    //     } else {
    //         alert('failed' + this.getStatus());
    //     }
    // }, {
    //     enableHighAccuracy: true
    // });
 
    // 请求获取地点
    getMyPosition();    

    // 遍历数组画出边界
    for (var j = 0; j < administrativeArea.length; j++) {
        getBoundary(administrativeArea[j]);
    }

    /**
     * [getBoundary 画出行政边界]
     * @return {[none]} [none]
     */
    function getBoundary(str) {
        var bdary = new BMap.Boundary();
        bdary.get(str, function(rs) { //获取行政区域
            // map.clearOverlays(); //清除地图覆盖物       
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polyline(rs.boundaries[i], {
                    strokeWeight: 2,
                    strokeColor: "#1c62a3"
                }); //建立多边形覆盖物
                ply.disableMassClear();
                map.addOverlay(ply); //添加覆盖物
                // pointArray = pointArray.concat(ply.getPath());
            }
            // map.setViewport(pointArray);    //调整视野            
        });
    }
    // var bs = map.getBounds(); //获取可视区域
//     // var bssw = bs.getSouthWest(); //可视区域左下角
//     // var bsne = bs.getNorthEast(); //可视区域右上角
//     // console.log("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat);
    // setExtent();

    // /**
    //  * [setExtent 设置边界，防止用户移动到区域外]
    //  */
    // function setExtent() {
    //     var b = new BMap.Bounds(new BMap.Point(112.62357, 22.490739), new BMap.Point(114.069097, 23.978401));
    //     try {
    //         BMapLib.AreaRestriction.setBounds(map, b);
    //     } catch (e) {
    //         alert(e);
    //     }
    // }

})
