$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
});

function gotoHtml(my_url) {
	window.location.href = my_url + ".html";
}
//初始化尾部
function initFooter() {
	$.get("json/footer.json", function(data) {
		//初始化recent_posts
		var recent_posts = data.recent_posts;
		var dl = $("#footer_dl");
		dl.html(" ");
		for(var i in recent_posts) {
			dl.append('<dd class="my_dd pull-left col-md-12 col-xs-12 my_content">' +
				'<span class="dd_per col-md-1 col-xs-1">' +
				'<img src="img/fish2.png"/>' +
				'</span>' +
				'<span class="dd_last col-md-11 col-xs-11">' +
				recent_posts[i] +
				'</span>' +
				'</dd>');
		}
		//初始化nulla_eu_leo
		var nulla_eu_leo = data.nulla_eu_leo;
		var footer_nulla = $("#footer_nulla");
		footer_nulla.html(" ");
		for(var j in nulla_eu_leo) {
			footer_nulla.append('<div class="pull-left col-md-12 col-xs-12 my_content">' +
				'<div class="pull-left ">' +
				'<img class="my_img col-md-4 col-xs-4 msg_img" src="' + nulla_eu_leo[j].img_url + '" />' +
				'</div>' +
				'<div class="col-md- col-xs-">' +
				'<label class="my_p_title">' + nulla_eu_leo[j].title + '</label>' +
				'<p class="row_dc">' + nulla_eu_leo[j].content + '</p>' +
				'</div></div>');
		}
	});
}

//初始化主页博客内容
function initIndexBlog() {
	$.get("json/index_blog.json", function(data) {
		var blog = data.blog;
		var div_index_blog = $('#index_blog');
		div_index_blog.html(" ");
		for(var i in blog) {
			div_index_blog.append('<div class="my_row col-md-4">' +
				'<div class="pull-left div_my_title">' +
				'<a class="my_title">' + blog[i].title + '</a>' +
				'</div>' +
				'<div class="pull-left col-md-12 col-xs-12 my_content">' +
				'<img class="my_img col-md-12 col-xs-12" src="' + blog[i].img_url + '" />' +
				'</div>' +
				'<div class="pull-left col-md-12 col-xs-12 my_content">' +
				'<p class="row_dc">' + blog[i].content + '</p>' +
				'</div>' +
				'<div class="pull-left col-md-12 col-xs-12 div_btn">' +
				'<input type="button" class="my_btn " value="more" />' +
				'</div>' +
				'</div>');
		}
	});
}

//初始化gallery
function initGallery() {
	$.get("json/gallery.json", function(data) {
		var div_gallery = $("#gallery");
		div_gallery.html(" ");
		for(var i in data) {
			console.log(data[i]);
			div_gallery.append('<div class="card_black_padding col-md-4 ">' +
				'<div class="card_black row">' +
				'<div class="pull-left div_my_title">' +
				'<a class="my_title">' + data[i].title + '</a>' +
				'</div>' +
				'<div class="pull-left col-md-12 col-xs-12 my_content ">' +
				'<img class="my_img col-md-12 col-xs-12" src="' + data[i].img_url + '" />' +
				'</div>' +
				'<div class="pull-left col-md-12 col-xs-12  card_black_font my_content">' +
				'<p class="h6">' + data[i].content + '</p>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}

var speedOnceTime = 800;
var midDirection = "right";
//初始化轮播
function initCarousel() {
	moveSteps(-1);
}


function imgOffClick() {
	$(".cl_img").off("click");
}

function moveSteps(v) {
	var direction = "left";
	if(v == 0) return;
	if(v == -1) {
		for(var i = 0; i < 6; i++) {
			moveImgByFromTo(i, i, 0, direction); //不动					
		}
		return;
	} else if(v < 3) { //向左移动
		direction = "left";
	} else if(v == 3) {
		if(midDirection == "left") {
			midDirection = "right";
		} else {
			midDirection = "left";
		}
		direction = midDirection;
	} else if(v <= 6) { //向右移动
		direction = "right";
	}

	for(var i = 0; i < 6; i++) {
		moveImgByFromTo(i, (i + 6 - v) % 6, speedOnceTime, direction);
	}
}

/*移动照片*/
function moveImgByFromTo(fromId, toId, speed, direction) {

	var from = $(".cl_img[value='" + fromId + "']");
	var styles;

	if(direction == 'left') {
		var step = (fromId - toId + 6) % 6;
	} else {
		var step = (toId - fromId + 6) % 6;
	}
	var eachSpeed = step ? speedOnceTime / step : speedOnceTime;
	var tempId = fromId;
//	console.log("总步数：" + step + ",总时间：" + speedOnceTime + ",分时间：" + eachSpeed + ",from:" + fromId + ";to:" + toId);
	//禁用点击事件
	imgOffClick();
	while(step > 1) {
		if(direction == 'left') {
			tempId = (tempId + 6 - 1) % 6;
		} else {
			tempId = (tempId + 1) % 6;
		}
		step--;
		styles = getStylesObject(tempId);
		//		console.log(fromId + "从移动到" + tempId);
		from.animate(styles, eachSpeed, "linear");
	};
	styles = getStylesObject(toId);
	
	from.animate(styles, eachSpeed, "linear", function() {
		
		from.attr("value", toId);
		//打开点击事件
		from.on("click", function(ev) {
			var target = ev.target;
			var index = target.getAttribute("value");
			moveSteps(index);

		});
	});
}

function getStylesObject(stylesValue) {
	if(stylesValue == 0) {
		return cl_po_0;
	} else if(stylesValue == 1) {
		return cl_po_1;
	} else if(stylesValue == 2) {
		return cl_po_2;
	} else if(stylesValue == 3) {
		return cl_po_3;
	} else if(stylesValue == 4) {
		return cl_po_4;
	} else if(stylesValue == 5) {
		return cl_po_5;
	}
	return cl_po_0;
}

var cl_po_0 = {
	top: 0,
	left: 0,
	"zIndex": 10,
	opacity: 1
}

var cl_po_1 = {
	top: "25px",
	left: "80%",
	"zIndex": 9,
	opacity: 0.8
}

var cl_po_2 = {
	top: "60px",
	left: "100%",
	"zIndex": 8,
	opacity: 0.6
}

var cl_po_3 = {
	top: "90px",
	left: "20%",
	"zIndex": 7,
	opacity: 0.5
}

var cl_po_4 = {
	top: "60px",
	left: "-30%",
	"zIndex": 8,
	opacity: 0.6
}

var cl_po_5 = {
	top: "25px",
	left: "-50%",
	"zIndex": 9,
	opacity: 0.8
}