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
    color: '#202833',
    marginTop: 0,
    marginBottom: '8px',
  },
  mainTitle: {
    textAlign: 'left',
    marginBottom: '6px',
    fontSize: theme.variables.fontSizeLg,
  },
  container: {
    position: 'static',

    '& .MuiPaper-root': {
      justifyContent: 'space-between',
      borderRadius: '16px',
      width: '354px',
      minHeight: '254px',
      padding: '44px 32px 32px 32px',
      margin: 0,
    },
  },
}))

export default useStyles
