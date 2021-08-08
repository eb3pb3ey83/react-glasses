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
}))

export default useStyles
