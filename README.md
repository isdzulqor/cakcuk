<p align="center">
<img align="center" src="https://user-images.githubusercontent.com/12388558/84142379-e0a91500-aa7e-11ea-9089-c0939c3aae5b.png" width="400" height="auto" />
<p align="center">a Command Builder on your Workspace</p>
<p align="center">Hit any HTTP or HTTPS Endpoint • Simplify to Command • Get Readable Response</p>
<p align="center">
<!-- TODO: link and playground pretty -->
  <a
  href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook&client_id=1095838036384.1110123901042">
    <img alt="Add to Slack" height="34" width="122"
    src="https://platform.slack-edge.com/img/add_to_slack.png"
    srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
  </a> 
&nbsp;
  <a
  href="https://cakcuk.io/#/play">
  <img src="https://user-images.githubusercontent.com/12388558/84143733-46969c00-aa81-11ea-9448-50741f3e568f.png" width="auto" height="34"/>
	</a>
</p>
</p>

- [Getting Started](#getting-started)
  - [Provision your own Cakcuk](#provision-your-own-cakcuk)
    - [Needed Slack Scopes for your Cakcuk](#needed-slack-scopes-for-your-cakcuk)
  - [Some ways to run Cakcuk by yourself](#some-ways-to-run-cakcuk-by-yourself)
    - [A Bit Differences between Slack Event API & Slack RTM API](#a-bit-differences-between-slack-event-api--slack-rtm-api)
    - [Some Environment Variables Explanation](#some-environment-variables-explanation)
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
- [Tips & Trick](#tips--trick)
  - [Work with Slackbot](#work-with-slackbot)
  - [Authentication Support](#authentication-support)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)
](#installation)
    - [Usage](#usage)
    - [What's New?](#whats-new)
    - [Question](#question)
    - [License](#license)
    - [Links](#links)


## Getting Started
Start using Cakcuk by adding [adding Cakcuk to your workspace](https://slack.com/oauth/v2/authorize?scope=incoming-webhook&client_id=1095838036384.1110123901042) directly. Or you can Provision your own Cakcuk.


### Provision your own Cakcuk
To get started deploying Cakcuk by yourself, make sure you have created the slack app first to get the Slack app token. You can go to Slack Apps and create one if you haven't created your slack app.

#### Needed Slack Scopes for your Cakcuk
  * app_mentions:read
  * channels:read
  * chat:write
  * files:read
  * files:write
  * groups:write
  * im:history
  * im:read
  * im:write
  * incoming-webhook
  * links:read
  * team:read
  * user.profile:read
  * users:read
  * users:write

More explanations about Slack Scopes you can check here https://api.slack.com/scopes.

### Some ways to run Cakcuk by yourself
  * Cakcuk with Slack Event API TLS disabled
    ```
    docker run -p 80:80 \
      -e MYSQL_HOST="your-mysql-host" \
      -e MYSQL_USERNAME="your-mysql-username" \
      -e MYSQL_PASSWORD="your-mysql-password" \
      -e MYSQL_DATABASE="your-mysql-db-name" \
      -e SLACK_TOKEN="your-slack-app-token" \
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
      -e SLACK_RTM_ENABLED="true" \
      -e TLS_ENABLED="true" \
      -e PUBLIC_DOMAINS="your-domain-1,www-your-domain-1" \
      isdzulqor/cakcuk:latest
    ```
  * Simply use docker-compose. By running
    ```
    docker-compose -up -d
    ```

#### A Bit Differences between Slack Event API & Slack RTM API
  * `Slack RTM API` doesn't need to expose public endpoint. Thus it's easier to integrate with your private cluster if you have. `Slack Event API` needs to has a public endpoint and register it to Slack to be challenged.

  * `Slack RTM API` uses WebSocket, so it's realtime and lower latency. `Slack Event API` uses HTTPS webhook, it must have higher latency mostly.

  * `Slack RTM API` uses higher resource, CPU, memory & bandwidth. WebSocket costs this. `Slack Event API` uses HTTPS webhook, it eats lower resources.

  * `Slack RTM API` needs to expose many scopes/permissions, you can check this. `Slack Event API` just uses Slack scopes/permission as needed.

More about Slack Event API https://api.slack.com/events-api. More about Slack RTM API https://api.slack.com/rtm

#### Some Environment Variables Explanation
  * `PORT`

    By default, Cakcuk with TLS disabled is using port 80. You can change it as you want by overwriting the PORT env. Keep in mind, it's only for TLS disabled. If you provision your Cakcuk with TLS enabled. It will use port 80 and 443 for sure.

  * `LOG_LEVEL`

    By default LOG_LEVEL value is info. It means that logs only print Info, Warn, Error, Fatal, and Panic those are printed on logs. There are 5 types of LOG_LEVEL debug, info, warn, error, fatal, and panic. If you want to print all the logs although is for debugging only. You can overwrite LOG_LEVEL env with debug value.

  * `ENCRYPTION_PASSWORD`

    By default, Cakcuk with TLS disabled is using port 80. You can change it as you want by overwriting the PORT env. Keep in mind, it's only for TLS disabled. If you provision your Cakcuk with TLS enabled. It will use port 80 and 443 for sure.

  * `SUPER_USER_MODE_ENABLED`

    Its default value is true, means enabled by default. It can be disabled by setting the value to be false. If you play the commands on Playground. You will automatically has the access for Superuser. Just play with SU command, examples are provided with explanation on info section.


## Default Commands 
### Help
Like most Help functions in other CLIs. Help works to display command lists or specific commands for their details, such as for example usage, description, options, etc.

It's pretty straightforward to work with Help. It also works with your Custom Commands. 

[Just Play Help!](http://cakcuk.io/#/docs/helpCommand)
```
- help [options] @cakcuk
	Show the detail of command. Visit playground https://cakcuk.io/play to explore more!
	i.e: help --command=cak @cakcuk
	Options:
		--command, -c        	[optional] [multi_value]
			Show the detail of the command.
			i.e: --command=cuk
		--oneline, -ol       	[optional] [single_option] 
			Print command name only.
			i.e: --oneline
		--outputFile, -of    	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po  	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f         	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr    	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
### Cuk
Cuk is a command for hitting HTTP/S endpoints. It covers endpoint properties like URL, Query Parameters, Headers, etc. It works pretty simply to support common endpoint usage.

One of the special options that you can explore is `--parseResponse, -pr`. It's supporting Cak command and your Custom Commands as well. 

[Just Play Cuk!](http://cakcuk.io/#/docs/cukCommand)
```
- cuk [options] @cakcuk
	Hit http/https endpoint. Visit playground https://cakcuk.io/play to explore more!
	i.e: cuk -m=POST -u=http://cakcuk.io @cakcuk
	Options:
		--method, -m               	[mandatory]
			Http Method [GET,POST,PUT,PATCH,DELETE] Default value: GET.
			i.e: --method=GET
		--url, -u                  	[mandatory]
			URL Endpoint.
			i.e: --url=http://cakcuk.io
		--basicAuth, -ba           	[optional]
			Set basic authorization for the request. Auth value will be encrypted.
			i.e: --basicAuth=admin:admin123
		--header, -h               	[optional] [multi_value]
			URL headers. written format: key:value - separated by && with no space for multiple values.
			i.e: --header=Content-Type:application/json&&x-api-key:api-key-value
		--queryParam, -qp          	[optional] [multi_value]
			Query param. written format: key:value - separated by && with no space for multiple values.
			i.e: --queryParam=type:employee&&isNew:true
		--urlParam, -up            	[optional] [multi_value]
			URL param only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by && with no space for multiple values.
			i.e: --urlParam=id:1
		--bodyParam, -bp           	[optional]
			Body param for raw text.
			i.e: --bodyParam=raw text
		--bodyJson, -bj            	[optional]
			Body JSON param.
			i.e: --bodyJson={
						"project": "project-test-1",
						"message": "this is a sample message"
					}
		--bodyUrlEncode, -bue      	[optional] [multi_value]
			Support for x-www-form-url-encoded query.
			i.e: --bodyUrlEncode=type:employee&&isNew:true
		--bodyFormMultipart, -bfm  	[optional] [multi_value]
			Support for form-data multipart query.
			i.e: --bodyFormMultipart=type:employee&&isNew:true
		--parseResponse, -pr       	[optional]
			Parse json response from http call with given template.
			i.e: --parseResponse={.name}} - {.description}}
		--noParse, -np             	[optional] [single_option] 
			Disable --parseResponse. get raw of the response.
			i.e: --noParse
		--outputFile, -of          	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po        	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f               	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr          	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
### Cak
Cak is a special command to create your Custom Commands. Your commands creation on Playground only hold for 5 minutes. They will be deleted after that.

Just explore Cak command using provided examples. They quite represent Cak functionalities.

[Just Play Cak!](http://cakcuk.io/#/docs/cakCommand)
```
- cak [options] @cakcuk
	Create your custom command. Visit playground https://cakcuk.io/play to explore more!
	i.e: cak -c=test-postman -u=https://postman-echo.com/get -qpd=foo1:::--foo1&&--foo2:::-foo2 -d=testing only aja @cakcuk
	Options:
		--command, -c                      	[mandatory]
			Your command name.
			i.e: --cmd=run-test
		--description, -d                  	[mandatory]
			Your command description.
			i.e: --description=to execute the tests
		--method, -m                       	[mandatory]
			Http Method [GET,POST,PUT,PATCH,DELETE]. Default value: GET.
			i.e: --method=GET
		--url, -u                          	[mandatory]
			URL Endpoint.
			i.e: --url=http://cakcuk.io
		--basicAuth, -ba                   	[optional]
			Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted.
			i.e: --basicAuth=admin:admin123
		--header, -h                       	[optional] [multi_value]
			URL headers. written format: key:value - separated by && with no space for multiple values.
			i.e: --header=Content-Type:application/json&&x-api-key:api-key-value
		--headerDynamic, -hd               	[optional] [multi_value]
			Create option for dynamic header param. written format: key:::option&&key:::option:::description=this is description value:::mandatory:::encrypted.
			i.e: --headerDynamic=x-user-id:::--user
		--queryParam, -qp                  	[optional] [multi_value]
			Query param. written format: key:value - separated by && with no space for multiple values.
			i.e: --queryParam=type:employee&&isNew:true
		--queryParamDynamic, -qpd          	[optional] [multi_value]
			Create option for dynamic query param. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
			i.e: --queryParamDynamic=type:::--type
		--urlParam, -up                    	[optional] [multi_value]
			URL param only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by && with no space for multiple values.
			i.e: --urlParam=id:1
		--urlParamDynamic, -upd            	[optional] [multi_value]
			Create option for dynamic url param. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
			i.e: --urlParamDynamic=employeeID:::--employee
		--bodyParam, -bp                   	[optional]
			Body param for raw text.
			i.e: --bodyParam=raw text
		--bodyJson, -bj                    	[optional]
			Body JSON param.
			i.e: --bodyJson={
						"project": "project-test-1",
						"message": "this is a sample message"
					}
		--bodyUrlEncode, -bue              	[optional] [multi_value]
			Support for x-www-form-url-encoded query.
			i.e: --bodyUrlEncode=type:employee&&isNew:true
		--bodyUrlEncodeDynamic, -bued      	[optional] [multi_value]
			Create option for dynamic x-www-form-url-encoded query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
			i.e: --bodyUrlEncodeDynamic=type:::--type
		--bodyFormMultipart, -bfm          	[optional] [multi_value]
			Support for form-data multipart query.
			i.e: --bodyFormMultipart=type:employee&&isNew:true
		--bodyFormMultipartDynamic, -bfmd  	[optional] [multi_value]
			Create option for dynamic form-data multipart query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted.
			i.e: --bodyFormMultipartDynamic=type:::--type
		--scope, -sc                       	[optional] [multi_value]
			Set command scope, which only specified scopes that can execute command, default is public. Default value: public.
			i.e: --scope=admin&&developer
		--parseResponse, -pr               	[optional]
			Parse json response from http call with given template.
			i.e: --parseResponse={.name}} - {.description}}
		--update, --update                 	[optional] [single_option] 
			force update existing command.
			i.e: --update
		--noParse, -np                     	[optional] [single_option] 
			Disable --parseResponse. get raw of the response.
			i.e: --noParse
		--outputFile, -of                  	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po                	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f                       	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr                  	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
### Del
Del is a simple command to delete your custom commands. You're not allowed to delete Default Commands. Del supports multiple commands deletion separated by double-and `&&` like the examples below.

Please keep in mind, multiple option values always separated by double-and `&&`. You're only able to delete commands in your Scopes, except you have Superuser access.

[Just Play Del!](http://cakcuk.io/#/docs/delCommand)
```
- del [options] @cakcuk
	Delete existing command. Unable to delete default commands.
	i.e: del --command=custom-command @cakcuk
	Options:
		--command, -c        	[mandatory] [multi_value]
			Delete certain command, could be single or multiple commands. seperated by && with no space.
			i.e: --command=custom-command-1&&custom-command-2
		--outputFile, -of    	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po  	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f         	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr    	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
### Scope - ACL
Create, edit, and delete Scopes aka access control list (ACL) for users and commands. It's useful for managing certain custom commands that belongs to certain groups. For example, you create two Scopes for `developer` and `infra`. You want to make the users and commands that belong to `developer` can't be accessed by `infra` users, and vice versa.

The default scope for command is public scope. Commands in public scope can be accessed by anyone in your workspace. Please keep in mind, that Scope creation on Playground also has 5 minutes expiration time.

[Just Play Scope!](http://cakcuk.io/#/docs/scopeCommand)
```
- scope [options] @cakcuk
	Create, edit and delete scopes aka access control list (ACL) for users and commands.
	i.e: scope --command=custom-command @cakcuk
	Options:
		--show, -s           	[optional] [multi_value]
			Show details of the scopes. Could be multiple, separated by && with no space.
			i.e: --show=developer&&public
		--create, -cr        	[optional]
			Create new scope
			i.e: --create=developer
		--command, -c        	[optional] [multi_value]
			Specify certain commands to be added in scope, could be single or multiple commands. seperated by && with no space.
			i.e: --command=custom-command-1&&custom-command-2
		--user, -u           	[optional] [multi_value]
			Specify users to be in specified scope by mentioning his/her/their names. Could be multiple, separated by &&
			i.e: --user=@alex && @dzulqornain
		--update, --update   	[optional]
			Update scope by adding users or/and commands into existing scopes.
			i.e: --update=admin --user=@newUser1&&@newUser2
		--del, -d            	[optional]
			Delete scope or delete users or/and channels from existing scopes.
			i.e: --del=@alex && @dzulqornain
		--oneline, -ol       	[optional] [single_option] 
			Print scope name only.
			i.e: --oneline
		--outputFile, -of    	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po  	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f         	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr    	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
### SU - Superuser
Access and control to manage Superuser. Superuser is enabled by default. But, it's configurable via environment variable of `SUPER_USER_MODE_ENABLED`. Superuser that you set on the Playground has an expiration time. It will hold for 5 minutes like Cak commands & Scopes creation. Only user that's in Superuser list that's able to set and delete the other users to be Superuser. But for first time installation, Superuser can be set by anyone.

[Just Play SU!](http://cakcuk.io/#/docs/suCommand)
```
- su [options] @cakcuk
	Access and control to manage Superuser. Superuser mode currently is enabled.
	i.e: su --set= @iskandar && @ahmad @cakcuk. su @cakcuk to list users who have Superuser role.
	Options:
		--show, -s           	[optional] [multi_value]
			Show details of the user scope & commands that can be accessed. Could be multiple, separated by && with no space.
			i.e: --show=@adit && @ahmad
		--set, --set         	[optional] [multi_value]
			Set user to be Superuser by mention his/her/their names. could be multiple, separated by &&
			i.e: --set=@alex && @ziad
		--del, -d            	[optional] [multi_value]
			Delete user from Superuser by mention his/her/their names. could be multiple, separated by &&
			i.e: --update=@alex && @ziad
		--outputFile, -of    	[optional] [single_option] 
			Print output data into file.
			i.e: --outputFile
		--printOptions, -po  	[optional] [single_option] 
			Print detail options when executing command.
			i.e: --printOptions
		--filter, -f         	[optional]
			Filter output, grep like in terminal.
			i.e: --filter=this is something's that want to be filtered.
		--noResponse, -nr    	[optional] [single_option] 
			Response will not be printed.
			i.e: --noResponse
```
#### The differences between Superuser and Common User

  * `Superuser` can Read, Create, Update, Delete all Scopes. `Common User` is only able to Read, Create, Update, Delete his Scopes.

  * `Superuser` can Read, Create, Update, Delete, Execute all commands. `Common User` is only able to Read, Create, Update, Delete his commands in his scopes.

  * `Superuser` can Read of all the user's access, the scopes and the commands included. `Common User` is not allowed.
  
  * `Superuser` can Show, Set and Delete Superuser list group. `Common User` is only able to Show Superuser list.


## Custom Command
Create your own custom command with Cak command then execute it. Please keep in mind, the commands you create on the Playground have the expiration time. It takes 5 minutes to be deleted after the creation time.

Your created Custom Commands also have the implicit options that Cuk command has. Like Query parameters, Headers, etc. You can overwrite or add params as you need. Just try the examples below! You need to try it in sequence for each example within the section.

Don't forget to explore Cak command as well for more functionalities as you need.

[Just Play Custom Command!](http://cakcuk.io/#/docs/customCommand)

## Default Options
  * `--outputFile, -of`

    Printing result to be file output. It's a single option. Just add `--outputFile, -of` in your command. Please note it's only working in your workspace.
  
  * `--filter, -f`

    Filtering result to be containing some keywords. Works like grep command in terminal. `--filter, -f` is case insensitive. Example usage: `--filter=this is keywords`. Just play the playground to see the result!

  * `--printOptions, -po`

    It will print options when you executing command in your workspace. Just like Preview tab in command section of the play editor. It's useful for you to ensure you input the correct value for each option as you want. Something like avoiding typo.

  * `--noResponse, -nr`

    It will print no response from your executed command in your workspace. Just add `--noResponse, -nr` in your command. It's fit for your usecase whichis for post/put something, like triggering CI or something like that you don't need the response.

  * `--noParse, -np`

    It will ignore `--parseResponse, -pr` value. It's useful for debugging. Works with Cuk, and your custom commands.


## Tips & Trick
### Work with Slackbot
You can work with Slackbot to make your Cakcuk powerful.
  1. Creating Slackbot alias to trigger Cakcuk command.
  2. Set a reminder to execute a certain command at certain o'clock.

### Authentication Support
Currently, only `basic authentication` that's supported on a specific option which is `--basicAuth, -ba`. But you actually also can implement the other authentication that's able to generated to be headers values. You can explore it easyly in API tool like Postman. You can choose what type of auth you use. Then simply get the generated headers. Then you can put those headers values to Cakcuk command request with `--header, -h` option.



## Built With
TODOs

## Contributing
TODO
## Versioning
TODO

## Authors

* **Muhammad Iskandar Dzulqornain** - *Initial work* - [isdzulqor](https://github.com/isdzulqor)


## License
TODO


## Acknowledgments
TODO
