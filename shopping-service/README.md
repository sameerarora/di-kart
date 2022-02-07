docker run --name local_mongo -d -p 127.0.0.1:27017:27017 mongo

yarn run watch

minikube service --url mongo-db[service-name]
9650278702 Bhim

minikube service --url gateway-svc-tyk-ce-tyk-headless