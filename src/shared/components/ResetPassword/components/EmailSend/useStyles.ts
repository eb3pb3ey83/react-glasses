import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heplerText: {
    fontSize: theme.variables.fontSizeSm,
    marginTop: 0,
    marginBottom: '32px',
    color: '#202833',
  },
  mainTitle: {
    textAlign: 'left',
    marginBottom: '32px',
  },
}))

export default useStyles
