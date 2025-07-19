CREATE TABLE IF NOT EXISTS snippet (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_path TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL
)
