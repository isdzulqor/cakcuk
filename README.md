<div align="center">
    <h1 align="center">
		<a href="https://cakcuk.io">
        <img align="center"
            src="https://user-images.githubusercontent.com/12388558/84142379-e0a91500-aa7e-11ea-9089-c0939c3aae5b.png"
            width="400" height="auto" />
		</a>
    </h1>
	<p align="center">
        <a href="https://cakcuk.io/slack/add">
            <img alt="Add to Slack" height="32" width="122"
                src="https://cdn.brandfolder.io/5H442O3W/as/pl54cs-bd9mhs-czsxst/btn-add-to-slack.svg" />
        </a>
        <a href="https://cakcuk.io/play">
            <img src="https://user-images.githubusercontent.com/12388558/84143733-46969c00-aa81-11ea-9448-50741f3e568f.png"
                width="auto" height="32" />
        </a>
    </p>
    <p align="center">a Command Builder for your Workspace</p>
    <p align="center">Commands Simplified • Clearer Response • Increase Productivity</p>
	<p align="center">
		<a href="https://github.com/isdzulqor/cakcuk/actions?query=workflow%3A%22Build+GO%22">
        <img src="https://github.com/isdzulqor/cakcuk/workflows/Build GO/badge.svg?branch=master"/>
		</a>
		<a href="https://github.com/isdzulqor/cakcuk/actions?query=workflow%3A%22Test+Integration%22">
        <img src="https://github.com/isdzulqor/cakcuk/workflows/Test Integration/badge.svg?branch=master"/>
		</a>
		<a href="https://github.com/isdzulqor/cakcuk/actions?query=workflow%3A%22Build+UI%22">
        <img src="https://github.com/isdzulqor/cakcuk/workflows/Build UI/badge.svg"/>
		</a>
		<a href="https://github.com/isdzulqor/cakcuk/actions?query=workflow%3A%22Release%22">
        <img src="https://github.com/isdzulqor/cakcuk/workflows/Release/badge.svg"/>
		</a>
    </p>
	<p align="center">
		<a href="https://github.com/isdzulqor/cakcuk">
		<img src="https://img.shields.io/maintenance/yes/2020.svg"/>
		</a>
		<a href="https://github.com/isdzulqor/cakcuk/blob/master/LICENSE">
		<img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/>
		</a>
	</p>
</div>

## Table of Contents

- [Getting Started](#getting-started)
	- [Provision your own Cakcuk](#provision-your-own-cakcuk)
		- [Needed Slack Scopes for your Cakcuk](#needed-slack-scopes-for-your-cakcuk)
	- [Some ways to run Cakcuk by yourself](#some-ways-to-run-cakcuk-by-yourself)
		- [A Bit Differences between Slack Event API & Slack RTM API](#a-bit-differences-between-slack-event-api--slack-rtm-api)
		- [Some Environment Variables Explanation](#some-environment-variables-explanation)
	- [How to Create Slack Slack App with Slack Event](#how-to-create-slack-slack-app-with-slack-event)
- [Default Commands](#default-commands)
	- [Help](#help)
	- [Cuk](#cuk)
	- [Cak](#cak)
	- [Del](#del)
	- [Scope - ACL](#scope---acl)
	- [SU - Superuser](#su---superuser)
		- [The differences between Superuser and Common User](#the-differences-between-superuser-and-common-user)
- [Custom Command](#custom-command)
- [Default Options](#default-options)
	- [--outputFile, -of](#--outputfile--of)
	- [--filter, -f](#--filter--f)
	- [--printOptions, -po](#--printoptions--po)
	- [--noResponse, -nr](#--noresponse--nr)
	- [--noParse, -np](#--noparse--np)
- [Tips & Trick](#tips--trick)
	- [Work with Slackbot](#work-with-slackbot)
	- [Authentication Support](#authentication-support)
- [License](#license)


## Getting Started
<img width="60%" src="https://user-images.githubusercontent.com/12388558/86560590-da785c80-bf88-11ea-91db-343652b3790c.png" alt="Command Parsing Process by Cakcuk"/>

Start using Cakcuk by [adding Cakcuk to your workspace](https://cakcuk.io/slack/add) directly. Or you can Provision your own Cakcuk.

### Provision your own Cakcuk
To get started deploying Cakcuk by yourself, make sure you have created the slack app first to get the Slack app token. You can go to [Slack Apps](https://api.slack.com/apps) and create one if you haven't created your slack app. You also need to keep the verification token as well. It works for validation of each request from Slack. Put those both tokens on your Cakcuk env just like in [this section](#some-ways-to-run-cakcuk-by-yourself).

When you use Slack Event API, you also need to set events those you subscribe to. There are three events that you need to submit. 
  * [app_home_opened](https://api.slack.com/events/app_home_opened)
  * [app_mention](https://api.slack.com/events/app_mention)
  * [message.im](https://api.slack.com/events/message.im)
  * [member_joined_channel](https://api.slack.com/events/member_joined_channel)


#### Needed Slack Scopes for your Cakcuk
  * app_mentions:read
  * chat:write
  * files:write
  * im:history
  * team:read
  * users:read
  * channels:read
  * groups:read
  * mpim:read
  * channels:manage 
  * groups:write 
  * im:write 
  * mpim:write

#### A Bit Differences between Slack Event API & Slack RTM API
  * `Slack RTM API` doesn't need to expose a public endpoint. Thus it's easier to integrate with your private cluster if you have. `Slack Event API` needs to has a public endpoint and register it to Slack to be challenged.

  * `Slack RTM API` uses WebSocket, so it's realtime and lower latency. `Slack Event API` uses HTTPS webhook, it must have higher latency mostly.

  * `Slack RTM API` uses higher resource, CPU, memory & bandwidth. WebSocket costs this. `Slack Event API` uses HTTPS webhook, it eats lower resources.

  * `Slack RTM API` needs to expose many scopes/permissions, It has multiple scopes/permissions aggregated in `bot` Slack scope. That's why RTM API will consume events that you don't need them as well. `Slack Event API` can just use Slack scopes/permission as needed.

More about it https://api.slack.com/events-api and https://api.slack.com/rtm

#### Some Environment Variables Explanation
  * `PORT`

    By default, Cakcuk with TLS disabled is using port 80. You can change it as you want by overwriting the PORT env. Keep in mind, it's only for TLS disabled. If you provision your Cakcuk with TLS enabled. It will use port 80 and 443 for sure.

  * `LOG_LEVEL`

    By default LOG_LEVEL value is info. It means that logs only print Info, Warn, Error, Fatal, and Panic those are printed on logs. There are 5 types of LOG_LEVEL debug, info, warn, error, fatal, and panic. If you want to print all the logs although is for debugging only. You can overwrite LOG_LEVEL env with debug value.

  * `ENCRYPTION_PASSWORD`

    If you have checked special prefix functionality for `encrypt=` and encrypted option in your Custom Commands. This `ENCRYPTION_PASSWORD` value is the encryption key for the encryption value. For authentication feature, it also uses this encryption key. Just make sure you customize this `ENCRYPTION_PASSWORD` env value to keep your sensitive value secured.

  * `SUPER_USER_MODE_ENABLED`

    Its default value is true, means enabled by default. It can be disabled by setting the value to be false. If you play the commands on the Playground. You will automatically has access to Superuser. Just play with SU command, examples are provided with an explanation on the info section.

For the detail step by step to create your Slack App with Slack Event API, you can check [How to Create Slack Slack App with Slack Event](#how-to-create-slack-slack-app-with-slack-event).

### Some ways to run Cakcuk by yourself
  * Cakcuk with Slack Event API TLS disabled
    ```
    docker run -p 80:80 \
      -e MYSQL_HOST="your-mysql-host" \
      -e MYSQL_USERNAME="your-mysql-username" \
      -e MYSQL_PASSWORD="your-mysql-password" \
      -e MYSQL_DATABASE="your-mysql-db-name" \
      -e SLACK_TOKEN="your-slack-app-token" \
      -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \
      -e SLACK_EVENT_ENABLED="true" \
      isdzulqor/cakcuk:latest
    ```
    TLS disabled doesn't mean you cannot use HTTPS for your Cakcuk. It gives you an option if you want to deploy it with TLS handled by load balancer or the others, for example, Nginx. So it doesn't need to be handled on the application level.

  * Cakcuk with Slack Event API TLS Enabled
    ```
    docker run -p 80:80 -p 443:443 \
      -e MYSQL_HOST="your-mysql-host" \
      -e MYSQL_USERNAME="your-mysql-username" \
      -e MYSQL_PASSWORD="your-mysql-password" \
      -e MYSQL_DATABASE="your-mysql-db-name" \
      -e SLACK_TOKEN="your-slack-app-token" \
	  -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \
      -e SLACK_EVENT_ENABLED="true" \
      -e TLS_ENABLED="true" \
      -e PUBLIC_DOMAINS="your-domain-1,www-your-domain-1" \
      isdzulqor/cakcuk:latest
    ```
    If you use TLS enabled. You need to provide public domains that you need to set for PUBLIC_DOMAINS env. It accepts multiple domains separated by comma. Cakcuk uses Let's Encrypt to handle TLS.

  * Cakcuk with Slack RTM API TLS disabled
    ```
    docker run -p 80:80 \
      -e MYSQL_HOST="your-mysql-host" \
      -e MYSQL_USERNAME="your-mysql-username" \
      -e MYSQL_PASSWORD="your-mysql-password" \
      -e MYSQL_DATABASE="your-mysql-db-name" \
      -e SLACK_TOKEN="your-slack-app-token" \
	  -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \
      -e SLACK_RTM_ENABLED="true" \
      isdzulqor/cakcuk:latest
    ```
  * Cakcuk with Slack RTM API TLS enabled
    ```
    docker run -p 80:80 -p 443:443 \
      -e MYSQL_HOST="your-mysql-host" \
      -e MYSQL_USERNAME="your-mysql-username" \
      -e MYSQL_PASSWORD="your-mysql-password" \
      -e MYSQL_DATABASE="your-mysql-db-name" \
      -e SLACK_TOKEN="your-slack-app-token" \
	  -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \
      -e SLACK_RTM_ENABLED="true" \
      -e TLS_ENABLED="true" \
      -e PUBLIC_DOMAINS="your-domain-1,www-your-domain-1" \
      isdzulqor/cakcuk:latest
    ```
  * Simply use docker-compose. By running
    ```
	docker-compose -f docker-compose.yaml up -d
    ```

### How to Create Slack Slack App with Slack Event 

The following steps are the straightforward steps to create Slack App with Slack Event API. You can follow the steps below to create your own Slack App (valid checked on 2023-09-05).

1. Go to https://api.slack.com/apps and click "Create New App" button.
	<img width="1031" alt="Screenshot 2023-09-05 at 3 27 45 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/7c3641d1-22d3-461e-a567-9e0dd57882e4">

2. Choose From Scratch and fill the App Name and choose your workspace.
	<img width="200" alt="Screenshot 2023-09-05 at 3 27 07 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/83207818-60b6-4f4a-8a13-a9551a7ff7a0">
	<img width="200" alt="Screenshot 2023-09-05 at 3 27 31 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/6126fd14-0daa-4c12-b4d6-ec93aa0726df">

3. After the app is created, you will be redirected to the app detail page. Scroll down to get the "Verification Token". Copy the token and save it somewhere.
	<img width="1141" alt="Screenshot 2023-09-05 at 3 29 41 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/4e736eba-1779-4d8e-9631-46c697bebf22">
	<img width="717" alt="Screenshot 2023-09-05 at 3 30 00 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/47141857-3dc9-42a3-ab04-9a79860aa9ce">

4. Go to "OAuth & Permissions". Scroll down to "Scopes" and fill out the "Bot Token Scopes" with the following scopes:
	* app_mentions:read
	* chat:write
	* files:write
	* im:history
	* team:read
	* users:read
	* channels:read
  	* groups:read
  	* mpim:read
	* channels:manage 
	* groups:write 
	* im:write 
	* mpim:write

	<img width="749" alt="Screenshot 2023-09-05 at 3 37 26 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/151765f5-1e48-4b48-a641-95f986dc43de">

5. Stay on "OAuth & Permissions" page. Scroll up and click "Install to Workspace" button. Then click "Allow" button.
	<img width="740" alt="Screenshot 2023-09-05 at 3 38 08 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/1c941034-5f87-407a-a726-4feaada2b6ea">

6. The "Bot User OAuth Token" will be generated. Copy the token and save it somewhere.
	<img width="708" alt="Screenshot 2023-09-05 at 3 54 11 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/65316b61-323b-4946-8b2b-e9a6d7bf442d">

7. After you get the "Verification Token" and "Bot User OAuth Token" you can provision your own Cakcuk. You can follow the steps in [this section](#some-ways-to-run-cakcuk-by-yourself).
8. Make sure you have provisioned your Cakcuk public URL. You can use https://ngrok.com/ to get the free public URL just for testing. 
9. Go to "Event Subscriptions" menu. Then click "Enable Events" button.
	<img width="1150" alt="Screenshot 2023-09-05 at 3 31 47 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/6c054768-8c5d-4452-912a-c53b8fbeff5e">
10. Go to "Subscribe to bot events" section and fill the event subscriptions with the following events:
	* app_home_opened
	* app_mention
	* message.im
	* member_joined_channel

	<img width="704" alt="Screenshot 2023-09-05 at 3 56 28 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/a4c8b44c-8c95-41de-bd5b-827d2be2cf40">

11. You need to fill out the "Request URL" with your Cakcuk Public URL and "slack/event" as suffix path. For example, https://cakcuk.io/slack/event. 
	<img width="1244" alt="Screenshot 2023-09-05 at 3 32 02 PM" src="https://github.com/isdzulqor/cakcuk/assets/12388558/2c23d2f3-0843-4399-b6f9-15bc39ba741f">

12. After you fill out the "Request URL", you need to click "Save Changes" button. If it's successful, you will see successful notification on the top of the page.


## Default Commands 
### Help
Like most Help functions in other CLIs. Help works to display command lists or specific commands for their details, such as for example usage, description, options, etc.

It's pretty straightforward to work with Help. It also works with your Custom Commands. 

[Just Play Help!](https://cakcuk.io/docs?q=helpCommand)
```
- help [options] @cakcuk
  Show the detail of command. Visit playground https://cakcuk.io/play to explore more!
  Example: help --command=cak @cakcuk
  Options:
	--command, -c         [optional] [multi_value]
	  Show the detail of the command.
	  Example: --command=cuk
	--oneline, -ol        [optional] [single_option] 
	  Print command name only.
	  Example: --oneline
	--outputFile, -of     [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po   [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f          [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr     [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
### Cuk
Cuk is a command for hitting HTTP/S endpoints. It covers endpoint properties like URL, Query Parameters, Headers, etc. It works pretty simply to support common endpoint usage.

One of the special options that you can explore is `--parseResponse, -pr`. It's supporting Cak command and your Custom Commands as well. 

[Just Play Cuk!](https://cakcuk.io/docs?q=cukCommand)
```
- cuk [options] @cakcuk
  Hit http/https endpoint. Visit playground https://cakcuk.io/play to explore more!
  Example: cuk -m=POST -u=https://cakcuk.io @cakcuk
  Options:
	--method, -m                [mandatory]
	  Http Method [GET,POST,PUT,PATCH,DELETE] Default value: GET.
	  Example: --method=GET
	--url, -u                   [mandatory]
	  URL Endpoint.
	  Example: --url=https://cakcuk.io
	--basicAuth, -ba            [optional]
	  Set basic authorization for the request. Auth value will be encrypted.
	  Example: --basicAuth=admin:admin123
	--header, -h                [optional] [multi_value]
	  URL headers. written format: key:value - separated by && with no space for multiple values.
	  Example: --header=Content-Type:application/json&&x-api-key:api-key-value
	--queryParam, -qp           [optional] [multi_value]
	  Query param. written format: key:value - separated by && with no space for multiple values.
	  Example: --queryParam=type:employee&&isNew:true
	--urlParam, -up             [optional] [multi_value]
	  URL param only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: https://cakcuk.io/blog/{{id}}. written format: key:value - separated by && with no space for multiple values.
	  Example: --urlParam=id:1
	--bodyParam, -bp            [optional]
	  Body param for raw text.
	  Example: --bodyParam=raw text
	--bodyJson, -bj             [optional]
	  Body JSON param.
	  Example: --bodyJson={
						"project": "project-test-1",
						"message": "this is a sample message"
					}
	--bodyUrlEncode, -bue       [optional] [multi_value]
	  Support for x-www-form-url-encoded query.
	  Example: --bodyUrlEncode=type:employee&&isNew:true
	--bodyFormMultipart, -bfm   [optional] [multi_value]
	  Support for form-data multipart query.
	  Example: --bodyFormMultipart=type:employee&&isNew:true
	--parseResponse, -pr        [optional]
	  Parse json response from http call with given template.
	  Example: --parseResponse={.name}} - {.description}}
	--noParse, -np              [optional] [single_option] 
	  Disable --parseResponse. get raw of the response.
	  Example: --noParse
	--outputFile, -of           [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po         [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f                [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr           [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
### Cak
Cak is a special command to create your Custom Commands. Your commands creation on Playground only hold for 5 minutes. They will be deleted after that.

Just explore Cak command using provided examples. They quite represent Cak functionalities.

[Just Play Cak!](https://cakcuk.io/docs?q=cakCommand)
```
- cak [options] @cakcuk
  Create your custom command. Visit playground https://cakcuk.io/play to explore more!
  Example: cak -c=test-postman -u=https://postman-echo.com/get -qpd=foo1:::--foo1&&--foo2:::-foo2 -d=testing only aja @cakcuk
  Options:
	--command, -c                       [mandatory]
	  Your command name.
	  Example: --cmd=run-test
	--description, -d                   [mandatory]
	  Your command description.
	  Example: --description=to execute the tests
	--method, -m                        [mandatory]
	  Http Method [GET,POST,PUT,PATCH,DELETE]. Default value: GET.
	  Example: --method=GET
	--url, -u                           [mandatory]
	  URL Endpoint.
	  Example: --url=https://cakcuk.io
	--basicAuth, -ba                    [optional]
	  Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted.
	  Example: --basicAuth=admin:admin123
	--header, -h                        [optional] [multi_value]
	  URL headers. written format: key:value - separated by && with no space for multiple values.
	  Example: --header=Content-Type:application/json&&x-api-key:api-key-value
	--headerDynamic, -hd                [optional] [multi_value]
	  Create option for dynamic header param. written format: key:::option&&key:::option:::description=this is description value:::mandatory:::encrypted.
	  Example: --headerDynamic=x-user-id:::--user
	--queryParam, -qp                   [optional] [multi_value]
	  Query param. written format: key:value - separated by && with no space for multiple values.
	  Example: --queryParam=type:employee&&isNew:true
	--queryParamDynamic, -qpd           [optional] [multi_value]
	  Create option for dynamic query param. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
	  Example: --queryParamDynamic=type:::--type
	--urlParam, -up                     [optional] [multi_value]
	  URL param only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: https://cakcuk.io/blog/{{id}}. written format: key:value - separated by && with no space for multiple values.
	  Example: --urlParam=id:1
	--urlParamDynamic, -upd             [optional] [multi_value]
	  Create option for dynamic url param. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
	  Example: --urlParamDynamic=employeeID:::--employee
	--bodyParam, -bp                    [optional]
	  Body param for raw text.
	  Example: --bodyParam=raw text
	--bodyJson, -bj                     [optional]
	  Body JSON param.
	  Example: --bodyJson={
						"project": "project-test-1",
						"message": "this is a sample message"
					}
	--bodyUrlEncode, -bue               [optional] [multi_value]
	  Support for x-www-form-url-encoded query.
	  Example: --bodyUrlEncode=type:employee&&isNew:true
	--bodyUrlEncodeDynamic, -bued       [optional] [multi_value]
	  Create option for dynamic x-www-form-url-encoded query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
	  Example: --bodyUrlEncodeDynamic=type:::--type
	--bodyFormMultipart, -bfm           [optional] [multi_value]
	  Support for form-data multipart query.
	  Example: --bodyFormMultipart=type:employee&&isNew:true
	--bodyFormMultipartDynamic, -bfmd   [optional] [multi_value]
	  Create option for dynamic form-data multipart query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
	  Example: --bodyFormMultipartDynamic=type:::--type
	--scope, -sc                        [optional] [multi_value]
	  Set command scope, which only specified scopes that can execute command, default is public. Default value: public.
	  Example: --scope=admin&&developer
	--parseResponse, -pr                [optional]
	  Parse json response from http call with given template.
	  Example: --parseResponse={.name}} - {.description}}
	--update, --update                  [optional] [single_option] 
	  force update existing command.
	  Example: --update
	--noParse, -np                      [optional] [single_option] 
	  Disable --parseResponse. get raw of the response.
	  Example: --noParse
	--outputFile, -of                   [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po                 [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f                        [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr                   [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
### Del
Del is a simple command to delete your custom commands. You're not allowed to delete Default Commands. Del supports multiple commands deletion separated by double-and `&&` like the provided examples on the [Cakcuk Playground](https://cakcuk.io/play).

Please keep in mind, multiple option values always separated by double-and `&&`. You're only able to delete commands in your Scopes, except you have Superuser access.

[Just Play Del!](https://cakcuk.io/docs?q=delCommand)
```
- del [options] @cakcuk
  Delete existing command. Unable to delete default commands.
  Example: del --command=custom-command @cakcuk
  Options:
	--command, -c         [mandatory] [multi_value]
	  Delete certain command, could be single or multiple commands. seperated by && with no space.
	  Example: --command=custom-command-1&&custom-command-2
	--outputFile, -of     [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po   [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f          [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr     [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
### Scope - ACL
Create, edit, and delete Scopes aka access control list (ACL) for users and commands. It's useful for managing certain custom commands that belong to certain groups. For example, you create two Scopes for `developer` and `infra`. You want to make the users and commands that belong to the `developer` can't be accessed by `infra` users, and vice versa.

The default scope for the command is public. Commands in public scope can be accessed by anyone in your workspace. Please keep in mind, that Scope creation on Playground also has 5 minutes expiration time.

[Just Play Scope!](https://cakcuk.io/docs?q=scopeCommand)
```
- scope [options] @cakcuk
  Create, edit and delete scopes aka access control list (ACL) for users and commands.
  Example: scope --command=custom-command @cakcuk
  Options:
	--show, -s            [optional] [multi_value]
	  Show details of the scopes. Could be multiple, separated by && with no space.
	  Example: --show=developer&&public
	--create, -cr         [optional]
	  Create new scope
	  Example: --create=developer
	--command, -c         [optional] [multi_value]
	  Specify certain commands to be added in scope, could be single or multiple commands. seperated by && with no space.
	  Example: --command=custom-command-1&&custom-command-2
	--user, -u            [optional] [multi_value]
	  Specify users to be in specified scope by mentioning his/her/their names. Could be multiple, separated by &&
	  Example: --user=@alex && @dzulqornain
	--update, --update    [optional]
	  Update scope by adding users or/and commands into existing scopes.
	  Example: --update=admin --user=@newUser1&&@newUser2
	--del, -d             [optional]
	  Delete scope or delete users or/and channels from existing scopes.
	  Example: --del=@alex && @dzulqornain
	--oneline, -ol        [optional] [single_option] 
	  Print scope name only.
	  Example: --oneline
	--outputFile, -of     [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po   [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f          [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr     [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
### SU - Superuser
Access and control to manage Superuser. Superuser is enabled by default. But, it's configurable via environment variable of `SUPER_USER_MODE_ENABLED`. 

Superuser that you set on the Playground has an expiration time. It will hold for 5 minutes like Cak commands & Scopes creation. The only user that's in the Superuser list that's able to set and delete the other users to be Superuser. But for the first-time installation, Superuser can be set by anyone.

[Just Play SU!](https://cakcuk.io/docs?q=suCommand)
```
- su [options] @cakcuk
  Access and control to manage Superuser. Superuser mode currently is enabled.
  Example: su --set= @iskandar && @ahmad @cakcuk. su @cakcuk to list users who have Superuser role.
  Options:
	--show, -s            [optional] [multi_value]
	  Show details of the user scope & commands that can be accessed. Could be multiple, separated by && with no space.
	  Example: --show=@adit && @ahmad
	--set, --set          [optional] [multi_value]
	  Set user to be Superuser by mention his/her/their names. could be multiple, separated by &&
	  Example: --set=@alex && @ziad
	--del, -d             [optional] [multi_value]
	  Delete user from Superuser by mention his/her/their names. could be multiple, separated by &&
	  Example: --update=@alex && @ziad
	--outputFile, -of     [optional] [single_option] 
	  Print output data into file.
	  Example: --outputFile
	--printOptions, -po   [optional] [single_option] 
	  Print detail options when executing command.
	  Example: --printOptions
	--filter, -f          [optional]
	  Filter output, grep like in terminal.
	  Example: --filter=this is something's that want to be filtered.
	--noResponse, -nr     [optional] [single_option] 
	  Response will not be printed.
	  Example: --noResponse
```
#### The differences between Superuser and Common User

  * `Superuser` can Read, Create, Update, and Delete all Scopes. `Common User` is only able to Read, Create, Update, and Delete his Scopes.

  * `Superuser` can Read, Create, Update, Delete, and Execute all commands. `Common User` is only able to Read, Create, Update, Delete, and Execute his commands in his scopes.

  * `Superuser` can Read of all the user's access, the scopes and the commands included. `Common User` is not allowed.
  
  * `Superuser` can Show, Set, and Delete Superuser list group. `Common User` is only able to Show Superuser list.


## Custom Command
Create your own custom command with Cak command then execute it. Please keep in mind, the commands you create on the Playground have the expiration time. It takes 5 minutes to be deleted after the creation time.

Your created Custom Commands also have the implicit options that Cuk command has. Like Query parameters, Headers, etc. You can overwrite or add params as you need. Just try the [Custom Command](https://cakcuk.io/docs?q=customCommand) examples! You need to try it in sequence for each example within the section.

Don't forget to explore [Cak Command!](https://cakcuk.io/docs?q=cakCommand) as well for more functionalities as you need.

[Just Play Custom Command!](https://cakcuk.io/docs?q=customCommand)

[Back to Top](#table-of-contents)

---

## Default Options
### --outputFile, -of
Printing result to be file output. It's a single option. Just add `--outputFile, -of` in your command. Please note it's only working in your workspace.
  
### --filter, -f
Filtering result that's containing some keyword. Works like grep command in terminal. `--filter, -f` is case insensitive. Example usage: `--filter=this is keywords`. Just play the playground to see the result!

### --printOptions, -po
It will print options when you execute the command in your workspace. Just like the Preview tab in the command section of the play editor. It's useful for you to ensure you input the correct value for each option as you want. Something like avoiding typo.

### --noResponse, -nr
It will print no response from your executed command in your workspace. Just add `--noResponse, -nr` in your command. It's fit for your use-case which is for post/put something, like triggering CI or something like that you don't need the response.

### --noParse, -np
It will ignore `--parseResponse, -pr` value. It's useful for debugging. Works with Cuk, and your custom commands.


## Tips & Trick
### Work with Slackbot
You can work with Slackbot to make your Cakcuk powerful.
  1. Creating Slackbot alias to trigger Cakcuk command.
  2. Set a reminder to execute a certain command at a certain time.

### Authentication Support
Currently, only `basic authentication` that's supported on a specific option which is `--basicAuth, -ba`. But you actually also can implement the other authentication that's able to generate to be header values. 

You can explore it easily on API tools like Postman. You can choose what type of auth you use. Then simply get the generated headers. Then you can put those headers values to Cakcuk command request with `--header, -h` option.


[Back to Top](#table-of-contents)

---

## License
Cakcuk released under MIT license, refer [LICENSE](LICENSE) file.

[Back to Top](#table-of-contents)

---