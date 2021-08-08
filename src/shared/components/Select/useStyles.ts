import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',

    '& .MuiInput-root': {
      width: '100%',
    },
  },

  select: ({ isSelected, isError }: { isSelected: boolean; isError?: boolean }) => ({
    position: 'relative',
    background: '#fff',
    border: `1px solid ${isError ? '#ff1744' : '#D9DADB'}`,
    borderRadius: '8px',
    fontSize: theme.variables.fontSizeSm,
    paddingLeft: '10px',
    zIndex: isSelected ? 2 : 1,

    '&:focus, &:hover, &:focus-within': {
      borderRadius: '8px',
      border: '1px solid #2664DF',
      zIndex: isSelected ? 2 : 1,
      background: '#fff',
    },

    '& + input': {
      opacity: 1,
      border: 'none',
      background: 'transparent',
      color: '#A6A9AD',
      fontSize: theme.variables.fontSizeSm,
      bottom: '50%',
      left: '15px',
      transform: 'translateY(50%)',
      zIndex: isSelected ? 0 : 1,
    },
  }),
  icon: {
    zIndex: 2,
    width: '25px',
    height: '25px',
    color: 'rgb(161, 177, 202)',
    right: '15px',
  },
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  menuPaper: {
    maxHeight: '208px',
  },
}))

export default useStyles
