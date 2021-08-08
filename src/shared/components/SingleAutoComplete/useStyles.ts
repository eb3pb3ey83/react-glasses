import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))

export default useStyles
