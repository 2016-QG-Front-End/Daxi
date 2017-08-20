
/**获取查询时间
timeStart: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':00'
timeEnd: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':15'
这两个是对time这个变量，也就是当前时间的获取。它们的不同就是在秒数那里添加了15秒
 */
$(function() {
    var time = new Date(2017, 1, 3, 17, 50, 55);    //设置时间为2017年2月3日17:50:55
    //查询时间的时间驱动
    $('.refresh').bind('click', function() {
        excpectionAdd(0);
        /**
         * 在这里进行函数调用
         */
        
    })
})