# INSTALLATION INSTRUCTION

## PREREQUISITE 
Make sure the following packages are installed 

- Docker
- Docker-composE
- Git

git clone this repository then follow the instructions listed below

## SET UP
1. cd into pezesha using `cd pezesha`
2. Pull the required images with `docker-compose pull`
3. Run `docker-compose build --no-cache`
4. Run `docker-compose up -d` to run in detached mode
5. To view the logs run `docker-compose logs -f`



## Deployment link
[Deployment link](http://ec2-3-17-162-236.us-east-2.compute.amazonaws.com/)