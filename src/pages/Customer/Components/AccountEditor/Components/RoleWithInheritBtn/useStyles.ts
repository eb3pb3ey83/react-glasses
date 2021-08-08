import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  roleWithInheritBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#2664DF',
    '& > svg': {
      marginRight: '6px',
    },
  },
  labelWithSuffix: {
    paddingRight: '5px',
  },
})

export default useStyles
