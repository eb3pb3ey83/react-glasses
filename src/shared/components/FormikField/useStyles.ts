import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  lebel: {
    margin: '0 0 4px 0',
    minHeight: '23px',
  },
  errorMessage: {
    color: '#ff1744',
    fontSize: theme.variables.fontSizeXs,
  },
  blueFormControl: {
    width: '100%',
    marginTop: '24px',
  },
  blueInputLabel: {
    fontFamily: 'Noto Sans TC',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#2053B8',
    display: 'inline-flex',
    alignItems: 'center',
  },
  labelWithSuffix: {
    paddingRight: '5px',
  },
  blueInput: ({ isDisabled, isError }: { isDisabled: boolean; isError: boolean }) => ({
    background: isDisabled ? '#F7F8F8' : '#FFFFFF',
    border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
    borderRadius: '8px',
    width: '100%',
    color: '#202833',

    '&:hover, &:focus-within': {
      border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
    },
    '&.Mui-disabled:hover, &.Mui-disabled:focus-within': {
      border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
    },

    '& input': {
      height: '100%',
      '&::placeholder': {
        color: '#A6A9AD',
        fontWeight: 'normal',
        fontFamily: 'Noto Sans TC',
        opacity: 1,
      },
    },
  }),
  notched: {
    display: 'none',
  },
}))

export default useStyles
