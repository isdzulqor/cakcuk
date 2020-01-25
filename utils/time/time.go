package time

import (
	"strconv"
	"time"
)

type UnixTime time.Time

// UnmarshalJSON is used to convert the timestamp from JSON
func (t *UnixTime) UnmarshalJSON(s []byte) (err error) {
	r := string(s)
	q, err := strconv.ParseInt(r, 10, 64)
	if err != nil {
		return err
	}
	*(*time.Time)(t) = time.Unix(q, 0)
	return nil
}

// MarshalJSON is used to convert the timestamp to JSON
func (t UnixTime) MarshalJSON() ([]byte, error) {
	return []byte(strconv.FormatInt(time.Time(t).Unix(), 10)), nil
}
