const HELP_EXAMPLES = [
  {
    key: "help",
    command: "help -c=help @cakcuk",
  },
  {
    key: "cuk",
    command: "help -c=cuk @cakcuk",
  },
  {
    key: "cak",
    command: "help -c=cak @cakcuk",
  },
  {
    key: "del",
    command: "help -c=del @cakcuk",
  },
  {
    key: "scope",
    command: "help -c=scope @cakcuk",
  },
  {
    key: "su",
    command: "help -c=su @cakcuk",
  }
]

const SNIPPET_CONSOLE = [
  {
    key: "Cuk - Hit Endpoint",
    examples: [
      {
        title: "Header",
        syntaxt:
          `cuk -u=https://postman-echo.com/get -h=x-custom-header:headerValue&&Accept-Encoding:application/gzip @cakcuk`,
        info: "Use double-and `&&` for seperating multiple values. <br><br>Options with type of `[multi_value]` are working with double-and `&&` separation. <br><br>Try `help -c=command-name @cakcuk` to show all `[multi_value] options` that the command has",
      },
      {
        title: "Query Param on URL",
        syntaxt: "cuk -u=https://api.ratesapi.io/api/latest?base=USD @cakcuk",
        info: "You can use `--queryParam, -qp` like this `-qp=base:USD`. Key and value separated by colon `(:)`",
      },
      {
        title: "Query Param",
        syntaxt:
          `cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris&&fulltime:false @cakcuk
`,
        info: "Try to add `--noParse, -np` to force result as raw. It's useful for debugging when you create new command.",
      },
      {
        title: "URL Param",
        syntaxt:
          `cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}
-up=country:indonesia&&status:confirmed
-pr=
Covid19 Confirmed Cases in Indonesia \\n
{{ range . }} 
\\n
Date: {{ .Date }} \\n
Cases: {{ .Cases }} \\n
{{ end }}
@cakcuk
`,
        info: "If you want to print result as a file in your workspace, you can use `--outputFile, -of`. But it's not working in playground.",
      },
      {
        title: "Plain Text Body Param",
        syntaxt: "cuk -m=post -u=https://postman-echo.com/post -bp=testing with cakcuk @cakcuk",
        info: "Default value for `--method, -m` is GET. <br><br>So, if you want to use the others like `POST, PUT, OPTIONS, etc`. You need to overwrite it.",
      },
      {
        title: "Json as Body Param",
        syntaxt:
          `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bj={
"testing-key": "cakcuk101",
"testing-value": "testing with cakcuk"
}
`,
        info: "Just note, you can combine the param with the other params type, like URL params, query params or the others. Just play with it.",
      },
      {
        title: "URL Encoded Param",
        syntaxt:
          `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bue=name:cakcuk&&id:cakcuk101 
`,
        info: "You need to always mention @cakcuk in your command to trigger command. And you can mention it in the middle, first or last.",
      },
      {
        title: "Multipart - Upload File",
        syntaxt:
          `cuk -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2&&test-file:file=https://via.placeholder.com/150 @cakcuk`,
        info: "Please note, currently Cakcuk only supporting upload file from URL!",
      },
      {
        title: "Parse Response",
        syntaxt:
          `cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris @cakcuk
-pr=
List of Jobs \\n 
{{ range $index, $value:= . }} 
\\n
Number {{ add $index 1 }} \\n
Job: {{ $value.title }} \\n
Salary: {{ $value.salary }} \\n
Location: {{ $value.city }} - {{ $value.country }} \\n
{{ end }}`,
        info: "`--parseResponse, -pr` is useful for making your response to be readable. `--parseResponse, -pr` uses `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig).",
      },
      {
        title: "Basic Auth",
        syntaxt:
          `cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=
Header Auth: {{ .headers.authorization }}`,
        info: "Simply use `--basicAuth` for using basic auth. You can see at Tips & Trick section for the other authentications tips.",
      },
    ]
  },
  {
    key: "Cak - Create Command",
    examples: [
      {
        title: "Query Param Dynamic",
        syntaxt:
          `cak -c=job-fulltime -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=fulltime:true -qpd=title:::--role&&country:::--country -d=List full time jobs from Github jobs @cakcuk 
-pr=
List of Jobs \\n 
{{ range $index, $value:= . }} 
\\n
Number {{ add $index 1 }} \\n
Job: {{ $value.title }} \\n
Salary: {{ $value.salary }} \\n
Location: {{ $value.city }} - {{ $value.country }} \\n
{{ end }}
`,
        info: "It's a simple example with minimum required options. Your new command containing implicit value which is `full_time` query param. <br><br>Try to execute this `job-fulltime @cakcuk --desc=python --loc=usa` after creating command. <br><br>Try to experiment with `--noParse, -np` as well.",
      },
      {
        title: "URL Param Dynamic",
        syntaxt:
          `cak -c=covid19 -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}
-d=Listing covid19 cases in Indonesia
-up=country:indonesia
-upd=status:::--status:::mandatory
-pr=
Covid19 Confirmed Cases in Indonesia \\n
{{ range . }} 
\\n
Date: {{ .Date }} \\n
Cases: {{ .Cases }} \\n
{{ end }}
@cakcuk
`,
        info: "Try to execute `covid19 --status=deaths @cakcuk` after creating covid19 command. See the `mandatory` value on `--urlParamDynamic, -upd`. It makes your option to be mandatory. By default option is optional.",
      },
      {
        title: "URL Encoded Dynamic",
        syntaxt:
          `cak -c=test-url-encode -m=post -u=https://postman-echo.com/post @cakcuk
-bue=country:indonesia&&status:safe -bued=category:::--category:::-c:::mandatory&&type:::--type
-d=Just for testing URL encode 
`,
        info: "After creating the command. Try to execute `test-url-encode --category=food & drinks --type=active @cakcuk` to explore your new command. Try to combine with default options as well!",
      },
      {
        title: "Multipart Dynamic",
        syntaxt:
          `cak -c=test-upload -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2 @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory
-d=test upload file
`,
        info: "Try to execute `test-upload --file=https://via.placeholder.com/150 @cakcuk` after creating the `test-upload` command. <br><br>See `custom` writing. It also works with the other dynamic params like `--queryParamDynamic, -qpd`, `--urlParamDynamic, -upd`, `--HeaderDynamic, -hd`, `----bodyUrlEncodeDynamic, -bued`, or `--bodyFormMultipartDynamic, -bfmd`.",
      },
      {
        title: "Special Prefix",
        syntaxt:
          `cak -c=test-custom-secret -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory
-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone
-d=just for testing special prefix custom and secret`,
        info: "See the special prefix for `custom=`, `encrypt=`, `description=` and `example=`. <br><br>Execute it and see the result. Test your command by running `test-custom-secret --change=the first testing --header-custom=this header is custom @cakcuk`. <br><br>You need to check in Command preview tab to see the differences. Your encrypt option value will be encrypted as well in the database.",
      },
      {
        title: "Encrypted Value",
        syntaxt:
          `cak -c=test-encrypt -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=secret:::--secret:::mandatory:::encrypted
-d=just for testing two kinds of encrypt. In option level and in value level using the special prefix
`,
        info: "Create your `test-encrypt` command. And try run this `test-encrypt --secret=this is secret @cakcuk`. <br><br>Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Basic Auth",
        syntaxt:
          `cak -c=test-auth -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=Header Auth: {{ .headers.authorization }}
-d=testing basic auth only
`,
        info: "After creating your `test-auth` command. Just try to run `test-auth @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Multi Value & Dynamic",
        syntaxt:
          `cak -c=test-dynamic -m=post -u=https://postman-echo.com/post @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory:::example=https://via.placeholder.com/150
-qpd=description:::--desc:::multiple
-hd=x-api-key:::--key:::encrypted:::mandatory:::description=put the api key
-d=Just for testing multi-value in queryParamDyanmic or qpd and special prefix for example= & description=
`,
        info: "See implementation for multi-value in special prefix for `example=` and `description=`. Try to experience with it. And also just add `--parseResponse, -pr` in your creation command to parse the response. <br><br>Execute `" +
          `test-dynamic --key=ini key bosque --desc=test desc 1&&test desc 2
--file=https://via.placeholder.com/150 @cakcuk` + "` to see your custom command.",
      },
      {
        title: "With Scope",
        syntaxt: "cak -c=with-scope -u=https://postman-echo.com/get -sc=developer -d=testing scope @cakcuk",
        info: "You need to create `developer` scope first then execute `Cak command`. Just see in Scope example. If you've created your `with-scope` command. <br><br>Try to run this `scope -s=developer @cakcuk`. <br><br>By default scope is public if you don't specify the scope but, you can set scope later with scope command.",
      },
    ]
  },
  {
    key: "Custom Command - Simple Example",
    examples: [
      {
        title: "Create Command",
        syntaxt:
          `cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
`,
        info: "Simply command creation with parsing the rensponse. Just explore the `--parseResponse, -pr` with your custom response. Parse response using `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig).",
      },
      {
        title: "Force Update",
        syntaxt:
          `cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:false -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
--update`,
        info: "Simply put `--update` for forcing update to create command.",
      },
      {
        title: "Execute Command",
        syntaxt: "get-job --loc=usa --desc=python @cakcuk",
        info: "Simply execute your `get-job` command. Please note that command creation has expiration time on Playground. It will just exist for 5 minutes.",
      },
      {
        title: "No Parse",
        syntaxt: "get-job --loc=usa --desc=python -np @cakcuk",
        info: "`--noParse, -np` is useful for debugging when you create command in your workspace.",
      },
    ]
  },
  {
    key: "Custom Command - Overwrite Option",
    examples: [
      {
        title: "Create Command",
        syntaxt:
          `cak -c=test-param-add -u=https://postman-echo.com/get @cakcuk
-h=x-my-header:my header value
-qp=api-key:encrypt=secret-key&&category:food
-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory
-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone
-d=just for testing special prefix custom and secret
`,
        info: "Create your `test-param-add` command. Explore with your own param if you want to add some values.",
      },
      {
        title: "Add Param Value",
        syntaxt: `test-param-add --change=changing value --header-custom=this is custom header -qp=add-header:this is new header -qp=category:drinks&&new-query:query test @cakcuk`,
        info: "Run the command and compare the response with this command `test-param-add --change=changing value --header-custom=this is custom header @cakcuk`. See the differences.",
      },
      {
        title: "Execute with Scope",
        syntaxt: `test-param-add -sc=public --change=changing value --header-custom=this is custom header @cakcuk`,
        info: "When you created `test-param-add`, Its scope was not specified, thus its scope is public. Try to experimenting scope changes. <br><br>See on `Scope` examples and back again to try this `test-param-add` command execution with different `--scope, -sc` value.",
      },
    ]
  },
]

const SNIPPET_EXAMPLES = [
  {
    key: "Help",
    examples: [
      {
        title: "Help only",
        syntaxt: "help @cakcuk",
        info: "`help @cakcuk` show all commands with details.",
      },
      {
        title: "Oneline help",
        syntaxt: "help -ol @cakcuk",
        info: "`--oneline, -ol` simplify command list result.",
      },
      {
        title: "Command Detail",
        syntaxt: "help -c=cak @cakcuk",
        info: "Show description, example usage and options for specified command.",
      },
      {
        title: "Online Command Detail",
        syntaxt: "help -c=cak -ol @cakcuk",
        info: "Example and description will not be shown in command detail. Again `--oneline, -ol` for a more simple result.",
      },
      {
        title: "--help on Command",
        syntaxt: "cak --help @cakcuk",
        info: "If you use `--help` it will ignore the other options and will print the detail of a specified command just like `help -c=cak @cakcuk`",
      },
    ]
  },
  {
    key: "Cuk - Hit Endpoint",
    examples: [
      {
        title: "Header",
        syntaxt:
          `cuk -u=https://postman-echo.com/get -h=x-custom-header:headerValue&&Accept-Encoding:application/gzip @cakcuk`,
        info: "Use double-and `&&` for seperating multiple values. <br><br>Options with type of `[multi_value]` are working with double-and `&&` separation. <br><br>Try `help -c=command-name @cakcuk` to show all `[multi_value] options` that the command has",
      },
      {
        title: "Query Param on URL",
        syntaxt: "cuk -u=https://api.ratesapi.io/api/latest?base=USD @cakcuk",
        info: "You can use `--queryParam, -qp` like this `-qp=base:USD`. Key and value separated by colon `(:)`",
      },
      {
        title: "Query Param",
        syntaxt:
          `cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris&&fulltime:false @cakcuk
`,
        info: "Try to add `--noParse, -np` to force result as raw. It's useful for debugging when you create new command.",
      },
      {
        title: "URL Param",
        syntaxt:
          `cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}
-up=country:indonesia&&status:confirmed
-pr=
Covid19 Confirmed Cases in Indonesia \\n
{{ range . }} 
\\n
Date: {{ .Date }} \\n
Cases: {{ .Cases }} \\n
{{ end }}
@cakcuk
`,
        info: "If you want to print result as a file in your workspace, you can use `--outputFile, -of`. But it's not working in playground.",
      },
      {
        title: "Plain Text Body Param",
        syntaxt: "cuk -m=post -u=https://postman-echo.com/post -bp=testing with cakcuk @cakcuk",
        info: "Default value for `--method, -m` is GET. <br><br>So, if you want to use the others like `POST, PUT, OPTIONS, etc`. You need to overwrite it.",
      },
      {
        title: "Json as Body Param",
        syntaxt:
          `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bj={
"testing-key": "cakcuk101",
"testing-value": "testing with cakcuk"
}
`,
        info: "Just note, you can combine the param with the other params type, like URL params, query params or the others. Just play with it.",
      },
      {
        title: "URL Encoded Param",
        syntaxt:
          `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bue=name:cakcuk&&id:cakcuk101 
`,
        info: "You need to always mention @cakcuk in your command to trigger command. And you can mention it in the middle, first or last.",
      },
      {
        title: "Multipart - Upload File",
        syntaxt:
          `cuk -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2&&test-file:file=https://via.placeholder.com/150 @cakcuk`,
        info: "Please note, currently Cakcuk only supporting upload file from URL!",
      },
      {
        title: "Parse Response",
        syntaxt:
          `cuk -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=city:paris @cakcuk
-pr=
List of Jobs \\n 
{{ range $index, $value:= . }} 
\\n
Number {{ add $index 1 }} \\n
Job: {{ $value.title }} \\n
Salary: {{ $value.salary }} \\n
Location: {{ $value.city }} - {{ $value.country }} \\n
{{ end }}`,
        info: "`--parseResponse, -pr` is useful for making your response to be readable. `--parseResponse, -pr` uses `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig).",
      },
      {
        title: "Basic Auth",
        syntaxt:
          `cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=
Header Auth: {{ .headers.authorization }}`,
        info: "Simply use `--basicAuth` for using basic auth. You can see at Tips & Trick section for the other authentications tips.",
      },
    ]
  },
  {
    key: "Cak - Create Command",
    examples: [
      {
        title: "Query Param Dynamic",
        syntaxt:
          `cak -c=job-fulltime -u=https://apis.camillerakoto.fr/fakejobs/jobs -qp=fulltime:true -qpd=title:::--role&&country:::--country -d=List full time jobs from Github jobs @cakcuk 
-pr=
List of Jobs \\n 
{{ range $index, $value:= . }} 
\\n
Number {{ add $index 1 }} \\n
Job: {{ $value.title }} \\n
Salary: {{ $value.salary }} \\n
Location: {{ $value.city }} - {{ $value.country }} \\n
{{ end }}
`,
        info: "It's a simple example with minimum required options. Your new command containing implicit value which is `full_time` query param. <br><br>Try to execute this `job-fulltime @cakcuk --desc=python --loc=usa` after creating command. <br><br>Try to experiment with `--noParse, -np` as well.",
      },
      {
        title: "URL Param Dynamic",
        syntaxt:
          `cak -c=covid19 -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}
-d=Listing covid19 cases in Indonesia
-up=country:indonesia
-upd=status:::--status:::mandatory
-pr=
Covid19 Confirmed Cases in Indonesia \\n
{{ range . }} 
\\n
Date: {{ .Date }} \\n
Cases: {{ .Cases }} \\n
{{ end }}
@cakcuk
`,
        info: "Try to execute `covid19 --status=deaths @cakcuk` after creating covid19 command. See the `mandatory` value on `--urlParamDynamic, -upd`. It makes your option to be mandatory. By default option is optional.",
      },
      {
        title: "URL Encoded Dynamic",
        syntaxt:
          `cak -c=test-url-encode -m=post -u=https://postman-echo.com/post @cakcuk
-bue=country:indonesia&&status:safe -bued=category:::--category:::-c:::mandatory&&type:::--type
-d=Just for testing URL encode 
`,
        info: "After creating the command. Try to execute `test-url-encode --category=food & drinks --type=active @cakcuk` to explore your new command. Try to combine with default options as well!",
      },
      {
        title: "Multipart Dynamic",
        syntaxt:
          `cak -c=test-upload -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2 @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory
-d=test upload file
`,
        info: "Try to execute `test-upload --file=https://via.placeholder.com/150 @cakcuk` after creating the `test-upload` command. <br><br>See `custom` writing. It also works with the other dynamic params like `--queryParamDynamic, -qpd`, `--urlParamDynamic, -upd`, `--HeaderDynamic, -hd`, `----bodyUrlEncodeDynamic, -bued`, or `--bodyFormMultipartDynamic, -bfmd`.",
      },
      {
        title: "Special Prefix",
        syntaxt:
          `cak -c=test-custom-secret -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory
-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone
-d=just for testing special prefix custom and secret`,
        info: "See the special prefix for `custom=`, `encrypt=`, `description=` and `example=`. <br><br>Execute it and see the result. Test your command by running `test-custom-secret --change=the first testing --header-custom=this header is custom @cakcuk`. <br><br>You need to check in Command preview tab to see the differences. Your encrypt option value will be encrypted as well in the database.",
      },
      {
        title: "Encrypted Value",
        syntaxt:
          `cak -c=test-encrypt -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=secret:::--secret:::mandatory:::encrypted
-d=just for testing two kinds of encrypt. In option level and in value level using the special prefix
`,
        info: "Create your `test-encrypt` command. And try run this `test-encrypt --secret=this is secret @cakcuk`. <br><br>Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Basic Auth",
        syntaxt:
          `cak -c=test-auth -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=Header Auth: {{ .headers.authorization }}
-d=testing basic auth only
`,
        info: "After creating your `test-auth` command. Just try to run `test-auth @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Multi Value & Dynamic",
        syntaxt:
          `cak -c=test-dynamic -m=post -u=https://postman-echo.com/post @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory:::example=https://via.placeholder.com/150
-qpd=description:::--desc:::multiple
-hd=x-api-key:::--key:::encrypted:::mandatory:::description=put the api key
-d=Just for testing multi-value in queryParamDyanmic or qpd and special prefix for example= & description=
`,
        info: "See implementation for multi-value in special prefix for `example=` and `description=`. Try to experience with it. And also just add `--parseResponse, -pr` in your creation command to parse the response. <br><br>Execute `" +
          `test-dynamic --key=ini key bosque --desc=test desc 1&&test desc 2
--file=https://via.placeholder.com/150 @cakcuk` + "` to see your custom command.",
      },
      {
        title: "With Scope",
        syntaxt: "cak -c=with-scope -u=https://postman-echo.com/get -sc=developer -d=testing scope @cakcuk",
        info: "You need to create `developer` scope first then execute `Cak command`. Just see in Scope example. If you've created your `with-scope` command. <br><br>Try to run this `scope -s=developer @cakcuk`. <br><br>By default scope is public if you don't specify the scope but, you can set scope later with scope command.",
      },
    ]
  },
  {
    key: "Del - Delete Command",
    examples: [
      {
        title: "Del Single Command",
        syntaxt: "del -c=custom-command @cakcuk",
        info: "Simply deleting command from command list. It's only custom commands those can be deleted.",
      },
      {
        title: "Del Multiple Commands",
        syntaxt: "del -c=custom-command&&custom-command-2 @cakcuk",
        info: "Works with multiple deletion with double-and `&&` separator.",
      },
    ]
  },
  {
    key: "Scope - ACL",
    examples: [
      {
        title: "Show All Scopes",
        syntaxt: "scope @cakcuk",
        info: "Showing existing scopes including the commands. Try `scope -ol @cakcuk` for a more simple result. `public` is default scope.",
      },
      {
        title: "Simple Create Scope",
        syntaxt: "scope -cr=developer @cakcuk",
        info: "`scope -cr=developer @cakcuk` simply create a scope with no registered commands and no registered users. <br><br>Try `scope -cr=operator -c=custom-command @cakcuk` for creating scope with registering command as well or `scope -cr=operator -u=@user @cakcuk` with registering user. <br><br>Or you can try both of them. It's also supporting multiple values either for `--command,-c` or `--user, -u`.",
      },
      {
        title: "Update or Enlarge scope",
        syntaxt: "scope --update=developer -c=custom-command-2 @cakcuk",
        info: "It's able to register command or register users. Or both of them in one shot command. Just experience with it!",
      },
      {
        title: "Delete Scope",
        syntaxt: "scope -d=developer @cakcuk",
        info: "`scope -d=developer @cakcuk` will totally delete scope of developer. You can also reduce scope by decreasing registered commands or registered users using `--command, -c` or `--user, -u`. Just experience with it!",
      },
      {
        title: "Reduce Scope",
        syntaxt: "scope -d=developer -c=command-sample @cakcuk",
        info: "`scope -d=developer -c=command-sample @cakcuk` will remove `command-sample` from `developer` scope. Just try to explore reducing scope for users as well by using `--user, -u` option!",
      },
    ]
  },
  {
    key: "su - Superuser",
    examples: [
      {
        title: "Show Superuser List",
        syntaxt: "su @cakcuk",
        info: "Show users who are superuser. Please note `su` command by default is enabled. It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`.",
      },
      {
        title: "Set Superuser",
        syntaxt: "su --set=@iskandar && @ahmad  @cakcuk",
        info: "Space between user name is tolerable. Since mentioning user on workspace is a bit hard without space. <br><br>If you deploy your own Cakcuk, please note `su` command by default is enabled. <br><br>It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`.",
      },
      {
        title: "Del Superuser",
        syntaxt: "su -d=@iskandar && @ahmad @cakcuk",
        info: "Delete user from superuser access. <br><br>If you deploy your own Cakcuk, Please note `su` command by default is enabled. <br><br>It can be disabled via environment variable of `SUPER_USER_MODE_ENABLED=false`.",
      },
    ]
  },
  {
    key: "Custom Command - Simple Example",
    examples: [
      {
        title: "Create Command",
        syntaxt:
          `cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
`,
        info: "Simply command creation with parsing the rensponse. Just explore the `--parseResponse, -pr` with your custom response. Parse response using `Golang text/template` that's also supported by [sprig package](http://masterminds.github.io/sprig).",
      },
      {
        title: "Force Update",
        syntaxt:
          `cak -c=get-job -u=https://jobs.github.com/positions.json -qp=full_time:false -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
--update`,
        info: "Simply put `--update` for forcing update to create command.",
      },
      {
        title: "Execute Command",
        syntaxt: "get-job --loc=usa --desc=python @cakcuk",
        info: "Simply execute your `get-job` command. Please note that command creation has expiration time on Playground. It will just exist for 5 minutes.",
      },
      {
        title: "No Parse",
        syntaxt: "get-job --loc=usa --desc=python -np @cakcuk",
        info: "`--noParse, -np` is useful for debugging when you create command in your workspace.",
      },
    ]
  },
  {
    key: "Custom Command - Overwrite Option",
    examples: [
      {
        title: "Create Command",
        syntaxt:
          `cak -c=test-param-add -u=https://postman-echo.com/get @cakcuk
-h=x-my-header:my header value
-qp=api-key:encrypt=secret-key&&category:food
-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory
-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone
-d=just for testing special prefix custom and secret
`,
        info: "Create your `test-param-add` command. Explore with your own param if you want to add some values.",
      },
      {
        title: "Add Param Value",
        syntaxt: `test-param-add --change=changing value --header-custom=this is custom header -qp=add-header:this is new header -qp=category:drinks&&new-query:query test @cakcuk`,
        info: "Run the command and compare the response with this command `test-param-add --change=changing value --header-custom=this is custom header @cakcuk`. See the differences.",
      },
      {
        title: "Execute with Scope",
        syntaxt: `test-param-add -sc=public --change=changing value --header-custom=this is custom header @cakcuk`,
        info: "When you created `test-param-add`, Its scope was not specified, thus its scope is public. Try to experimenting scope changes. <br><br>See on `Scope` examples and back again to try this `test-param-add` command execution with different `--scope, -sc` value.",
      },
    ]
  },
  {
    key: "Default Options",
    examples: [
      {
        title: "Result as File",
        syntaxt: "help -of @cakcuk",
        info: "`--outputFile, -of` is only working in workspace. It's not working in playground.",
      },
      {
        title: "Filter Like grep",
        syntaxt: "help -f=scope -ol @cakcuk",
        info: "`--filter, -f` works like grep in terminal.",
      },
      {
        title: "Print Options",
        syntaxt: "help -po @cakcuk",
        info: "You will see like in Command `Preview` tab of your executed command. It's only working in workspace. In playground it's already printed on preview.",
      },
      {
        title: "No Result Printed",
        syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk -bue=name:cakcuk&&id:cakcuk101 -nr",
        info: "It's only working in workspace. In playground, it's still be printed.",
      },
      {
        title: "No Parse for Debugging",
        syntaxt:
          `cuk -u=https://api.covid19api.com/dayone/country/{{country}}/status/{{status}}
-up=country:indonesia&&status:confirmed
-pr=
Covid19 Confirmed Cases in Indonesia \\n
{{ range . }} 
\\n
Date: {{ .Date }} \\n
Cases: {{ .Cases }} \\n
{{ end }}
@cakcuk
-np`,
        info: "It will print raw result. It's also working for your custom commands.",
      },
    ]
  },
]

const FAQ = [
  {
    question: "Will Cakcuk support other workspaces",
    answer: "Yes, of course. Currently, <a href='#'>Cakcuk</a> only supports Slack, and Telegram is on a timeline for the nearest future. Do you have any ideas? Just simply <a href='mailto:midzulqornain@gmail.com'>mail me</a>."
  },
  {
    question: "How do I integrate my workspace with Cakcuk",
    answer: "Just <a href='https://cakcuk.io/slack/add'>add Cakcuk in your workspace</a> directly or <a href='#/docs/deploy'> deploy by yourself.</a>"
  },
  {
    question: "Is Cakcuk free",
    answer: "Free. It's also <a href='https://github.com/isdzulqor/cakcuk' target='_blank'>open-source</a> though."
  },
  {
    question: "How do I try Cakcuk easily without any integration, just for curiosity",
    answer: "<a href='#/play'>Play with it!</a> No setup or necessary steps. Examples are provided. Just play around with your own API."
  },
  {
    question: "What if I want to play with my own Cakcuk that deployed by myself",
    answer: "An embedded playground is available. You can just go to <i>your-cakcuk-url/ui/play</i>."
  },
  {
    question: "How can I give my ideas, suggestions, or feedback for Cakcuk",
    answer: "Any ideas, suggestions, and feedback always desirable. You can <a href='https://docs.google.com/forms/d/e/1FAIpQLSddWL8d3c0pFQGNamfTwNjV2iG3zFHopgfT3SylqeggVi71Ow/viewform?usp=sf_link' target='_blank'>fill in the form</a>, <a href='mailto:midzulqornain@gmail.com' target='_blank'>mail me</a>, or <a href='https://github.com/isdzulqor/cakcuk/issues' target='_blank'>create issues</a> in <a href='https://github.com/isdzulqor/cakcuk' target='_blank'>Cakcuk Github</a>. We're happy to hear from you."
  },
  {
    question: "How can I contribute to Cakcuk",
    answer: "<a href='https://github.com/isdzulqor/cakcuk/issues' target='_blank'>Submit your issues</a>, <a href='https://github.com/isdzulqor/cakcuk/pulls' target='_blank'>submit your pull request</a>, <a href='https://docs.google.com/forms/d/e/1FAIpQLSddWL8d3c0pFQGNamfTwNjV2iG3zFHopgfT3SylqeggVi71Ow/viewform?usp=sf_link' target='_blank'>give any feedback</a>, or share Cakcuk to your circle. Any contributions are welcomed."
  },
  {
    question: "How can I give sponsorship to Cakcuk",
    answer: "Cakcuk Community version is currently maintained with my budget. If you're willing to provide better infrastructure with your infrastructure space or your budget. It will be great. Any kind of sponsorships is well appreciated. <a href='mailto:midzulqornain@gmail.com' target='_blank'>Please let me know!<a>"
  },
]

const RUN_WAYS = [
  {
    key: "event-tls-disabled",
    code:
      `docker run -p 80:80 \\
      -e MYSQL_HOST="your-mysql-host" \\
      -e MYSQL_USERNAME="your-mysql-username" \\
      -e MYSQL_PASSWORD="your-mysql-password" \\
      -e MYSQL_DATABASE="your-mysql-db-name" \\
      -e SLACK_TOKEN="your-slack-app-token" \\
      -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \\
      -e SLACK_EVENT_ENABLED="true" \\
      isdzulqor/cakcuk:latest`
  },
  {
    key: "event-tls-enabled",
    code:
      `docker run -p 80:80 -p 443:443 \\
      -e MYSQL_HOST="your-mysql-host" \\
      -e MYSQL_USERNAME="your-mysql-username" \\
      -e MYSQL_PASSWORD="your-mysql-password" \\
      -e MYSQL_DATABASE="your-mysql-db-name" \\
      -e SLACK_TOKEN="your-slack-app-token" \\
      -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \\
      -e SLACK_EVENT_ENABLED="true" \\
      -e TLS_ENABLED="true" \\
      -e PUBLIC_DOMAINS="your-domain-1,www-your-domain-1" \\
      isdzulqor/cakcuk:latest`
  },
  {
    key: "rtm-tls-disabled",
    code:
      `docker run -p 80:80 \\
      -e MYSQL_HOST="your-mysql-host" \\
      -e MYSQL_USERNAME="your-mysql-username" \\
      -e MYSQL_PASSWORD="your-mysql-password" \\
      -e MYSQL_DATABASE="your-mysql-db-name" \\
      -e SLACK_TOKEN="your-slack-app-token" \\
      -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \\
      -e SLACK_RTM_ENABLED="true" \\
      isdzulqor/cakcuk:latest`
  },
  {
    key: "rtm-tls-enabled",
    code:
      `docker run -p 80:80 -p 443:443 \\
      -e MYSQL_HOST="your-mysql-host" \\
      -e MYSQL_USERNAME="your-mysql-username" \\
      -e MYSQL_PASSWORD="your-mysql-password" \\
      -e MYSQL_DATABASE="your-mysql-db-name" \\
      -e SLACK_TOKEN="your-slack-app-token" \\
      -e SLACK_VERIFICATION_TOKEN="your-slack-verification-token" \\
      -e SLACK_RTM_ENABLED="true" \\
      -e TLS_ENABLED="true" \\
      -e PUBLIC_DOMAINS="your-domain-1,www-your-domain-1" \\
      isdzulqor/cakcuk:latest`
  },
  {
    key: "docker-compose",
    code:
      `docker-compose -f docker-compose.yaml up -d`,
  }
]

const PRIVACY_POLICY = `
<a href="https://isdzulqor.com" target="_blank"><b>Isdzulqor</b></a> built **Cakcuk** as a Free and Open Source app. This SERVICE is provided by <a href="https://isdzulqor.com" target="_blank"><b>Isdzulqor</b></a> at no cost and is intended for use as is.

This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.

If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.

**Information Collection and Use**

Free Cakcuk community version app which is can be installed on your workspace. We collect minimum data only for supporting the Cakcuk app functionalities. Such as Team ID, and Team Name for unique identity per workspace to support Cakcuk features. User ID, and User name needed for the [Scope](#/docs/scopeCommand) and [Superuser](#/docs/suCommand) features. And also the data for [Custom Commands](#/docs/customCommand) that your team has created.


**Log Data**

For a better experience, we may also save the Log Data for this site to collect some information. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.

**Cookies**

Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

**Service Providers**

I may employ third-party companies and individuals due to the following reasons:

*   To facilitate our Service;
*   To provide the Service on our behalf;
*   To perform Service-related services; or
*   To assist us in analyzing how our Service is used.

I want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

**Security**

I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.

**Links to Other Sites**

This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

**Changes to This Privacy Policy**

I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.

This policy is effective as of 2020-06-10

**Contact Us**

If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact me at midzulqornain@gmail.com.

`

const MOCK_DATA = {
  HELP_EXAMPLES,
  SNIPPET_EXAMPLES,
  SNIPPET_CONSOLE,
  FAQ,
  RUN_WAYS,
  PRIVACY_POLICY,
};
export default MOCK_DATA;
