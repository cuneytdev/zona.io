/// <reference types="vite/client" />

// Vite environment types
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // Daha fazla env variable ekleyebilirsiniz
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

