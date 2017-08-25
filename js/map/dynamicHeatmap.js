
            var i = 1;
            setInterval(function() {
                    var points;
                    var url = 'http://127.0.0.1:80/JSON/' + i + '.json';

                    $.get(url, function(data) {
                            points = data.option.map(function(bir) {
                                return bir;
                            });
                            // console.log(points);
                            heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius":10 });
                            map.addOverlay(heatmapOverlay);
                            heatmapOverlay.setDataSet({ data: points, max: 10 });
                            // setGradient();

                            function setGradient() {
                                var gradient = {
                                    0: '#4a4afd',
                                    0.25: '#51fdfd',
                                    0.5: '#73ff73',
                                    0.75: '#ffff5e',
                                    1: '#ff5454'
                                };
                                var colors = document.querySelectorAll("input[type='color']");
                                colors = [].slice.call(colors, 1);
                                colors.forEach(function(ele) {
                                    gradient[ele.getAttribute("data-key")] = ele.value;
                                });
                                heatmapOverlay.setOptions({ "gradient": gradient });
                            }
                        });
                        setTimeout(function() {
                            heatmapOverlay.hide();
                        }, 4500); i++;
                        excpectionAdd(0);
                    }, 5000)