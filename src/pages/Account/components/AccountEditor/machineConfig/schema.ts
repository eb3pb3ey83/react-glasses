interface Schema {
  states: {
    alertClosed: Record<string, never>
    alertOpened: Record<string, never>
  }
}

export default Schema
