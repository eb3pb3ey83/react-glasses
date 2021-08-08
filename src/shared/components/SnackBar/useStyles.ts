import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    '& .MuiIconButton-root': {
      background: '#C4C4C4',
      width: '13px',
      height: '13px',
    },

    '& .MuiSvgIcon-root': {
      color: '#fff',
      width: '13px',
    },

    '& .MuiAlert-message': {
      padding: 0,
    },

    '& .MuiAlert-icon': {
      padding: 0,
      marginRight: '8px',
    },
  },
}))

export default useStyles
