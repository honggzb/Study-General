function buildTrend() {
    var chart;
    var dataSource = 'getTrendData.php?format=json';
    var chartHeight = window.innerHeight / 2;

    function requestData() {
        $.ajax({
            url: dataSource,
            success: function (points) {
                chart.series[0].setData(
                    points,
                    true
                );
                // refresh after X miliseconds
                setTimeout(requestData, 1000);
            },
            cache: false  //did not cache data for real time reaction
        });
    }

    $(document).ready(function () {
        //add our div for the chart
        $("#container").append("<div id=chart-trend style='width:100%'></div>");
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart-trend',
                defaultSeriesType: 'spline',
                events: {
                    load: requestData
                }, //real time request
                animation: {
                    duration: 1000
                },
                height: chartHeight
            },
            title: {
                text: 'Total Messages Sent'
            },
            subtitle: {
                text: 'past 24 hours'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Hour'
                }
            },
            yAxis: {
                title: {
                    text: 'Messages',
                    margin: 10
                }
            },
            series: [{
                showInLegend: false,
                data: [],
                // pointInterval: 3600*1000 //minute
            }]
        }); //end chart
    }); //end document.ready

}