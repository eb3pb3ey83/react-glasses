import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  tabs: {
    width: '184px',
    minHeight: '32px',
  },
  tab: {
    minWidth: '56px',
    minHeight: '32px',
    height: '32px',
    color: '#2664DF',
    fontSize: theme.variables.fontSizeSm,
    fontWeight: 500,

    '&.Mui-selected': {
      color: '#fff',
    },
  },
}))

export default useStyles
