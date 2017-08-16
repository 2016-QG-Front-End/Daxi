$(function() {
    $('.searchPlace').bind('blur', function() {

        
        // var range = getBoundary('广州');
        var local = new BMap.LocalSearch('广州', {
          renderOptions:{
                map:map,
            }
        });
        // if(local) {
        //     local.clearResults();
        // }
        map.clearOverlays();//清除图层覆盖物
        local.search($('.searchPlace').val());

        // alert(local.getResults());
        
    });

    $('.searchPlace').bind('keyup', function(e) {
        var ev = window.event || e;
        //13是键盘上面固定的回车键
        if (ev.keyCode == 13) {
            $('.searchPlace').trigger('blur');
        }   
    });
    // function getBoundary(str) {
    //     var bdary = new BMap.Boundary();
    //     bdary.get(str, function(rs) { //获取行政区域
    //         // map.clearOverlays(); //清除地图覆盖物       
    //         var count = rs.boundaries.length; //行政区域的点有多少个
    //         if (count === 0) {
    //             alert('未能获取当前输入行政区域');
    //             return;
    //         }
    //         var pointArray = [];
    //         for (var i = 0; i < count; i++) {
    //             var ply = new BMap.Polyline(rs.boundaries[i], {
    //                 strokeWeight: 5,
    //                 strokeColor: "#1c62a3"
    //             }); //建立多边形覆盖物
    //             map.addOverlay(ply); //添加覆盖物
    //             pointArray = pointArray.concat(ply.getPath());
    //         }
    //         return pointArray;    //调整视野            
    //     });
    // }
})