package handler

import (
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
)

func isBotMentioned(msg *string) bool {
	if strings.Contains(*msg, "@cakcuk") {
		*msg = strings.Replace(*msg, "@cakcuk", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}

// clearUnusedWords clear all unnecessary words
func clearUnusedWords(msg *string) {
	var replacer = strings.NewReplacer(
		"Reminder: ", "",
		"“", "\"",
		"”", "\"",
		"‘", "\"",
		"’", "\"",
	)
	*msg = replacer.Replace(*msg)
	clearURLS(msg)
	clearMailto(msg)
}

func clearURLS(msg *string) {
	var replacer = strings.NewReplacer(
		"<", "",
		">", "",
	)
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
			*msg = replacer.Replace(*msg)
		}
	}
}

func clearMailto(msg *string) {
	mailtoContains := "mailto:" + stringLib.StringBetween(*msg, "mailto:", "|") + "|"
	*msg = strings.Replace(*msg, mailtoContains, "", -1)
}
