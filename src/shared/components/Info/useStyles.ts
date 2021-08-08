import { makeStyles } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

const infoStyle: CSSProperties = {
  opacity: 0,
  visibility: 'hidden',
  position: 'absolute',
  whiteSpace: 'break-spaces',
  backgroundColor: '#fff',
  border: '1px solid #E3ECFF',
  padding: '12px 16px',
  boxShadow: '0px 4px 16px rgba(125, 162, 236, 0.3)',
  borderRadius: '6px',
  color: '#202833',
  transition: 'opacity .3s, visibility .3s .3s',
  fontSize: '12px',
  top: '23px',
  left: 0,
}
const useStyles = makeStyles(() => ({
  container: () => {
    const onInfoHover = '&:hover > span'

    return {
      position: 'relative',
      height: '18px',
      zIndex: 1,

      [onInfoHover]: {
        opacity: 1,
        visibility: 'visible',
        transition: '.3s',
      },
    }
  },
  info: infoStyle,
  permissionInfo: {
    ...infoStyle,
    width: '320px',
    whiteSpace: 'inherit',
  },
}))

export default useStyles
