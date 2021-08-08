import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
