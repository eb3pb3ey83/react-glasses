import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  item: {
    width: '100%',
    opacity: '0.5',
    marginRight: 0,
  },
  itemChecked: {
    width: '100%',
    opacity: 1,
    marginRight: 0,
  },
}))

export default useStyles
