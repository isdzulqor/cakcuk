package string

import (
	"bytes"
	"io"
	"strings"
)

// StringAfter to get word after certain string
func StringAfter(value string, a string) string {
	pos := strings.LastIndex(value, a)
	if pos == -1 {
		return ""
	}
	adjustedPos := pos + len(a)
	if adjustedPos >= len(value) {
		return ""
	}
	return value[adjustedPos:len(value)]
}

// StringBetween to get word between two strings
func StringBetween(value string, a string, b string) string {
	posFirst := strings.Index(value, a)
	if posFirst == -1 {
		return ""
	}
	posLast := strings.Index(value, b)
	if posLast == -1 {
		return ""
	}
	posFirstAdjusted := posFirst + len(a)
	if posFirstAdjusted >= posLast {
		return ""
	}
	return value[posFirstAdjusted:posLast]
}

// StringContains to check string exist in string array
func StringContains(slice []string, item string) bool {
	set := make(map[string]struct{}, len(slice))
	for _, s := range slice {
		set[s] = struct{}{}
	}
	_, ok := set[item]
	return ok
}

func SplitByLength(in string, length int) (out []string) {
	var sub string
	runes := bytes.Runes([]byte(in))
	l := len(runes)
	for i, r := range runes {
		sub = sub + string(r)
		if (i+1)%length == 0 {
			out = append(out, sub)
			sub = ""
		} else if (i + 1) == l {
			out = append(out, sub)
		}
	}
	return
}

func ToIoReader(in string) io.Reader {
	return bytes.NewReader([]byte(in))
}
