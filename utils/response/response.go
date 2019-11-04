package response

import (
	errorLib "cakcuk/utils/error"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// Success will write a default template response when returning a success response
func Success(w http.ResponseWriter, status int, data interface{}) {
	resp := map[string]interface{}{
		"data":  data,
		"error": nil,
	}
	js, err := json.Marshal(resp)
	if err != nil {
		resp := map[string]interface{}{
			"data":  nil,
			"error": fmt.Sprintf("%s", err),
		}
		js, _ = json.Marshal(resp)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)
}

// Failed will write a default template response when returning a failed response
func Failed(w http.ResponseWriter, status int, err error) {
	if status/1e2 == 4 {
		log.Printf("%v", err)
	} else {
		log.Println("%v", err)
	}
	var errResp map[string]interface{}
	if err != nil {
		errCode := "InternalServerError"
		errMsg := err.Error()
		var errData interface{}
		if f, ok := err.(*errorLib.Error); ok {
			errCode = f.Code
			errMsg = f.Message
			errData = f.Data
		}
		errResp = map[string]interface{}{
			"code":    errCode,
			"message": errMsg,
			"data":    errData,
		}
	}
	resp := map[string]interface{}{
		"data":  nil,
		"error": errResp,
	}
	js, _ := json.Marshal(resp)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)
}
