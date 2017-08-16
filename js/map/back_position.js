$(function() {
    $('.last-tool-img').bind('click', function() {
        getMyPosition();
    })
});
function getMyPosition() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var pt = new BMap.Point(r.point.lng, r.point.lat);
            var myIcon = new BMap.Icon("../images/my-location-point.png", new BMap.Size(40, 40));
            var marker2 = new BMap.Marker(pt, {
                icon: myIcon
            }); // 创建标注
            map.addOverlay(marker2); // 将标注添加到地图中
            map.panTo(r.point); //移到当前位置
                //alert('您的位置：'+r.point.lng+','+r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    });
}
