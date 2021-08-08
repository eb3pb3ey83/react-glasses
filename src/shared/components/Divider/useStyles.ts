import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  divider: ({ margin }: { margin: number }) => ({
    height: '1px',
    width: '100%',
    backgroundColor: '#D9DADB',
    marginBottom: margin,
  }),
}))

export default useStyles
