import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: ({ height, margin }: Record<string, string | number | undefined>) => ({
    borderRadius: '8px',
    height: height ? height : '54px',
    margin: margin ? margin : 0,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #2664DF',
    },
    '&.Mui-error:hover .MuiOutlinedInput-notchedOutline, &.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #F66363',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #D9DADB',
    },
    '&:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline, &:focus-visible .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #2664DF',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #D9DADB',
      borderRadius: '8px',
    },
    '& > input': {
      padding: '0 14px',
      fontSize: theme.variables.fontSizeSm,
    },

    '& > input:-webkit-autofill': {
      '-webkit-box-shadow': '0 0 0 30px white inset !important',
    },
  }),
}))

export default useStyles
