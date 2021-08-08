import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {},
  lebel: {
    margin: '24px 0 4px 0',
    minHeight: '23px',
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
  labelWithSuffix: {
    paddingRight: '5px',
  },
}))

export default useStyles
