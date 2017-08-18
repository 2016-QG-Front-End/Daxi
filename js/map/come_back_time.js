
/**获取查询时间
var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
timeStart: timeSel[0].value + '-' + timeSel[1].value + '-' + timeSel[2].value + ' ' + timeSel[3].value + ':' + timeSel[4].value + ':' + '00'//开始时间的获取
timeEnd: timeSel[5].value + '-' + timeSel[6].value + '-' + timeSel[7].value + ' ' + timeSel[8].value + ':' + timeSel[9].value + ':' + '00'//结束时间的获取
 */
$(function() {
    var time = new Data(2017, 1, 3, 17, 50, 55);    //设置时间为2017年2月1日17:50:55
    //查询时间的时间驱动
    $('.sec-tool-img').bind('click', function() {
        
    })
})