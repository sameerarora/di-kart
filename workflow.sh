#Create User and create a profile
curl -X POST \
  http://di.kart.com/user-service/user \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: ae86cfac-ce11-020d-c74d-73861cf5eb18' \
  -d '{
	"firstName":"Sameer",
	"lastName":"Arora",
	"username":"sameer"
}'

curl -X PUT \
  http://di.kart.com/auth-service/credentials \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 796e4ddf-2384-092a-6689-e32d48bbf338' \
  -d '{
	"username":"sameer",
	"password":"admin"
}'

curl -X PATCH \
  http://di.kart.com/user-service/user/sameer/address \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: f83fe993-cc7c-243b-7716-8f448bc59c43' \
  -d '{
	"addressLine1":"100",
  	"addressLine2":"Park Avenue",
  	"city":"seattle",
  	"state":"WA",
  	"pincode":122018
}'

curl -X PATCH \
  http://di.kart.com/user-service/user/sameer/payment \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: dfecc5e3-b0f8-1db2-03bf-f2801ba25400' \
  -d '{
	"name":"Paytm",
	"type":"wallet",
	"validity":"21/01/2024"
}'

#Shopping flow starts

curl -X GET \
  http://di.kart.com/shopping-service/categories \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 0f5aa12b-398f-62b1-5be9-b9bddacfac9f'

curl -X GET \
  http://di.kart.com/shopping-service/products/earphones \
  -H 'cache-control: no-cache' \
  -H 'postman-token: d4a57e5d-0c29-d279-b59a-a4db805c9dbf'

curl -X PUT \
  http://di.kart.com/shopping-service/cart \
  -H 'authorization: eyJhbGciOiJIUzI1NiJ9.c2FtZWVy.hyDd4SMRSLP3qXq_HAdoyPHjlZC5rGWNqBBeSQx7sn8' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 011d0d2e-a1ec-8f05-e1b2-c4ec4e9b2b8c' \
  -d '{
        "name": "Jabra",
        "price": 10500,
        "quantity": 1
    }'

curl -X POST \
  http://di.kart.com/auth-service/authenticate \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 009bb1fa-04da-1808-879e-75e92d2ca09d' \
  -d '{
	"username":"sameer",
	"password":"admin"
}'

curl -X GET \
  http://di.kart.com/shopping-service/cart \
  -H 'authorization: eyJhbGciOiJIUzI1NiJ9.c2FtZWVy.hyDd4SMRSLP3qXq_HAdoyPHjlZC5rGWNqBBeSQx7sn8' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 7b6ce833-8a8c-8a8a-d489-af696b009730'

curl -X POST \
  http://di.kart.com/order-service/checkout \
  -H 'authorization: eyJhbGciOiJIUzI1NiJ9.c2FtZWVy.hyDd4SMRSLP3qXq_HAdoyPHjlZC5rGWNqBBeSQx7sn8' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 4abbeb3c-31bd-a2aa-7a10-2808ec9e60ec' \
  -d '{
	"username": "sameer",
	"total": 13000.0,
	"items": [
        {
            "name": "New balance",
            "quantity": 1
        },
        {
            "name": "Jabra",
            "quantity": 1
        }
    ]
}'

curl -X PUT \
  http://di.kart.com/order-service/order/r3tojxme77r/payment \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 92f1f97e-4aa5-f72c-dad6-c6751ccbd5ac' \
  -d '{
	"name":"Google Pay",
	"type":"UPI",
	"validity":"21/01/2221"
}'

curl -X PUT \
  http://di.kart.com/order-service/order/r3tojxme77r/address \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 138a6807-2233-9d16-35e4-200d11fb0049' \
  -d '{
	"addressLine1":"100",
	"addressLine2":"Park Avenue",
	"city":"seattle",
	"state":"WA",
	"pincode":122018
}'

curl -X GET \
  http://di.kart.com/order-service/order/r3tojxme77r \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 7e983a65-61fb-10cc-6683-ea77433ba14a'

curl -X POST \
  http://di.kart.com/order-service/checkout/r3tojxme77r \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0909a733-35ca-dcb9-14cc-58e20216dd52'

