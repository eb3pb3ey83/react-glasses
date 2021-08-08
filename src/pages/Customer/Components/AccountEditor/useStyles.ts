import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  sendEmail: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px',
  },
  blueInputLabel: {
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '8px',
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
  formControlLabelBorder: {
    marginTop: '8px !important',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
  },
  openFlag: {
    marginTop: '24px',
  },
  checkBoxContainer: {
    border: '1px solid #BED1F6',
    borderRadius: '8px',
  },
  roleSwitchContainer: {
    marginTop: '16px',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#E9E9EB',
  },
  saveButton: {
    marginLeft: '16px',
  },
}))

export default useStyles
