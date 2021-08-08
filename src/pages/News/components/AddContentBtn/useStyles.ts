import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  addContentBtn: {
    '&:focus': {
      background: '#2053B8',
    },
    marginTop: '24px',
    '& svg': {
      marginLeft: '6px',
    },
  },
  addContentPopper: {},
  addContentPaper: {
    background: '#FFFFFF',
    boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.15)',
    borderRadius: '8px',
  },
  contentMenuList: {
    fontFamily: 'Noto Sans TC',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#202833',
  },
  contentMenuItem: {
    '&:hover': {
      background: '#F4F7FD',
    },
  },
})

export default useStyles
