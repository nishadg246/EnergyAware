var r=[];
var d;
var tab=[];
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
var swi=getUrlVars()["switch"]
console.log(getUrlVars());
element = document.getElementById("ep");
element.innerHTML = "2.0"
$.getJSON('http://www.nishadg.com:8081', function(data) {

  d=data;
  console.log(d[swi].length);
  for (var i=0; i<d[swi].length; i++)
{
    tab.push(d[swi][i]);
}

  
  $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Power Reading for Sensor '.concat(swi)
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Power'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Power',
                data: tab
            }]
        });
    });



