import { makeStyles } from '@material-ui/core'
import loginBackground from 'src/assets/img/login.jpg'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto 544px',
    height: '100%',
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '290px',
  },
  mainTitle: {
    textAlign: 'center',
    marginBottom: '8px',
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: '48px',
    color: '#868A8F',
    fontSize: theme.variables.fontSizeSm,
  },
  background: {
    background: `center / cover no-repeat url(${loginBackground})`,
  },
  logo: {
    width: '133px',
    position: 'absolute',
    top: '28px',
    left: '28px',
  },
  forgetPassword: {
    background: 'none',
    cursor: 'pointer',
    border: 'none',
    fontSize: theme.variables.fontSizeSm,
    color: theme.palette.primary.main,
    padding: 0,
    marginBottom: '16px',
  },
  languageButton: {
    boxSizing: 'border-box',
    width: '98px',
    height: '38px',
    position: 'absolute',
    top: '28px',
    right: '28px',
    background: '#F4F7FD',
    fontSize: theme.variables.fontSizeSm,
    color: '#153C7B',
    borderRadius: '8px',
    paddingLeft: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
    overflow: 'hidden',

    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: '30px',
      background: 'transparent',
    },

    '& .MuiSelect-icon': {
      top: 'auto',
      right: '12px',
      '& path': {
        fill: '#A1B1CA',
      },
    },
  },
}))

export default useStyles
