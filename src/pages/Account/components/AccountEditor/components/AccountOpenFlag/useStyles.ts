import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  settingLabel: {
    marginBottom: '5px',
  },
  label: {
    fontSize: theme.variables.fontSizeSm,
    color: theme.palette.primary.main,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  },
  accountInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    fontSize: theme.variables.fontSizeXs,
  },
  accountInfoText: {
    paddingLeft: '6px',
  },
}))

export default useStyles
