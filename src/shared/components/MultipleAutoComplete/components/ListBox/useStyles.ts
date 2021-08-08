import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  listBox: {
    overflow: 'visible',
    margin: 0,
    padding: 0,
    maxHeight: '210px',
    boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.15)',
    fontSize: theme.variables.fontSizeSm,
  },
}))

export default useStyles
