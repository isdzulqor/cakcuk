package server

import (
	"cakcuk/config"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// Create a custom visitor struct which holds the rate limiter for each
// visitor and the last time that the visitor was seen.
type visitor struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

// Change the the map to hold values of the type visitor.
var visitors = make(map[string]*visitor)
var mu sync.RWMutex

// Run a background goroutine to remove old entries from the visitors map.
func startLimitter() {
	go cleanupVisitors()
}

func getVisitor(ip string) *rate.Limiter {
	limitterSize := config.Get().RateLimit
	mu.RLock()
	defer mu.RUnlock()

	v, exists := visitors[ip]
	if !exists {
		// allow 1 token to be consumed per second, with a maximum burst size of 3
		limiter := rate.NewLimiter(1, limitterSize)
		// Include the current time when creating a new visitor.
		visitors[ip] = &visitor{limiter, time.Now()}
		return limiter
	}

	// Update the last seen time for the visitor.
	v.lastSeen = time.Now()
	return v.limiter
}

// Every minute check the map for visitors that haven't been seen for
// more than 3 minutes and delete the entries.
func cleanupVisitors() {
	for {
		time.Sleep(time.Minute)

		mu.RLock()
		for ip, v := range visitors {
			if time.Since(v.lastSeen) > 3*time.Minute {
				delete(visitors, ip)
			}
		}
		mu.RUnlock()
	}
}
