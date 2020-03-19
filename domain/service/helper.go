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
