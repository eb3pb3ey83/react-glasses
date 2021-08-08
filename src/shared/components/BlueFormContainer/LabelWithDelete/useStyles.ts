import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  labelWithDelete: {
    alignItems: 'center',
    marginLeft: '8px',
    display: 'none',
  },
  leftBtn: {
    width: '63px',
    height: '26px',
    background: '#F7F8F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #D9DADB',
    borderRadius: '6px 0px 0px 0px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#868A8F',
  },
  deleteBtn: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '16px',
      height: '16px',
      '& path': {
        fill: '#fff',
      },
    },
    width: '26px',
    height: '26px',
    background: '#2664DF',
    border: '1px solid #D9DADB',
    borderRadius: '0px 6px 0px 0px',
  },
})

export default useStyles
