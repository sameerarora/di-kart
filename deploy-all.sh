#!/bin/bash

kubectl apply -f mongo/


echo "starting kafka..." '*'
docker-compose -f $PWD/kafka/docker-compose.yml up -d

echo "creating topics"
sh create-topics.sh

echo "Deploying services to kubernetes cluster"

for service_name in auth payment order shipping shopping user
do
  echo "Deploying service $service_name"
  cd "$service_name"-service
  echo $PWD
  sh deploy.sh
  cd ..
done

echo "Done!!'"