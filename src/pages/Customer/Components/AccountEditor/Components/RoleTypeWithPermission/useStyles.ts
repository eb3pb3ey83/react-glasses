import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  checkBoxContainer: {
    border: '1px solid #BED1F6',
    borderRadius: '8px',
  },
  blueFormControl: {
    width: '100%',
    marginTop: '24px',
  },
  blueInputLabel: {
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    marginBottom: '8px',
  },
  label: {
    display: 'flex',
    fontFamily: 'Noto Sans TC',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    margin: 0,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: '12px',
  },
  radioWithLabel: {
    marginLeft: 0,
    marginRight: '24px',
    '& > .MuiButtonBase-root': {
      padding: '0 8px 0 0',
      '& > .MuiIconButton-label': {
        position: 'relative',
        '& svg': {
          width: '22px',
          height: '22px',
        },
      },
    },
    '& > .MuiTypography-root': {
      fontFamily: 'Noto Sans TC',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '22px',
      color: '#868A8F',
    },
  },
}))

export default useStyles
