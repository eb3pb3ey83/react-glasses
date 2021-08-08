import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > div': {
      width: '100%',
    },

    '& > div:nth-child(-n+2)': {
      marginBottom: '16px',
    },
  },
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
  recaptcha: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '68px',
    background: '#d7d7d7',
    marginBottom: '32px',
  },
  button: {
    marginTop: '32px',
  },
}))

export default useStyles
