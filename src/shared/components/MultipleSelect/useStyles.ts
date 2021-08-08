import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    position: 'relative',
  },
  input: {
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'space-between',
    background: '#fff',
    padding: '7px 17px',
    border: '1px solid #D9DADB',
    boxSizing: 'border-box',
    borderRadius: '8px',
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  arrow: ({ expended }: Record<string, boolean>) => ({
    color: '#A1B1CA',
    transform: expended ? 'rotate(180deg)' : 'rotate(0deg)',
    fontSize: '25px',
  }),
  popup: ({ expended }: Record<string, boolean>) => ({
    position: 'absolute',
    top: '52px',
    minWidth: '250px',
    boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.15)',
    borderRadius: '8px',
    background: '#fff',
    padding: '16px',
    visibility: expended ? 'visible' : 'hidden',
  }),
  header: {
    borderBottom: '1px solid #D9DADB',
    paddingBottom: '16px',
    marginBottom: '10px',
  },
  control: ({ hasSelectItem }: Record<string, boolean>) => ({
    fontWeight: 500,
    fontSize: theme.variables.fontSizeSm,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: hasSelectItem ? '16px' : 0,
  }),
  clearButton: {
    color: theme.palette.primary.main,
  },
  placeholder: {
    color: '#A6A9AD',
    fontSize: theme.variables.fontSizeSm,
  },
  content: {
    maxHeight: '190px',
  },
  submitButtonContainer: {
    paddingTop: '16px',
  },
}))

export default useStyles
