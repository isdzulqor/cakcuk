package service

import (
	"bytes"
	"cakcuk/utils/logging"
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"text/template"
)

var escapeSequencesReplacer = strings.NewReplacer(
	`\n `, "\n",
	`\n`, "\n",
	`\t`, "\t",
)

func renderTemplate(givenTemplate string, jsonData []byte) (out string, err error) {
	defer func() {
		errInterface := recover()
		if errInterface != nil {
			logging.Logger(context.Background()).Error(errInterface)
			err = fmt.Errorf("render template - %v", errInterface)
			return
		}
	}()
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
