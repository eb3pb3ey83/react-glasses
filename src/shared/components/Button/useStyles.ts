import { makeStyles } from '@material-ui/core/styles'

interface ButtonStyle {
  isDeleteButton?: boolean
  isWhiteButton?: boolean
}

const useStyles = makeStyles((theme) => ({
  button: ({ isDeleteButton, isWhiteButton }: ButtonStyle) => ({
    height: '54px',
    color: 'white',
    background: theme.palette.primary.main,

    ...(isDeleteButton && {
      background: 'white',
      color: '#F66363',
      border: '1px solid #F66363',
    }),

    ...(isWhiteButton && {
      background: 'white',
      color: theme.palette.primary.main,
      border: '1px solid #9DB6E7',
    }),

    borderRadius: '8px',
    boxShadow: 'none',

    '&:hover': {
      background: isDeleteButton || isWhiteButton ? '#F4F7FD' : theme.palette.secondary.main,
      boxShadow: 'none',
    },

    '&:disabled': {
      background: '#D9DADB',
      boxShadow: 'none',
      ...(isWhiteButton && { border: '1px solid #868A8F' }),
    },
  }),
}))

export default useStyles
