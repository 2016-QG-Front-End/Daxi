var time = new Date(2017, 1, 3, 17, 50, 55); 
var timeline = [];
var flow = [];



resizeContainer();//根据窗口大小决定是左右布局还是上下布局
resizeAuto();//根据容器的宽度设定容器的高度


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
	var list = {
		x: longitude,		// 在地图上选择的地点的经度
  		y: latitude,		    // 在地图上选择的地点的纬度
		timeStart: start,
		timeEnd: end,
		barCount: 10
	}
    
	$.ajax({
		type: "POST",
		url: "http://192.168.1.130:10000/show/flowchange",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(list),
		dataType: "json",
		anysc: false,
		xhrFields: {
            withCredentials: true
        },
		success: function(data) {
			if(data.state == 1) {
				printFlowCharts(data.data, start, end);		
			} else if (data.state == 2) {
                alert('时间为空');
            } else if (data.state == 3) {
                alert('起始时间大于终止时间');
            } else if (data.state == 4) {
                alert('请求时间段超出范围');
            } else if (data.state == 5) {
                alert('请求时间段超出范围');
            } else if (data.state == 6) {
                alert('请求时间点太过超前');
            } else if (data.state == 7) {
                alert('区域范围为空');
            } else if (data.state == 7) {
                alert('请求坐标点为空');
            } else if (data.state == 10) {
                alert('路径的途径点为空');
            } else if (data.state == 11) {
                alert('跨天请求');
            } else if (data.state == 12) {
                alert('请求参数为空');
            } else if (data.state == 13) {
                alert('无法预测');
            } else if (data.state == 14) {
                alert('请求时间点非法');
            } else if (date.state == 15) {
            	alert('时间格式有误')
            } else {
            	alert('请求出现错误')
            }
 
		},
		// error: function(jqXHR, error, notmodified) {
  //               alert("查看流量错误");
  //           },
	});
	
}

/**
 * 请求预测流量变化
 */
function estimationFlowChange(start,end) {
	var list = {
		x: longitude,		// 在地图上选择的地点的经度
  		y: latitude,		    // 在地图上选择的地点的纬度
		timeStart: start,
		timeEnd: end,
		timeNow: time.Format('yyyy-MM-dd hh:mm:ss'),
		barCount: 10,
	}
    
	$.ajax({
		type: "POST",
		url: "http:192.168.1.130:8080/estimation/flowchange",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		success: function(data) {
			if(data.state == '1') {
				printFlowCharts(data.data, start, end);		
			} else if (data.state == 2) {
                alert('时间为空');
            } else if (data.state == 3) {
                alert('起始时间大于终止时间');
            } else if (data.state == 4) {
                alert('请求时间段超出范围');
            } else if (data.state == 5) {
                alert('请求时间段超出范围');
            } else if (data.state == 6) {
                alert('请求时间点太过超前');
            } else if (data.state == 7) {
                alert('区域范围为空');
            } else if (data.state == 7) {
                alert('请求坐标点为空');
            } else if (data.state == 10) {
                alert('路径的途径点为空');
            } else if (data.state == 11) {
                alert('跨天请求');
            } else if (data.state == 12) {
                alert('请求参数为空');
            } else if (data.state == 13) {
                alert('无法预测');
            } else if (data.state == 14) {
                alert('请求时间点非法');
            } else if (date.state == 15) {
            	alert('时间格式有误')
            } else {
            	alert('预测流量错误')
            }
		}
	});
	
}

/**
 * 请求查看车辆利用率
 * @return {[type]} [description]
 */
function showUserAtio(start,end) {
	var list = {
		x: longitude,		// 在地图上选择的地点的经度
  		y: latitude,		    // 在地图上选择的地点的纬度
		timeStart: start,
		timeEnd: end,
	}

	$.ajax({
		type: "POST",
		url: "http://192.168.1.140:8080/show/useratio",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		anysc: false,
		success: function(data) {
			if(data.state == 1) {
				printPieChart(data.data);		
			} else if (data.state == 2) {
                alert('时间为空');
            } else if (data.state == 3) {
                alert('起始时间大于终止时间');
            } else if (data.state == 4) {
                alert('请求时间段超出范围');
            } else if (data.state == 5) {
                alert('请求时间段超出范围');
            } else if (data.state == 6) {
                alert('请求时间点太过超前');
            } else if (data.state == 7) {
                alert('区域范围为空');
            } else if (data.state == 7) {
                alert('请求坐标点为空');
            } else if (data.state == 10) {
                alert('路径的途径点为空');
            } else if (data.state == 11) {
                alert('跨天请求');
            } else if (data.state == 12) {
                alert('请求参数为空');
            } else if (data.state == 13) {
                alert('无法预测');
            } else if (data.state == 14) {
                alert('请求时间点非法');
            } else if (date.state == 15) {
            	alert('时间格式有误')
            } else {
            	alert('请求出现错误')
            }
		},
		// error: function(jqXHR, error, notmodified) {
  //               alert("查看车辆利用率失败");
  //           },


	});
}

/**
 * 请求预测车辆利用率
 */
function estimationUserAtio(start,end) {
 
	var list = {
		x: longitude,		// 在地图上选择的地点的经度
  		y: latitude,		    // 在地图上选择的地点的纬度
		timeStart: start,
		timeEnd: end,
		timeNow: time.Format('yyyy-MM-dd hh:mm:ss'),
	}

	$.ajax({
		type: "POST",
		url: "http://192.168.1.140:8080/estimation/useratio",
		contentType: "application/json; charset=utf-8",
		xhrFields: {
			withCredentials: true
		},
		data: JSON.stringify(list),
		dataType: "json",
		success: function(data) {
			if(data.state == 1) {
				printPieChart(data.data);		
			} else if (data.state == 2) {
                alert('时间为空');
            } else if (data.state == 3) {
                alert('起始时间大于终止时间');
            } else if (data.state == 4) {
                alert('请求时间段超出范围');
            } else if (data.state == 5) {
                alert('请求时间段超出范围');
            } else if (data.state == 6) {
                alert('请求时间点太过超前');
            } else if (data.state == 7) {
                alert('区域范围为空');
            } else if (data.state == 7) {
                alert('请求坐标点为空');
            } else if (data.state == 10) {
                alert('路径的途径点为空');
            } else if (data.state == 11) {
                alert('跨天请求');
            } else if (data.state == 12) {
                alert('请求参数为空');
            } else if (data.state == 13) {
                alert('无法预测');
            } else if (data.state == 14) {
                alert('请求时间点非法');
            } else if (date.state == 15) {
            	alert('时间格式有误')
            } else {
            	alert('请求出现错误')
            } 
		},
		// error: function(req) {
		// 	alert("预测车辆利用率失败")
		// }
	});
}



/**
 * 请求得到值之后，给柱状图折线图赋值
 */
function printFlowCharts(data, start, end) {
	var gap = ((new Date(end)).getTime() - (new Date(start)).getTime())/10 
	//假如时间轴数组为空而且不是处于查看状态，则表示该数组第一次进行动态请求，要重新赋十条柱子的值
	if((timeline == '') && (!isCheck)){
		for(var i = 0; i < data.length; i++) {
			var time = new Date(new Date(end).getTime() - gap*(data.length - i));
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
			var time = new Date(new Date(end).getTime() - gap*(data.length - i));
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
