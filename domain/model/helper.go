package model

import "strings"

func extractSlackIDs(in []string) (out []string) {
	for _, s := range in {
		out = append(out, extractSlackID(s))
	}
	return
}

func extractSlackID(in string) string {
	var replacer = strings.NewReplacer(
		" ", "",
		"<", "",
		"@", "",
		">", "",
	)
	return replacer.Replace(in)
}

func printList(prefix string, in ...string) (out string) {
	for i, s := range in {
		if i != 0 {
			out += "\n"
		}
		out += prefix + "- " + s
	}
	return
}
