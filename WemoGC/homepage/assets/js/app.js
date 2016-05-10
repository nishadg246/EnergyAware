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
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

$.getJSON('http://www.nishadg.com:8081', function(data) {

  d=data;
  sw = document.getElementById("swis");
var temp = Object.keys(d)
t=""
console.log(temp)
  for (var i=0; i<temp.length; i++)
{
    if(temp[i]!="total"){
        t=t.concat("<a href='file:///Users/ngothosk/Documents/WemoGC/phyweb/index.html?switch=".concat(temp[i].toString()).concat("'>").concat(temp[i].toString()).concat("</a><br>"));

    }
}
sw.innerHTML=t
  console.log(d);
  var pwr=[];
var eng=[]
var on=[]
  for (var i=0; i<d["total"][0].length; i++)
{
    pwr.push(d["total"][0][i]);
}
  for (var i=0; i<d["total"][1].length; i++)
{
    eng.push(d["total"][1][i]);
}
  for (var i=0; i<d["total"][2].length; i++)
{
    on.push(d["total"][2][i]);
} 
cost = eng[eng.length - 1] * .06
prop = (pwr[0]-pwr[pwr.length - 1])/pwr[0]
st = document.getElementById("stats");
st.innerHTML = "Total Cost of Energy Today: $".concat((Math.round(cost * 100) / 100).toString())
ep = document.getElementById("ep");
ep.innerHTML = "Energy Proportionality: ".concat((Math.round(prop * 100) / 100).toString())
  $('#container1').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Total Power Readings'
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
                text: 'Energy Usage'
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
    });



