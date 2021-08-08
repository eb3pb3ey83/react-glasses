import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minHeight: '100vh',
      // height: 'calc(100vh - 64px)',
    },
    container: {
      position: 'relative',
      boxSizing: 'border-box',
      background: '#F4F7FD',
      height: 'calc(100vh - 76px)',
      overflowY: 'auto',
    },
    pageContainer: {
      padding: '30px 24px',
    },
    content: {
      flexGrow: 1,
      position: 'relative',
      paddingLeft: '20.5%',
    },
  }),
)

export default useStyles
