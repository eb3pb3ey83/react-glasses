import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  control: {
    '& .MuiSelect-select.MuiSelect-select': {
      zIndex: 2,
      background: 'transparent',
    },

    '& .MuiSelect-select.MuiSelect-select + input': {
      color: 'transparent',
    },
  },
}))

export default useStyles
