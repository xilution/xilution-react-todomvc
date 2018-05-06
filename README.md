<h1 align="center" style="border-bottom: none;">xilution-react-todomvc</h1>
<h3 align="center">A Serverless Example of TodoMVC</h3>
<p>
This is a full-stack example of the ubiquitous <a href="http://todomvc.com/">TodoMVC app</a> using a <a href="https://en.wikipedia.org/wiki/Serverless_computing">serverless computing model</a>.
Follow the instructions below to stand up an example of the app for yourself.
Within about 1/2 hour you will have a fully functional todo management app running in AWS.
<p>
<p align="center">
  <a href="https://github.com/xilution/xilution-react-todomvc/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://github.com/xilution/xilution-react-todomvc/network">
    <img alt="Forks" src="https://img.shields.io/github/forks/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://github.com/xilution/xilution-react-todomvc/stargazers">
    <img alt="Stars" src="https://img.shields.io/github/stars/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://github.com/xilution/xilution-react-todomvc/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/xilution/xilution-react-todomvc.svg">
  </a>
</p>
<p align="center">
  <a href="https://travis-ci.org/xilution/xilution-react-todomvc">
    <img alt="Travis" src="https://img.shields.io/travis/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://codecov.io/gh/xilution/xilution-react-todomvc">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://greenkeeper.io">
    <img alt="Greenkeeper" src="https://badges.greenkeeper.io/xilution/xilution-react-todomvc.svg">
  </a>
</p>
<p align="center">
  <a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fxilution%2Fxilution-react-todomvc">
    <img alt="Tweet" src="https://img.shields.io/twitter/url/https/github.com/xilution/xilution-react-todomvc.svg?style=social">
  </a>
</p>

## Features

* Frontend
	* Use Cases
		* Register New User (including email verification)
		* Authenticate User
		* View Todos
		* Create/Update/Delete Todos
	* [Single Page Web Application](https://en.wikipedia.org/wiki/Single-page_application)
	* [Hosted On AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
	* [React](https://reactjs.org/)
		* [React-Redux](https://github.com/reactjs/react-redux)
		* [React-Router](https://github.com/ReactTraining/react-router)
		* [React-Bootstrap](https://react-bootstrap.github.io/)
	* [Node.js](https://nodejs.org/en/) version 8.10.0 for React Code
	* [Webpack](https://webpack.js.org/) Build
	* [Jest](https://facebook.github.io/jest/) Unit Testing
	* [ESLint](https://eslint.org/) for Beautifully Consistent JavaScript Code Style
		* [Featuring a world class linting strategy.](https://github.com/manovotny/eslint-config-get-off-my-lawn)
		
* Backend
	* [Serverless](https://en.wikipedia.org/wiki/Serverless_computing) Architecture 🤘
	* [RESTful Web Service](https://en.wikipedia.org/wiki/Representational_state_transfer)
		* Supports Frontend Use Cases
	* [Amazon Web Services](https://aws.amazon.com/)
		* [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model)
		* [CloudFormation](https://aws.amazon.com/cloudformation/)
		* [Secrets Manager](https://aws.amazon.com/secrets-manager/)
		* [Lambda (NodeJS)](https://aws.amazon.com/lambda/)
		* [API Gateway](https://aws.amazon.com/api-gateway/)
	* [Node.js](https://nodejs.org/en/) version 8.10.0 for Lambda Code
	* [Webpack](https://webpack.js.org/) Build
		* Technique used to reduce size of deployed code.
	* [Jest](https://facebook.github.io/jest/) Unit Testing
	* [ESLint](https://eslint.org/) for Beautifully Consistent JavaScript Code Style
		* [Featuring a world class linting strategy.](https://github.com/manovotny/eslint-config-get-off-my-lawn)
	* Integrates with [Xilution SaaS](https://www.xilution.com)
		* [Xilution - Elements - Data Accessor](https://prod.xilution.com/products/?product=xilution-elements-data-accessor)
		* [Xilution - Business Basics - Identity](https://prod.xilution.com/products/?product=xilution-business-basics-identity)

## Prerequisites

This example was developed on [macOS High Sierra](https://www.apple.com/macos/high-sierra/) using [WebStorm](https://www.jetbrains.com/webstorm/).
Your experience on other development platforms will vary.
If you find inconsistencies with these instructions and develop a solution for your development platform, please share your experience through a pull request.

For Windows users, I recommend using Git Bash for command line steps.
Git Bash is included in the Git installation mentioned below.
For Mac users, the Terminal application is the best way to go for command line steps.

1. [Create an AWS Account](https://aws.amazon.com/free/)

1. [Create a Xilution Account](https://www.xilution.com/registration/)
	* Note your Xilution API Key and Xilution Organization ID when you complete the registration process.

1. [Install Git](https://git-scm.com/downloads)

1. [Install AWS CLI](https://aws.amazon.com/cli/)
	1. You'll need python 3 to get access to the latest AWS CLI commands.

1. [Install Node Version Manager (nvm)](https://github.com/creationix/nvm)

1. [Install Yarn](https://yarnpkg.com/)

1. [Install ./jq](https://stedolan.github.io/jq/)
	* This will quickly become one of your favorite command line utilities. 😎

## One Time Set Up

1. Open a command line app.
	* Mac: Terminal
	* Windows: Git Bash
	
1. [Create an AWS User Account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
	* It's bad practice to use your AWS root account.

1. Download Project Source Code
	* Some of these steps may be superfluous for experienced developers.
	For those less experienced coders, I recommend following these steps verbatim.
	
	1. Run `cd ~` to navigate to your home directory.
	1. Run `mkdir Developer` to create a directory to keep development related things.
	1. Run `cd Developer` to navigate into the Developer directory.
	1. Run `mkdir git` to create a directory to keep code cloned through git.
	1. Run `cd git` to navigate into the git directory.
	1. Run `git clone https://github.com/xilution/xilution-react-todomvc` to download the code for this example.
	1. Run `cd xilution-react-todomvc` to navigate into the directory where the code for this example has been downloaded.

1. Install Node.js 8.10.0
	1. From within the 'xilution-react-todomvc' directory, run `nvm install` to install the version of Node.js used by the example.

1. Download Project Dependencies
	1. From within the 'xilution-react-todomvc' directory, run `yarn` to install Node.Js dependencies.

1. [Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-quick-configuration)

1. Save your Xilution Subscriber API Key and Organization ID in AWS Secrets Manager
	* You can look up your Xilution Subscriber API Key and Organization Id through through the [Xilution Customer Admin Portal](https://prod.xilution.com/portal/index.html).
	1. Run `aws secretsmanager create-secret --name XILUTION_SUBSCRIBER_API_KEY --description "My Xilution Subscriber API Key" --secret-string REPLACE-WITH-YOUR-API-KEY` to save your Xilution Subscriber API Key to AWS Secrets Manager.
	1. Run `aws secretsmanager create-secret --name XILUTION_SUBSCRIBER_ORG_ID --description "My Xilution Subscriber Organization ID" --secret-string REPLACE-WITH-YOUR-ORG-ID` to save your Xilution Subscriber Organization ID to AWS Secrets Manager.

## Provision and Deploy

1. Open a command line app.
	* Mac: Terminal
	* Windows: Git Bash

1. Provision Resources
	1. Run `make provision-base` to provision the base AWS resources.
		* See ./aws/cloud-formation/template-base.yml
		* Checkout the 'xilution-todomvc-base' stack using the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home).
	1. Run `make build-backend` to build the backend resources.
	1. Run `make deploy-backend` to deploy the backend resources to your AWS account.
		* Provisions API Gateway and Lambda resources.
		* See ./aws/cloud-formation/template-sam.yml
		* Checkout the 'xilution-todomvc-sam' stack using the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home).
	1. Run `make show-backend-url` to see the URL of the backend RESTful web service.
	1. Run `make put-types` to register JSON schema used by this example with Xilution - Elements - Data Accessor.

1. Deploy Frontend Resource
	1. Run `make build-frontend` to build the frontend resources.
	1. Run `make deploy-frontend` to deploy the frontend resources.
	1. Run `make show-frontend-url` to see the URL of the frontend application.
	1. Copy the front end URL and paste it into a browser.
		* You should see the login for for the TodoMVC app.

👏👏👏 The example should now be up and running in AWS. 👏👏👏

## To Test

1. Open a command line app.
	* Mac: Terminal
	* Windows: Git Bash

1. To Run Verify
	1. Run `yarn verify` to run the linter and run unit tests.

1. To Run the App Locally
	1. Run `make dev` to run the app locally.
		* make is necessary to automatically inject the backend url.

1. User Acceptance Testing
	1. Run `make show-frontend-url` to see the URL of the frontend application.
	1. Copy the front end URL and paste it into a browser.
	1. Run through the different use cases
		* Register New User (including email verification)
		* Authenticate User
		* View Todos
		* Create/Update/Delete Todos

## Deprovisioning

1. Open a command line app.
	* Mac: Terminal
	* Windows: Git Bash

1. Deprovision Resources
	1. Run `make deprovision-backend` to deprovision backend resources.
		* See ./aws/cloud-formation/template-sam.yml
	1. Using the [AWS Console](http://aws.amazon.com/console/home), delete the S3 buckets
		* xilution-todomvc-website-bucket
		* xilution-todomvc-staging-bucket
	1. Run `make deprovision-base` to deprovision the base resources.
		* See ./aws/cloud-formation/template-base.yml
	1. Run `aws secretsmanager delete-secret --secret-id XILUTION_SUBSCRIBER_API_KEY --recovery-window-in-days 7` to delete your Xilution Subscriber API Key from AWS Secrets Manager.
	1. Run `aws secretsmanager delete-secret --secret-id XILUTION_SUBSCRIBER_ORG_ID --recovery-window-in-days 7` to delete your Xilution Subscriber Organization ID from AWS Secrets Manager.
		
## Next Steps

I'm hopeful that this reference implementation inspires you to to use AWS SAM and React for your next web application.
I also invite you to learn more about how [Xilution SaaS](https://www.xilution.com) can accelerate your next web or mobile application project.

## FAQ

1. 💰 How much does it cost to run this example?
	* [AWS offers a "free" tier](https://aws.amazon.com/free/) which enables you to gain free, hands-on experience with the AWS platform, products and services.
	* You may find the [AWS Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html) to be useful in calculating your monthly AWS expense as well.
	* Pricing for AWS Managed Service's used in this example
		* [Lambda](https://aws.amazon.com/lambda/pricing/)
			* Highlight: The first 1 million requests per month are free for all subscribers! 🎉
		* [API Gateway](https://aws.amazon.com/api-gateway/pricing/)
		* [S3](https://aws.amazon.com/s3/pricing/)
		* [CloudFormation](https://aws.amazon.com/cloudformation/pricing/)
		* [Secrets Manager](https://aws.amazon.com/secrets-manager/pricing/)
		* For comparison, here is AWS's published pricing for virtual server and managed server services.
			* [EC2](https://aws.amazon.com/ec2/pricing/)
			* [ECS](https://aws.amazon.com/ecs/pricing/)
				* Includes [Fargate](https://aws.amazon.com/fargate/) and EC2 Launch Types Models
			* [ElasticBeanstalk](https://aws.amazon.com/elasticbeanstalk/pricing/)
	* Pricing for Xilution SaaS Products used in this example
		* This example integrates with Xilution's Beta environment which is Free for evaluation purposes.
		* The Xilution SaaS products highlighted in this example have not yet been released for production consumption.
		* See [the Xilution SaaS Products page](https://prod.xilution.com/products/index.html) for the latest product phase and pricing details.
		* For comparision, here is AWS's published pricing for data storage services.
			* [RDS](https://aws.amazon.com/rds/pricing/)

1. Why React?
	* React was chosen for this example's frontend because of its pervasiveness and (most importantly) its [unit testability](https://facebook.github.io/jest/docs/en/tutorial-react.html).

1. Is the backend necessary?
	* The purpose of the backend is two fold.
      First, it abstracts domain specific functionality from the frontend.
      For example, some TodoMVC uses cases require the aggregation of a few different Xilution SaaS requests.
      Second, it protects secrets like the Xilution Subscriber API Key and the Xilution Subscriber Organization ID.

1. Can this example run on other public cloud platforms?
	* In theory, yes.
	  [Azure](https://azure.microsoft.com) and [Google Cloud Platform](https://cloud.google.com/) offer similar types of web hosting and compute services needed to run this example.
	  Eventually, I would like to develop [Terraform by HashiCorp](https://www.terraform.io/) templates for several different public cloud platforms.
	  If you're passionate about your cloud platform and would like to see it incorporated in this example, I invite you to submit a pull request.

1. What about the [Serverless](https://serverless.com/) framework?
	* I personally don't have experience working with the Serverless framework, but I hear good things.
	  The pervasiveness of the framework warrants a mention in this example's FAQ.
	  I [applaud the maintainers of the framework](https://serverless.com/company/team/) for their advancement of serverless computing.
	  I would like to learn more about the framework and how it could be incorporated into this example.
	  If you're passionate about the Serverless framework or other similar frameworks, I invite you to submit a pull request.

## Issues

[Issues are managed here.](https://github.com/xilution/xilution-react-todomvc/issues)

## About the Author

[Todd Brunia](https://twitter.com/tbrunia) is a Sr. Software Engineer with [Source Allies](https://www.sourceallies.com/) and the founder of [Xilution](https://www.xilution.com).

## Contributions

See something about this example that you think could be improved? 
Pull requests are encouraged and greatly appreciated!
