import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  home: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: '32px',
    background: '#fff',
  },
  title: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 700,
    color: '#202833',
    marginBottom: '12px',
  },
  orderStatus: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  statusState: {
    flexGrow: 1,
    padding: '24px 28px',
    background: '#F5F7FA',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '16px',
    '&:last-of-type': {
      marginRight: '0',
    },
  },
  iconWithBg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: '#fff',
  },
  labelWithValue: {
    marginLeft: '20px',
    '& > div:first-of-type': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
      color: '#6585B1',
    },
    '& > div:last-of-type': {
      color: '#202833',
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 700,
    },
  },
}))

export default useStyles
