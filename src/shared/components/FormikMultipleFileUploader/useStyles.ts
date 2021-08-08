import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  container: {},
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
  bannerText: {
    color: '#2053B8',
    fontWeight: 500,
  },
  deleteButton: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: '8px',
    border: '1px solid #F66363',
    background: '#fff',
  },
}))

export default useStyles
