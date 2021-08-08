import { red } from '@material-ui/core/colors'
// solve "findDOMNode is deprecated in StrictMode." issue
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { variables } from './themeVariables'
import closeSrc from 'src/assets/icon/white-close.svg'
import React from 'react'

// A custom theme for this app
const color = {
  primary: {
    main: '#2664DF',
    dark: '#868A8F',
    light: '#A6A9AD',
    contrastText: '#1A2037',
  },
  secondary: {
    main: '#7DA2EC',
    light: '#D9DADB',
    dark: '#497BC2',
    contrastText: '#F5F7FB',
  },
}

const theme = createMuiTheme({
  variables,
  palette: {
    ...color,
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: variables.defaultFontFamily,
    htmlFontSize: 12,
    h1: {
      fontSize: variables.fontSizeXXXl,
      fontFamily: variables.defaultFontFamily,
      color: color.secondary.main,
      fontWeight: 400,
      lineHeight: 1.235,
    },
    h2: {
      fontSize: variables.fontSizeXXl,
      fontWeight: 400,
      fontFamily: variables.defaultFontFamily,
      lineHeight: 1.34,
    },
    h3: {
      fontWeight: 500,
      fontSize: variables.fontSizeXl,
      fontFamily: variables.defaultFontFamily,
      lineHeight: 1.6,
    },
    h4: {
      fontWeight: 'bold',
      lineHeight: 1.6,
      fontSize: variables.fontSizeXl,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: variables.fontSizeLg,
      color: '#2664DF',
      position: 'relative',
    },
    h6: {
      fontWeight: 'bold',
      fontSize: variables.fontSizeMd,
      color: '#2664DF',
      position: 'relative',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: variables.fontSizeSm,
      lineHeight: '16px',
      color: '#868A8F',
    },
    subtitle2: {
      fontSize: variables.fontSizeSm,
      lineHeight: '22px',
      fontWeight: 400,
      color: '#57729E',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: variables.fontSizeMd,
        textTransform: 'none',
      },
      sizeLarge: {
        fontSize: variables.fontSizeLg,
      },
      sizeSmall: {
        fontSize: variables.fontSizeSm,
      },
    },
    MuiDrawer: {
      paper: {
        transition: '0s !important',
      },
    },
    MuiSelect: {
      root: {
        borderRadius: '8px',
        background: '#F4F7FD',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: variables.fontSizeSm,
      },
    },
    MuiButtonBase: {
      root: {
        '& + .MuiTypography-root': {
          color: '#868A8F',
        },
        '&.Mui-checked + .MuiTypography-root': {
          color: '#202833',
        },
        '& .MuiSvgIcon-root': {
          color: '#D9DADB',
        },
        '&.Mui-checked .MuiSvgIcon-root': {
          color: color.primary.main,
        },
        '&.MuiCheckbox-indeterminate .MuiSvgIcon-root': {
          color: color.primary.main,
        },
        '&.MuiCheckbox-indeterminate + .MuiTypography-root': {
          color: '#202833',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: variables.fontSizeSm,
        color: '#868A8F',
      },
    },
    MuiCssBaseline: {
      '@global': {
        button: {
          background: 'transparent',
          padding: 0,
          border: 'none',
          cursor: 'pointer',
        },
        'html, body, #root': {
          height: '100%',
          minWidth: '1280px',
          overflowX: 'auto',
        },
        div: {
          fontFamily: variables.defaultFontFamily,
        },
        '.custom_scrollbar::-webkit-scrollbar': {
          height: '4px',
          width: '16px',
          backgroundColor: 'transparent',
        },
        '.custom_scrollbar::-webkit-scrollbar-thumb': {
          boxShadow: 'inset 0 0 14px 14px rgba(161, 177, 202, 0.6)',
          borderRadius: '8px',
          border: 'solid 6px transparent',
        },
        '.custom_scrollbar::-webkit-scrollbar-track': {
          padding: '3px',
          backgroundColor: 'transparent',
        },
        '.custom_scrollbar::-webkit-scrollbar-track-piece': {
          display: 'none',
        },
        // ckeditor
        '.cke_reset': {
          borderRadius: 8,
        },
        '.cke_top': {
          borderRadius: '8px 8px 0 0',
        },
        '.cke_bottom': {
          borderRadius: ' 0 0 8px 8px',
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        '& .MuiTypography-root': {
          fontSize: variables.fontSizeSm,
        },

        '& .MuiSvgIcon-root': {
          width: '20px',
        },
      },
    },
    MuiCheckbox: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiRadio: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiSnackbar: {
      root: {
        minWidth: '263px',
        minHeight: '36px',

        '& .MuiAlert-standardSuccess': {
          background: '#FFFFFF',
          border: '1px solid #0BCDA3',
          boxSizing: 'border-box',
          borderRadius: '6px',
          alignItems: 'center',
          fontSize: variables.fontSizeSm,
        },
        '& .MuiAlert-standardError': {
          background: '#FFFFFF',
          border: '1px solid #F66363',
          boxSizing: 'border-box',
          borderRadius: '6px',
          color: '#202833',
          alignItems: 'center',
          fontSize: variables.fontSizeSm,
        },
      },
    },
    MuiTextField: {
      root: {
        '& .MuiInputBase-root': {
          borderRadius: '8px',
          padding: '7px 10px',
          minHeight: '40px',
        },

        '& .MuiAutocomplete-endAdornment': {
          display: 'none',
        },

        [`& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child,
        & .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input`]: {
          padding: '0 0 0 5px',
          fontSize: variables.fontSizeSm,
        },

        '& .MuiAutocomplete-tag': {
          margin: '4px',
          fontSize: variables.fontSizeXs,
          height: '22px',
          borderRadius: '6px',
          background: '#405F91',
          color: '#fff',
          padding: '0 11px',
        },

        '& .MuiChip-deleteIcon': {
          width: '8px',
          margin: 0,
        },

        '& .MuiChip-label': {
          padding: 0,
          marginRight: '6px',
        },
      },
    },
  },
  props: {
    MuiSelect: {
      IconComponent: ExpandMoreIcon,
      disableUnderline: true,
      MenuProps: {
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      },
    },
    MuiChip: {
      deleteIcon: React.createElement('img', { src: closeSrc }),
    },
  },
})

export default theme
