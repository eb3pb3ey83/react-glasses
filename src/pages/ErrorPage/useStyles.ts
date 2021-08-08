import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      zIndex: 1800,
      left: 0,
      background: '#fff',
      right: 0,
      top: 0,
      bottom: 0,
      [theme.breakpoints.down(376)]: {
        top: '64px',
      },
      '& img': {
        position: 'absolute',
        top: '28px',
        left: '32px',
        [theme.breakpoints.down(376)]: {
          display: 'none',
        },
      },
    },
    errorContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& svg': {
        marginBottom: '16px',
      },
      '& .firstText': {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 500,
        color: '#57729E',
        marginBottom: '50px',
      },
      '& button': {
        marginBottom: '8px',
      },
      '& .secondText': {
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: 400,
        color: '#868A8F',
      },
    },
  }),
)

export default useStyles
