import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {},
  closeIcon: {
    position: 'absolute',
    top: '26px',
    right: '34px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1,

    '& > svg': {
      width: '20px',
      height: '20px',
      opacity: '.5',
    },
  },
}))

export default useStyles
