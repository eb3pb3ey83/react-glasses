import React, { ReactElement } from 'react'
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group'
import { styled } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const AnimatedTransitionGroup = styled(TransitionGroup)({
  position: 'relative',
  width: '100%',
  flexGrow: 1,
})

enum STATUS {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting',
}

interface AnimatedDIVProps {
  status: STATUS
  time: number
}

const AnimatedDIV = styled(Box)({
  height: '100%',
  opacity: ({ status }: AnimatedDIVProps): number => {
    const isShow = status === STATUS.entered || status === STATUS.exiting
    return isShow ? 1 : 0
  },
  transition: ({ time }: AnimatedDIVProps): string => `opacity ${time}ms ease-in-out, transform ${time}ms ease-in-out`,
})

const TIMEOUT = 1000

interface TransitionProps {
  children: ReactElement
  location: string
}

function Transition({ children, location }: TransitionProps): React.ReactElement {
  // const nodeRef = useRef()

  return (
    <AnimatedTransitionGroup>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
        // nodeRef={nodeRef}
      >
        {(status: STATUS): React.ReactElement => {
          return (
            <AnimatedDIV time={TIMEOUT} status={status}>
              {children}
            </AnimatedDIV>
          )
        }}
      </ReactTransition>
    </AnimatedTransitionGroup>
  )
}

export default Transition
