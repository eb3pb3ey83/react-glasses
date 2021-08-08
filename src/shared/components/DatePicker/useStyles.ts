import { makeStyles } from '@material-ui/core'
import calendar from 'src/assets/icon/calendar-icon.svg'

const useStyles = makeStyles({
  inputSingle: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    '& .DayPickerInput-Overlay': {
      minWidth: '340px',
      boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.15)',
      borderRadius: '8px',
      border: 'none',
      top: '8px',
      zIndex: 2,
    },
    '& .DayPickerInput': {
      position: 'relative',
      '&:before': {
        content: 'close-quote',
        backgroundImage: `url(${calendar})`,
        display: 'inline-block',
        position: 'absolute',
        width: '22px',
        height: '22px',
        left: '16px',
        top: '9px',
      },
      '& > input': {
        width: '200px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '9px 17px 9px 49px !important',
        margin: 0,
        border: '1px solid #D9DADB ',
        borderRadius: '8px 0px 0px 8px',
        outline: 'none',
        fontFamily: 'Noto Sans TC',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        color: '#202833',
        '&:hover': {
          borderColor: '#2664DF ',
        },
        '&:focus': {
          borderColor: '#2664DF ',
        },
        '&:disabled': {
          backgroundColor: '#fff',
        },
        '&::placeholder': {
          color: '#A6A9AD',
        },
      },
    },
    '&.error .DayPickerInput > input': {
      border: '1px solid #FF0000',
      '&:hover': {
        borderColor: '#FF0000 ',
      },
      '&:focus': {
        borderColor: '#FF0000 ',
      },
    },
  },
  inputContainer: {
    width: '100%',
    '& > .DayPicker-wrapper': {
      paddingBottom: '32px',
    },
    '& .DayPicker-NavBar': {
      '& > button': {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20px',
        top: '24px',
        '&:first-of-type': {
          left: '100px',
        },
        '&:last-of-type': {
          right: '100px',
        },
      },
      '& > button > svg': {
        minWidth: '20px',
        '& path': {
          fill: '#153C7B',
        },
      },
    },
    '& .DayPicker-Months': {
      '& > .DayPicker-Month': {
        fontFamily: 'Lato',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '16px',
        color: '#153C7B',
        margin: '25px 24px 0 24px',
      },
      flexWrap: 'nowrap',
      ' & .DayPicker-Caption': {
        textAlign: 'center',
        marginBottom: '24px',
        padding: 0,
      },
      '& .DayPicker-Body': {
        fontSize: '14px',
        lineHeight: '16px',
        '& .DayPicker-Day': {
          padding: '7.5px 13px',
          position: 'relative',
          zIndex: 0,
          '&.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
            backgroundColor: 'transparent',
            color: '#fff',
            '&:after': {
              position: 'absolute',
              content: 'close-quote',
              display: 'flex',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#2664DF',
              zIndex: -1,
              left: '7px',
              top: 0,
            },
          },
          '&:hover': {
            backgroundColor: 'transparent !important',
          },
        },
      },
    },
  },
})

export default useStyles
