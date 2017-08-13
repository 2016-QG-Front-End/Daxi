$(function() {
    // 百度地图API功能
    var map = new BMap.Map("GuangZhouMap", {
        minZoom: 11,
        maxZoom: 18
    }); // 创建Map实例
    map.centerAndZoom(new BMap.Point(113.233333333333, 23.1666666666667), 13); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.setCurrentCity("广州"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            //alert('您的位置：'+r.point.lng+','+r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    });
    getBoundary();
    /**
     * [getBoundary 画出行政边界]
     * @return {[none]} [none]
     */
    function getBoundary() {
        var bdary = new BMap.Boundary();
        bdary.get("广州", function(rs) { //获取行政区域
            map.clearOverlays(); //清除地图覆盖物       
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polyline(rs.boundaries[i], {
                    strokeWeight: 5,
                    strokeColor: "#1c62a3"
                }); //建立多边形覆盖物
                map.addOverlay(ply); //添加覆盖物
                // pointArray = pointArray.concat(ply.getPath());
            }
            // map.setViewport(pointArray);    //调整视野            
        });
    }
})