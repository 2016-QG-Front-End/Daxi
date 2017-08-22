var time = new Date(2017, 1, 3, 17, 50, 55); 
var timeline = [];
var flow = [];
var isCheck = 0;
var isFuture = 0;


resizeContainer();//根据窗口大小决定是左右布局还是上下布局
resizeAuto();//根据容器的宽度设定容器的高度


/**
 * 将时间格式化成hh:mm:ss格式
 */
Date.prototype.format = function () { 
  return this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()
}


/**
 * 将时间格式化成yyyy-MM-dd hh:mm:ss格式
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S+": this.getMilliseconds()             //毫秒
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)){
      if(k == "y+"){
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      }
      else if(k=="S+"){
        var lens = RegExp.$1.length;
        lens = lens==1?3:lens;
        fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
      }
      else{
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}


/**
 * 是否动态显示图表，如果是，则设定定时器
 */
// if(move) {
// 	dynamic();
// }

/**
 * 是否处于查看图表状态，如果是，则清除定时器且请求查看图表
 */
// if(isCheck) {
// 	clearInterval(intervalId);
// 	//是否预测图表
// 	if(isFuture) {
// 		estimationFlowChange();
// 		estimationUserAtio();
// 	} else {
// 		showFlowChange();
// 		showUserAtio();
// 	}
// }

/**
 * 动态显示图表，设置定时器
 */

	var intervalId = setInterval (function() {
		showFlowChange();
		showUserAtio();
	},15000);


/**
 * 当浏览器窗口大小改变时利用定义好的函数自适应，下面定义函数时有说明每个函数的功能
 */
$(window).resize(function() {
	resizeContainer();
	resizeAuto();
	resizeCharts();
})

/**
 * 初始化左边的柱状图折线图
 */
var leftChart = echarts.init($(".left-chart")[0]);

option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross'
		}
	},
	dataZoom: [
        {
            type: 'inside'
        }
    ],
	legend: {
        data: ['line', 'bar'],
        top: '18',
        textStyle: {
            color: '#656363',
            fontSize: '16'
        }
    },

	xAxis: [
		{
			type: 'category',
			boundary: false,
			axisLabel: {
				textStyle: {
					color: '#777777',
					fontStyle: 'italic',
				}
			},
			data: ['09:03:03','09:03:13','09:03:23','09:03:33','09:03:43','09:03:53','09:04:03','09:04:13','09:04:23','09:04:33']
		}
	],

	yAxis: [
		{
			type: 'value',
			name: '车流量(辆)',
			// min: 'dataMin',
			splitLine: {
            	"show": false
        	},
        	axisLabel: {
				textStyle: {
					color: '#929191',

				}
			},
		}
	],

	series: [
		{
			name: 'bar',
			type: 'bar',
			label: {
	            normal: {
	                show: true,
	                position: 'top',
	            },
	            emphasis: {
	            	textStyle: {
	            		fontSize: '14'
	            	}
	            }
	        },
			barWidth: '30%',
			color: ['#3b5c9a'],
			data: ['100', '52', '520','101','100','102','99','98','97','100']
		},

		{
			name: 'line',
			type: 'line',
			smooth:true,
			showAllSymbol: true,
			lineStyle: {
				normal: {
					width: 1.5,
                	shadowColor: 'rgba(0,0,0,0.4)',
	                shadowBlur: 10,
	                shadowOffsetY: 10					
				}
			},
			data: ['100', '52', '520','101','100','102','99','98','97','100'],
			color: ['#98ffff']
		}
	]
};
leftChart.setOption(option);


/**
 * 初始化右边的饼状图
 */
var rightChart = echarts.init($(".right-chart")[0]);

option = {
	backgroundColor: '#3b5c9a',

	tooltip: {
		trigger: 'item',
		formatter: '{b} : {c} ({d}%)'
	},

	series: [
		{
			name: '车辆状态',
			type: 'pie',
			radius: ['0','60%'],
			center: ['50%', '45%'],

			data: [
				{
					value: 35, 
					name:'空车',
					itemStyle: {
						normal: {
							color: '#86c9f4'
						}
					}
				},
				{
					value: 55, 
					name:'载客',
					itemStyle: {
						normal: {
							color: '#4da8ec'
						}
					}
				},
			],
			label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14'
                    },
                    formatter: "{b}\n{d}%",
                },
                emphasis: {
                	textStyle: {
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: '16'
                    },
                }
            },

			labelLine: {
				normal: {
					show: true,
					lineStyle: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    smooth: 0.2,
                    length: 15,
                    length2: 25
				}
			}

		}
	]
};
rightChart.setOption(option);

resizeCharts();

/**
 * 请求查看流量变化
 */
function showFlowChange(start,end) {
	if(!isCheck){
		timeStart = new Date(time.getTime()-20000*10).Format('yyyy-MM-dd hh:mm:ss');
		timeEnd = time.Format('yyyy-MM-dd hh:mm:ss')
	} else {
		timeEnd = end
		timeStart = start
	}
	var list = {
		x: 113.262232,		// 在地图上选择的地点的经度
  		y: 23.154345,		    // 在地图上选择的地点的纬度
		timeStart: timeStart,
		timeEnd: timeEnd,
		barCount: 10
	}
    
	$.ajax({
		type: "POST",
		url: "http://ip:80/show/flowchange",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		success: function(data) {
			if(data.status == '1') {
				printFlowCharts(data.data, timeEnd);		
			}
		}
	});
	
}

/**
 * 请求预测流量变化
 */
// function estimationFlowChange(start,end) {
// 	var list = {
// 		x: ,		// 在地图上选择的地点的经度
//   		y: ,		    // 在地图上选择的地点的纬度
// 		timeStart: start,
// 		timeEnd: end,
// 		timeNow: time.Format('yyyy-MM-dd hh:mm:ss'),
// 		barCount: 10,
// 	}
    
// 	$.ajax({
// 		type: "POST",
// 		url: "http://ip:80/estimation/flowchange",
// 		contentType: "application/json; charset=utf-8",
// 		xhrFields: {
// 			withCredentials: true
// 		},
// 		data: JSON.stringify(list),
// 		dataType: "json",
// 		success: function(data) {
// 			if(data.status == '1') {
// 				printFlowCharts(data.data, end);		
// 			}
// 		}
// 	});
	
// }

/**
 * 请求查看车辆利用率
 * @return {[type]} [description]
 */
function showUserAtio(start,end,lng,lat) {
	if(!isCheck){
		timeStart = new Date(time.getTime()-20000*10).Format('yyyy-MM-dd hh:mm:ss');
		timeEnd = time.Format('yyyy-MM-dd hh:mm:ss')
	} else {
		timeEnd = end
		timeStart = start
	}
	var list = {
		x: 113.262232,		// 在地图上选择的地点的经度
  		y: 23.154345,		    // 在地图上选择的地点的纬度
		timeStart: timeStart,
		timeEnd: timeEnd,
	}

	$.ajax({
		type: "POST",
		url: "http://ip:80/show/useratio",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		success: function(data) {
			if(data.status == '1') {
				printPieChart(data.data);		
			}
		}
	});
}

/**
 * 请求预测车辆利用率
 */
// function estimationUserAtio(start,end) {
//  {
// 	var list = {
// 		x: ,		// 在地图上选择的地点的经度
//   		y: ,		    // 在地图上选择的地点的纬度
// 		timeStart: start,
// 		timeEnd: end,
// 		timeNow: time.Format('yyyy-MM-dd hh:mm:ss'),
// 	}

// 	$.ajax({
// 		type: "POST",
// 		url: "http://ip:80/estimation/useratio",
// 		contentType: "application/json; charset=utf-8",
// 		xhrFields: {
// 			withCredentials: true
// 		},
// 		data: JSON.stringify(list),
// 		dataType: "json",
// 		success: function(data) {
// 			if(data.status == '1') {
// 				printPieChart(data.data);		
// 			}
// 		}
// 	});
// }



/**
 * 请求得到值之后，给柱状图折线图赋值
 */
function printFlowCharts(data, timeEnd) {
	//假如时间轴数组为空而且不是处于查看状态，则表示该数组第一次进行动态请求，要重新赋十条柱子的值
	if((timeline == '') && (!isCheck)){
		for(var i = 0; i < data.length; i++) {
			var time = new Date(new Date(timeEnd).getTime() - 20000*(data.length - i));
			timeline.push(time.format());
			flow.push(data[i].taxiCount);
		}	
	//假如时间轴柱子不为空而且也不处于查看状态，则表示它处于动态请求但不是第一次请求，直接改变第一条柱子和最后一条柱子
	} else if((timeline != '') && (!isCheck)) {
		timeline.shift();
		timeline.push(new Date(timeEnd).format());
		flow.shift();
		flow.push(data[data.length - 1].taxiCount);
	}
	//假如处于查看状态，则所有柱子的值要重新获取
	if(isCheck) {
		timeline.length = 0;
		flow.length = 0;
		for(var i = 0; i < data.length; i++) {
			var time = new Date(new Date(timeEnd).getTime() - 20000*(data.length - i));
			timeline.push(time.format());
			flow.push(data[i].taxiCount);
		}
	} 	
	//给柱状图折线图赋值
	leftChart.setOption({
		xAxis: {
			data: timeline
		},
		series: [
			{
				type: 'bar',
				data: flow
			},
			{
				type: 'line',
				data: flow
			}
		]
	});
}

/**
 * 得到请求的数据之后给饼状图赋值
 */
function printPieChart(data) {
	rightChart.setOption({
		series: [
			{
				data: [
					{
						value: data.taxiSum - data.taxiUse, 
						name:'空车',
						itemStyle: {
							normal: {
								color: '#86c9f4'
							}
						}
					},
					{
						value: data.taxiUse, 
						name:'载客',
						itemStyle: {
							normal: {
								color: '#4da8ec'
							}
						}
					},
				],
			}
		]
	})
}

/**
 * 当容器大小变化时图表的配置项变化
 */
function resizeCharts() {
	leftChart.resize();
	rightChart.resize();

	//如果窗口小于992px，则折线图的线条变细，折线图的转折点由图片变成空心圆，而且尺寸变小
	if(window.innerWidth < 992) {
		leftChart.setOption({
			series:[
				{
					type: 'bar',
					barWidth: '55%',
					itemStyle: {
						normal: {
							barBorderRadius: 0,
						}
					},
				},
				{
					type: 'line',
					symbol: 'emptyCircle',
					symbolSize: '3',
					symbolOffset: [0,0],
					lineStyle: {
						width: 0.5,
						shadowColor: 'rgba(0,0,0,0)'
					}
				}
			]
		})
	} else {
		leftChart.setOption({
			series:[
				{
					type: 'bar',
					barWidth: '30%',
					itemStyle: {
						normal: {
							barBorderRadius: 3,
						}
					},
				},
				{
					type: 'line',
					symbol: 'image://../images/point.png',
					symbolSize: '30',
					symbolOffset: [0,'-15%'],
					lineStyle: {
						width: 1.5,
						shadowColor: 'rgba(0,0,0,0.4)',
					}
				}
			]
		})
	}
	//如果不是移动端而且窗口大小小于1300px,则把饼状图的标签放到里面，否则，放到外面，用标签线连接
	if((!judgePhone()) && window.innerWidth < 1300) {
		rightChart.setOption({
			series: [
				{
					label: {
		                normal: {
		                    position: 'inner' 
		                },
		                emphasis: {
		                	position: 'inner'
		                }
		            },

					labelLine: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					}

				}
			]
		})
	} else {
		series: [
			{
				label: {
	                normal: {
	                    position: 'outside' 
	                },
	                emphasis: {
	                	position: 'outside'
	                }
	            },

				labelLine: {
					normal: {
						show: true
					},
					emphasis: {
						show: true
					}
				}

			}
		]
	}
}

/**
 * 根据浏览器大小选择容器布局
 */
function resizeContainer() {
	if(judgePhone() || window.innerWidth < 900) {
		$("#mainContainer").css({'width':'100%','margin':'0,auto'});
		$(".left-chart").css({'width':'92%','margin':'0 auto'});
		$("#float").removeClass().addClass('content-top');
		$("#percent").removeClass().addClass('content-bottom');
	} else {
		$("#mainContainer").css({'width':'88%','margin':'40px auto'});
		$(".left-chart").css({'width':'82%','margin':'0 10% 5% 8%'});
		$("#float").removeClass().addClass('content-left');
		$("#percent").removeClass().addClass('content-right');
	}
	if(window.innerWidth < 1295) {
		$("#mainContainer").css('top','0')
	} else {
		$("#mainContainer").css('top','-16%')
	}
}



/**
 *浏览器大小变化时容器的高度随宽度变化
 */
function resizeAuto() {
	$(".content-top").height($(".content-top").width()*0.7);
	$(".content-bottom").height($(".content-bottom").width()*0.68);

	$(".content-left").height($(".content-left").width()*0.5);
	$(".content-right").height($(".content-right").width()*0.87)
						.css("top", $('.content-right').height()*0.17);
}


function judgePhone() {
    var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone) {
        return true;
    } else {
        return false;
    }
}
