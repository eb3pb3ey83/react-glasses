import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  buttonsWrapper: {
    paddingLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    display: 'block',
    lineHeight: 0,

    '&:first-child': {
      marginBottom: '3px',
    },

    '& .MuiSvgIcon-root': {
      width: '25px',
    },
  },
  arrowIcon: {
    width: '10px',
  },
}))

export default useStyles
