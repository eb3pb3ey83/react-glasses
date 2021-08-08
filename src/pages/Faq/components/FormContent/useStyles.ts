import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  contentContainer: {
    display: 'flex',
    width: '848px',
    margin: '0 auto',
    flexDirection: 'column',
  },
  label: {
    fontFamily: 'Noto Sans TC',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    margin: 0,
    marginBottom: 8,
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
  timeRadioGroup: {
    marginBottom: '8px',
  },
  postTime: {},
  TextBox: {
    marginTop: 24,
  },
})

export default useStyles
