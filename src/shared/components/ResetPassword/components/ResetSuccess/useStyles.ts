import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heplerText: {
    fontSize: theme.variables.fontSizeSm,
    marginTop: 0,
    marginBottom: '32px',
    color: '#202833',
    textAlign: 'center',
  },
  mainTitle: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  successIcon: {
    width: '45px',
    display: 'block',
    margin: '0 auto 10px auto',
  },
}))

export default useStyles
