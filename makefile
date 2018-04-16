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
	cd ./temp ; zip -qr ./$(FUNCTION_NAME).zip . * ; cd ..
	if [ ! -d ./dist ]; then mkdir ./dist; fi
	mv ./temp/$(FUNCTION_NAME).zip ./dist
	rm -rf ./temp

deploy:
	deploy-client
	deploy-serverless

deploy-client:
	echo "not implemented yet"

deploy-serverless:
	aws lambda update-function-code --function-name $(FUNCTION_NAME) --zip-file fileb://./dist/$(FUNCTION_NAME).zip

deprovision:
	aws cloudformation delete-stack --stack-name $(FUNCTION_NAME)

provision:
	aws cloudformation create-stack --stack-name $(FUNCTION_NAME) \
		--template-body file://./aws/cloud-formation/template.json \
		--parameters file://./aws/cloud-formation/parameters.json

reprovision:
	aws cloudformation update-stack --stack-name $(FUNCTION_NAME) \
		--template-body file://./aws/cloud-formation/template.json \
		--parameters file://./aws/cloud-formation/parameters.json

test-with-coverage:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --recursive ./test/unit/
