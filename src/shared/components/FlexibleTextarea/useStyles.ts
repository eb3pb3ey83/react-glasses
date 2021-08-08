import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {},
  flexibleTextarea: ({ disabled, isError }: { disabled?: boolean; isError?: boolean }) => ({
    minHeight: '62px',
    padding: '10px 14px',
    font: 'inherit',
    fontSize: theme.variables.fontSizeSm,
    // boxShadow: `inset 0 0 0 1px ${disabled ? '#F66363' : 'rgb(217, 218, 219)'}`,
    borderRadius: '8px',
    // border: 'none',
    resize: 'none',
    border: `1px solid ${isError ? '#ff1744' : disabled ? '#F66363' : '#D9DADB'}`,

    '&:focus-visible': {
      outline: 'none',
    },

    '&:not(:disabled):focus-visible': {
      border: `1px solid rgb(38, 100, 223)`,
    },

    '&::placeholder': {
      color: '#A6A9AD',
      fontWeight: 'normal',
      fontFamily: 'Noto Sans TC',
      opacity: 1,
    },
  }),
}))

export default useStyles
