import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
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
})

export default useStyles
