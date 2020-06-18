package model

import "strings"

var (
	slackReplacer = strings.NewReplacer(
		" ", "",
		"<", "",
		"@", "",
		">", "",
	)
	userPlaygroundReplacer = strings.NewReplacer(
		"@", "",
	)
)

func extractSlackID(in string) string {
	return slackReplacer.Replace(in)
}

func extractSlackIDs(in []string) (out []string) {
	for _, s := range in {
		out = append(out, extractSlackID(s))
	}
	return
}

func extractUserIDs(in []string, source string) (out []string) {
	for _, s := range in {
		out = append(out, extractUser(s, source))
	}
	return
}

func extractUser(in, source string) string {
	switch source {
	case SourcePlayground:
		return userPlaygroundReplacer.Replace(in)
	case SourceSlack:
		return slackReplacer.Replace(in)
	}
	return in
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
