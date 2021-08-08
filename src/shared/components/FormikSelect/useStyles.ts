import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  formikSelect: {
    marginBottom: '24px',
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
      '&::placeholder': {
        color: '#A6A9AD',
      },
    },
  }),
  menuPaper: {
    maxHeight: '208px',
  },
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
  blueInputLabel: {
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
}))

export default useStyles
