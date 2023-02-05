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

###### Configure tls

install cert-manager:

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.11.0/cert-manager.crds.yaml

helm install \
  cert-manager jetstack/cert-manager \
  --namespace default \
  --version v1.11.0 \
  --set installCRDs=true
   
kubectl apply -f cert/selfsigned-cluster-issuer.yaml
kubectl apply -f cert/selfsigned-ca.yaml
```

###### Use Ingress to access the React app:
$ cd front/ \
$ kubectl apply -f course-ui-ingress.yaml \
Add 127.0.0.1 my-course.com to the /etc/hosts \
Open the browser and use my-course.com to access

### Network Policy

###### 1. policy-deny-all
unless there are other network rules applied, no pod can communicate with any other pod. \
$ kubectl apply -f policy-deny-all.yaml 

###### 2. db-allow
allow traffic only from the api pod to the mysql pod \
$ kubectl apply -f db-allow.yaml

###### 3. api-allow
allow traffic only from the frontend pod to the api pod \
$ kubectl apply -f api-allow.yaml
\
Use the combination of network policies 1 to 3 to secure the application

###### 4. DENY all traffic from other namespaces (current namespace: default)
deny all the traffic from other namespaces while allowing all the traffic coming from the same namespace the pod deployed to \
$ kubectl apply -f deny-from-other-namespaces.yaml \
\
If you deploy the application in another namespace (e.g. ns-course), please change the configuration in the yaml file accordingly.

### RBAC

`kubectl apply -f role_control.yaml`

create 2 Role and 1 ClusterRole

create 3 service accounts binded to roles.


### Credit:
Original project (no deployment):  https://github.com/Allirey/test_task134
