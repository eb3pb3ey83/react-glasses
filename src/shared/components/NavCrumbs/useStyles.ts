import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    crumbs: {
      fontSize: theme.variables.fontSizeXs,
      display: 'flex',
      color: '#405F91',
      alignItems: 'center',
      '& > svg': {
        marginRight: '8px',
        width: '12px',
        height: '12px',
      },
      marginBottom: '12px',
    },
    label: {
      color: '#2664DF',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
      cursor: 'pointer',
      // '&:last-of-type': {
      //   cursor: 'auto',
      // },
    },
  }),
)

export default useStyles
