import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    minHeight: '60px',
    '& .sortstart': {
      background: '#E3ECFF',
    },
    '& .sortend': {
      background: 'transparent',
    },
  },
  sortStartBg: {
    background: '#E3ECFF',
  },
  sortEndBg: {
    background: 'transparent',
  },
}))

export default useStyles
