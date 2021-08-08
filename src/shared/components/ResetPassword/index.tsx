import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'
import { SendType } from 'src/shared/types/machine.type'
import EmailSend from './components/EmailSend'
import EmailForm from './components/EmailForm'
import ResetSuccess from './components/ResetSuccess'
import ResetFailed from './components/ResetFailed'
import ResetForm from './components/ResetForm'
import resetMachine from './machineConfig'
import Context from './machineConfig/context'
import ResetEvent from './machineConfig/event'
import { State } from 'xstate'
import Dialog from '../Dialog'
import useStyles from './useStyles'

interface Props {
  open: boolean
  isModifiedMode?: boolean
  isResetPage?: boolean
  withCloseIcon?: boolean
  onBackdropClick?: () => void
  onClose?: () => void
  [key: string]: unknown
}

export type sendEventType = SendType<Context, ResetEvent>
export type stateType = State<Context, ResetEvent>

const ResetPassword: React.FC<Props> = ({ isResetPage, isModifiedMode, onClose, open, withCloseIcon, onBackdropClick, ...props }) => {
  const [state, send] = useMachine(resetMachine)
  const classes = useStyles()

  useEffect(() => {
    if (isResetPage || isModifiedMode) {
      send({ type: 'RESET' })
    }
  }, [])

  return (
    <Dialog
      {...props}
      style={{ position: isResetPage ? 'static' : 'fixed' }}
      disablePortal={isResetPage}
      disableBackdropClick
      className={isResetPage ? classes.smallContainer : classes.container}
      hideBackdrop={isResetPage}
      open={open}
      onClose={onClose}
      onBackdropClick={state.matches('resetSuccess') ? null : onBackdropClick}
      withCloseIcon={state.matches('resetSuccess') ? false : withCloseIcon}
    >
      {state.matches('resetForm') && <ResetForm isModifiedMode send={send} />}
      {state.matches('emailForm') && <EmailForm isResetPage={isResetPage} state={state} send={send} />}
      {state.matches('emailSend') && <EmailSend send={send} onClose={onClose} />}
      {state.matches('resetSuccess') && <ResetSuccess />}
      {state.matches('resetFailed') && <ResetFailed send={send} />}
    </Dialog>
  )
}

export default ResetPassword
