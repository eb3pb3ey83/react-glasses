import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > div': {
      width: '100%',
      marginBottom: '32px',
    },
  },
  emailLabel: {
    fontSize: theme.variables.fontSizeXs,
  },
  heplerText: {
    fontSize: theme.variables.fontSizeSm,
    marginTop: 0,
    marginBottom: '16px',
  },
  mainTitle: {
    textAlign: 'left',
    marginBottom: '6px',
  },
}))

export default useStyles
