import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    padding: '15px 32px',
    '&:nth-child(even)': {
      background: 'rgba(244, 247, 253, 0.5)',
    },
  },
  title: {
    color: '#57729E',
    paddingRight: '24px',
    transform: 'translateY(-1px)',
  },
}))

export default useStyles
