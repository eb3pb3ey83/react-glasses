interface Schema {
  states: {
    emailForm: Record<string, never>
    emailSend: Record<string, never>
    resetFailed: Record<string, never>
    resetForm: Record<string, never>
    resetSuccess: Record<string, never>
  }
}

export default Schema
