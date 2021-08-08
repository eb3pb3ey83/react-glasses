import { makeStyles } from '@material-ui/core'

const inputBtn = {
  width: '40px',
  background: '#fff',
  border: '1px solid #D9DADB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&.Mui-disabled': {
    border: '1px solid #D9DADB',
  },
  '&.disabled, &.disabled:hover': {
    background: '#F7F8F8',
  },
}

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
    marginBottom: '24px',
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
    width: '100%',
    color: '#202833',
    borderRadius: 0,

    '&:hover, &:focus-within': {
      border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
    },
    '&.Mui-disabled:hover, &.Mui-disabled:focus-within': {
      border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
    },

    '& input': {
      textAlign: 'center',
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
  inputWithBtn: ({ isError }: { isDisabled: boolean; isError: boolean }) => ({
    display: 'flex',
    '&:hover .minusBtn': {
      border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
      borderWidth: '1px 0 1px 1px',
    },
    '&:hover .plusBtn': {
      border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
      borderWidth: '1px  1px 1px 0',
    },
    '&:hover .blueInput': {
      border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
    },
    '&:focus-within': {
      '& .plusBtn': {
        border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
        borderWidth: '1px  1px 1px 0',
      },
      '& .minusBtn': {
        border: `1px solid ${isError ? '#F66363' : '#2664DF'}`,
        borderWidth: '1px 0 1px 1px',
      },
    },
    '&.Mui-disabled:hover .minusBtn': {
      border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
      borderWidth: '1px 0 1px 1px',
    },
    '&.Mui-disabled:hover .plusBtn': {
      border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
      borderWidth: '1px  1px 1px 0',
    },
    '&.Mui-disabled:hover .blueInput': {
      border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
    },
    '&.Mui-disabled:focus-within': {
      '& .plusBtn': {
        border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
        borderWidth: '1px  1px 1px 0',
      },
      '& .minusBtn': {
        border: `1px solid ${isError ? '#F66363' : '#D9DADB'}`,
        borderWidth: '1px 0 1px 1px',
      },
    },
  }),
  minusBtn: {
    ...inputBtn,
    borderRadius: '8px 0px 0px 8px',
    borderWidth: '1px 0 1px 1px',
    '&:hover': {
      background: '#F4F7FD',
    },
  },
  plusBtn: {
    ...inputBtn,
    borderRadius: '0px 8px 8px 0px',
    borderWidth: '1px 1px 1px 0',
    '&:hover': {
      background: '#F4F7FD',
    },
  },
}))

export default useStyles
