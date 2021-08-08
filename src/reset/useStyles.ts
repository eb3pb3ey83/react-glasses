import { makeStyles } from '@material-ui/core'
import resetBackground from 'src/assets/img/reset.jpg'

const useStyles = makeStyles((theme) => ({
  container: {
    background: `center / cover no-repeat url(${resetBackground})`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '133px',
    display: 'block',
    margin: '0 auto 24px auto',
  },
  languageButtonContainer: {
    width: '354px',
    margin: 'auto',
    position: 'relative',
  },
  languageButton: {
    background: 'transparent',
    transform: 'translateX(-12px)',
    fontSize: theme.variables.fontSizeSm,
    color: '#fff',
    borderRadius: '8px',
    paddingLeft: '12px',
    paddingTop: '8px',
    paddingBottom: '8px',
    overflow: 'hidden',

    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: '32px',
      background: 'transparent',
    },

    '& .MuiSelect-icon': {
      top: 'auto',
      color: '#fff',
    },
  },
}))

export default useStyles
