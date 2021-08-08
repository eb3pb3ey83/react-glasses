import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  blueInputLabel: {
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
  },
  formControlLabel: ({ isDisabled }: { isDisabled: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 16px',
    width: '100%',
    margin: 0,
    color: isDisabled ? '#868A8F' : '#202833',
    backgroundColor: isDisabled ? '#F7F8F8' : '#fff',
    '&:first-of-type': {
      borderRadius: '8px 8px 0 0',
    },
    '&:last-of-type': {
      borderRadius: '0 0 8px 8px ',
    },
    '&:last-of-type:first-of-type': {
      borderRadius: ' 8px ',
    },
  }),
  switchThumb: () => ({
    backgroundColor: '#95A0B1',
    width: '20px',
    height: '20px',
  }),
  switchTrack: () => ({
    backgroundColor: '#C2CAD7',
  }),
  switchBase: () => ({
    '&.Mui-checked': {
      '& $switchThumb': {
        backgroundColor: '#2664DF',
      },
      '& + $switchTrack': {
        backgroundColor: '#2664DF',
        opacity: '0.38',
      },
    },
  }),
}))

export default useStyles
