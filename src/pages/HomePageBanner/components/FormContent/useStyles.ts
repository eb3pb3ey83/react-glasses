import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  contentContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
    flexDirection: 'column',
  },
  blueFormCont: {
    marginTop: 0,
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
  timeRadioGroup: {
    marginBottom: '8px',
  },
  postTime: {},
  blockWithDelete: {
    '&:hover, &:focus-within, &:focus, &:active': {
      '& .labelDelete': {
        display: 'flex',
      },
    },
    '&.withMarginBot': {
      marginBottom: '50px',
    },
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
  coverUpload: { position: 'relative' },
  errorMessage: {
    marginTop: '8px',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 'normal',
    color: '#EB5757',
  },
  labelError: {
    marginLeft: '8px',
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#EB5757',
    '&>svg': {
      marginRight: '5.5px',
    },
  },
  helperText: {
    marginTop: '8px',
    color: '#6C83A9',
    '&>.firstLine': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      lineHeight: '22px',
      '&>svg': { marginRight: '5.5px' },
      marginBottom: '2px',
    },

    '&>.secondLine': {
      fontSize: '12px',
      lineHeight: '18px',
      display: 'inline-grid',
      gridTemplateColumns: 'auto auto',
      gridColumnGap: '5px',
    },
  },
})

export default useStyles
