import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '1280px',
  },
  container: {
    width: '500px',
    overflow: 'hidden',
    position: 'absolute',
  },
  titleContainer: {
    background: theme.palette.primary.main,
    color: '#fff',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 3,
  },
  title: {
    fontFamily: 'Noto Sans TC',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: '#fff',
  },
  actionHistory: {
    cursor: 'pointer',
    position: 'relative',
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: 500,
    height: '46px',
    border: '1px solid #7DA2EC',
    borderRadius: '100px',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '32px',
    padding: '0 25px',

    '& svg': {
      marginRight: '8px',
      '& > path': {
        fill: '#fff',
      },
    },
    '&:hover .log': {
      display: 'block',
    },
  },
  historyLog: {
    display: 'none',
    position: 'absolute',
    right: 0,
    padding: '12px 16px',
    top: 'calc( 100% + 10px )',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '18px',
    border: '1px solid #E3ECFF',
    boxShadow: '0px 4px 16px rgba(125, 162, 236, 0.3)',
    borderRadius: '6px',
    background: '#fff',
    '& td': {
      wordBreak: 'keep-all',
      minWidth: '100px',
      marginRight: '8px',
      whiteSpace: 'nowrap',
    },
    '& tr td:first-of-type': {
      color: '#A6A9Ad',
    },
    '& tr td:last-of-type': {
      color: '#202833',
    },
  },
  closeIcon: {
    position: 'relative',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,

    '& > svg': {
      width: '20px',
      height: '20px',
      opacity: '.5',
      color: '#fff',
    },
  },
  contentContainer: ({ disabled }: { disabled?: boolean } = {}) => ({
    height: disabled ? '100vh' : 'calc(100vh - 64px)',
    paddingTop: '64px',
    overflowY: 'auto',
  }),
  content: {
    position: 'relative',
    padding: '32px',
  },
  control: {
    boxShadow: '0px 4px 16px rgba(125, 162, 236, 0.3)',
    position: 'absolute',
    bottom: 0,
    padding: '12px 32px',
    zIndex: 2,
    background: '#fff',
    width: '100%',
  },
}))

export default useStyles
