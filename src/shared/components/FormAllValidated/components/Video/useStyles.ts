import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  blockWithDelete: {
    '&:hover, &:focus-within, &:focus, &:active': {
      '& .labelDelete': {
        display: 'flex',
      },
    },
  },
})

export default useStyles
