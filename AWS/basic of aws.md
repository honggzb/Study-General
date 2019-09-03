[AWS Developer: The Big Picture- Ryan Lewis](#top)

- [AWS Networking and Compute Essentials](#aws-networking-and-compute-essentials)
  - [VPC](#vpc)
  - [Amazon Simple Storage Service S3](#amazon-simple-storage-service-s3)
- [AWS vs. the Rest](#aws-vs-the-rest)
- [Core Services of AWS](#core-services-of-aws)
  - [Elastic Cloud Compute (EC2)](#elastic-cloud-compute-ec2)
  - [Simple Storage Service (S3)](#simple-storage-service-s3)
  - [Relational Database Service (RDS)](#relational-database-service-rds)
  - [Route53](#route53)

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

> Reference
- [AWS Service Health Dashboard](http://status.aws.amazon.com/)
- https://calculator.s3.amazonaws.com/index.html
