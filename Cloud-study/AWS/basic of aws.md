[AWS Developer: The Big Picture- Ryan Lewis](#top)
[AWS Developer: Getting Started- Ryan Lewis](#top)

- [AWS Networking and Compute Essentials](#aws-networking-and-compute-essentials)
  - [VPC](#vpc)
  - [Amazon Simple Storage Service S3](#amazon-simple-storage-service-s3)
- [AWS vs. the Rest](#aws-vs-the-rest)
- [Core Services of AWS](#core-services-of-aws)
  - [Elastic Cloud Compute (EC2)](#elastic-cloud-compute-ec2)
  - [Simple Storage Service (S3)](#simple-storage-service-s3)
  - [Relational Database Service (RDS)](#relational-database-service-rds)
  - [Route53](#route53)
  - [Tools adminstration](#tools-adminstration)
  - [Virtual Machine with EC2 and VPC](#virtual-machine-with-ec2-and-vpc)
- [Hosting all with S3](#hosting-all-with-s3)
  - [S3](#s3)
  - [using CLI](#using-cli)
  - [using sdk](#using-sdk)
  - [CORS in S3](#cors-in-s3)
  - [Accessing S3 with EC2](#accessing-s3-with-ec2)
- [Two database with RDS and DynamoDB](#two-database-with-rds-and-dynamodb)
  - [RDS](#rds)
  - [DynamoDB](#dynamodb)
- [Automate Deployment- Elastic Beanstalk and CloudFormation](#automate-deployment--elastic-beanstalk-and-cloudformation)
- [Speeding up- CloudFront and ElastiCache](#speeding-up--cloudfront-and-elasticache)

 ## General Concepts

 ### Cloud Computing

 Cloud computing is a term broadly used to define the **on-demand dilivery** of IT resoureces and applications via the internet, **with pay-as-you-go** pricing

- three types of cloud
  - ![](https://i.imgur.com/9O68mw3.png)
- three categories in cloud computing
  - ![](https://i.imgur.com/negQCko.png)
- Shared Responsiblility Model
  - ![](https://i.imgur.com/S7IycEI.png)

### AWS Global Infrastructure

https://aws.amazon.com/about-aws/global-infrastructure/regions_az/?p=ngi&loc=2

**Geographic Infrastructure**

- AWS Regions: 21
  - Availability Zones: 66
    - Data Center

![](https://i.imgur.com/fT5Pcj8.png)

**Edge Locaions**

Local points of present that support AWS services like

- Amazon Route 53(DNS)
- Amazon CloudFront(Content Delivery Network)
- AWS Web Applicaion Firewall(WAF)
- AWS Shield(Anit-DDo)

![](https://i.imgur.com/yPKPYYj.png)

**AWS Foundataion Services**

![](https://i.imgur.com/vfvY5u1.png)

- **AWS Platform Services**
- **AWS Enterprise Applications**

[back to top](#top)

## AWS Networking and Compute Essentials

### VPC

- Private isolated section of the AWS Cloud, complete Control of your networking
- Working on:
  - Launch instances(Virutal Machines) into a subnet
  - Assign custom IP addresses in each subnet
  - Configure route tables bwtween subnets
  - Create Internet gateway and attach it to VPC
  - create better security over AWS resource
- Connecting VPC with data centers
  - VPN Connectivity
  - AWS Direct Connect
- VPC Documentation Guide
  - https://docs.aws.amazon.com/vpc/index.html
  - https://aws.amazon.com/quickstart/architecture/vpc/
  - https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  - https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html

### Amazon Simple Storage Service S3

- **AWS Kubernetes EKS Service:**
  - https://eksworkshop.com/introduction/
  - https://s3.amazonaws.com/aws-quickstart/quickstart-amazon-eks/doc/amazon-eks-architecture.pdf
  - https://aws.amazon.com/getting-started/projects/deploy-kubernetes-app-amazon-eks/
  - https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
  - https://github.com/awsdocs/amazon-eks-user-guide/blob/master/doc_source/install-kubectl.md
  - https://github.com/weaveworks/eksctl
  - https://medium.com/faun/learning-kubernetes-by-doing-part-1-setting-up-eks-in-aws-50dcf7a76247
- **AWS AutoScaling:**
  - https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html
- **AWS CloudFormation:**
  - https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide//Welcome.html

[back to top](#top)

## AWS vs. the Rest

```
   Cloud Services     | advantages| disadvantages
----------------------|-----------------------------------
Microsoft Azure(2010) | need Windows Virtual Machines
                      | working with .NET applications
IBM Bluemix(2014)     | provider independent
  (CloudFoundry)      | training and skills to be portable
Heroku(2007)          | deployment is dead simple

```

[back to top](#top)

## Core Services of AWS

### Elastic Cloud Compute (EC2)

- Amazon EC2 is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.
- Elastic meaning that computing service can expand and retract as needed
- like virtual machine that can
  - Run application
  - Virtual Desktop
  - 3rd party sofware
  - Computing
- Basic unit of EC2: EC2 instance
- Amazon Machine Image(AMI): Operating system + software used on an EC2 instance

### Simple Storage Service (S3)

- AWS's static file hosting service which can used in conjunction with EC2 and also by itself

### Relational Database Service (RDS)

### Route53

- DNS service that empower your EC2 instances and S3 buckets to be accessible via URLs


```
aw configure
```

### Tools adminstration

- IAM: configuring and managing users and access
- CloudWatch: setting alarms & notifications in response to event and logging

![](https://i.imgur.com/zff)

### Virtual Machine with EC2 and VPC

- VPC: partition resources in the cloud
- EC2(Elastic Cloud Compute): deploy virtual machines
  - EC2 Instance Parameters: CPU, Memory, Storage, Network
  - EC2 Instance types:
    - General purpose
    - Compute purpose
    - Memory Optimized
    - Storage Optimized
- AMI(Amazon Machine Image): operating system + software installed on EC2 instance
- EBS(Elastic Block Store): Independent storage volumes used with EC2 intances
- Elastic IP: **public IP** addresses that are created, destroyed, and assigned independently

![](https://i.imgur.com/eqRDjXd.png)

- [Demo project for AWS Developer: Getting Started on Pluralsight](http://github.com/ryanmurakami/pizza-luvrs)

```shell
# connecting to an EC2 instance
chmod 400 ~/Downloads/pizza-keys.pem
ssh -i ~/Downloads/pizza-keys.pem ec2-user@52.42.32.252  # ssh -i <pem-file> ec2-user@<ec2-ip>
# update and deploy
sudo yum update
## install nodejs
curl --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum install -y nodejs
node -v
## transfer demo application doce to EC2 instance
exit
cd ~/Code/pizza-luvrs
rm -r node_modules
scp -r -i ~/Downloads/pizza-keys.pem ./pizza-luvrs ec2-user@52.42.32.252:/home/ec2-user/pizza-luvrs
ssh -i ~/Downloads/pizza-keys.pem ec2-user@52.42.32.252  #login instance
ls
cd pizza-luvrs
npm install
npm start
## scaling - setup Load Balance
 # 1) create an AMI from EC2 Instance(in EC2 dashboard)
 # 2) create load balancer in EC2 dashboard:
 # 3) create auto-scaling Group in EC2 dashboard:
 # 4) Scaling policy
```

- Simulate load on the load balancer(ways to generate requests)
  - open in browser without browser cache
  - user JMeter
  - Use Apache Benchmark

```shell
# using apache benchmark to simulate
ab -n 100 -c 5 http://pizza-loader-491461141.us-west-2.elb.amazonaws.com/
```

[back to top](#top)

## Hosting all with S3

### S3

- Simple Storage Service
- S3 stores Objects in the region you specify
  - Object is basically a file and metadata(include things like File Type, Modified Date)
  - maximum object size in S3 is 5 terabytes
- S3 Bucket
  - region:
  - Bucket Name
  - URL

**methods of uploading Objects to S3**

Console| CLI|SDK
---|---|---
Adhoc or small number of file uploading| recursive, Directory uploading| Dynamic in code uploading

### using CLI

```shell
# 1. create a bucket in dashboard
#    AWS Policy Generator: https://awspolicygen.s3.amazonaws.com/policygen.html
# 2. Uploading Objects to S3 bying CLI
aws s3 cp ./assets/js s3://pizza-luvrs-ryan-lewis/js/ --exclude ".DS_Store" # ignore .DS_Store files for Mac
# aws s3 cp <local_folder> s3://<bucket><remoter_folder> -- recursive --exclude "<pattern>"
```

### using sdk

```javascript
//imageStoreS3.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports.save = (name, data, callback) => {
  let params = {
    Bucket: 'pizza-luvrs-ryan-lewis',
    Key: `pizzas/${name}.png`,
    Body: new Buffer(data, 'base64),
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  s3.putObject(params, (err, data) => {
    callback(err, `//s3-us-west-2.amazonaws.com/pizza-luvrs/rayan-lewis/${parmas.Key}`)
  })
}
//imageStore.js
const fileStore = require('./imageStoreFile'),
      s3Store = require('./imageStoreS3);
function saveImage(name, base64String, callback) {
  let imageData = base64String.split('data:image/png;base64,')[1];
  fileStore.save(name, imageData, callback);
}
module.exports.saveImage = saveImage;
```

[back to top](#top)

### CORS in S3

S3 dashboard -> 'Properites' -> expand 'Permissions' -> 'Add CORS Configuration'

### Accessing S3 with EC2

- assign IAM role to newly launched Instances

[back to top](#top)

## Two database with RDS and DynamoDB

```
    DynamoDB         |      RDS
---------------------|----------------------
Storage Flexibility  | Query Flexibility
```

### RDS

- RDS(Relational Database Service):
  - Software upgrades
  - nightly database backups
  - monitoring
  - Multi-AZ deployment: database replication to different availability Zone
- RDS Instance Architecture
  - ![](https://i.imgur.com/hqnUeE4.png)

```javascript
// pizzas.js
const _ = require('lodash),
      Pizza = require('../models/pizza'),
      ImageStore = require('../lib/imageStore'),
      PizzaStore = require('./pizzaStore');
function createPizza(name, toppings, img, username, callback) {
  ImageStore.saveImage(name.replace(/ /g, '-'), img, (err, imgUrl) => {
    if(err) throw err;
    let pizza = new Pizza(name, toppings, imgUrl, username);
    PizzaStore.create(pizza).then(() => {
      callback(null, pizza);
    });
  });
}
//for mocks that don't need pizza images saved
function importPizza(){
  let pizza = new Pizza(name, toppings, imgUrl, username);
  //pizzas[pizza.id] = pizza;
  PizzaStore.create(prepPizza(pizza));
}
function getPizzaForUser(username, callback) {
  // let userPizzas = _.filter(pizzas, (pizza) => {
  //   return pizza.username === username;
  // });
  // callback(null, userPizzas);
  PizzaStore.findAll({
    //where: { username: username },
    order: [['created', 'DESC']],
    limit: 4
  }).then((pizza) => {
    callback(null, debreifPizzas(pizzas));
  });
}
function getPizza(pizzaId, callback) {
  // if(!pizzas[pizzaId]) callback('Pizza not found');
  // else callback(null, pizzas[pizzaId]);
  PizzaStore.find({
    where: { id: pizzaId }
  }).then((pizza) => {
    if(!pizzas[pizzaId]) callback('Pizza not found');
    else callback(null, debriefPizza(pizza));
  })
}
module.exports = {
  createPizza,
  importPizza,
  getPizzaForUser,
  getPizza
}
//pizzaStore.js
const Sequelize = require('sequelize');  // for postgres database
const database = 'pizza_luvrs';
const host = 'pizza-db.cax7afkasjf.us-west-2.rds.amazonaws.com',
      username = '',
      password = '';
const pgClient = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres'
});

const Pizza = pgClient.define('pizza', {
  id: { type: Sequelize.STRING, primaryKey: true},
  name: { type: Sequelize.STRING },
  toppings: { type: Sequelize.STRING },
  img: { type: Sequelize.STRING },
  username: { type: Sequelize.STRING },
  created: { type: Sequelize.BIGINT }
});
Pizza.sync().then(() => {
  console.log('Postgres connection ready.');
});
module.exports = Pizza;
```

[back to top](#top)

### DynamoDB

**Struture of DynaomDB**

![](https://i.imgur.com/LXy28xD.png)

- Provisioned capacity
- connect to dynamoDB

```javascript
//dynamoStore.js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});
const dynamodb = ne AWS.DynaomDB();
function putItem(table, item, callback) {
  let params = {
    TableName: table,
    Item: {}
  };
  for(let key of Object.keys(item)) {
    let val;
    if(typeof item[key] === 'string') {
      val = { S: item[key]};
    } else if(typeof item[key] === 'number') {
      val = { N: '' + item[key]};
    } else if(item[key] instanceof Array) {
      val = { SS: item[key]};
    }
    params.Item[key] = val;
  }
  dynamodb.putItem(params, callback);
}
function getAllItems(table, callback) {
  let params = {
    TableName: table
  };
  dynamodb.scan(params, callback);
}
function getItem(table, idName, id, callback) {
  let params = {
    TableName: table,
    Key: {}
  };
  params.Key[idName] = { S: id };
  dynamodb.getItem(params, callback);
}
module.exports.putItem = putItem;
module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
```

[back to top](#top)

## Automate Deployment- Elastic Beanstalk and CloudFormation

- CloudFormation: auto create infrastructure of resources
  - CloudFormation Template
    - ![](https://i.imgur.com/c1GKlsk.png)
    - json file that contains configuration information for AWS resources, and how they relate
    - can be used in version control
    - no limit to amount of resources
  - CloudFormation Stack
    - ![](https://i.imgur.com/bfmTwq0.png)
    - a group of AWS resources created by a single CloudFormation Template
    - a CloudFormation Template can used to create more than one stack, but each stack must be named uniquely
    - Stack operation: update, delete
  - Tools:
    - CloudFormation Designer: create CloudFormation Template
    - CloudFormer: create CloudFormation Template based on existing infrastructure
- Elastic Beanstalk: auto deployment application
  - Scaling, Monitoring, Resource Provisioning

```
                 Application Deployment Steps
                          Manual | Elastic Beanstalk
 Upload new code to EC2 instance | Upload new code
                      Create AMI |
       Update Load Configuration |
       Update Auto-Scaling Group |
 Terminate out-of-date Instances |
```

[back to top](#top)

## Speeding up- CloudFront and ElastiCache

- CloudFront:
  - global CDN Service to reduce latency and application load
  - integrates with S3, EC2, and load balancers
  - ![](https://i.imgur.com/LHRXW4o.png)
- ElastiCache: in-memory cache dataSource service
  - manged maintenance, upgrades
  - automatic read replicas
  - simple node management
  - ![](https://i.imgur.com/yuuXzt0.png)
  - using hapi library

```javascript
//index.js- define
const Hapi = require('@hapi/hapi')
const server = Hapi.Server({
  cache: [{
    name: 'redis',
    engine: require('catbox-redis'),
    host: 'pizza-cluster.xxx.xxx.usw2.cache.amazonaws.com',
    partition:  'cache'
  }]
});
server.connection({port: process.env.PORT || 3000});
// plugins.js- use cache server
// setup cache
const cache = server.cache({
  cache: 'redis',
  segment: 'sessions',
  expiresIn: 24 * 60 * 60 * 1000
});
server.app.cache = cache;
```

[back to top](#top)

> Reference
- [AWS Service Health Dashboard](http://status.aws.amazon.com/)
- https://calculator.s3.amazonaws.com/index.html
