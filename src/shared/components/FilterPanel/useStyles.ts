import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  filterContainer: {
    background: '#fff',
    border: '1px solid #E3ECFF',
    borderRadius: '8px',
    padding: '24px',
  },
  control: {
    position: 'relative',
    zIndex: 1,
  },
  info: {
    paddingTop: '16px',
  },
}))

export default useStyles
