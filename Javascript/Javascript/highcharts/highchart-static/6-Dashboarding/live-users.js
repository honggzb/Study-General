function buildUsers() {
    var chart;
    var options;
    var dataSource = 'getUserData.php?format=json';
    var chartHeight = window.innerHeight / 2;

    function requestData() {
        $.ajax({
            url: dataSource,
            success: function (points) {
                console.log(points[0]);
                console.log(points[1]);
                chart.xAxis[0].setCategories(points[0]);
                chart.series[0].setData(
                    points[1],
                    true
                );
                // refresh after X miliseconds
                setTimeout(requestData, 1000);
            },
            cache: false
        });
    }
    $(document).ready(function () {
        //add our div for the chart
        $("#container").append("<div id=chart-top-users style='width:45%; float:left; margin:10;'></div>");
        options = {
            chart: {
                renderTo: 'chart-top-users',
                defaultSeriesType: 'bar',
                events: { load: requestData },
                animation: { duration: 1000 },
                height: chartHeight
            },
            tooltip: { enabled: false },
            title: { text: 'Total Messages Sent' },
            xAxis: { categories: [] },
            yAxis: {
                title: {
                    text: '',
                    margin: 10
                },
                labels: { enabled: false },
                gridLineWidth: 0
            },
            series: [{
                showInLegend: false,
                dataLabels: {
                    enabled: true
                },
                data: [],
            }]

        } //end options
        chart = new Highcharts.Chart(options);
    }); //end document.ready

}