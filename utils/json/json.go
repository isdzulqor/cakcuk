package json

import (
	"bytes"
	"encoding/json"
	"fmt"
)

func ToStringJson(data interface{}) (out string, err error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return
	}
	out = string(jsonData)
	return
}

func ToStringJsonNoError(data interface{}) (out string) {
	out, _ = ToStringJson(data)
	return
}

func ToPretty(in interface{}) (out string, err error) {
	v, ok := in.([]byte)
	if ok {
		out, err = jsonPrettyFromBytes(v)
		return
	}
	s, ok := in.(string)
	if ok {
		out, err = jsonPrettyFromString(s)
		return
	}
	out, err = jsonPrettyFromInterface(in)
	return
}

func ToPrettyNoError(in interface{}) string {
	out, err := ToPretty(in)
	if err != nil {
		return "{}"
	}
	return out
}

func jsonPrettyFromInterface(data interface{}) (out string, err error) {
	jsonData, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		return
	}
	out = string(jsonData)
	return
}

func jsonPrettyFromBytes(in []byte) (out string, err error) {
	var prettyJSON bytes.Buffer
	if err = json.Indent(&prettyJSON, in, "", "\t"); err != nil {
		return
	}
	out = prettyJSON.String()
	return
}

func jsonPrettyFromString(in string) (out string, err error) {
	if !IsJSON(in) {
		err = fmt.Errorf("input is not json format, data: %s", in)
		return
	}
	b := []byte(in)
	out, err = jsonPrettyFromBytes(b)
	return
}

func IsJSON(s string) bool {
	var js map[string]interface{}
	return json.Unmarshal([]byte(s), &js) == nil
}
