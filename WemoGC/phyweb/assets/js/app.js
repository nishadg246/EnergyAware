var r=[];
var d;
var pwr=[];
var eng=[]
var on=[]
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
var swi = getUrlVars()["switch"];
// element = document.getElementById("ep");
// element.innerHTML = "2.0"
function send(){
    $.post("http://www.nishadg.com:8081",
    {
        Instruct: "switch ".concat(swi)
    },
    function(data, status){
    });
}
button=document.getElementById("clack")
button.addEventListener("click", send,false);
swiname=document.getElementById("swiname")
swiname.innerHTML=swi

$.getJSON('http://www.nishadg.com:8081', function(data) {

  d=data;
  console.log(d);
  console.log(d[swi][0].length);
  for (var i=0; i<d[swi][0].length; i++)
{
    pwr.push(d[swi][0][i]);
}
  for (var i=0; i<d[swi][1].length; i++)
{
    eng.push(d[swi][1][i]);
}
  for (var i=0; i<d[swi][2].length; i++)
{
    on.push(d[swi][2][i]);
}  
  $('#container1').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Power Readings for '.concat(swi)
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
                data: pwr
            }]
        });
    $('#container2').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Energy Usage for '.concat(swi)
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
                data: eng
            }]
        });
      $('#container3').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Time On for '.concat(swi)
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
                data: on
            }]
        });
    });



