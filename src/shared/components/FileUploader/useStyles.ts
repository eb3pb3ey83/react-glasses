import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  fileUploader: {
    background: '#FFFFFF',
    border: '1px solid #D9DADB',
    boxSizing: 'border-box',
    borderRadius: '8px',
    width: '460px',
    height: '345px',
    position: 'relative',
    '&.error': {
      borderColor: '#F66363',
    },
  },
  loaderCover: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewArea: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& > .previewImg': {
      width: '100%',
      height: '100%',
      borderRadius: '8px',
    },
    '& > .uploadBtn': {
      width: '110px',
      color: '#2664DF',
      height: '40px',
      position: 'absolute',
      right: '8px',
      top: '8px',
      background: '#FFFFFF',
      border: '1px solid #9DB6E7',
      boxSizing: 'border-box',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
      '& > svg': {
        marginRight: '6px',
      },
    },
  },
  loaderInstruction: {
    fontFamily: 'Noto Sans TC',
    textAlign: 'center',
    '& > img': {
      marginRight: '0 !important',
    },
  },
  loadImgIcon: {
    display: 'inline-block',
    '& path': {
      fill: '#C2CAD7',
    },
  },
  hint: {
    marginTop: '4px',
    lineHeight: '18px',
    '&.or': {
      fontWeight: 'normal',
      fontSize: '12px',
      color: '#A6A9AD',
    },
    '&.dragToHere': {
      fontWeight: 500,
      fontSize: '14px',
      color: '#868A8F',
    },
  },

  fromComputer: {
    padding: '0 20px',
    height: '40px',
    background: '#FFFFFF',
    border: '1px solid #9DB6E7',
    boxSizing: 'border-box',
    borderRadius: '8px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '16px',
    color: '#2664DF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4px',
  },
  inputComponent: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
})

export default useStyles
