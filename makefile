XILUTION_API_KEY = $(shell aws secretsmanager get-secret-value --secret-id XILUTION_SUBSCRIBER_API_KEY | jq '.SecretString')
XILUTION_ORGANIZATION_ID = $(shell aws secretsmanager get-secret-value --secret-id XILUTION_SUBSCRIBER_ORG_ID | jq '.SecretString')
TODOMVC_FRONTEND_URL = $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-base | jq '.Stacks[0].Outputs[1].OutputValue')
TODOMVC_BACKEND_URL = $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-sam | jq '.Stacks[0].Outputs[0].OutputValue')

build-frontend:
	TODOMVC_BACKEND_URL=$(TODOMVC_BACKEND_URL) yarn build:frontend

build-backend:
	yarn build:backend
	make package-sam

deploy-frontend:
	aws s3 cp ./dist/frontend/ s3://xilution-todomvc-website-bucket/ --recursive --include "*" --acl public-read

deploy-backend:
	aws cloudformation deploy --stack-name xilution-todomvc-sam \
		--template-file ./dist/template-sam.yaml \
		--parameter-overrides XILUTION_SUBSCRIBER_API_KEY=$(XILUTION_API_KEY) XILUTION_SUBSCRIBER_ORG_ID=$(XILUTION_ORGANIZATION_ID)

deprovision-base:
	aws cloudformation delete-stack --stack-name xilution-todomvc-base

deprovision-backend:
	aws cloudformation delete-stack --stack-name xilution-todomvc-sam

dev:
	TODOMVC_BACKEND_URL=$(TODOMVC_BACKEND_URL) yarn dev

package-sam:
	aws cloudformation package \
		--template-file ./aws/cloud-formation/template-sam.yml \
		--s3-bucket xilution-todomvc-staging-bucket \
		--output-template-file ./dist/template-sam.yaml

put-types:
	node ./utils/types/put-types

provision-base:
	aws cloudformation create-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
		--capabilities CAPABILITY_NAMED_IAM

reprovision-base:
	aws cloudformation update-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
        --capabilities CAPABILITY_NAMED_IAM

show-frontend-url:
	echo $(TODOMVC_FRONTEND_URL)

show-backend-url:
	echo $(TODOMVC_BACKEND_URL)

show-xilution-api-key:
	echo $(XILUTION_API_KEY)
