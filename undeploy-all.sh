#!/bin/bash

for service_name in auth payment order shipping shopping user
do
  echo "Deleting $service_name service"
  kubectl delete service "$service_name"-service
  kubectl delete deploy "$service_name"-service
done

echo "Done!!'"