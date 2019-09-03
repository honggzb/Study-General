[Real-time Web Dashboards with Highcharts-Ben Sullins](#top)

- [Anaotmy of a Chart](#anaotmy-of-a-chart)
  - [type of charts](#type-of-charts)
- [Create a Node.js Express Application on a CodeAnywhere Ubuntu 14.04 Container](#create-a-nodejs-express-application-on-a-codeanywhere-ubuntu-1404-container)
  - [Node.js and Express](#nodejs-and-express)
  - [Codeanywhere MySQL Setup( Node - Ubuntu 14.04)](#codeanywhere-mysql-setup-node---ubuntu-1404)
  - [Themes](#themes)
- [Angular and HighCharts](#angular-and-highcharts)
  - [intallation](#intallation)
  - [intergrated with Angular and highcharts](#intergrated-with-angular-and-highcharts)
  - [intergrated with Angular and highcharts-angular](#intergrated-with-angular-and-highcharts-angular)

## Anaotmy of a Chart

- ![](https://i.imgur.com/y1chMbl.png)
- http://www.highcharts.com/docs

### type of charts

- Basic:
  - bar/column
  - line/spline
  - area/areaspline
- More:
  - funnel
    - key thing, adding the extra module (intro to all the add'l modules)
    - http://www.highcharts.com/docs/chart-and-series-types/funnel-series
  - heatmap
    - add both the exporting module and heatmap
    - use simple function to update tooltip
    - http://www.highcharts.com/docs/chart-and-series-types/heatmap
  - scatterplot
    - more options for formatting and placing a legend inside the chart area
    - http://www.highcharts.com/docs/chart-and-series-types/scatter-chart
  - treemap
    - http://www.highcharts.com/docs/chart-and-series-types/treemap
- Advanced:
  - box plot
    - http://www.highcharts.com/demo/box-plot
    - add the highcharts-more.js file
    - explain what a boxplot is, it would be complicated to generate the data
  - highstock
    - basic - http://www.highcharts.com/stock/demo
  - highmaps
    - overview - http://www.highcharts.com/maps/demo/all-maps#
    - walk through connecting data to library

## Create a Node.js Express Application on a CodeAnywhere Ubuntu 14.04 Container

### Node.js and Express

Open an SSH Terminal and run the following commands:

```shell
# Download the package lists from the to get information on the newest versions of packages and their dependencies.
sudo apt-get update
# Add the NodeSource APT repository for Debian-based distributions repository AND the PGP key for verifying packages. Note: this is for Node 6.x
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
# Install Node.js from the Debian-based distributions repository
sudo apt-get install -y nodejs
# Get the most up-to-date npm
sudo npm install npm --global
#Install the application generator with the following command:
sudo npm install express-generator -g
#Creating an Express application
#The Express application generator has several command line options that can be displayed with the -h option(view option to add view engine support):
express -h
# Create a skeleton application with the express application generator using the Vash view engine with the following command:
# 1) vash view engine
express --view=vash myapp
# 2) jade view engine
express myapp

# Once the skeleton application has been created, the node packages will need to be installed.
# Change directory to the application directory
cd myapp
# Install the node packages
npm install
# To run the application, use the following command:
DEBUG=myapp:* npm start
# To test that the application is running within the container, open another SSH Terminal window and run the curl command:
curl http://127.0.0.1:3000
```

- [Create a Node.js Express Application on a CodeAnywhere Ubuntu 14.04 Container](http://jsdev.wikidot.com/blog:9)

### Codeanywhere MySQL Setup( Node - Ubuntu 14.04)

```
/usr/bin/mysql_secure_installation
echo 'alias cli="mysql -u root -p"
alias start="sudo service mysql start"
alias stop="sudo service mysql stop"' > ~/.bash_profile
source ~/.bash_profile
```

**now be able to access the mysql shell with cli and you will be able to start and stop the mysql service with `start` and `stop`**

```
CREATE TABLE 'messages' (
  'name' varchar(255) DEFAULT NULL,
  'text' varchar(5000) DEFAULT NULL,
  'date' timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGING_InnoDB DEFAULT CHARSET=utf8;
```

### Themes

- define theme:  `Highcharts.theme = { ... }`
- apply theme:   `Highcharts.setOptions(Highcharts.theme);`

```javascript
/* 1) semi-transparent colors */
charts: {
  backgroundColor: '#E80A89',
  plotBackgroundColor: rgba(240, 90, 40, .5)
}
/* 2) Linear Gradient theme */
chart: {
  backgroundColor: {
    linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
    stops: [[0, '#E8989'],[1, '#F05A28']]
  },
},
/* 3) Radial Gradient theme */
chart: {
  backgroundColor: {
    radialGradient: {cx: 0.5, cy: 0.5, r: 0.5},
    stops: [[0, '#E8989'],[1, '#F05A28']]
  },
},
```

[back to top](#top)

## Angular and HighCharts

### intallation

```
npm install highcharts --save
npm install highcharts-angular --save
```

### intergrated with Angular and highcharts

```javascript
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-output-graph',
  templateUrl: './output-graph.component.html',
  styleUrls: ['./output-graph.component.css']
})
export class OutputGraphComponent implements OnInit {
  public options: any = {
    //...
  }
  ngOnInit(){
    Highcharts.chart('container', this.options);
  }
}
```

- [Highcharts and Angular 7](https://www.highcharts.com/blog/post/highcharts-and-angular-7/)

### intergrated with Angular and highcharts-angular

```javascript
//import module in app.module.ts
import { HighchartsChartModule } from 'highcharts-angular';
declarations: [
   //...
   HighchartsChartModule
],
//component templete and options
//1) template
<highcharts-chart
  [Highcharts]="Highcharts"
  [constructorType]="chartConstructor"
  [options]="chartOptions"
  [callbackFunction]="chartCallback"
  [(update)]="updateFlag"
  [oneToOne]="oneToOneFlag"
  [runOutsideAngular]="runOutsideAngularFlag"
  style="width: 100%; height: 400px; display: block;"
></highcharts-chart>
//2) component
import * as Highcharts from 'highcharts';
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = { ... }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  //... refer to https://github.com/highcharts/highcharts-angular#options-details
```

- [Angular Highcharts Tutorial](https://www.tutorialspoint.com/angular_highcharts/index.htm)
- https://github.com/highcharts/highcharts-angular


[back to top](#top)






My codeanywhere

```
This Codeanywhere Container comes with:
2GB of Disc Storage
256MB RAM (+ 512 MB swap)
Sudo access

SSH access on host19.codeanyhost.com -p 45560

Access to all HTTP and Websocket ports
The operating system running on this Container is Ubuntu 16.04 (64 bit) Linux distribution. Ubuntu uses Advanced Packaging Tool (apt) for updates, package and dependency management. You can read more here: apt

To access your web application over HTTP or HTTPS protocol, make sure your application is running on port 3000 and use the following link:

http(s)://honggzb-gzbhong102004.codeanyapp.com

If the port is blocked by your firewall you can connect through the standard HTTP port: (replace XX with port you have specified in your app)

http://port-XX.honggzb-gzbhong102004.codeanyapp.com
```

[How to Setup Node and MongoDB with Codeanywhere](https://www.youtube.com/watch?v=yWSmy8jVz1Q)