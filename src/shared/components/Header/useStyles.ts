import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const drawerWidth = '20.5%'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerLg: {
      backgroundColor: '#ffff',
      display: 'flex',
      paddingRight: '32px',
      paddingLeft: '20.5%',
      justifyContent: 'flex-end',
      height: '76px',
      width: '100%',
      boxShadow: '0px 4px 16px rgb(38 100 223 / 5%)',
      position: 'relative',
      zIndex: 2,
    },
    headerLgRight: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '60px',
    },
    onlineQA: {
      height: '40px',
      display: 'flex',
      flexDirection: 'row',
      cursor: 'pointer',
      alignItems: 'center',
      padding: '10px 24px',
      background: '#FFFFFF',
      border: '1px solid #9DB6E7',
      boxSizing: 'border-box',
      borderRadius: '24px',
      marginRight: '32px',
      '& > .QATitle': {
        fontFamily: 'Noto Sans TC',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '14px',
        color: '#2664DF',
        whiteSpace: 'nowrap',
      },
      '& > .chatIcon': {
        minWidth: '20px',
        height: '20px',
        marginRight: '6px',
        '& > g > path': {
          fill: '#2664DF',
        },
      },
    },
    headerTopLg: {
      margin: 'auto',
    },
    account: {
      display: 'flex',
      fontSize: '14px',
      '& > .accountName': {
        marginLeft: '5px',
        lineHeight: '25px',
      },
    },
    circle: {
      background: '#F48924',
      borderRadius: '20px',
      width: '24px',
      height: '24px',
      fontSize: theme.variables.fontSizeSm,
      color: '#FFFFFF',
      paddingLeft: '5px',
      lineHeight: '25px',
      marginTop: '14px',
    },
    appBar: {
      zIndex: 1400,
      boxShadow: 'none',
      backgroundColor: '#153C7B',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        boxShadow: '0px 4px 16px rgba(38, 100, 223, 0.05)',
        backgroundColor: '#FFFFFF',
      },
    },
    appBarLogo: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    appBarLogoBox: {
      margin: 'auto',
      display: 'flex',
    },
    toolBarlogo: {
      top: 63,
      [theme.breakpoints.down('xs')]: {
        top: 56,
      },
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      '& > .MuiTypography-root': {
        color: '#000000',
      },
      backgroundColor: '#ffff',
    },
    menuButton: {
      position: 'absolute',
      color: '#ffff',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    TypographyStyle: {
      color: '#ffff',
    },
    languageButton: {
      background: '#F4F7FD',
      fontSize: '14px',
      color: '#153C7B',
      borderRadius: '8px',
      width: '100px',
      height: '38px',
      '& .MuiSelect-select.MuiSelect-select': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        padding: '0 12px',
      },
      '& .MuiSelect-icon': {
        top: 'auto',
        right: '12px',
        '& > g > path': {
          fill: '#A1B1CA',
        },
      },
    },
  }),
)

export default useStyles
