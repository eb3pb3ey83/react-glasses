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
  tableRowSurface: {
    position: 'absolute',
    width: '100%',
    left: 46,
    height: 58,
  },
}))

export default useStyles
