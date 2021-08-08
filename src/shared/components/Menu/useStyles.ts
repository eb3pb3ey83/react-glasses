import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/core/styles'

const drawerWidth = '20.5%'

const itemSliderActive = {
  '& > .itemSliderActive': {
    position: 'absolute',
    left: 0,
    width: '6px',
    height: '24px',
    borderRadius: '0px 4px 4px 0px',
  },
}

const menuFont = (theme: Theme) => ({
  fontWeight: 500,
  color: '#fff',
  fontFamily: 'Noto Sans TC',

  '&.parent': {
    fontSize: '16px',
    paddingRight: '10px',
  },
  '&.child': {
    fontSize: '14px',
    lineHeight: '14px',
    marginLeft: '64px',
    width: '165px',

    [theme.breakpoints.up(1360)]: {
      width: 'auto',
    },
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      minWidth: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      padding: '28px 0 32px 32px',
      alignItems: 'center',
      '& > .menuLogo': {
        display: 'inline-block',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#153C7B',
      position: 'absolute',
      bottom: 0,
    },
    listItem: {
      opacity: 0.6,
      display: 'flex',
      height: '24px',
      textDecoration: 'none',
      alignItems: 'center',
      marginBottom: '28px',
      ...itemSliderActive,
    },
    listItemParnet: {
      textDecoration: 'none',
      opacity: 0.6,
      padding: '0 32px',
      alignItems: 'center',
      display: 'flex',
      marginBottom: '28px',
      height: '24px',
      ...itemSliderActive,
    },
    isShowMenuItem: {
      display: 'none',
    },
    itemIcon: {
      color: '#BED1F6',
      minWidth: '20px',
      height: '20px',
      marginRight: '12px',
    },
    itemText: {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...menuFont(theme),
    },
    itemActive: {
      opacity: 1,
      color: '#FFFFFF',
      textDecoration: 'initial',

      '& > .itemSliderActive': {
        ...itemSliderActive,
        background: '#FFFFFF',
      },
    },
    divider: {
      height: '1px',
      margin: '32px',
      backgroundColor: '#57729E',
    },
  }),
)

export default useStyles
