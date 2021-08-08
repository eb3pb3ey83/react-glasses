import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  roleName: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '16px',
    marginBottom: '20px',
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
  blueInput: {
    background: '#FFFFFF',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
    width: '100%',
    color: '#202833',

    '&:hover, &:focus-within': {
      border: '1px solid #2664DF',
    },
    '&.Mui-disabled:hover, &.Mui-disabled:focus-within': {
      border: '1px solid #D9DADB',
    },

    '& input': {
      height: '100%',
      '&::placeholder': {
        color: '#A6A9AD',
        fontWeight: 'normal',
        fontFamily: 'Noto Sans TC',
        opacity: 1,
      },
    },
    '&.Mui-error': {
      border: '1px solid #F66363',
    },
  },
  notched: {
    display: 'none',
  },
}))

export default useStyles
