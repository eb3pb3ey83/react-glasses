interface Schema {
  states: {
    alertOpened: Record<string, never>
    alertClosed: Record<string, never>
  }
}

export default Schema
