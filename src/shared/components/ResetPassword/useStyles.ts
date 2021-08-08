import { makeStyles } from '@material-ui/core'

const dialogStyle = {
  borderRadius: '16px',
  width: '354px',
  padding: '32px',
}

const useStyles = makeStyles(() => ({
  smallContainer: {
    position: 'static',
    '& .MuiPaper-root': {
      ...dialogStyle,
      margin: 0,
    },
  },

  container: {
    '& .MuiPaper-root': {
      ...dialogStyle,
    },
  },
}))

export default useStyles
