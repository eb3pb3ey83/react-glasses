import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  childTabs: {
    width: '140px',
    height: '40px',
    marginBottom: '16px',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
      '& button': {
        width: '50%',
      },
    },
  },
  divider: {
    height: '1px',
    width: '100%',
    backgroundColor: '#D9DADB',
    marginBottom: '16px',
  },
})

export default useStyles
