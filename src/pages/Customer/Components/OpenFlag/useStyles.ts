import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  switch: {
    padding: '0 !important',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
  },
  switchLabel: {
    paddingLeft: '16px',
  },
  label: {
    margin: '0 0 4px 0',
    minHeight: '23px',
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '24px',
  },
  accountInfo: {
    display: 'flex',
    paddingTop: '8px',
    fontSize: theme.variables.fontSizeXs,
  },
  accountInfoText: {
    paddingLeft: '6px',
    color: '#A1B1CA',
  },
}))

export default useStyles
