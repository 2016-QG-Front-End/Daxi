$(function() {
    $('.my-location').bind('click', function() {
        getMyPosition();
    })
});

/**
 * [getMyPosition 获取当前函数]
 * @return {[Object]} [x为当前位置的静度，y为当前位置的纬度]
 */
function getMyPosition() {

    var allmap = map.getOverlays(); //获取全部的覆盖物
    var map_length = allmap.length; //获取覆盖物的长度
    var p = new Object();
    // 遍历覆盖物
    for (var i = 0; i < map_length; i++) {  

        //因为Overlay多种类型，Marker是其中的一种，必须确定其是标注后才能用相应的方法进行操作
        if (allmap[i].toString() == "[object Marker]") { 

            // 对icon的name进行判断，判断是否为‘1’
            if (allmap[i].getIcon().name == '1') {  
                var geolocation = new BMap.Geolocation();   //获取当前位置
                geolocation.getCurrentPosition(function(r) {    //获取当前位置成功的回调函数
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var pt = new BMap.Point(r.point.lng, r.point.lat);
                        map.panTo(r.point); //移到当前位置
                            //alert('您的位置：'+r.point.lng+','+r.point.lat);
                        p = {
                            x: r.point.lng,
                            y: r.point.lat
                        }
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, {
                    enableHighAccuracy: true
                });
                return p;
            }
        }

    }

    var geolocation = new BMap.Geolocation();   //获取当前位置
    geolocation.getCurrentPosition(function(r) {    //获取当前位置成功的回调函数
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {  //判断是否成功
            var pt = new BMap.Point(r.point.lng, r.point.lat);
            var myIcon = new BMap.Icon("../images/my-location-point.png", new BMap.Size(40, 40));
            myIcon.setName("1"); //对这个图标设定它的name属性值为1；
            var marker2 = new BMap.Marker(pt, {
                icon: myIcon
            }); // 创建标注
            marker2.disableMassClear(); //不能让其被清除
            map.addOverlay(marker2); // 将标注添加到地图中
            map.panTo(r.point); //移到当前位置
                //alert('您的位置：'+r.point.lng+','+r.point.lat);
            p = {
                            x: r.point.lng,
                            y: r.point.lat
                        }
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    });
    return p;
}

function getLocation() {

    var allmap = map.getOverlays(); //获取全部的覆盖物
    var map_length = allmap.length; //获取覆盖物的长度
    var p = new Object();
    // 遍历覆盖物
    for (var i = 0; i < map_length; i++) {  

        //因为Overlay多种类型，Marker是其中的一种，必须确定其是标注后才能用相应的方法进行操作
        if (allmap[i].toString() == "[object Marker]") { 

            // 对icon的name进行判断，判断是否为‘1’
            if (allmap[i].getIcon().name == '1') {  
                var geolocation = new BMap.Geolocation();   //获取当前位置
                geolocation.getCurrentPosition(function(r) {    //获取当前位置成功的回调函数
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var pt = new BMap.Point(r.point.lng, r.point.lat);
                        map.panTo(r.point); //移到当前位置
                            //alert('您的位置：'+r.point.lng+','+r.point.lat);
                        p = {
                            x: r.point.lng,
                            y: r.point.lat
                        }
                    } else {
                        alert('failed' + this.getStatus());
                    }
                }, {
                    enableHighAccuracy: true
                });
                return p;
            }
        }

    }

    var geolocation = new BMap.Geolocation();   //获取当前位置
    geolocation.getCurrentPosition(function(r) {    //获取当前位置成功的回调函数
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {  //判断是否成功
            var pt = new BMap.Point(r.point.lng, r.point.lat);
            latitude = pt.lat;
            longitude = pt.lng;
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    });
    
    return ;
}

