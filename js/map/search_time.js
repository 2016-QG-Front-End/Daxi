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


/**获取查询时间
var timeSel = document.getElementById('timeSel').getElementsByTagName('select');
timeStart: timeSel[0].value + '-' + timeSel[1].value + '-' + timeSel[2].value + ' ' + timeSel[3].value + ':' + timeSel[4].value + ':' + '00'//开始时间的获取
timeEnd: timeSel[5].value + '-' + timeSel[6].value + '-' + timeSel[7].value + ' ' + timeSel[8].value + ':' + timeSel[9].value + ':' + '00'//结束时间的获取
 */


/**
 * [小于1000时的查询时间]
 *
 */
$(function() {
    $('.phone-search-time').bind('click', function() {
        // $('.phone-web').hide(1000);
        $('#picktime').trigger('click');
        document.getElementById('picktime').focus();
    });
})

/**
 * [注意这个另外一个js库，在这个库中使用的话需要使用$$否则会出错]
 * [这个库与jq库有90%是相似的，对于这两个库的区别可以查看下http://blog.csdn.net/kongjiea/article/details/42522305]
 * [在下面的onOK是点击确定的回调函数，点击确定了以后会在input（id为picktime）框中有一个类似于'2017-03-07 00:00',需要你们自行获取并添加秒进去]
 */
$$('#picktime').mdatetimer({ 
        mode : 2, //时间选择器模式 
        format : 2, //时间格式化方式 
        years : [2000, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], //年份数组 
        nowbtn : false,//是否显示现在按钮 
        onOk : null //点击确定之后函数的回调
});

