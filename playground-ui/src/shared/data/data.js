const SNIPPET_EXAMPLES = [
  {
    key: "Help",
    examples: [
      {
        title: "Help only",
        syntaxt: "help @cakcuk",
        show: "`help @cakcuk` show all commands with details.",
      },
      {
        title: "Oneline help",
        syntaxt: "help -ol @cakcuk",
        show: "`--oneline, -ol` simplify command list result.",
      },
      {
        title: "Command Detail",
        syntaxt: "help -c=cak @cakcuk",
        show: "Show description, example usage and options for specified command.",
      },
      {
        title: "Online Command Detail",
        syntaxt: "help -c=cak -ol @cakcuk",
        show: "Example and description will not be shown in command detail. Again `--oneline, -ol` for a more simple result.",
      },
      {
        title: "--help on Command",
        syntaxt: "cak --help @cakcuk",
        show: "If you use `--help` it will ignore the other options and will print the detail of a specified command just like `help -c=cak @cakcuk`",
      },
    ]
  },
  {
    key: "Cuk - Hit Endpoint",
    examples: [
      {
        title: "Basic Auth",
        syntaxt:
          `cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=
Header Auth: {{ .headers.authorization }}`,
        show: "Please note, currently Cakcuk only supporting upload file from URL!",
      },
      {
        title: "Header",
        syntaxt:
          `cuk -u=https://postman-echo.com/get -h=x-custom-header:headerValue&&Accept-Encoding:application/gzip @cakcuk`,
        show: "Use `double-and (&&)` for seperating multiple values. Options with type of `[multi_value]` are working with `double-and (&&)` separation. Try `help -c=command-name @cakcuk` to show all `[multi_value] options` that the command has",
      },
      {
        title: "Query Param on URL",
        syntaxt: "cuk -u=https://api.ratesapi.io/api/latest?base=USD @cakcuk",
        show: "You can use `--queryParam, -qp` like this `-qp=base:USD`. Key and value separated by colon (:)",
      },
      {
        title: "Query Param",
        syntaxt:
          `cuk -u=https://jobs.github.com/positions.json -qp=description:python&&location:usa @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
`,
        show: "Try to add `--noParse, -np` to force result as raw. It's useful for debugging when you create new command.",
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
        show: "If you want to print result as a file in your workspace, you can use `--outputFile, -of`. But it's not working in playground.",
      },
      {
        title: "Plain Text Body Param",
        syntaxt: "cuk -m=post -u=https://postman-echo.com/post -bp=testing with cakcuk @cakcuk",
        show: "Default value for `--method, -m` is GET. So, if you want to use the others like `POST, PUT, OPTIONS, etc`. You need to overwrite it.",
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
        show: "Just note, you can combine the param with the other params type, like URL params, query params or the others. Just play with it.",
      },
      {
        title: "URL Encoded Param",
        syntaxt:
          `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bue=name:cakcuk&&id:cakcuk101 
`,
        show: "You need to always mention @cakcuk in your command to trigger command. And you can mention it in the middle, first or last.",
      },
      {
        title: "Multipart - Upload File",
        syntaxt:
          `cuk -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2&&test-file:file=https://i.picsum.photos/id/1015/300/200.jpg @cakcuk`,
        show: "Please note, currently Cakcuk only supporting upload file from URL!",
      },
    ]
  },
  {
    key: "Cak - Create Command",
    examples: [
      {
        title: "Query Param Dynamic",
        syntaxt:
          `cak -c=job-fulltime -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc -d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \\n 
{{ range . }} 
\\n
Job: {{ .title }} \\n
Type: {{ .type }} \\n
Location: {{ .location }} \\n
{{ end }}
`,
        show: "It's a simple example with minimum required options. Your new command containing implicit value which is `full_time` query param. Try to execute this `job-fulltime @cakcuk --desc=python --loc=usa` after creating command. Try to experiment with `--noParse, -np` as well.",
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
        show: "Try to execute `covid19 --status=deaths @cakcuk` after creating covid19 command. See the `mandatory` value on `--urlParamDynamic, -upd`. It makes your option to be mandatory. By default option is optional.",
      },
      {
        title: "URL Encoded Dynamic",
        syntaxt:
          `cak -c=test-url-encode -m=post -u=https://postman-echo.com/post @cakcuk
-bue=country:indonesia&&status:safe -bued=category:::--category:::-c:::mandatory&&type:::--type
-d=Just for testing URL encode 
`,
        show: "After creating the command. Try to execute `test-url-encode --category=food & drinks --type=active @cakcuk` to explore your new command. Try to combine with default options as well!",
      },
      {
        title: "Multipart Dynamic",
        syntaxt:
          `cak -c=test-upload -m=POST -u=https://postman-echo.com/post -bfm=key1:value1&&key2:this is value2 @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory
-d=test upload file
`,
        show: "Try to execute `test-upload --file=https://i.picsum.photos/id/1015/300/200.jpg @cakcuk` after creating the `test-upload` command. See `custom` writing. It also works with the other dynamic params like `--queryParamDynamic, -qpd`, `--urlParamDynamic, -upd`, `--HeaderDynamic, -hd`, `----bodyUrlEncodeDynamic, -bued`, or `--bodyFormMultipartDynamic, -bfmd`.",
      },
      {
        title: "Special Prefix",
        syntaxt:
          `cak -c=test-custom-secret -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=try-custom:::--change:::custom=always {custom} constant:::mandatory
-hd=x-custom-header:::--header-custom:::description=just special header:::example=phone
-d=just for testing special prefix custom and secret`,
        show: "See the special prefix for `custom=`, `encrypt=`, `description=` and `example=`. Execute it and see the result. Test your command by running `test-custom-secret --change=the first testing @cakcuk`. You need to check in Command preview tab to see the differences. Your encrypt option value will be encrypted as well in the database.",
      },
      {
        title: "Encrypted Value",
        syntaxt:
          `cak -c=test-encrypt -u=https://postman-echo.com/get @cakcuk
-qp=api-key:encrypt=secret-key&&category:food
-qpd=secret:::--secret:::mandatory:::encrypted
-d=just for testing two kinds of encrypt. In option level and in value level using the special prefix --update
`,
        show: "Create your `test-encrypt` command. And try run this `test-encrypt --secret=this is secret @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Basic Auth",
        syntaxt:
          `cak -c=test-auth -u=https://postman-echo.com/get -ba=root:root123 @cakcuk
-pr=Header Auth: {{ .headers.authorization }}
-d=testing basic auth only
`,
        show: "After creating your `test-auth` command. Just try to run `test-auth @cakcuk`. Your encrypt option value will be encrypted as well in the database. You need to check in Command preview tab to see the differences as well.",
      },
      {
        title: "Multi Value & Dynamic",
        syntaxt:
          `cak -c=test-dynamic -m=post -u=https://postman-echo.com/post @cakcuk
-bfmd=test-file:::--file:::custom=file={custom}:::mandatory:::example=https://i.picsum.photos/id/1015/300/200.jpg
-qpd=description:::--desc:::multiple
-hd=x-api-key:::--key:::encrypted:::mandatory:::description=put the api key
-d=Just for testing multi-value in queryParamDyanmic or qpd and special prefix for example= & description=
`,
        show: "See implementation for multi-value in special prefix for `example=` and `description=`. Try to experience with it. And also just add `--parseResponse, -pr` in your creation command to parse the response. Execute `" +
          `test-dynamic --key=ini key bosque --desc=test desc 1&&test desc 2
--file=https://i.picsum.photos/id/1015/300/200.jpg @cakcuk` + "` to see your custom command.",
      },
      {
        title: "With Scope",
        syntaxt: "cak -c=with-scope -u=https://postman-echo.com/get -sc=developer -d=testing scope @cakcuk",
        show: "You need to create `developer` scope first then execute `Cak command`. Just see in Scope example. If you've created your `with-scope` command. Try to run this `scope -s=developer @cakcuk`. By default scope is public if you don't specify the scope but, you can set scope later with scope command.",
      },
    ]
  },
  {
    key: "Del - Delete Command",
    examples: [
      {
        title: "Del Single Command",
        syntaxt: "del -c=custom-command @cakcuk",
        show: "Simply deleting command from command list.And it's only custom commands those can be deleted.",
      },
      {
        title: "Del Multiple Commands",
        syntaxt: "del -c=custom-command&&custom-command-2 @cakcuk",
        show: "Works with multiple deletion with `double-and (&&)` separator.",
      },
    ]
  },
  {
    key: "Scope - ACL",
    examples: [
      {
        title: "Show All Scopes",
        syntaxt: "scope @cakcuk",
        show: "Showing existing scopes including the commands. Try `scope -ol @cakcuk` for a more simple result. `public` is default scope.",
      },
      {
        title: "Simple Create Scope",
        syntaxt: "scope -cr=developer @cakcuk",
        show: "`scope -cr=developer @cakcuk` simply create a scope with no registered commands and no registered users. Try `scope -cr=operator -c=custom-command @cakcuk` for creating scope with registering command as well or `scope -cr=operator -u=@user @cakcuk` with registering user. Or you can try both of them. It's also supporting multiple values either for `--command,-c` or `--user, -u`.",
      },
      {
        title: "Update or Enlarge scope",
        syntaxt: "scope --update=developer -c=custom-command-2 @cakcuk",
        show: "It's able to register command or register users. Or both of them in one shot command. Just experience with it!",
      },
      {
        title: "Delete Scope",
        syntaxt: "scope -d=developer @cakcuk",
        show: "`scope -d=developer @cakcuk` will totally delete scope of developer. You can also reduce scope by decreasing registered commands or registered users using `--command, -c` or `--user, -u`. Just experience with it!",
      },
      {
        title: "Reduce Scope",
        syntaxt: "scope -d=developer -c=command-sample @cakcuk",
        show: "`scope -d=developer -c=command-sample @cakcuk` will remove `command-sample` from `developer` scope. Just try to explore reducing scope for users as well by using `--user, -u` option!",
      },
    ]
  },
  {
    key: "su - Super User",
    examples: [
      {
        title: "Show Super User List",
        syntaxt: "su @cakcuk",
        show: "Show users who are super user. Please note `su` command by default is disabled. It needs to be enabled via environment variable of `SUPER_USER_MODE_ENABLED=true`.",
      },
      {
        title: "Set Super User",
        syntaxt: "su --set=@iskandar && @ahmad  @cakcuk",
        show: "Space between user name is tolerable. Since mentioning user on workspace is a bit hard without space. If you deploy your own Cakcuk, please note `su` command by default is disabled. It needs to be enabled via environment variable of `SUPER_USER_MODE_ENABLED=true`.",
      },
      {
        title: "Del Super User",
        syntaxt: "su -d=@iskandar && @ahmad @cakcuk",
        show: "Delete user from super user access. If you deploy your own Cakcuk, Please note `su` command by default is disabled. It needs to be enabled via environment variable of `SUPER_USER_MODE_ENABLED=true`.",
      },
    ]
  },
  {
    key: "Custom Command - Simple Example",
    examples: [
      {
        title: "Create Command Xxxx",
        syntaxt: "@cakcuk",
        show: "try `help @cakcuk` to show command list and details.",
      },
      {
        title: "Force Update",
        syntaxt: "help --oneline @cakcuk",
        show: "try `help --oneline @cakcuk` to show command list in oneline format.",
      },
      {
        title: "Execute Command",
        syntaxt: "help --command=cak @cakcuk",
        show: "try `help --command=cak @cakcuk` to show command detail. Just use --oneline to show oneline format.",
      },
    ]
  },
  {
    key: "Custom Command - Debug",
    examples: [
      {
        title: "Create with Scope",
        syntaxt: "@cakcuk",
        show: "try `help @cakcuk` to show command list and details.",
      },
      {
        title: "Execute Command",
        syntaxt: "help --oneline @cakcuk",
        show: "try `help --oneline @cakcuk` to show command list in oneline format.",
      },
      {
        title: "Debug",
        syntaxt: "help --command=cak @cakcuk",
        show: "try `help --command=cak @cakcuk` to show command detail. Just use --oneline to show oneline format.",
      },
      {
        title: "Delete Command",
        syntaxt: "help --command=cak @cakcuk",
        show: "try `help --command=cak @cakcuk` to show command detail. Just use --oneline to show oneline format.",
      },
    ]
  },
  {
    key: "Custom Command - Overwrite Option",
    examples: [
      {
        title: "Create Command",
        syntaxt: "@cakcuk",
        show: "try `help @cakcuk` to show command list and details.",
      },
      {
        title: "Overwrite Param",
        syntaxt: "help --oneline @cakcuk",
        show: "try `help --oneline @cakcuk` to show command list in oneline format.",
      },
      {
        title: "Add Param",
        syntaxt: "help --oneline @cakcuk",
        show: "try `help --oneline @cakcuk` to show command list in oneline format.",
      }
    ]
  },
  {
    key: "Default Options",
    examples: [
      {
        title: "Result as File",
        syntaxt: "help -of @cakcuk",
        show: "`--outputFile, -of` is only working in workspace. It's not working in playground.",
      },
      {
        title: "Filter Like grep",
        syntaxt: "help -f=scope -ol @cakcuk",
        show: "`--filter, -f` works like grep in terminal.",
      },
      {
        title: "Print Options",
        syntaxt: "help -po @cakcuk",
        show: "You will see like in Command `Preview` tab of your executed command. It's only working in workspace. In playground it's already printed on preview.",
      },
      {
        title: "No Result Printed",
        syntaxt: "cuk -m=post -u=https://postman-echo.com/post @cakcuk -bue=name:cakcuk&&id:cakcuk101 -nr",
        show: "It's only working in workspace. In playground, it's still be printed.",
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
        show: "It will print raw result. It's also working for your custom commands.",
      },
    ]
  },
]

const MOCK_DATA = {
  SNIPPET_EXAMPLES,
};
export default MOCK_DATA;
