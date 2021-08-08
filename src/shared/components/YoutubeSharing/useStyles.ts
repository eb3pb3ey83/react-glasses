import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  youtubeSharing: {
    background: '#FFFFFF',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
    padding: '16px',
    position: 'relative',
    '& ifram.iframError': {
      opacity: 0,
    },
  },
  frameCover: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    right: '16px',
    backgroundColor: '#F7F8F8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '366px',
    opacity: 0,
    '&.showCover': {
      opacity: 1,
    },
  },
  youtubeInput: {
    width: '100%',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#202833',
    '&.Mui-error': {
      border: '1px solid #F66363',
    },
    border: '1px solid #D9DADB',
    '&:hover, &:focus, &:focus-within': {
      border: '1px solid #2664DF',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  errorText: {
    fontSize: '12px',
    lineHeight: '18px',
    color: '#EB5757',
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
    '& svg': {
      marginRight: '4px',
    },
  },
})

export default useStyles
