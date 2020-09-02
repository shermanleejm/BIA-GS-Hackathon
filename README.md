# BIA-GS-Hackathon
 Winner winner chicken dinner

<br>

### Install AWS CLI
#### in your aws folder navifate to 
~/.aws/credentials (Linux & Mac)
%USERPROFILE%\.aws\credentials (Windows)
#### the following lines into credentials switch with your own keys
[GS]
aws_access_key_id = 
aws_secret_access_key = 

<br>

## FOR BACK-END
### use virtual env
cd back-end; source env/bin/activate

<br>

### Copy packages to requirements
pip freeze > requirements.txt

<br>

### MAC authenticate, build, push to ECR
aws ecr get-login-password --profile GS --region ap-southeast-1 | docker login --username AWS --password-stdin 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com; docker build -t gs-hackathon .; docker tag gs-hackathon:latest 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com/gs-hackathon:latest; docker push 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com/gs-hackathon:latest

<br>

### Windows authenticate build, push to ECR
(Get-ECRLoginCommand).Password | docker login --profile GS --username AWS --password-stdin 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t gs-hackathon .
docker tag gs-hackathon:latest 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com/gs-hackathon:latest
docker push 498470885275.dkr.ecr.ap-southeast-1.amazonaws.com/gs-hackathon:latest

<br><br>

## FOR FRONT-END
### use env variables; start all env variables with REACT_APP
#### e.g. to call our API IP
process.env.REACT_APP_PUBLIC_IP

<br>

### set env variables in 
back-end/.env

<br>

### commands to set up environment is in front-end/README.md
