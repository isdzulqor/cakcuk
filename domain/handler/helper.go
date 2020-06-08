package handler

import (
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
)

var (
	replacerSanitizer = strings.NewReplacer(
		"Reminder: ", "",
		"“", "\"",
		"”", "\"",
		"‘", "\"",
		"’", "\"",
	)
	replacerURL = strings.NewReplacer(
		"<", "",
		">", "",
	)
)

func isBotMentioned(msg *string) bool {
	if strings.Contains(*msg, "@cakcuk") {
		*msg = strings.Replace(*msg, "@cakcuk", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}

// sanitizeWords clear unnecessary words and replace some characters to be able to works properly
func sanitizeWords(msg *string) {
	sanitizeASCII(msg)

	*msg = replacerSanitizer.Replace(*msg)
	clearURLS(msg)
	clearMailto(msg)
}

func sanitizeASCII(msg *string) {
	var out []byte
	for _, a := range []byte(*msg) {
		switch a {
		case 194, 160:
			a = 32
		}
		out = append(out, a)
	}
	*msg = string(out)
}

func clearURLS(msg *string) {
	urlProtocol := "http"
	for strings.Contains(*msg, "<"+urlProtocol) {
		value := stringLib.StringBetween(*msg, "<", ">")
		if strings.Contains(value, "https") {
			urlProtocol = "https"
		}
		if strings.Contains(value, "|") {
			flatURL := urlProtocol + "://" + strings.Split(value, "|")[1]
			*msg = strings.Replace(*msg, fmt.Sprintf("<%s>", value), flatURL, -1)
		} else {
			*msg = replacerURL.Replace(*msg)
		}
	}
}

func clearMailto(msg *string) {
	mailtoContains := "mailto:" + stringLib.StringBetween(*msg, "mailto:", "|") + "|"
	*msg = strings.Replace(*msg, mailtoContains, "", -1)
}
