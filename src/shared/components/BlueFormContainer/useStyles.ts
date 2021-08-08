import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  blueFormCont: {
    width: '100%',
    padding: '24px',
    background: '#F4F7FD',
    border: '1px solid #E3ECFF',
    borderRadius: '8px',
    marginTop: '25px',
    '& .MuiTabs-root': {
      width: '188px',
      height: '40px',
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
      '& button': {
        width: '50%',
      },
    },
  },
  defaultTabs: {
    width: '188px',
    height: '40px',
    background: '#E3ECFF',
    borderRadius: '14px',
    position: 'relative',
  },
  divider: {
    marginTop: '16px',
    width: '100%',
    height: '1px',
    backgroundColor: '#BED1F6',
  },
})

export default useStyles
