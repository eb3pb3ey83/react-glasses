import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  container: {
    padding: '15px 32px',
    '&:nth-child(even)': {
      background: 'rgba(244, 247, 253, 0.5)',
    },
  },
  title: () => ({
    color: '#57729E',
    paddingRight: '24px',
    transform: 'translateY(-1px)',
  }),
  checkBox: ({ isDisabled }: { isDisabled: boolean }) => ({
    opacity: isDisabled ? 0.38 : 1,
  }),
  formControlCheckBox: ({ isDisabled }: { isDisabled: boolean }) => ({
    '& .MuiTypography-root.MuiFormControlLabel-label': {
      color: isDisabled ? '#868A8F' : '#202833',
    },
  }),
}))

export default useStyles
