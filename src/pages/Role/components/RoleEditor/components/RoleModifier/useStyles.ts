import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  roleName: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '16px',
    marginBottom: '20px',
    alignItems: 'end',
    marginTop: '-24px',
  },
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
  errorMessage: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#ff1744',
    marginLeft: '10px',
    fontSize: theme.variables.fontSizeXs,

    '& .MuiSvgIcon-root': {
      color: '#ff1744',
    },
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: '12px',
  },
}))

export default useStyles
