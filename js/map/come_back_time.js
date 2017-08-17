$(function() {
    var time = new Data(2017, 1, 3, 17, 50, 55);    //设置时间为2017年2月1日17:50:55
    $('.sec-tool-img').bind('click', function() {
        var month = time.getMonth() + 1;            //修正月数
        var minutes = time.getMinutes() - 15;   //设置开始时间的分
        var obj = {             // 声明变量用于发送请求
            minLongitude: 112.62357,
            minLatitude: 22.490739,
            maxLongitude: 114.069097,
            maxLatitude: 23.978401,
            timeStart: ime.getFullYear() + '-' + month + '-' + time.getDate() + ' ' + time.getHours() + ':' + minutes + ':' + '00',
            timeEnd: time.getFullYear() + '-' + month + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + '00'
        }
        $.ajax({
            type: "post",
            url: 'http://ip:80/show/dynamichot',
            data: JSON.stringify(obj),
            dataType: "json",
            async: false,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                
            },
        });
    })
})