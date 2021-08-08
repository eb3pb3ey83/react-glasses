import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  errorIcon: {
    width: '15px',
    color: 'red',
    marginRight: '10px',
  },
  loginFailed: {
    fontSize: theme.variables.fontSizeXs,
    border: '1px solid #F66363',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
  },
}))

export default useStyles
