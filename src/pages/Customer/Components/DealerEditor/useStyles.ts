import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    color: '#153C7B',
  },
  switch: {
    padding: '0 !important',
    border: '1px solid #D9DADB',
    borderRadius: '8px',
  },
  switchLabel: {
    paddingLeft: '16px',
  },
  saveButton: {
    marginLeft: '15px',
  },
  firstTitle: {
    marginTop: '-9px',
    marginBottom: '30px',
  },
  deleteButton: {
    borderColor: '#F66363',
    color: '#F66363',
  },
  label: {
    margin: '0 0 4px 0',
    minHeight: '23px',
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '24px',
  },
  labelWithSuffix: {
    paddingRight: '5px',
  },
}))

export default useStyles
