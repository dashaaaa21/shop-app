/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CONFIG_API_URL: string
  readonly CONFIG_SUPABASE_URL: string
  readonly CONFIG_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
