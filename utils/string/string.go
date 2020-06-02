package string

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"io"
	"strconv"
	"strings"
	"unicode/utf8"
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

// StringBefore to get word before certain string
func StringBefore(value string, a string) (out string) {
	slices := strings.Split(value, a)
	if len(slices) < 2 {
		return
	}
	return slices[0]
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

// SplitByLength to split string into slices of string based on length/limit per-string
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

// SmartSplitByLength to split string into slices of string based on length/limit per-string
// with smart split to search \n first for readable output
func SmartSplitByLength(in string, length int) (out []string) {
	threshold := 100
	if len(in) <= length {
		out = append(out, in)
		return
	}
	for in != "" {
		temp := in
		if len(in) > length {
			temp = in[:length]
		}

		if len(temp) > threshold {
			indexThreshold := len(temp) - threshold
			stringOne := temp[:indexThreshold]
			stringTwo := temp[indexThreshold:]
			if splittedIndex, err := StringIndexBefore(stringTwo, "\n"); err == nil {
				temp = stringOne + stringTwo[:splittedIndex]
			}
		}

		if strings.ReplaceAll(temp, " ", "") == "" {
			break
		}
		out = append(out, temp)
		in = in[len(temp):]
	}
	return
}

// StringIndexBefore to return index value of string input right before substring
// i.e: in = `this is sample` | substring = `is` | return index = 4
func StringIndexBefore(in, subString string) (int, error) {
	temp := strings.Split(in, subString)
	if len(temp) == 0 {
		return 0, fmt.Errorf("String for %s doesn't contain %s", in, subString)
	}
	lastString := temp[len(temp)-1]
	index := len(in) - len(lastString)
	return index, nil
}

func ToIoReader(in string) io.Reader {
	return bytes.NewReader([]byte(in))
}

func createHash(key string) string {
	hash := sha256.Sum256([]byte(key))
	return string(hash[:])
}

func Encrypt(value string, password string) (out string, err error) {
	block, err := aes.NewCipher([]byte(createHash(password)))
	if err != nil {
		return
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return
	}
	ciphertext := gcm.Seal(nonce, nonce, []byte(value), nil)
	out = base64.StdEncoding.EncodeToString(ciphertext)
	return
}

func Decrypt(value string, password string) (out string, err error) {
	data, err := base64.StdEncoding.DecodeString(value)
	if err != nil {
		return
	}
	key := []byte(createHash(password))
	block, err := aes.NewCipher(key)
	if err != nil {
		return
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return
	}
	nonceSize := gcm.NonceSize()
	nonce, ciphertext := data[:nonceSize], data[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return
	}
	out = string(plaintext)
	return
}

func IsEmpty(in string) bool {
	if in = strings.TrimSpace(in); in == "" {
		return true
	}
	return false
}

// GetLastChar to get latest char of strings
func GetLastChar(s string) string {
	c := 1
	j := len(s)
	for i := 0; i < c && j > 0; i++ {
		_, size := utf8.DecodeLastRuneInString(s[:j])
		j -= size
	}
	return s[j:]
}

// Filter to filter certain strings
func Filter(s, like string, isCaseSensitive bool) (out string) {
	exactLines := strings.Split(s, "\n")
	if isCaseSensitive {
		out, _ = filter(exactLines, like)
		return
	}
	_, indexes := filter(strings.Split(strings.ToLower(s), "\n"), strings.ToLower(like))
	for _, i := range indexes {
		out = appendLine(out, exactLines[i])
	}
	return
}

func filter(lines []string, like string) (out string, indexes []int) {
	for i, line := range lines {
		if strings.Contains(line, like) {
			indexes = append(indexes, i)
			out = appendLine(out, line)
		}
	}
	return
}

func appendLine(in, a string) string {
	if in == "" {
		return a
	}
	return in + "\n" + a
}

func UnescapeUnicode(input []byte) ([]byte, error) {
	str, err := strconv.Unquote(strings.Replace(strconv.Quote(string(input)), `\\u`, `\u`, -1))
	if err != nil {
		return nil, err
	}
	return []byte(str), nil
}
