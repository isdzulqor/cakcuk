package config

import (
	"log"
	"sync"
	"time"

	"github.com/kelseyhightower/envconfig"
)

// Config is the collection of all configuration value
type Config struct {
	Port                 string        `envconfig:"PORT" default:"80"`
	DelayShutdown        time.Duration `envconfig:"DELAY_SHUTDOWN" default:"0s"`
	LogLevel             string        `envconfig:"LOG_LEVEL" default:"info"`
	EncryptionPassword   string        `envconfig:"ENCRYPTION_PASSWORD" default:"cakcuk-random-password"`
	SuperUserModeEnabled bool          `envconfig:"SUPER_USER_MODE_ENABLED" default:"true"`
	RateLimit            int           `envconfig:"RATE_LIMIT" default:"5"`
	SecretKey            string        `envconfig:"SECRET_KEY" default:""`
	TLSEnabled           bool          `envconfig:"TLS_ENABLED" default:"false"`
	PublicDomains        []string      `envconfig:"PUBLIC_DOMAINS" default:""`
	TestingMode          bool          `envconfig:"TESTING_MODE" default:"false"`

	Profiler struct {
		Enabled bool   `envconfig:"PROFILER_ENABLED" default:"false"`
		AppName string `envconfig:"PROFILER_APP_NAME" default:"cakcuk-test.golang.app"`
		Host    string `envconfig:"PROFILER_HOST" default:"http://pyroscope:4040"`
	}

	Slack struct {
		URL               string `envconfig:"SLACK_URL" default:"https://slack.com"`
		Token             string `envconfig:"SLACK_TOKEN"`
		Username          string `envconfig:"SLACK_USERNAME" default:"Cakcuk"`
		IconEmoji         string `envconfig:"SLACK_ICON_EMOJI" default:":angel:"`
		CharacterLimit    int    `envconfig:"SLACK_CHARACTER_LIMIT" default:"3800"`
		DefaultRetry      int    `envconfig:"SLACK_DEFAULT_RETRY" default:"3"`
		VerificationToken string `envconfig:"SLACK_VERIFICATION_TOKEN" default:""`

		RTM struct {
			Enabled          bool          `envconfig:"SLACK_RTM_ENABLED" default:"false"`
			DefaultRetry     int           `envconfig:"SLACK_RTM_DEFAULT_RETRY" default:"3"`
			ReconnectTimeout time.Duration `envconfig:"SLACK_RTM_RECONNECT_TIMEOUT" default:"10s"`
		}

		Event struct {
			Enabled bool `envconfig:"SLACK_EVENT_ENABLED" default:"true"`
		}

		Oauth2 struct {
			RedirectURL  string   `envconfig:"SLACK_OAUTH2_REDIRECT_URL" default:""`
			ClientID     string   `envconfig:"SLACK_OAUTH2_CLIENT_ID" default:""`
			ClientSecret string   `envconfig:"SLACK_OAUTH2_CLIENT_SECRET" default:""`
			Scopes       []string `envconfig:"SLACK_OAUTH2_SCOPES" default:"app_mentions:read, chat:write, files:write, im:history, team:read, users:read"`
			AuthURL      string   `envconfig:"SLACK_OAUTH2_AUTH_URL" default:"https://slack.com/oauth/v2/authorize"`
			TokenURL     string   `envconfig:"SLACK_OAUTH2_TOKEN_URL" default:"https://slack.com/api/oauth.v2.access"`
			State        string   `envconfig:"SLACK_OAUTH2_STATE" default:""`
		}
	}

	MySQL struct {
		Host            string `envconfig:"MYSQL_HOST" default:"localhost:3306"`
		Username        string `envconfig:"MYSQL_USERNAME" default:"root"`
		Password        string `envconfig:"MYSQL_PASSWORD" default:"password"`
		Database        string `envconfig:"MYSQL_DATABASE" default:"cakcuk"`
		ConnectionLimit int    `envconfig:"MYSQL_CONNECTION_LIMIT" default:"40"`
	}

	Cache struct {
		DefaultExpirationTime time.Duration `envconfig:"CACHE_DEFAULT_EXPIRATION_TIME" default:"30m"`
		RequestExpirationTime time.Duration `envconfig:"CACHE_REQUEST_EXPIRATION_TIME" default:"15s"`
		PurgeDeletionTime     time.Duration `envconfig:"CACHE_PURGE_DELETION_TIME" default:"10m"`
	}

	Playground struct {
		DeletionTime time.Duration `envconfig:"PLAYGROUND_DELETION_TIME" default:"5m"`
	}

	Site struct {
		LandingPage string `envconfig:"SITE_LANDING_PAGE" default:"https://cakcuk.io"`
		PlayPage    string `envconfig:"SITE_PLAY_PAGE" default:"https://cakcuk.io/play"`
	}
}

var once sync.Once
var conf Config

func Get() *Config {
	once.Do(func() {
		if err := envconfig.Process("", &conf); err != nil {
			log.Fatal("Can't load config: ", err)
		}
	})
	return &conf
}
