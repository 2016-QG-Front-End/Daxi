resizeSwitch();

window.onmousewheel=function(){return false}
$('#switch').bind('click', function() {
	if($(this).hasClass('check-more')) {
		$(this).removeClass('check-more').addClass('check-back');
		$('html,body').animate({scrollTop:$('#mainContainer').offset().top}, 800);
	} else {
		$(this).removeClass('check-back').addClass('check-more');
		$('html,body').animate({scrollTop: '0px'}, 800);
	}
})
$(window).scroll(function() {
	var viewH = $(window).height();
	var contentH = $(document).height();
	var scrollTop = $(window).scrollTop();
	if(scrollTop/(contentH - viewH) == 1) {
		$('#switch').removeClass('check-more').addClass('check-back');
	}
	if(scrollTop == 0) {
		$('#switch').removeClass('check-back').addClass('check-more');
	}
})

$(window).resize(function() {
	resizeSwitch();
})

function resizeSwitch() {
	if(judgePhone() || window.innerWidth < 900){
		$('#switch').css({'width':'40px','height':'40px'})
		// $('.check-more').css('bottom','10%');

	} else {
		$('#switch').css({'width':'60px','height':'60px'})
		// $('.check-more').css('bottom','5%');

	}
}