interface Schema {
  states: {
    emailForm: Record<string, never>
    emailSend: Record<string, never>
    ResetFailed: Record<string, never>
    ResetForm: Record<string, never>
    ResetSuccess: Record<string, never>
  }
}

export default Schema
