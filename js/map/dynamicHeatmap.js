dynamicMap();

function dynamicMap() {
    var points;
    var timeStart = time.Format('yyyy-MM-dd hh:mm:ss');
    var timeEnd = new Date(time.getTime() + 20000).Format('yyyy-MM-dd hh:mm:ss');

        $.ajax({
                type: "POST",
                url: "http://192.168.1.103:8080/show/dynamichot",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    timeStart:timeStart,
                    timeEnd:timeEnd
                }),
                success: function(data) {
                    switch (data.state) {
                        case 1:
                            points = data.data.map(function(bir) {
                                return bir;
                            });
                            heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 12 });
                            map.addOverlay(heatmapOverlay);
                            heatmapOverlay.setDataSet({ data: points, max: 1 });
                            break;
                        case 500:
                            alert('服务器内部错误!');
                            break;
                        case 2:
                            alert('请求时间为空！');
                            break;
                        case 3:
                            alert('起始时间大于终止时间!');
                            break;
                        case 4:
                            alert(' 请求时间段超出范围!');
                            break;
                        case 5:
                            alert('请求时间点太过超前!');
                            break;
                        case 6:
                            alert('区域范围为空!');
                            break;
                        case 7:
                            alert(' 请求坐标点为空!');
                            break;
                        case 8:
                            alert('路线起点为空!');
                            break;
                        case 9:
                            alert('路线起点为空!');
                            break;
                        case 10:
                            alert('路径途经点为空!');
                            break;
                        case 11:
                            alert('跨天请求!');
                            break;
                        case 12:
                            alert('请求参数为空!');
                            break;
                        case 13:
                            alert('无法进行预测!');
                        default:
                            alert('后台在跟你开玩笑!');
                            break;
                    }
                },
                error: function(jqXHR) {
                    alert("发生错误：" + jqXHR.status);
                },
            });

var dynmcID = setInterval(function() {
        var reqData = {
            timeStart: timeStart,
            timeEnd: timeEnd
        }

        $.ajax({
            type: "POST",
            url: "http://192.168.1.103:8080/show/dynamichot",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: JSON.stringify(reqData),
            success: function(data) {
                if (heatmapOverlay) {
                    map.removeOverlay(heatmapOverlay);
                }
                switch (data.state) {
                    case 1:
                        points = data.data.map(function(bir) {
                            return bir;
                        });
                        break;
                    case 500:
                        alert('服务器内部错误!');
                        break;
                    case 2:
                        alert('请求时间为空！');
                        break;
                    case 3:
                        alert('起始时间大于终止时间!');
                        break;
                    case 4:
                        alert(' 请求时间段超出范围!');
                        break;
                    case 5:
                        alert('请求时间点太过超前!');
                        break;
                    case 6:
                        alert('区域范围为空!');
                        break;
                    case 7:
                        alert(' 请求坐标点为空!');
                        break;
                    case 8:
                        alert('路线起点为空!');
                        break;
                    case 9:
                        alert('路线起点为空!');
                        break;
                    case 10:
                        alert('路径途经点为空!');
                        break;
                    case 11:
                        alert('跨天请求!');
                        break;
                    case 12:
                        alert('请求参数为空!');
                        break;
                    case 13:
                        alert('无法进行预测!');
                    default:
                        alert('后台在跟你开玩笑!');
                        break;
                }
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR.status);
            },
        });

        heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 12 });
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({ data: points, max: 1 });

        timeStart = timeEnd;
        timeEnd = new Date(new Date(timeEnd).getTime() + 20000).Format('yyyy-MM-dd hh:mm:ss');
    }, 5000)
}