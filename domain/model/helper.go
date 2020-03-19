package model

import (
	"strings"
)

func getParamsMap(in []string) (out map[string]string) {
	out = make(map[string]string)
	for _, h := range in {
		if strings.Contains(h, ":") {
			k := strings.Split(h, ":")[0]
			v := strings.Split(h, ":")[1]
			out[k] = v
		}
	}
	return
}
