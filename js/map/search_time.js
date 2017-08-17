/**
 * [用于浏览器宽度大于1000px时的时间选择]
 * 
 */
$(function() {
    $('.time-sel-img').bind('click', function() {
        deleteMaker();
        excpectionAdd();
    });
})

/**
 * [用于浏览器宽度小于1000px时的时间选择]
 * 
 */
$(function() {
    $('.phone-search-time').bind('click', function() {
        $('.phone-web').hide(1000);
        $('#date').focus();
    });
    // var calendar = new LCalendar();
    // calendar.init({
    //     'trigger': '#date', //标签id
    //     'type': 'datetime', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
    //     'minDate': (new Date().getFullYear()) + '-' + 2 + '-' + 1, //最小日期
    //     'maxDate': (new Date().getFullYear()) + '-' + 3 + '-' + 31 //最大日期
    // });
})