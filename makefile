XILUTION_API_KEY := $(shell aws secretsmanager get-secret-value --secret-id XilutionApiKey | jq '.SecretString')
XILUTION_ORGANIZATION_ID := $(shell aws secretsmanager get-secret-value --secret-id XilutionOrganizationId | jq '.SecretString')
TODOMVC_CLIENT_URL := $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-base | jq '.Stacks[0].Outputs[1].OutputValue')
TODOMVC_SERVER_URL := $(shell aws cloudformation describe-stacks --stack-name xilution-todomvc-sam | jq '.Stacks[0].Outputs[0].OutputValue')

build-client:
	TODOMVC_SERVER_URL=$(TODOMVC_SERVER_URL) yarn build:client

build-server:
	yarn build:server
	make package-sam

deploy-client:
	aws s3 cp ./dist/client/ s3://xilution-todomvc-website-bucket/ --recursive --include "*" --acl public-read

deploy-server:
	aws cloudformation deploy --stack-name xilution-todomvc-sam \
		--template-file ./dist/template-sam.yaml \
		--parameter-overrides XilutionApiKey=$(XILUTION_API_KEY) XilutionOrganizationId=$(XILUTION_ORGANIZATION_ID)

deprovision:
	make deprovision-server

deprovision-base:
	aws cloudformation delete-stack --stack-name xilution-todomvc-base

deprovision-server:
	aws cloudformation delete-stack --stack-name xilution-todomvc-sam

dev:
	TODOMVC_SERVER_URL=$(TODOMVC_SERVER_URL) yarn dev

package-sam:
	aws cloudformation package \
		--template-file ./aws/cloud-formation/template-sam.yml \
		--s3-bucket xilution-todomvc-staging-bucket \
		--output-template-file ./dist/template-sam.yaml

put-types:
	node ./utils/types/put-types

provision:
	make provision-base

provision-base:
	aws cloudformation create-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
		--capabilities CAPABILITY_NAMED_IAM

reprovision:
	make reprovision-base

reprovision-base:
	aws cloudformation update-stack --stack-name xilution-todomvc-base \
		--template-body file://./aws/cloud-formation/template-base.yml \
		--parameters file://./aws/cloud-formation/parameters.json \
        --capabilities CAPABILITY_NAMED_IAM

show-client-url:
	echo $(TODOMVC_CLIENT_URL)

show-server-url:
	echo $(TODOMVC_SERVER_URL)

show-xilution-api-key:
	echo $(XILUTION_API_KEY)
