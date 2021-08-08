import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: ({ isError }: { isError: boolean }) => ({
    border: `1px solid ${isError ? '#ff1744' : '#BED1F6'}`,
    borderRadius: '8px',

    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  }),
  titleContainer: {
    borderBottom: '2px solid #F4F7FD',
    padding: '17px 32px',
  },
  flag: {
    /* Rectangle 395 */
    position: 'static',
    width: '4px',
    height: '16px',
    left: 0,
    top: '1px',

    /* Primary/Blue/30 */
    background: '#BED1F6',
    borderRadius: '2px',

    /* Inside Auto Layout */
    flex: 'none',
    order: 0,
    flexGrow: 0,
    margin: '0px 8px',
  },

  title: {
    color: theme.palette.primary.main,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    transform: 'translateX(-7px)',
  },
}))

export default useStyles
