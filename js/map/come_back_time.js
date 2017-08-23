
/**获取查询时间
timeStart: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':00'
timeEnd: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':15'
这两个是对time这个变量，也就是当前时间的获取。它们的不同就是在秒数那里添加了15秒
 */
var longitude = 113.40134324983;
var latitude = 23.046584031449;
var isCheck;
var intervalId;
$(function() {
    isCheck = 0;
    var time = new Date(2017, 1, 3, 17, 50, 55); 
    //设置时间为2017年2月3日17:50:55
    //查询时间的时间驱动
    

    //刚进入页面时进行一次请求
    dynamic();
    
    //获取当前经纬度
    getLocation();

   
    //设置刚进入页面的定时器，设定20秒请求一个流量图和利用率图
    intervalId = setInterval(function() {
        dynamic();
    }, 20000);

    $('.refresh').bind('click', function() {
        excpectionAdd(0);
        /**
         * 在这里进行函数调用
         */
        console.log('I been clicked,I am in come_back_time.js')

        if(isCheck) {//假如当前处于查看状态，即静态，则重新添加定时器，假如当前处于动态模式，则不作反应
            intervalId = setInterval(function() {
                dynamic();
            }, 20000);
        }
    })



})
    function dynamic() {
        var end = time.Format('yyyy-MM-dd hh:mm:ss')//设置当前时间为结束时间，并且格式化为请求模式
        var start = new Date(time.getTime() - 20000*10).Format('yyyy-MM-dd hh:mm:ss')//设置20秒前为开始时间，并且格式化
        showFlowChange(start, end);
        showUserAtio(start, end);
    }