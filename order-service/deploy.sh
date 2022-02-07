eval $(minikube -p minikube docker-env)

docker build --no-cache -t order-service:latest .


kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml