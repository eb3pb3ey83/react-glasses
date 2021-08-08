interface Schema {
  states: {
    close: Record<string, never>
    expanded: Record<string, never>
  }
}

export default Schema
