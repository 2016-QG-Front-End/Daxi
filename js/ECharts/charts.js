
var timeline = [];
var flow = [];

resizeContainer();
resizeAuto();	

if(move) {
	dynamic();
}

if(isCheck) {
	clearInterval(intervalId);
	if(isFuture) {
		estimationFlowChange();
		estimationUserAtio();
	} else {
		showFlowChange();
		showUserAtio();
	}
}

function dynamic() {
	var intervalId = setInterval (function() {
		showFlowChange();
		showUserAtio();
	},15000);
}

$(window).resize(function() {
	resizeContainer();
	resizeAuto();
	resizeCharts();
})

/**
 * 左边的柱状图和折线图反映车流量
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
			min: 'dataMin',
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
 * 右边的饼状图显示空车的百分比
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
					value: 1, 
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
 * 刚进入页面时加载图表数据
 * @return {[type]} [description]
 */
function showFlowChange() {
	if(!isCheck) {
		var now = new Date();
		var pre = new Date(now.getTime() - 20000*12);
		var newest = now;
		var list = {
			x: ,		// 在地图上选择的地点的经度
	  		y: ,		    // 在地图上选择的地点的纬度
			timeStart: now.Format('yyyy-MM-dd hh:mm:ss'),
			timeEnd: pre.Format('yyyy-MM-dd hh:mm:ss'),
			barCount: 10,
		}		
	} else {
		var newest = timeEnd;
		var list = {
			x: ,		// 在地图上选择的地点的经度
	  		y: ,		    // 在地图上选择的地点的纬度
			timeStart: ,
			timeEnd: ,
			barCount: 10,
		}
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
			printFlowCharts(data.data, newest);		
			}
		}
	});
	
}

function estimationFlowChange() {
	var newest = timeEnd;
	var list = {
		x: ,		// 在地图上选择的地点的经度
  		y: ,		    // 在地图上选择的地点的纬度
		timeStart: ,
		timeEnd: ,
		barCount: 12,
		isFuture: 
	}
    
	$.ajax({
		type: "POST",
		url: "http://ip:80/estimation/flowchange",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		success: function(data) {
			if(data.status == '1') {
			printFlowCharts(data.data, newest);		
			}
		}
	});
	
}

function showUserAtio() {
	if(!isCheck) {
		var now = new Date();
		var pre = new Date(now.getTime() - 20000*10);
		var list = {
			x: ,		// 在地图上选择的地点的经度
	  		y: ,		    // 在地图上选择的地点的纬度
			timeStart: now.Format('yyyy-MM-dd hh:mm:ss'),
			timeEnd: pre.Format('yyyy-MM-dd hh:mm:ss'),
		}		
	} else {
		var list = {
			x: ,		// 在地图上选择的地点的经度
	  		y: ,		    // 在地图上选择的地点的纬度
			timeStart: ,
			timeEnd: ,
		}
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

function estimationUserAtio() {
 {
	var list = {
		x: ,		// 在地图上选择的地点的经度
  		y: ,		    // 在地图上选择的地点的纬度
		timeStart: ,
		timeEnd: ,
		isFuture: 
	}

	$.ajax({
		type: "POST",
		url: "http://ip:80/estimation/useratio",
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
 * 创建图表
 */
function printFlowCharts(data, timeEnd) {
	if((timeline == '') && (!isCheck)){
		for(var i = 0; i < data.length; i++) {
			var time = new Date(timeEnd.getTime() - 20000*(data.length - i));
			timeline.push(time.format());
			flow.push(data[i].taxiCount);
		}	
	} else if((timeline != '') && (!isCheck)) {
		timeline.shift();
		timeline.push(timeEnd.format());
		flow.shift();
		flow.push(data[data.length - 1].taxiCount);
	}
	if(isCheck) {
		timeline.length = 0;
		flow.length = 0;
		for(var i = 0; i < data.length; i++) {
			var time = new Date(timeEnd.getTime() - 20000*(data.length - i));
			timeline.push(time.format());
			flow.push(data[i].taxiCount);
		}
	} 	

	leftChart.setOption({
		xAxis: {
			data: timeline
		},
		yAxis: {
			data: flow
		}
	});
}

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
 * 当容器变化时图表变化
 */
function resizeCharts() {
	leftChart.resize();
	rightChart.resize();

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
		$("#mainContainer").css('width','100%');
		$(".left-chart").css({'width':'92%','margin':'0 auto'});
		$("#float").removeClass().addClass('content-top');
		$("#percent").removeClass().addClass('content-bottom');
	} else {
		$("#mainContainer").css('width','88%');
		$(".left-chart").css({'width':'82%','margin':'0 10% 5% 8%'});
		$("#float").removeClass().addClass('content-left');
		$("#percent").removeClass().addClass('content-right');
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

/**
 * 格式化显示在柱状图的时间
 * @return {[type]} [description]
 */
Date.prototype.format = function () { 
  return this.getHours()+":"+this.getMinutes()+":"+this.getSeconds()
}

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