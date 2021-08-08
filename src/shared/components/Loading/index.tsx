import React from 'react'
import CircleProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

// You can add the "position: relative" where you want to limit the scope of this component.
const Loading: React.FC = () => (
  <Box
    position='absolute'
    top='0px'
    left='0px'
    display='flex'
    justifyContent='center'
    alignItems='center'
    width={1}
    height={1}
    zIndex={1}
    color='#44ADFF'
  >
    <CircleProgress />
  </Box>
)

export default Loading
