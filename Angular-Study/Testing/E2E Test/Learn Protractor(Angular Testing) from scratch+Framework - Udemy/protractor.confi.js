var env = require('./environment.js');
var func=require("./functionlib.js");
var SpecReporter=require('jasmine-spec-reporter').SpecReporter;    //控制台报告
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');  //html报告


exports.config = {
    //设置webdriver-manager启动的端口
    //seleniumAddress:env.seleniumAddress,
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    //使用的框架：jasmine
    framework:'jasmine',


    //command:protractor protractor.conf.js

    //specs:['./page-specs/DataManagement_specs/cd_LTE_addnewcelldata.js'],
    //specs:['./page-specs/DataManagement_specs/cd_LTE_exportcelldata.js'],
    //specs:['./page-specs/Login_specs/loginpagelayout.js'],
     //specs:['./page-specs/Dashboard_specs/dashbordlayout.js'],
    specs:['./page-specs/SoftwareManagement_specs/sc_config_om_parameter.js'],
    //specs:['./page-specs/Login_specs/login_normal.js'],
    //specs:['./page-specs/SystemMonitor_specs/el_count_categoryCGIEL_log.js'],
    //specs:['./page-specs/DataManagement_specs/cd_LTE_addnewcelldata.js'],




    //要安装firefox相应的driver
    capabilities: {
        browserName: 'chrome',
        //browserName:'firefox'
    },

    /* //同时运行多个浏览器的配置
    multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }],*/

    //chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.46',
    //geckoDriver:'./node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.24.0',
    //firefoxPath:'./proj/SMPC/ccenv/products/3rd/firefox/firefox',

    /*测试组件的配置，一行命令运行两个用例：login_normal和login_errpswd*/
    //command:protractor protractor.conf.js --suite login_normal,login_errpswd

    suites: {
        //login_normal:'./page-specs/'+func.readExcel(env.excelpath,'Testcasename','A2'),
        //login_errpswd:'./page-specs/'+func.readExcel(env.excelpath,'Testcasename','A3'),
        //login:['./page-specs/Login_specs/login_json.js'],
        //login:['./page-specs/Login_specs/login.js'],
        omconfigs:['./page-specs/SoftwareManagement_specs/sc_config_om_parameter.js'],

    },
    //getPageTimeout:20000,
    //allScriptsTimeout:20000,

    //allScriptsTimeout: 30000,
    jasmineNodeOpts:{
        showColors:true,
        defaultTimeoutInterval:600000
    },

    onPrepare: function() {

        // Override the timeout for webdriver.
        //browser.manage().timeouts().setScriptTimeout(30000);

        //html报告的配置
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath:'./reporter/html',
                takeScreenshots:true,
                takeScreenshotsOnlyOnFailures: true,
                filePrefix:'index',
                fileNameDateSuffix: true,
                cleanDestination:false
            }),

        );

        //控制台报告的配置
        jasmine.getEnv().addReporter(
            new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));


        /*  //layout对比配置
        const  PixDiff=require('pix-diff');
        browser.pixDiff=new PixDiff({
            basePath:'./Layoutcomparision/baseline/',
            diffPath:'./Layoutcomparision/',
            baseline:true,
            formatImageName:'{tag}-{browserName}-{width}x{height}-dpr-{dpr}'
        });*/

    }
};