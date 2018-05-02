# xilution-react-todomvc

Work in Progress

## Features of this Reference Implementation

* AWS
	* Serverless Application Model (SAM)
	* Cloudformation
	* Secrets Manager
	* Lambda
	* API Gateway
* Server (well, sort of)
	* Serverless Architecture through SAM
	* NodeJS 8.10.0 Lambda
	* Webpack build
	* Integrates with Xilution SaaS
		* Elements / Data Accessor
		* Business Basics / Identity
* Client
	* React
	* Use Cases
		* Register User
		* Authenticate
		* View Todos
		* Create/Update Todos
		
## Prerequisites

Note: this reference implementation was developed on Mac OSX. You're experience on other operating systems will vary. I'll try to update this README and adapt the code as time allows. PRs are welcome.

1. Create an AWS Account

1. Create a Xilution Account

1. Install AWS-CLI
	1. You'll need python 3 to get access to the latest AWS-CLI commands.

1. Install yq

## Installation

* The installation steps are still a work in progress. In the meantime, see makefile for installation tasks

## To Test

* Unit Tests...
	* WIP

* Once installed...

Run `make show-client-url` and enter the result into a browser.
