echo "Creating kafka topics for integration tests.."

for topic_name in payment shipping order-payment order-shipping
do
  echo "creating kafka topic $topic_name"
  docker-compose -f /Users/sameerarora/work/fpcomplete/signalvine/message-dispatcher/docker-compose-it.yml exec kafka kafka-topics \
  --create \
  --bootstrap-server "localhost:29092" \
  --replication-factor 1 \
  --partitions 1 \
  --topic $topic_name
done

echo "Done!!'"