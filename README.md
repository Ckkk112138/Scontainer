# k8s deployment guidelines (React + Flask + MySQL)

### 1. MySQL Deployment:

###### Create MySQL secret:
$ kubectl apply -f mysql-secret.yaml

###### Create MySQL pvc and pv:
Create storage on hard disk before creating the volume and claim: \
$ sudo mkdir -p /opt/mysql2/data \
$ kubectl apply -f mysql-storage.yaml

###### Create MySQL deployment:
$ kubectl apply -f mysql-deployment.yaml

###### Create MySQL service (ClusterIP):
$ kubectl apply -f mysql-service2.yaml

###### Initialize Database:
$ kubectl run -it --rm --image=mysql --restart=Never mysql-client -- mysql --host mysql --password=123456 \
Initialize databse by using init_db.sql (just copy and past the contents of the file) \
Use 'exit' to quit

### 2. Flask API Deployment:

###### Go to backend_all folder:
$ cd backend_all/

###### Build Dockerfile:
$ sudo docker build . -t course-api-v3 \
Dont't forget to push it to the registry as localhost:32000/course-api-v3

###### Create Flask API deployment and service:
$ kubectl apply -f course-api-deployment.yaml \
$ kubectl apply -f course-api-service.yaml

### 3. React App Deployment:

###### Go to front folder:
$ cd front/ \
$ npm install \
$ npm run-script build \
Make sure you have the 'build' folder in your current directory

###### Build Dockerfile:
$ sudo docker build . -t course-ui:v17 \
Dont't forget to push it to the registry as localhost:32000/course-ui:v17

###### Create React deployment and service (NodePort):
$ kubectl apply -f course-ui-deployment.yaml \
$ kubectl apply -f course-ui-service.yaml \
Open the browser and use localhost:30002 to access

###### Use Ingress to access the React app:
$ cd front/ \
$ kubectl apply -f course-ui-ingress.yaml \
Add 127.0.0.1 my-course.com to the /etc/hosts
Open the browser and use my-course.com to access


### Credit:
Original project (no deployment):  https://github.com/Allirey/test_task134
