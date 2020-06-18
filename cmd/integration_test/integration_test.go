package integration_test

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	requestLib "cakcuk/utils/request"
	"context"
	"encoding/json"
	"net/url"
	"os"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type IntegrationTestSuite struct {
	suite.Suite
	positiveTestData map[string]test
	negativeTestData map[string]test
	errorTestData    map[string]test
}

func (suite *IntegrationTestSuite) SetupTest() {
	logging.Init("info")
	suite.positiveTestData = positiveTestData
	suite.negativeTestData = negativeTestData
	suite.errorTestData = errorTestData
}

func (suite *IntegrationTestSuite) TestPositiveCases() {
	ctx := context.Background()
	for k, data := range suite.positiveTestData {
		suite.T().Log("Testing", k)
		result, err := getPlayResult(ctx, "integration_test", data.input)
		assert.Contains(suite.T(), sanitizeUnnecessaryBreakline(result), suite.positiveTestData[k].expected)
		assert.NoError(suite.T(), err)
	}
}

func (suite *IntegrationTestSuite) TestNegativeCases() {
	ctx := context.Background()
	for k, data := range suite.negativeTestData {
		suite.T().Log("Testing", k)
		result, err := getPlayResult(ctx, "integration_test", data.input)
		assert.Contains(suite.T(), sanitizeUnnecessaryBreakline(result), suite.negativeTestData[k].expected)
		assert.NoError(suite.T(), err)
	}
}

func (suite *IntegrationTestSuite) TestErrorCases() {
	ctx := context.Background()
	for k, data := range suite.errorTestData {
		suite.T().Log("Testing", k)
		_, err := getPlayResult(ctx, "integration_test", data.input)
		assert.Contains(suite.T(), err.Error(), suite.errorTestData[k].expected)
	}
}

func TestIntegrationTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}

type test struct {
	input    string
	expected string
}

// TODO: add more positive test data
var positiveTestData = map[string]test{
	"help oneline": {
		input: "help -ol @cakcuk",
		expected: `- help [options] @cakcuk
- cuk [options] @cakcuk
- cak [options] @cakcuk
- del [options] @cakcuk
- scope [options] @cakcuk
- su [options] @cakcuk`,
	},
	"help filter": {
		input:    "help -ol -f=del @cakcuk",
		expected: `- del [options] @cakcuk`,
	},
	"help - command detail": {
		input: "help -c=cuk @cakcuk",
		expected: `- cuk [options] @cakcuk
  Hit http/https endpoint. Visit playground https://cakcuk.io/#/play to explore more!
  Example: cuk -m=POST -u=http://cakcuk.io @cakcuk
  Options:
	--method, -m                [mandatory]
	  Http Method [GET,POST,PUT,PATCH,DELETE] Default value: GET.
	  Example: --method=GET
	--url, -u                   [mandatory]
	  URL Endpoint.
	  Example: --url=http://cakcuk.io
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
	  URL param only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by && with no space for multiple values.
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
	  Example: --noResponse`,
	},
	"cuk - parse response & basic auth": {
		input:    `cuk -m=get -u=https://postman-echo.com/get -ba=root:root123 @cakcuk -pr=Header Auth: {{ .headers.authorization }}`,
		expected: `Header Auth: Basic cm9vdDpyb290MTIz`,
	},
	"cuk - parse response key map": {
		input: `cuk -m=post -u=https://postman-echo.com/post @cakcuk
-bue=name:cakcuk&&id:cakcuk101 
-pr=form data\n\n{{ range $key, $value := .form }}{{ $key }}: {{ $value }}\n{{ end }}`,
		expected: `form data

id: cakcuk101
name: cakcuk`,
	},
	"cak - create command job-fulltime": {
		input: `cak -c=job-fulltime -u=https://jobs.github.com/positions.json -qp=full_time:true -qpd=description:::--desc&&location:::--loc 
-d=List full time jobs from Github jobs @cakcuk
-pr=
List of Jobs \n
{{ range . }}
\n
Job: {{ .title }} \n
Type: {{ .type }} \n
Location: {{ .location }} \n
{{ end }}`,
		expected: `New Command Created

- job-fulltime [options] @cakcuk
  List full time jobs from Github jobs
  Example: job-fulltime --desc=value --loc=value @cakcuk
  Options:
	--desc, --desc   [optional]
	  Example: --desc=value
	--loc, --loc     [optional]
	  Example: --loc=value`,
	},
	"scope - test simple create": {
		input: "scope -cr=developer @cakcuk",
		expected: `Successfully create scope

- developer
  Registered Commands:
	- No command registered
  Who can access:
	- No registered user
`,
	},
}

// TODO: add more negative test data
var negativeTestData = map[string]test{
	"help command not exist": {
		input:    "help -c=random-command @cakcuk",
		expected: `Failed to display command details`,
	},
	"create scope for default command": {
		input:    "scope -cr=just-scope-test -u=@ahmad&&@iskandar @cakcuk --command=cak",
		expected: `Failed to execute scope. Could not modifying scope`,
	},
}

// TODO: add more error test data
var errorTestData = map[string]test{
	"not mention": {
		input:    "help -ol",
		expected: `Just mention @cakcuk to execute command!`,
	},
}

type responseCakcuk struct {
	Data  model.PlaygroundModel `json:"data"`
	Error *errorLib.Error       `json:"error"`
}

func getPlayResult(ctx context.Context, id, message string) (result string, err error) {
	var respCakcuk responseCakcuk
	port := "80"
	if isTLS, _ := strconv.ParseBool(os.Getenv("TLS_ENABLED")); !isTLS {
		tempPort := os.Getenv("PORT")
		if tempPort != "" {
			port = tempPort
		}
	}
	playURL := "http://localhost:" + port + "/api/play"
	queryParams := url.Values{
		"id":      {id},
		"message": {message},
	}
	headers := map[string]string{
		"x-cakcuk-secret-key": os.Getenv("SECRET_KEY"),
		"Content-Type":        "application/json",
	}

	var resp []byte
	if resp, _, err = requestLib.Request(ctx, "GET", playURL, queryParams, headers, nil, true); err != nil {
		return
	}
	if err = json.Unmarshal(resp, &respCakcuk); err != nil {
		return
	}

	if respCakcuk.Error != nil {
		err = respCakcuk.Error
		return
	}
	result = respCakcuk.Data.Result
	return
}

func sanitizeUnnecessaryBreakline(in string) string {
	lengthInput := len(in)
	if lengthInput > 2 {
		lastIdx := lengthInput - 1
		for in[lastIdx] == '\n' {
			temp := in
			if temp[lastIdx] == '\n' {
				in = temp[0 : lengthInput-1]
			}
			lengthInput = len(in)
			lastIdx = lengthInput - 1
			if lengthInput <= 2 {
				break
			}
		}
	}
	return in
}
