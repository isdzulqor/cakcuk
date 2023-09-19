# Loader

This document describes the configuration file that can be used as a loader during the first initiation and is optional.

## SSHs

`SSHs` is an array of SSH configurations. Each configuration object should have the following fields:

- **ID (String):** A unique identifier for the SSH configuration. This can be any string value with length equal to or less than 36 characters.
- **Host (String):** The hostname or IP address of the remote server. 
- **Port (Integer):** The SSH port number for the remote server. Default: `22`
- **Username (String):** The username to use for SSH authentication. 
- **Password (String):** The password to use for SSH authentication.  
- **SSHKey (String):** The SSH key in base64-encoded format for authentication.

This SSH configurations is used to enable the feature of [**HTTPs over SSH**](https://github.com/isdzulqor/cakcuk/pull/22).

## Commands

`Commands` is an array of cakcuk commands to execute. Each command should be a string value. The command string can be a single line or multiple lines. If the command string is multiple lines, it should be prefixed with `>`.

## Sample YAML with Dummy Values

```yaml
SSHs:
  - ID: my-ssh-config-1
    Host: example.com
    Port: 22
    Username: myusername
    SSHKey: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJRW93SUJBQUtDQVFFQWdSSStPSkU3NXh0YVg1VE8wL0pMWkt2UTFQM0YxbnJFQ1dUdjNRNUVFRDZXemZiRg0KYldYSHFueTl4c0VacXVUTnhkVS96QVltT2k1UFlxblRoVnN6YVhsL1RZSFJMZjMva3E0ZCsvZzgwRjdBUUdobw0KVXpoRnowcTJITUpIKzhFbE5aN1BZMXZTMzEySVp5SDdYYW1qbzBVZERSZWFHNTZYRExMemhRWnEzaFFvTXNKSw0KZUluTmp6UDl2NVIwckNWcHVlWEZHOWdETnFqN0d5OWNLcDVXVHFJMmFZYlcyT0pMUkJvM09lRktoeWZMVHk0QQ0KYnNqOFBQK01OSEg0VTVkOHdBYXlCbURCRVdUYlpJZG4vVktpWDJYWnluTFJNZHR4NUNpeW1TU0dTdUJacUhteg0KUDBsZWw0RDFuemlSNGdZdVFqNzAwZDAzVVpTZWZySzlxUm93L3RFUTByN3FwYTN0MHhsaHN2aVBVUTgrbTRiSmRLDQoxaGZwMkpzSDkvVDBMVjBRSXFTNWorRzlyNVVibmU0Y3A4U2VzPT1jYWtfY2VudHJhbD1mYXRvb3JhLWludHVydHVwLmhhcmFqLmFwcC9jb250cm9sLXBhbmVsL3NvbHV0aW9uLnN0YXR1cw0Kc3ViamVjdDogZW5jcnlwdD17InF1ZXJ5IjoiU3F1
Commands:
  - > 
    su --set=U012GJAAF5F @cakcuk
  - >
    cak-group -c=check-status-dev -d=Check Solution Status
    -u=https://example.com/graphql -m=POST --label=login
    -bj=encrypt={"query":"mutation {\n  login(username: \"testing\", password: \"bosque^\", oldRefreshToken: \"\") {\n    accessToken\n  }\n}\n\n# query getUser(id: 62){\n    \n# }","variables":{}} -nr
    -u=https://solution-internal.example.app/solution -m=GET --withSSH=my-ssh-config-1
    -h=Authorization:Bearer {{ .label.login.data.login.accessToken }}
    @cakcuk
  - > 
    scope --create=solution-team --command=check-status-dev --user=U014VE7EN3U --channel=C01389JQBC3 @cakcuk
  
```

> Note:
> From the example above, 
>   - `su --set` and `scope --user` uses `Slack ID` of the user to set the super user. It is not readable by human. However, this is the only way to set the super user for now. We may improve this in the future.
>   - `scope --channel` also uses `Slack ID` of the channel to set the eligible channel. It is not readable by human. However, this is the only way to set the eligible channel for now. We may improve this in the future.
>    - For the way to get the Slack ID, please refer to [this](https://www.wikihow.com/Find-a-Channel-ID-on-Slack-on-PC-or-Mac) and [this](https://www.workast.com/help/article/how-to-find-a-slack-user-id/).
> 

You can also inject loader configuration via environment variable `LOADER`. This is useful when you want to inject the configuration via CI/CD pipeline and store the `LOADER` in the secret. 

The value of the `LOADER` environment variable should be a base64-encoded string of the loader YAML configuration.
