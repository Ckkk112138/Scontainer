# Presentation Commands

## Architecture
> Describe the architecture of the application. Describe the artifacts you created to build the docker images and to deploy the application to Kubernetes.

* Docker architecture

* Kubernetes architecture

* Application

* Show nginx CORS config  
`inventory-api/inventory-api-ingress.yaml`

* TLS  
    * Show Certificate in Browser
    * Show Secret in Kubernetes  
    `kubectl  get secrets`  
    `kubectl describe secret inventory-app-tls-secret`

## Configuration
> Show how you configured the pre-requisites for the application (Load Balancer, Service Mesh, Storage Class, Registry etc).

* Show microk8s nodes  
    * `kubectl get nodes`
    * `kubectl describe node mtfunke-vu-ubuntu`  
    (point to IP adress and CPU)

* Show microk8s status  
`microk8s status`  
(point to plugins like MetalLB and HELM3 and ISTIO)

* Show MetalLB Load Balancer  
`kubectl -n metallb-system describe configmap config`

* Show default StorageClass  
`kubectl get sc`

* Show registry  
`microk8s ctr images ls |grep localhost`

## Deployment HELM
> Show how you build the container images and publish to a registry. Show how you deploy the application. Show how to scale the application horizontally (stateless parts only). Show how to uninstall the application.

* Enter the directory /backend_all then build and tag Docker container images API
    * `sudo docker build . -t course-api-v3 --network=host`
    * `docker tag course-api-v3 localhost:32000/course-api-v3`
    * `docker push localhost:32000/course-api-v3`

* Enther the directory /frontend then build and tag Docker container images UI
    * `sudo docker build . -t course-ui:v17`
    * `docker tag course-ui:v17 localhost:32000/course-ui:v17`
    * `docker push localhost:32000/course-ui:v17`

* Install HELM chart  
`helm install my-courses-chart --generate-name`

* Scale horizontally  
`kubectl scale deployment courseapi-deployment --replicas=5`
`kubectl scale deployment course-ui-deployment -- replicas=3`


* Uninstall HELM chart  
`helm uninstall <the name of the chart>`


## Upgrade
> Show how you re-build the application after a source code change. Show how you upgrade the running application in two ways: deployment rollout and canary update.

* Implement ui change  
    * `index.html`
    * `React App to Course App`

* Build Docker Image  
    * `sudo docker build . -t localhost:32000/course-ui:v18`

* Tag and push Image for Localhost  
    * `sudo docker push localhost:32000/course-ui:v18`

* Change HELM chart appVersion
    * `my-courses-chart/charts/course-ui-chart/Chart.yaml`

* Upgrade HELM
    * `helm upgrade my-courses-chart-release my-courses-chart`

* Watch rollout
    * `kubectl rollout status deployment/course-ui-deployment`

* Canary update
    * Run two versions in paralell
    * apply (manually) deployment for canary update  
    `kubectl apply -f course-ui-deployment-canary.yaml`
    * Show labels  
    `kubectl get pods -l app=course-ui --show-labels`

