import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  lebel: {
    margin: '0 0 4px 0',
    minHeight: '23px',
  },
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  blueFormControl: {
    width: '100%',
    marginTop: '24px',
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
