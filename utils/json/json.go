package json

import (
	"encoding/json"
)

func ToStringJson(data interface{}) (out string, err error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return
	}
	out = string(jsonData)
	return
}
