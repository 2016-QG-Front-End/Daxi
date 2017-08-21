/**
 * [用于浏览器宽度大于1000px时的时间选择]
 * 
 */
/**获取查询时间
timeStart: $('.first-input-secondChange').val()
timeEnd: $('.second-input-secondChange').val()
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

            $('.time-select-whole-div').css('display', 'none');
            $('.time-select-second-change-img').attr('src', '../images/button.png');
            $('#timeStart').css('display', 'none');
            $('#timeEnd').css('display', 'none');
            $('.warning').css('display','none');

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
            $('.second-sel-hour').empty();
            $('.first-input-hour').empty();
            $('.second-sel-month').empty();
            $('.second-sel-day').empty();
            $('.second-sel-min').empty();


            return;
        }
        if ($('.time-select-second-change-img').attr('src') == '../images/button.png') {
            $('.second-input-secondChange').val('');
            $('.first-input-secondChange').val('');
            $('.time-select-whole-div').css('display', 'block');
            $('.time-select-second-change-img').attr('src', '../images/magnifier.png');
        }

    });

    /**
     * 点击蓝色小箭头，整个选择框会收起来，恢复到点击前的状态
     */
    
    $('.time-select-retract-img').bind('click', function() {
        $('.time-select-whole-div').css('display', 'none');
        $('.time-select-second-change-img').attr('src', '../images/button.png');
        $('#timeStart').css('display', 'none');
        $('#timeEnd').css('display', 'none');
        $('.first-input-day').empty();
        $('.first-input-min').empty();
        $('.first-input-month').empty();
        $('.second-sel-hour').empty();
        $('.first-input-hour').empty();
        $('.second-sel-month').empty();
        $('.second-sel-day').empty();
        $('.second-sel-min').empty();
        $('.second-input-secondChange').val('');
        $('.first-input-secondChange').val('');
        $('.warning').css('display','none');

     });


    /**
     *点击‘过去’标签时，若提示存在，则更换提示，并将过去和未来标签的状态交换
     *并显示分的选择框
     */
    $('.time-select-past-time').bind('click', function() {
        //切换div换样式状态
        if(!$(this).hasClass('on-check')) {
            $('.time-select-past-time').removeClass('off-check').addClass('on-check');
            $('.time-select-future-time').removeClass('on-check').addClass('off-check');
        }
        //切换之后令所有除基本选择框外的的div消失
        if($('.warning').css('display') === 'block') {
            $('.warning').css('display','none');
            $('#timeEnd').css('display', 'none');
            $('#timeStart').css('display', 'none');

        }
        //切换之后重置文本框
        reset();
    });
    
    /**
     *点击‘未来’标签时，若提示存在，则更换提示，并将过去和未来标签的状态交换
     *并隐藏分的选择框
     */
    $('.time-select-future-time').bind('click', function() {
        //切换div换样式
        if(!$(this).hasClass('on-check')) {
            $('.time-select-future-time').removeClass('off-check').addClass('on-check');
            $('.time-select-past-time').removeClass('on-check').addClass('off-check');
        }
        //切换之后令所有除基本选择框外的的div消失
        if($('.warning').css('display') === 'block') {
            $('.warning').css('display','none');
            $('#timeEnd').css('display', 'none');
            $('#timeStart').css('display', 'none');
        }
        //切换之后重置文本框
        reset();
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
    
    //点击开始输入框时出现的选择时间，和选择提示
$('.first-input-secondChange').bind('focus', function() {
    $('#timeStart').css('display', 'block');
    $('#timeEnd').css('display', 'none');
    
    //分成过去和未来根据不同规则来选择时间
    //假如当前是过去，则在遵循if中的规则
    if($('.time-select-past-time').hasClass('on-check')) {
       $('.warning-text').html('最长可以选择不跨天的两个<br>小时进行查询');
       $('.warning').css('display','block');

       //向月份添加选项
        $('.first-input-month').append('<option value="02">02</option>');
        // $('.first-input-month').append('<option value="03">03</option>');

        //向日添加选项
        
        for (var i = 1; i <= time.getDate(); i++) {
            //判断是否需要添加一个0
            if ( i < 10 ) {
                var option = '<option value="0' + i + '">0' + i + '</option>';
            } else {
                var option = '<option value="' + i + '">' + i + '</option>';
            }
            $('.first-input-day').append(option);
        }

        //向小时添加选项
        //如果选择的日期是当天的日期，则只能选择现在时间之前的小时，否则，则可以选择24小时
        if($('.first-input-day').val() == '0' + time.getDate()) {
            for (var i = 0; i < time.getHours(); i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-hour').append(option);
            }
        } else {
                for (var i = 0; i < 24; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-hour').append(option);
            }
        }

        //向分钟添加选项
        //如果是当天的日期而且是当前小时，则只能选择比当前分钟要小的分钟，否则可选60分钟
        if((parseInt($('.first-input-day').val()) == time.getDate()) && (parseInt($('.first-input-hour').val()) == getHours())){
            for (var i = 0; i < time.getMinutes(); i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-min').append(option);
            }
        } else {
            for (var i = 0; i < 60; i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.first-input-min').append(option);
            }
        }
        //现在是预测未来的模式
    } else {
       $('.warning-text').html('请从当前时间后的三个小时<br>内进行选择');
       $('.warning').css('display','block');

       //向月份添加选项
        $('.first-input-month').append('<option value="02">02</option>');
        // $('.second-sel-month').append('<option value="03">03</option>');

        //向日添加选项
        
        $('.first-input-day').empty()
        var option = '<option value="0' + time.getDate() + '">0' + time.getDate() + '</option>';      
        $('.first-input-day').append(option);

   
        //向小时添加选项
        //只能选择大于等于当前时间，小于等于当前时间+2个小时的小时数
        for (var i = time.getHours(); i < time.getHours() + 3; i++) {
            //判断是否需要添加一个0
            if ( i < 10 ) {
                var option = '<option value="0' + i + '">0' + i + '</option>';
            } else {
                var option = '<option value="' + i + '">' + i + '</option>';
            }
             $('.first-input-hour').append(option);
        }

        //固定分钟
        $('.first-input-min').append('<option value="00">00</option>');

    }

})

//点击结束输入框时出现的选择时间，和选择提示
$('.second-input-secondChange').bind('focus', function() {
    $('#timeEnd').css('display', 'block');
    $('#timeStart').css('display', 'none');
    
    //限制用户必须先填了开始时间才能填结束时间
    if(!$('.first-input-secondChange').val()) {
        alert('开始时间不能为空');
        $('.second-input-secondChange').blur();
        $('.first-input-secondChange').focus();
    }

    //查看过去时间的运用if里面的规则
    if($('.time-select-past-time').hasClass('on-check')) {
       $('.warning-text').html('最长可以选择不跨天的两个<br>小时进行查询');
       $('.warning').css('display','block'); 

       var option = '<option value="' + $('.first-input-day').val() + '">' + $('.first-input-day').val() + '</option>';
        $('.second-sel-day').empty();
        $('.second-sel-day').append(option);

        option = '<option value="' + $('.first-input-month').val() + '">' + $('.first-input-month').val() + '</option>';
        $('.second-sel-month').empty();
        $('.second-sel-month').append(option);

        //向小时添加选项
        $('.second-sel-hour').empty();
        var hour = parseInt($('.first-input-hour').val());
        //假如选择的是当前日子，则跟选择开始时间一样只能选择当前时间之前的小时，并且要大于开始时间
        //这是假如开始时间跟当前时间间隔小于两小时，则用户最大只能选择当前小时
        if(($('.first-input-day').val() == '0' + time.getDate()) && (hour >= time.getHours())) {
            for (var i = hour; i < time.getHours(); i++) {
                //判断是否需要添加一个0
                if ( i < 10 ) {
                    var option = '<option value="0' + i + '">0' + i + '</option>';
                } else {
                    var option = '<option value="' + i + '">' + i + '</option>';
                }
                $('.second-sel-hour').append(option);
            }
        //否则，则可以选择当前小时两小时之内的时间
        } else  {
            for (var i = hour; i <= hour + 2; i++) {
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
        var min = parseInt($('.first-input-min').val());
        //当分钟的选择获取到焦点时，检查当前选择框的小时
        $('.second-sel-min').bind('focus', function() {
            $('.second-sel-min').empty();
            //假如选择了当前日子当前小时，则只可以选择当前时间的分钟
            if(($('.first-input-day').val() == '0' + time.getDate()) && (parseInt($('.second-sel-hour').val()) == time.getHours())) {
                for (var i = 0; i < time.getMinutes(); i++) {
                    //判断是否需要添加一个0
                    if ( i < 10 ) {
                        var option = '<option value="0' + i + '">0' + i + '</option>';
                    } else {
                        var option = '<option value="' + i + '">' + i + '</option>';
                    }
                    $('.second-sel-min').append(option);
                }
            //假如结束时间选择的小时刚好是开始时间的两个小时后，则只能选择比开始时间小的分钟
            } else if(parseInt($('.second-sel-hour').val()) == parseInt(hour) + 2){
                for (var i = 0; i < parseInt($('.first-input-min').val()); i++) {
                    //判断是否需要添加一个0
                    if ( i < 10 ) {
                        var option = '<option value="0' + i + '">0' + i + '</option>';
                    } else {
                        var option = '<option value="' + i + '">' + i + '</option>';
                    }
                    $('.second-sel-min').append(option);
                }
            //假如结束时间选择的刚好是开始时间的同一个小时，则不能选择比开始时间分钟数小的分钟
            } else if(parseInt($('.second-sel-hour').val()) == hour) {
                for (var i = min; i < 60; i++) {
                    //判断是否需要添加一个0
                    if ( i < 10 ) {
                        var option = '<option value="0' + i + '">0' + i + '</option>';
                    } else {
                        var option = '<option value="' + i + '">' + i + '</option>';
                    }
                    $('.second-sel-min').append(option);
                }
            } else {
                for (var i = 0; i < 60; i++) {
                    //判断是否需要添加一个0
                    if ( i < 10 ) {
                        var option = '<option value="0' + i + '">0' + i + '</option>';
                    } else {
                        var option = '<option value="' + i + '">' + i + '</option>';
                    }
                    $('.second-sel-min').append(option);
                }
            }
        })
    //现在是未来的状态，把提示换掉
    } else {
       $('.warning-text').html('请从当前时间后的三个小时<br>内进行选择');
       $('.warning').css('display','block');

       //向月份添加选项
        $('.second-sel-month').append('<option value="02">02</option>');
        // $('.second-sel-month').append('<option value="03">03</option>');

        //向日添加选项
            
        $('.second-sel-day').append('<option value="0' + time.getDate() + '">0' + time.getDate() + '</option>');

        //向小时添加选项
        //只能选择比开始时间大一个小时，小于等于当前时间+3个小时的小时数
        var hour = parseInt($('.first-input-hour').val())
        $('.second-sel-hour').empty();
        for(var i = hour + 1; i <= time.getHours() + 3; i++) {
            if ( i < 10 ) {
                var option = '<option value="0' + i + '">0' + i + '</option>';
            } else {
                var option = '<option value="' + i + '">' + i + '</option>';
            }
            $('.second-sel-hour').append(option);
        }

        //固定分钟为00
        $('.second-sel-min').append('<option value="00">00</option>');
    }
})


    //当结束时间选择的input框失去焦点
    $('.timeEnd').bind('blur', function() {
        $('.warning').css('display','none');
        // $('#timeEnd').bind('blur', function() {
        $('#timeStart').css('display', 'none');
        $('#timeStart').css('display', 'none');
        // });
    })

    //当开始时间选择的input框失去焦点
    $('.timeStart').bind('blur', function() {
        $('.warning').css('display','none');
        // $('#timeEnd').bind('blur', function() {
        $('#timeEnd').css('display', 'none');
        $('#timeStart').css('display', 'none');
        // });
    })

    //点击关闭按钮会置空文本框并且关闭select选择框
    $('.time-select-clear-img').bind('click', function() {
        reset();
        $('#timeStart').css('display', 'none');
        $('#timeEnd').css('display', 'none');

    })

    //清空文本框和选择框
    function reset() {
        $('.first-input-day').empty();
        $('.first-input-min').empty();
        $('.first-input-month').empty();
        $('.second-sel-hour').empty();
        $('.first-input-hour').empty();
        $('.second-sel-month').empty();
        $('.second-sel-day').empty();
        $('.second-sel-min').empty();
        $('.second-input-secondChange').val('');
        $('.first-input-secondChange').val('');
    }

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
        $('.mt_poppanel').css('display', 'block');

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
