# Helm3

## Setup


1. Create DB path  
`sudo mkdir -p /opt/mysql2/data`


2. Install Helm charts

```
microk8s helm3 install my-courses-chart-release my-courses-chart
```
- Don't forget to make sure that the image required for the deployment is in the microk8s repository.

3. Upgrade Helm charts

```
microk8s helm3 upgrade my-courses-chart-release my-courses-chart
```

4. Uninstall Helm charts

```
microk8s helm3 uninstall my-courses-chart-release
```


## DNS
To access the UI add the domain to `etc/hosts`:
```
127.0.0.1 my-course.com
```