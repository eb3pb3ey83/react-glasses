import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#E3ECFF',
    borderRadius: '14px',
    padding: '4px',
  },
  flexContainer: {
    position: 'relative',
    zIndex: 1,
  },
  indicator: {
    zIndex: 0,
    background: theme.palette.primary.main,
    height: '100%',
    borderRadius: '14px',
  },
}))

export default useStyles
