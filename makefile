build:
	build-client
	build-server

build-client:
	yarn build:client

build-server:
	yarn build:server

deploy:
	deploy-client
	deploy-server

deploy-client:
	echo "not implemented yet"

deploy-server:
	aws lambda update-function-code --function-name xilution-react-todomvc --zip-file fileb://./dist/server/xilution-react-todomvc.zip

deprovision:
	aws cloudformation delete-stack --stack-name xilution-react-todomvc

provision:
	aws cloudformation create-stack --stack-name xilution-react-todomvc \
		--template-body file://./aws/cloud-formation/template.json \
		--parameters file://./aws/cloud-formation/parameters.json

reprovision:
	aws cloudformation update-stack --stack-name xilution-react-todomvc \
		--template-body file://./aws/cloud-formation/template.json \
		--parameters file://./aws/cloud-formation/parameters.json
