import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  label: {
    fontFamily: 'Noto Sans TC',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    margin: 0,
    marginBottom: 8,
  },
  blueContainter: {
    marginTop: 0,
  },
  TextBox: {
    marginTop: 24,
  },
  blockWithDelete: {
    '&:hover, &:focus-within, &:focus, &:active': {
      '& .labelDelete': {
        display: 'flex',
      },
    },
  },
})

export default useStyles
