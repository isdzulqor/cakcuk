package model

import "strings"

var (
	slackReplacer = strings.NewReplacer(
		" ", "",
		"<", "",
		"@", "",
		">", "",
	)
)

func extractSlackIDs(in []string) (out []string) {
	for _, s := range in {
		out = append(out, extractSlackID(s))
	}
	return
}

func extractSlackID(in string) string {
	return slackReplacer.Replace(in)
}

func MentionSlack(slackID string) string {
	return "<@" + slackID + ">"
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
