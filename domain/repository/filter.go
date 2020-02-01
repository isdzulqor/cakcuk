package repository

const (
	DescandingDirection = "DESC"
	AscendingDirection  = "ASC"
)

type BaseFilter struct {
	OrderBy        *string `json:"orderBy,omitempty"`
	OrderDirection *string `json:"orderDirection,omitempty"`
	Limit          *string `json:"limit,omitempty"`
}

func (b BaseFilter) GenerateQuery(prefix string) (out string) {
	if b.OrderBy != nil {
		out += " ORDER BY " + prefix + *b.OrderBy
		if b.OrderDirection != nil {
			out += " " + *b.OrderDirection
		}
	}
	if b.Limit != nil {
		out += " LIMIT" + *b.Limit
	}
	return
}
