build:
	build-client
	build-serverless

build-client:
	echo "not implemented yet"

build-serverless:
	if [ ! -d ./temp ]; then mkdir ./temp; fi
	cp -rf ./node_modules ./temp
	cp -rf ./src/* ./temp
	cp ./package.json ./temp
	cd ./temp ; zip -qr ./xilution-react-todomvc.zip . * ; cd ..
	if [ ! -d ./dist ]; then mkdir ./dist; fi
	mv ./temp/xilution-react-todomvc.zip ./dist
	rm -rf ./temp

deploy:
	deploy-client
	deploy-serverless

deploy-client:
	echo "not implemented yet"

deploy-serverless:
	aws lambda update-function-code --function-name xilution-react-todomvc --zip-file fileb://./dist/xilution-react-todomvc.zip

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

test-with-coverage:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --recursive ./test/unit/
