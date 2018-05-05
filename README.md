<h1 align="center" style="border-bottom: none;">xilution-react-todomvc</h1>
<h3 align="center">A Serverless Implementation of TodoMVC</h3>
<p>
This is a full-stack example of the ubiquitous <a href="http://todomvc.com/">TodoMVC app</a> using a <a href="https://en.wikipedia.org/wiki/Serverless_computing">serverless computing model</a>.
Follow the instructions below to stand up an example of the app for yourself.
Within about 1/2 hour you will have a fully functional todo management app running in AWS.
<p>
<p align="center">
  <a href="https://travis-ci.org/semantic-release/semantic-release">
    <img alt="Travis" src="https://img.shields.io/travis/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="https://codecov.io/gh/semantic-release/semantic-release">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/xilution/xilution-react-todomvc.svg">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

This is a full-stack example of the ubiquitous [TodoMVC app](http://todomvc.com/) using a [serverless computing model](https://en.wikipedia.org/wiki/Serverless_computing).
Follow the instructions below to stand up an example of the app for yourself.
Within about 1/2 hour you will have a fully functional todo management app running in AWS.

## Features

* Frontend
	* Use Cases
		* Register New User (including email verification)
		* Authenticate User
		* View Todos
		* Create/Update/Delete Todos
	* [Single Page Web Application](https://en.wikipedia.org/wiki/Single-page_application)
	* [Hosted On AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
	* [React](https://reactjs.org/) *
		* [React-Redux](https://github.com/reactjs/react-redux)
		* [React-Router](https://github.com/ReactTraining/react-router)
		* [React-Bootstrap](https://react-bootstrap.github.io/)
	* [Node.js](https://nodejs.org/en/) version 8.10.0 for React Code
	* [Webpack](https://webpack.js.org/) Build
	* [Jest](https://facebook.github.io/jest/) Unit Testing
	* [ESLint](https://eslint.org/) for Beautifully Consistent JavaScript Code Style
		* [Featuring a world class linting strategy.](https://github.com/manovotny/eslint-config-get-off-my-lawn)
		
* Backend **
	* [RESTful Web Service](https://en.wikipedia.org/wiki/Representational_state_transfer)
		* Supports Frontend Use Cases
	* [Amazon Web Services](https://aws.amazon.com/)
		* [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model)
		* [Cloudformation](https://aws.amazon.com/cloudformation/)
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

\* React was chosen for this example's frontend b/c of its pervasiveness and (most importantly) its [unit testability](https://facebook.github.io/jest/docs/en/tutorial-react.html).

\** You may be asking yourself, is a backend necessary?
Why don't you just integrate directly with Xilution SaaS from the frontend code.
The purpose of the backend is two fold.
First, it abstracts domain specific functionality from the frontend.
For example, some TodoMVC uses cases require the aggregation of a few different Xilution SaaS requests.
Second, it protects secrets like the Xilution Subscriber API Key and the Xilution Subscriber Organization ID.

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

1. [Install NVM](https://github.com/creationix/nvm)

1. [Install Yarn](https://yarnpkg.com/)

1. [Install yq](https://stedolan.github.io/jq/)

## One Time Set Up

1. Open a command line app.
	* Mac: Terminal
	* Windows: Git Bash
	
1. [Create an AWS User Account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
	* It's bad practice to use your AWS root account.

1. Install Node.js 8.10.0
	1. Run `nvm install 8.10.0` to install the version of Node.js used by the example.

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
		* If you have installed nvm correctly, when you execute this command you should see the message: 'Now using node v8.10.0 (npm v5.6.0)'.
	1. Run `ls` to see the files that were downloaded.
	1. Run `yarn` to install Node.Js dependencies.

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
	1. Run `make build-backend` to build the backend resources.
	1. Run `make deploy-backend` to deploy the backend resources to your AWS account.
		* Provisions API Gateway and Lambda resources.
		* See ./aws/cloud-formation/template-sam.yml
	1. Run `make show-backend-url` to see the URL of the backend RESTful web service.
	1. Run `make put-types` to register JSON schema used by this example with Xilution - Elements - Data Accessor.

1. Deploy Frontend Resource
	1. Run `make build-frontend` to build the frontend resources.
	1. Run `make deploy-frontend` to deploy the frontend resources.
	1. Run `make show-frontend-url` to see the URL of the frontend application.
	1. Copy the front end URL and paste it into a browser.
		* You should see the login for for the TodoMVC app.

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
	1. Using the AWS Console, delete the S3 buckets
		* xilution-todomvc-website-bucket
		* xilution-todomvc-staging-bucket
	1. Run `make deprovision-base` to deprovision the base resources.
		* See ./aws/cloud-formation/template-base.yml
		
## About the Author

[Todd Brunia](https://twitter.com/tbrunia) is a Sr. Software Engineer with [Source Allies](https://www.sourceallies.com/) and the founder of [Xilution](https://www.xilution.com).

## Contributions

See something about this example that you thing could be improved? 
Pull requests are encouraged and greatly appreciated!
