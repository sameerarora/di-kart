docker build --no-cache -t auth-service:latest .

eval $(minikube -p minikube docker-env)

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml