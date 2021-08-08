interface Schema {
  states: {
    viewMode: Record<string, never>
    creatorOpened: Record<string, never>
    editorOpened: Record<string, never>
  }
}

export default Schema
