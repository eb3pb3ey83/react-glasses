import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  tableTitleBtn: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '16px',
    '&.white:hover': {
      background: '#F4F7FD !important',
    },
    '&.white': {
      background: '#fff',
      border: '1px solid #9DB6E7',
      borderRadius: '8px',
      color: '#2664DF',
    },
  },
  subtitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: '#57729E',
  },
})

export default useStyles
