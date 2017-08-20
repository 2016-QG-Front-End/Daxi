/**
 * [用于浏览器宽度大于1000px时的时间选择]
 * 
 */
/**获取查询时间
timeStart: $('.first-input-secondChange').val()+ ':00'
timeEnd: $('.second-input-secondChange').val()+ ':00'
 */
$(function() {


    /**
     * [点击搜索图片机制]
     * 
     */
    $('.time-select-second-change-img').bind('click', function() {
        if ($('.time-select-second-change-img').attr('src') == '../images/magnifier.png') {
            if (($('.second-input-secondChange').val().length == 0) || ($('.first-input-secondChange').val().length == 0)) {
                return;
            }

            $('.second-change-first-div').css('display', 'none');
            $('.time-select-second-change-img').attr('src', '../images/button.png');
            $('#timeStart').css('display', 'none');
            $('#timeEnd').css('display', 'none');

            deleteMaker();
            excpectionAdd(1);
            /**
             * 在这里添加搜索时间后的函数调用
             */



            /*
            结束添加
             */
            $('.first-input-day').empty();
            $('.first-input-min').empty();
            $('.first-input-month').empty();
            $('.second-sel-month').empty();
            $('.second-sel-day').empty();
            $('.second-sel-min').empty();
            $('.second-input-secondChange').val('');
            $('.first-input-secondChange').val('');


            return;
        }
        if ($('.time-select-second-change-img').attr('src') == '../images/button.png') {
            $('.second-change-first-div').css('display', 'block');
            $('.time-select-second-change-img').attr('src', '../images/magnifier.png');
        }

    });



    $('.first-input-secondChange').bind('keyup', function(e) {   //为startPlace的输入框添加回车驱动
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.time-select-second-change-img').trigger('click');
        }   
    });

    $('.second-input-secondChange').bind('keyup', function(e) {   //为startPlace的输入框添加回车驱动
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.time-select-second-change-img').trigger('click');
        }   
    });
    //点击开始输入框时出现的选择时间
    $('.first-input-secondChange').bind('focus', function() {
        $('#timeStart').css('display', 'block');
        $('#timeEnd').css('display', 'none');

        //判断class为second-sel-day节点是否为空
        if ($('.second-sel-day').is(":empty")) {
            //向月份添加选项
            $('.first-input-month').append('<option value="02">02</option>');
            $('.first-input-month').append('<option value="03">03</option>');

            //向日添加选项
            for (var i = 1; i < 31; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-day').append(option);
            }

            //向小时添加选项
            for (var i = 0; i < 24; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-hour').append(option);
            }

            
        } else {
            var option = '<option value="' + $('.second-sel-day').val() + '">' + $('.second-sel-day').val() + '</option>';
            $('.first-input-day').empty();
            $('.first-input-day').append(option);

            option = '<option value="' + $('.second-sel-month').val() + '">' + $('.second-sel-month').val() + '</option>';
            $('.first-input-month').empty();
            $('.first-input-month').append(option);

            $('.first-input-hour').empty();
            var hour = parseInt($('.second-sel-hour').val());
            for(var i = 0; i <= hour; i++) {
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-hour').append(option);
            }
        }

        $('.first-input-min').empty();
        //向分钟添加选项
            for (var i = 0; i < 60; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-min').append(option);
            }
    })

    //点击结束输入框时出现的选择时间
    $('.second-input-secondChange').bind('focus', function() {
        $('#timeEnd').css('display', 'block');
        $('#timeStart').css('display', 'none');
        // var option = '<option value="' + $('.first-input-day').val() + '">' + $('.first-input-day').val() + '</option>';
        // $('.second-sel-day').empty();
        // $('.second-sel-day').append(option);

        if ($('.first-input-day').is(":empty")) {
            //向月份添加选项
            $('.second-sel-month').append('<option value="02">02</option>');
            $('.second-sel-month').append('<option value="03">03</option>');

            //向日添加选项
            for (var i = 1; i < 31; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.second-sel-day').append(option);
            }

            //向小时添加选项
            for (var i = 0; i < 24; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.second-sel-hour').append(option);
            }
        } else {
            var option = '<option value="' + $('.first-input-day').val() + '">' + $('.first-input-day').val() + '</option>';
            $('.second-sel-day').empty();
            $('.second-sel-day').append(option);

            option = '<option value="' + $('.first-input-month').val() + '">' + $('.first-input-month').val() + '</option>';
            $('.second-sel-month').empty();
            $('.second-sel-month').append(option);

            $('.second-sel-hour').empty();
            var hour = parseInt($('.first-input-hour').val());
            for (var i = hour; i < 24; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.second-sel-hour').append(option);
            }
        }

        //向分钟添加选项
        $('.second-sel-min').empty();
            for (var i = 0; i < 60; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.second-sel-min').append(option);
            }
    })

    //当结束时间选择的input框失去焦点
    $('.timeEnd').bind('blur', function() {
        // $('#timeEnd').bind('blur', function() {
        $('#timeStart').css('display', 'none');
        $('#timeStart').css('display', 'none');
        // });
    })

    //当开始时间选择的input框失去焦点
    $('.timeStart').bind('blur', function() {
        // $('#timeEnd').bind('blur', function() {
        $('#timeEnd').css('display', 'none');
        $('#timeStart').css('display', 'none');
        // });
    })

    //禁止键盘输入事件
    $('.second-input-secondChange').bind('keydown', function(e) {
        return false;
    })

    //禁止键盘输入事件
    $('.first-input-secondChange').bind('keydown', function(e) {
        return false;
    })

    //遍历select框，添加改变数值从而让输入框出现数字。开始时间的选择
    var timeStart = document.getElementById('timeStart').getElementsByTagName('select');
    for (var i = 0; i < timeStart.length; i++) {
        timeStart[i].onclick = function() {
            $('.first-input-secondChange').val(timeStart[0].value + '-' + timeStart[1].value + '-' + timeStart[2].value + ' ' + timeStart[3].value + ':' + timeStart[4].value);
        }
    }

    //遍历select框，添加改变数值从而让输入框出现数字。结束时间的选择
    var timeEnd = document.getElementById('timeEnd').getElementsByTagName('select');
    for (var i = 0; i < timeEnd.length; i++) {
        timeEnd[i].onclick = function() {
            $('.second-input-secondChange').val(timeEnd[0].value + '-' + timeEnd[1].value + '-' + timeEnd[2].value + ' ' + timeEnd[3].value + ':' + timeEnd[4].value);
        }
    }
})


/**获取查询时间
timeStart: $('.first-input-secondChange').val()+ ':00'
timeEnd: $('.second-input-secondChange').val()+ ':00'
这两个输入框的值只能获取到分钟，秒数需要自行添加（上面的已经添加）
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
        $('.mt_poppanel').css('display', 'block')

    });
})

/**
 * [注意这个另外一个js库，在这个库中使用的话需要使用$$否则会出错]
 * [这个库与jq库有90%是相似的，对于这两个库的区别可以查看下http://blog.csdn.net/kongjiea/article/details/42522305]
 * [在下面的onOK是点击确定的回调函数，点击确定了以后会在input（id为picktime）框中有一个类似于'2017-03-07 00:00',需要你们自行获取并添加秒进去]
 */
$$('#picktime').mdatetimer({
    mode: 2, //时间选择器模式 
    format: 2, //时间格式化方式 
    years: [2000, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017], //年份数组 
    nowbtn: false, //是否显示现在按钮 
    onOk: null //点击确定之后函数的回调
});
//因为只有一个时间框，所以只能获取到开始时间
//下方是回调函数的函数申明
function smallSizeScreen() {
    excpectionAdd(2);
}
