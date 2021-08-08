import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  tableRow: {
    '& :hover': {
      background: '#F3F4F7',
    },
  },
  clickStyle: {
    background: '#E3ECFF',
  },
}))

export default useStyles
