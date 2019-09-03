// Add a custom font
Highcharts.createElement('link', {
	href: '//fonts.googleapis.com/css?family=Montserrat',
	rel: 'stylesheet',
	type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Create the theme
// http://colorbrewer2.org/ for colors options
Highcharts.theme = {
    //1) different color pallette
    //default tableau pallette
    // colors: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#CFECF9', '#7F7F7F', '#BCBD22', '#17BECF'],

    //diverging colors from colorbrewer
     //colors: ['rgb(178,24,43)','rgb(239,138,98)','rgb(253,219,199)','rgb(224,224,224)','rgb(153,153,153)','rgb(77,77,77)'],

    //sequential colors
    colors: ['rgb(241,238,246)','rgb(208,209,230)','rgb(166,189,219)','rgb(116,169,207)','rgb(54,144,192)','rgb(5,112,176)','rgb(3,78,123)'],
    //new PS colors
    //gradient
    // colors: ['#E80A89', '#F05A28'],
    //blue
    // colors: ['#1A3A68','#4464AD','#527ACC','#B8DCFF' ],
    //blue - orange
    // colors: ['#F05A28','#4464AD' ],
    //2) Linear Gradient theme
    chart: {
        backgroundColor:
        {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
            ]
        },
    },
    title: {
        style: {
            color: '#343436',
            font: '22px Montserrat, sans-serif'

        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: '12px Montserrat, sans-serif'
        }
    },
    credits: {
      enabled: false
    },
    legend: {
        itemStyle: {
            font: '9pt Montserrat, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }
    }
};

//3) Apply the theme
Highcharts.setOptions(Highcharts.theme);