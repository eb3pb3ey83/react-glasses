import { makeStyles } from '@material-ui/core'

const confirmPassword = '& > div:nth-child(3)'

const useStyles = makeStyles((theme) => ({
  form: ({ isModifiedMode }: { isModifiedMode?: boolean }) => ({
    '& > div': {
      width: '100%',
    },

    [confirmPassword]: {
      marginBottom: isModifiedMode ? '24px' : '32px',
    },
  }),
  recaptcha: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '68px',
    background: '#d7d7d7',
    marginBottom: '32px',
  },
  modifiedHeplerText: {
    marginTop: '5px',
    marginBottom: '16px',
    fontSize: theme.variables.fontSizeXs,
  },
  heplerText: {
    fontSize: theme.variables.fontSizeXs,
    marginTop: 0,
    marginBottom: '16px',
  },
  heplerTextError: {
    color: 'red',
  },
  mainTitle: ({ isModifiedMode }: { isModifiedMode?: boolean }) => ({
    textAlign: isModifiedMode ? 'left' : 'center',
    fontSize: theme.variables.fontSizeXl,
    marginTop: isModifiedMode ? '12px' : 0,
    marginBottom: isModifiedMode ? '24px' : '32px',
  }),
  label: {
    fontSize: theme.variables.fontSizeXs,
    marginBottom: 0,
  },
}))

export default useStyles
