import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    lineHeight: 0,
    marginTop: '20px',

    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },

    '& svg': {
      width: '20px',
      color: '#BED1F6',
    },

    '& .MuiPaginationItem-root': {
      height: '22px',
      minWidth: '22px',
      fontSize: theme.variables.fontSizeSm,
      color: '#2053B8',
      fontWeight: 500,

      '&:hover': {
        background: '#E3ECFF',
      },

      '&.MuiPaginationItem-textSecondary.Mui-selected': {
        background: '#BED1F6',
      },
    },
  },
}))

export default useStyles
