/**
 * [getDrivingLine 获取驾车路线并把路线下昂后台请求]
 * @param  {[type]} str1 [description]
 * @param  {[type]} str2 [description]
 * @return {[type]}      [description]
 */
function getDrivingLine(str1, str2) {
    var plans = {
        road: [],
        time: ''
    };
    var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
    var options = {
        onSearchComplete: function(results) {
            if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                for (var j = 0; j < results.getNumPlans(); j++) {
                    var plan = results.getPlan(j); //获取驾车计划
                    for (var k = 0; k < getNumRoutes(); k++) {
                        var route = plan.getRoute(0); // 获取方案的驾车线路
                        var obj = {
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
                        var objEnd = {
                            lng: results.getEnd().point.lng,
                            lat: results.getEnd().point.lat
                        }
                        s.push(objEnd);
                        plans.road.push(s);
                    }
                }

                plans.time = timeSel[0].value + '-' + timeSel[1].value + '-' + timeSel[2].value + ' ' + timeSel[3].value + ':' + timeSel[4].value ;



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

                },
            });
        }
    };
    var driving = new BMap.DrivingRoute(map, options);
    driving.search(str1, str2);

    function addRoute(path) {
        map.addOverlay(new BMap.Polyline(path, {
            strokeColor: 'background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);',
            enableClicking: false
        }));
        addMarkerLine(path[0], 'start');
        add
        arkerLine(path[path.length - 1], 'end');
    }

    function addMarkerLine(data, str) {
        var pt = new BMap.Point(data.longitude, data.latitude);
        var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(150, 150));
        var marker2 = new BMap.Marker(pt, {
            icon: myIcon
        }); // 创建标注
        map.addOverlay(marker2); // 将标注添加到地图中

    }
}
