build:
	make build-client
	make build-server

build-client:
	yarn build:client

build-server:
	yarn build:server
	make package-sam

deploy:
	make deploy-client
	make deploy-server

deploy-client:
	aws s3 cp ./dist/client/ s3://xilution-todomvc-website-bucket/ --recursive --include "*" --acl public-read

deploy-server:
	aws cloudformation deploy --stack-name xilution-todomvc-sam \
		--template-file ./dist/template-sam.yaml \
		--parameter-overrides XilutionApiKey=$(XILUTION_API_KEY)

deprovision:
	make deprovision-server

deprovision-base:
	aws cloudformation delete-stack --stack-name xilution-todomvc-base

deprovision-server:
	aws cloudformation delete-stack --stack-name xilution-todomvc-sam

provision:
	make provision-base

provision-base:
	aws cloudformation create-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
		--capabilities CAPABILITY_NAMED_IAM

package-sam:
	aws cloudformation package \
		--template-file ./aws/cloud-formation/template-sam.yml \
		--s3-bucket xilution-todomvc-staging-bucket \
		--output-template-file ./dist/template-sam.yaml

reprovision:
	make reprovision-base

reprovision-base:
	aws cloudformation update-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
        --capabilities CAPABILITY_NAMED_IAM

show-client-url:
	aws cloudformation describe-stacks --stack-name xilution-todomvc-base --query 'Stacks[0].Outputs[0].OutputValue'

show-server-url:
	aws cloudformation describe-stacks --stack-name xilution-todomvc-sam --query 'Stacks[0].Outputs[0].OutputValue'
