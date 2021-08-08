type ResetEvent = { type: 'TIMER' } | { type: 'POWER_OUTAGE' } | { type: 'PED_COUNTDOWN'; duration: number }

export default ResetEvent
