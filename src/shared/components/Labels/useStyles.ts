import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  label: {
    background: '#405F91',
    borderRadius: '6px',
    color: '#fff',
    padding: '3px 11px',
    marginRight: '10px',
    minHeight: '25px',
  },
  text: {
    display: 'inline-block',
    paddingRight: '5px',
  },
  more: {
    fontSize: theme.variables.fontSizeSm,
    color: '#6C83A9',
  },
}))

export default useStyles
