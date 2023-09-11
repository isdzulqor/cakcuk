package model

import (
	jsonLib "cakcuk/utils/json"
	stringLib "cakcuk/utils/string"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"

	"fmt"
	"time"
)

type AuthSign struct {
	Password   string
	UserID     string
	TeamID     string
	ChannelRef string
	ExpiredAt  int64
}

func CreateAuthSign(userID, teamID, channelRef string, expiryDuration time.Duration) (*AuthSign, error) {
	if userID == "" || teamID == "" || channelRef == "" {
		return nil, fmt.Errorf("userID and teamID must be filled")
	}
	return &AuthSign{
		Password:   generatePassword(10),
		UserID:     userID,
		TeamID:     teamID,
		ChannelRef: channelRef,
		ExpiredAt:  time.Now().Add(expiryDuration).Unix(),
	}, nil
}

func (a *AuthSign) Encrypt(key string) (string, error) {
	raw, err := jsonLib.ToStringJson(a)
	if err != nil {
		return "", fmt.Errorf("failed to convert auth sign to json: %s", err.Error())
	}
	encrypted, err := stringLib.Encrypt(raw, key)
	if err != nil {
		return "", fmt.Errorf("failed to encrypt auth sign: %s", err.Error())
	}
	return encrypted, nil
}

func DecryptAuthSign(key, in string) (*AuthSign, error) {
	decrypted, err := stringLib.Decrypt(in, key)
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt auth sign: %s", err.Error())
	}

	var authSign AuthSign
	err = json.Unmarshal([]byte(decrypted), &authSign)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal auth sign: %s", err.Error())
	}

	return &authSign, nil
}

func generatePassword(length int) string {
	b := make([]byte, length)
	_, err := rand.Read(b)
	if err != nil {
		panic(err)
	}
	return base64.StdEncoding.EncodeToString(b)
}
