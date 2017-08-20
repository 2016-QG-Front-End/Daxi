


var points;
$.ajax({
    type: "POST",
    url: "http://localhost/JSON/xy.json",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify({
        "start": "2017-02-28 00:00:01"
    }),
    success: function(data) {
        points = data.option.map(function(bir) {
            return bir;
        });
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