import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  focusTab: {
    width: 87,
    border: '1px solid #D9DADB',
    height: '23px',
    display: 'flex',
    borderRadius: '8px 8px 0 0',
    position: 'relative',
    fontSize: '14px',
    top: '1px',
    left: '8px',
  },
  focusTabTxt: {
    width: 63,
    textAlign: 'center',
    color: '#868A8F',
    fontWeight: 500,
  },
  focusTabClear: {
    width: 26,
    textAlign: 'center',
    borderLeft: '1px solid #D9DADB',
    background: '#2664DF',
    borderRadius: '0 8px 0 0',
    paddingTop: 2,
  },
  focusTabClearIcon: {
    cursor: 'pointer',
    height: 14,
    width: 14,
    '& > path': {
      fill: '#ffffff',
    },
  },
}))

export default useStyles
