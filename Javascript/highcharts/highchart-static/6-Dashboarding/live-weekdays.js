function buildWeekdays(){
            var chart;
             var options;
             var dataSource = 'getWeekdayCounts.php?format=json';
             var chartHeight = window.innerHeight / 2;
    
            function requestData(){
                $.ajax({
                   url: dataSource,
                   success: function(points) {
                       chart.series[0].setData(
                            points[1],
                            true
                        );
                        
                        setTimeout(requestData, 1000);
                   },
                   cache: false
                   
                });
            }
    
    
            //build chart using options above
            $(document).ready(function(){
                
                $("#container").append("<div id=chart-weekdays style='width:45%; float:left; margin:10px;'></div>");
                
                
                options = {
                    chart: {
                        renderTo: 'chart-weekdays',
                        type: 'column',
                        events: {
                            load: requestData
                        },
                        animation: {
                            duration: 1000
                        },
                        height: chartHeight
                    },
                    title: {
                        text: 'Totals by Weekday'
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        title: {
                            text: '',
                            margin: 10
                        },
                        gridLineWidth: 0
                    },
                    series: [{
                        showInLegend: false,
                        dataLabels: {
                            enabled: true
                        },
                        data: []
                    }]
                        
                    
    
                };
                
                chart = new Highcharts.Chart(options);
                
            });
}