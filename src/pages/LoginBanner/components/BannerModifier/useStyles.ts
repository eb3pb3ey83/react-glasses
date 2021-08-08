import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '-24px',
  },
  bannerText: {
    color: '#2053B8',
    fontWeight: 500,
  },
  labelError: {
    marginLeft: '8px',
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#EB5757',
    '&>svg': {
      marginRight: '5.5px',
    },
  },
}))
export default useStyles
