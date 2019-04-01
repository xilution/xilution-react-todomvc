include ./config.mk

TODOMVC_FRONTEND_URL = $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-base | jq '.Stacks[0].Outputs[1].OutputValue')
TODOMVC_BACKEND_URL = $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-sam | jq '.Stacks[0].Outputs[0].OutputValue')

build-frontend:
	TODOMVC_BACKEND_URL=$(TODOMVC_BACKEND_URL) yarn build:frontend

build-backend:
	yarn build:backend
	make package-sam
	@echo "^Do not use that last suggested command!^ Execute the following command instead:"
	@echo "make deploy-backend"

deploy-frontend:
	aws s3 cp ./dist/frontend/ s3://$(AWS_WEBSITE_BUCKET)/ --recursive --include "*" --acl public-read

deploy-backend:
	aws cloudformation deploy --stack-name xilution-todomvc-sam \
		--template-file ./dist/template-sam.yaml \
		--parameter-overrides XilutionClientId=$(XILUTION_CLIENT_ID)

deprovision-base:
	aws cloudformation delete-stack --stack-name xilution-todomvc-base

deprovision-backend:
	aws cloudformation delete-stack --stack-name xilution-todomvc-sam

dev:
	TODOMVC_BACKEND_URL=$(TODOMVC_BACKEND_URL) yarn dev

package-sam:
	aws cloudformation package \
		--template-file ./aws/cloud-formation/template-sam.yml \
		--s3-bucket $(AWS_STAGING_BUCKET) \
		--output-template-file ./dist/template-sam.yaml

put-types:
	mkdir -p ./temp
	npx babel ./src/backend/* --out-dir ./temp/src/backend
	XilutionClientId=$(XILUTION_CLIENT_ID) node ./utils/types/put-types.js

provision-base:
	aws cloudformation create-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters ParameterKey=StagingBucketName,ParameterValue=$(AWS_STAGING_BUCKET) \
					 ParameterKey=WebsiteBucketName,ParameterValue=$(AWS_WEBSITE_BUCKET) \
		--capabilities CAPABILITY_NAMED_IAM

reprovision-base:
	aws cloudformation update-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters ParameterKey=StagingBucketName,ParameterValue=$(AWS_STAGING_BUCKET) \
					 ParameterKey=WebsiteBucketName,ParameterValue=$(AWS_WEBSITE_BUCKET) \
        --capabilities CAPABILITY_NAMED_IAM

show-frontend-url:
	@echo $(TODOMVC_FRONTEND_URL)

show-backend-url:
	@echo $(TODOMVC_BACKEND_URL)
	
show-frontend-ssl-url:
	@echo https://s3.$(AWS_REGION).amazonaws.com/$(AWS_WEBSITE_BUCKET)/index.html
