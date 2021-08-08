import { makeStyles } from '@material-ui/core'

const radioFormStyles = makeStyles({
  radioFormGroup: {
    marginBottom: '24px',
    '& .disabledRadio': {
      '& .MuiButtonBase-root.Mui-checked .MuiSvgIcon-root': {
        opacity: 0.38,
      },
      '& .MuiButtonBase-root.Mui-checked + .MuiTypography-root': {
        color: '#868A8F',
      },
    },
  },
  labelWithSuffix: {
    paddingRight: '5px',
  },
})

export default radioFormStyles
