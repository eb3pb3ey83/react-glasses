import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  body: {
    padding: '24px 32px 32px 32px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: '355px',
    minHeight: '425px',
    background: '#fff',
    border: '1px solid #D9DADB',
    borderRadius: '16px',
    outline: 0,
    '& > svg': {
      position: 'relative',
      left: '100%',
      transform: 'translateX(-100%)',
      cursor: 'pointer',
      marginBottom: '6px',
    },
  },
  title: {
    color: '#2664DF',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '12px',
    maxWidth: '100%',
    overflowWrap: 'break-word',
  },
  btns: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > button:first-of-type': {
      marginRight: '16px',
    },
  },
})

export default useStyles
