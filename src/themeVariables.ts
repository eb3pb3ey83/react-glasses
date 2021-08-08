declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    variables: Variables
  }
  interface ThemeOptions {
    variables: Variables
  }
}

export interface Variables {
  fontSizeXs: string
  fontSizeSm: string
  fontSizeMd: string
  fontSizeLg: string
  fontSizeXl: string
  fontSizeXXl: string
  fontSizeXXXl: string
  defaultFontFamily: string
}

export const variables: Variables = {
  fontSizeXs: '12px',
  fontSizeSm: '14px',
  fontSizeMd: '16px',
  fontSizeLg: '20px',
  fontSizeXl: '24px',
  fontSizeXXl: '35px',
  fontSizeXXXl: '47px',
  defaultFontFamily: 'Noto Sans TC',
}
