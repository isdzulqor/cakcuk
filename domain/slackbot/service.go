package slackbot

import (
	"cakcuk/config"
	"cakcuk/domain/command"
	requestLib "cakcuk/utils/request"
	"fmt"
	"log"
	"strings"
)

type Service struct {
	Repository Repository     `inject:""`
	Config     *config.Config `inject:""`
}

// TODO: get and set params and headers
func (s *Service) cukHit(cmd command.Command) (respString string, err error) {
	var opt command.Option
	opt, err = cmd.Options.GetOptionByName("--method")
	if err != nil {
		return
	}
	method := opt.Value

	opt, err = cmd.Options.GetOptionByName("--url")
	if err != nil {
		return
	}
	url := opt.Value

	opt, err = cmd.Options.GetOptionByName("--headers")
	if err != nil {
		return
	}
	headers := make(map[string]string)
	if opt.Value != "" {
		flatHeaders := strings.Split(opt.Value, ",")
		for _, h := range flatHeaders {
			k := strings.Split(h, ":")[0]
			v := strings.Split(h, ":")[1]
			headers[k] = v
		}
	}

	var response []byte
	if response, err = requestLib.Call(method, url, nil, headers, nil); err != nil {
		return
	}

	respString = fmt.Sprintf("%s", response)
	if s.Config.DebugMode {
		log.Println("[INFO] response:", respString)
	}
	return
}
