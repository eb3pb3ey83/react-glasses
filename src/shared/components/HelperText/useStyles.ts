import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  helperText: {
    marginTop: '8px',
    color: '#6C83A9',
    '&>.firstLine': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      lineHeight: '22px',
      '&>svg': { marginRight: '5.5px' },
      marginBottom: '2px',
    },
    '&>.secondLine': {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
}))

export default useStyles
