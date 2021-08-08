import { createStyles, makeStyles } from '@material-ui/core'
import { CreateCSSProperties, CSSProperties } from '@material-ui/core/styles/withStyles'

const pickerOutline: CSSProperties | CreateCSSProperties = {
  display: 'inline-block',
  position: 'relative',
  '& > .react-datepicker__input-container': {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
}

export const useTimePickerStyle = makeStyles(() =>
  createStyles({
    pickerOutline,
    timePicker: {
      height: '100%',
      '& > .MuiInputBase-root': {
        padding: 0,
      },
    },
    pickerIcon: {
      minWidth: '22px',
      zIndex: 1,
      left: '17px',
      top: '9px',
      position: 'absolute',
    },
    RCtimePicker: {
      '& > .react-time-picker__wrapper': {
        border: 'none',
      },
      '&.error .react-time-picker__inputGroup': {
        border: '1px solid #FF0000',
        '&:hover': {
          borderColor: '#FF0000',
        },
        '&:focus': {
          borderColor: '#FF0000',
        },
        '&:focus-within': {
          borderColor: '#FF0000',
        },
      },
      '& .react-time-picker__inputGroup': {
        fontFamily: 'Noto Sans TC',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        width: '200px',
        height: '40px',
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        padding: '9px 17px 9px 49px',
        margin: 0,
        border: '1px solid #D9DADB',
        borderRadius: '0px 8px 8px 0px',
        outline: 'none',
        '&:hover': {
          borderColor: '#2664DF',
        },
        '&:focus': {
          borderColor: '#2664DF',
        },
        '&:focus-within': {
          borderColor: '#2664DF',
        },
        '& input': {
          '&::selection': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-textfield-decoration-container': {
            fontFamily: 'Noto Sans TC',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '22px',
          },
          '&::placeholder': {
            color: '#A6A9AD',
          },
        },
        '& .react-time-picker__inputGroup__leadingZero': {
          position: 'relative',
          zIndex: 1,
        },

        '& .react-time-picker__inputGroup__input': {
          color: '#202833',
          '&:focus-visible': {
            outline: 'none',
            background: '#E3ECFF',
            borderRadius: '4px',
          },
        },
        '& .react-time-picker__inputGroup__divider': {
          margin: '0 5px',
        },
      },
      '&.react-time-picker--disabled': {
        background: '#fff',
        '& .react-time-picker__inputGroup__leadingZero': {
          color: '#202833',
        },
      },
    },
  }),
)
