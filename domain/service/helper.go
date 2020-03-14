package service

import (
	"bytes"
	"encoding/json"
	"strings"
	"text/template"
)

var escapeSequencesReplacer = strings.NewReplacer(
	`\n `, "\n",
	`\n`, "\n",
	`\t`, "\t",
)

func renderTemplate(givenTemplate string, jsonData []byte) (out string, err error) {
	t := template.Must(template.New("").Parse(givenTemplate))
	m := map[string]interface{}{}
	if err = json.Unmarshal(jsonData, &m); err != nil {
		return
	}
	var buffer bytes.Buffer
	if err = t.Execute(&buffer, m); err != nil {
		return
	}

	out = escapeSequencesReplacer.Replace(buffer.String())
	return
}

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

func assignUrlParams(url string, urlParams map[string]string) string {
	for k, v := range urlParams {
		replacer := "{{" + k + "}}"
		url = strings.Replace(url, replacer, v, -1)
	}
	return url
}
