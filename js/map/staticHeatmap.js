var points;
var timeStart = time.getFullYear() + '-' + '0' + (time.getMonth() + 1) + '-' + '0' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':00';
var timeEnd = time.getFullYear() + '-' + '0' + (time.getMonth() + 1) + '-' + '0' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':15';

var view = map.getBounds(); //获取可视区域
var viewLB = view.getSouthWest(); //可视区域左下角
var viewRT = view.getNorthEast(); //可视区域右上角
var ct = "2017-02-02 00:00:00";
var fs = "2017-02-02 00:00:10";
var fe = "2017-02-02 00:00:20";

var reqData = {

    "minX": 113.301015625,
    "minY": 23.1427001953125,
    "maxX": 113.301801953125,
    "maxY": 23.14720703125,
    "timeNow": "2017-02-01 23:40:00",
    "timeStart": "2017-02-01 23:48:10",
    "timeEnd": "2017-02-01 23:58:20"
}
$.ajax({
    type: "POST",
    url: "http://192.168.1.114:8080/show/prediction",
    // url: "http://192.168.1.132:10000/show/statichot",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(reqData),
    success: function(data) {
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

heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 10 });
map.addOverlay(heatmapOverlay);
heatmapOverlay.setDataSet({ data: points, max: 1 });
setGradient();

function setGradient() {
    var gradient = {
        0: '#4a4afd',
        0.25: '#51fdfd',
        0.5: '#73ff73',
        0.75: '#ffff5e',
        1: '#ff5454'
    };
    var colors = document.querySelectorAll("input[type='color']");
    colors = [].slice.call(colors, 1);
    colors.forEach(function(ele) {
        gradient[ele.getAttribute("data-key")] = ele.value;
    });
    heatmapOverlay.setOptions({ "gradient": gradient });
}