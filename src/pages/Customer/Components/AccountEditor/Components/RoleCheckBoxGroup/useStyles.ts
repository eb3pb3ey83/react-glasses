import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  checkBoxContainer: {
    border: '1px solid #BED1F6',
    borderRadius: '8px',
  },
}))

export default useStyles
