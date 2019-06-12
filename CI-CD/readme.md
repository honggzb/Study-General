## Deploying an Angular App on a Google VM Using Bitbucket Pipelines

![](https://i.imgur.com/Am1eQHV.png)

1. Copy the code files to the server
2. Run the build and deploy scripts
3. Repeat the same on each server. Sometimes teams have multiple servers for each stage

```shell
# Sample build file - YAML Deployment Script
# @author Suren Konathala
# -----
image: node:8
pipelines:
  default:
- step:
     caches:
       - node
     script: # Modify the commands below to build your repository.
       - echo "$(ls -la)"
       - npm install
       - npm install -g @angular/cli
       - ng build --prod
       - echo "$(ls -la dist/)"
       - scp -r dist/ user@34.73.227.137:/projects/commerce1
```

> [Deploying an Angular App on a Google VM Using Bitbucket Pipelines](https://dzone.com/articles/deploying-an-angular-app-on-a-google-vm-using-bitb?utm_campaign=NG-Newsletter&utm_medium=email&utm_source=NG-Newsletter_304)
