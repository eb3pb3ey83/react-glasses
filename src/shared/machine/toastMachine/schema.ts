interface Schema {
  states: {
    toastOpened: Record<string, never>
    toastClosed: Record<string, never>
  }
}

export default Schema
