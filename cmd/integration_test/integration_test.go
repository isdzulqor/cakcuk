package integration_test

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	requestLib "cakcuk/utils/request"
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"strconv"
	"testing"

	"github.com/stretchr/testify/suite"
	"gotest.tools/assert"
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
		assert.NilError(suite.T(), err)
		assert.Equal(suite.T(), suite.positiveTestData[k].expected, result)
	}
}

func (suite *IntegrationTestSuite) TestNegativeCases() {
	ctx := context.Background()
	for k, data := range suite.negativeTestData {
		suite.T().Log("Testing", k)
		result, err := getPlayResult(ctx, "integration_test", data.input)
		errResult := fmt.Errorf(result)
		assert.ErrorContains(suite.T(), errResult, suite.negativeTestData[k].expected)
		assert.NilError(suite.T(), err)
	}
}

func (suite *IntegrationTestSuite) TestErrorCases() {
	ctx := context.Background()
	for k, data := range suite.errorTestData {
		suite.T().Log("Testing", k)
		_, err := getPlayResult(ctx, "integration_test", data.input)
		assert.ErrorContains(suite.T(), err, suite.errorTestData[k].expected)
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
	"help": {
		input: "help -ol @cakcuk",
		expected: `- help [options] @cakcuk
- cuk [options] @cakcuk
- cak [options] @cakcuk
- del [options] @cakcuk
- scope [options] @cakcuk
- su [options] @cakcuk
`,
	},
	"help filter": {
		input:    "help -ol -f=del @cakcuk",
		expected: `- del [options] @cakcuk`,
	},
}

// TODO: add more negative test data
var negativeTestData = map[string]test{
	"help command not exist": {
		input:    "help -c=random-command @cakcuk",
		expected: `Failed to display command details`,
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
	playURL = "http://localhost:4000/api/play"
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
