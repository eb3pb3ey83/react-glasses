import React from 'react'
import Btn from 'src/shared/components/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { ReactComponent as ArrowDown } from 'src/assets/icon/arrow-down-icon.svg'
import { ReactComponent as ArrowUp } from 'src/assets/icon/arrow-up-icon.svg'
import { actionProps, stateProps } from '../FormContent/model'
import useStyles from './useStyles'

interface Props {
  dispatch: React.Dispatch<actionProps>
  langTab: string | number
  content: stateProps
  readonly?: boolean
}

const AddContentBtn: React.FC<Props> = React.memo(({ readonly = false, dispatch, langTab, content }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const addSort = content[langTab as number][content[langTab as number].length - 1].sort + 1

  const handleToggle = () => {
    if (readonly) {
      return setOpen(false)
    }
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const doAddBlock = (type: number) => {
    setOpen(false)
    switch (type) {
      case 1:
        return dispatch({ sort: addSort, act: 'create', lang: langTab as number, type, payload: { value: '', error: false } })
      case 2:
        return dispatch({
          sort: addSort,
          act: 'create',
          lang: langTab as number,
          type,
          payload: { src: '', id: null, error: { empty: false, limit: false } },
        })
      case 3:
        return dispatch({ sort: addSort, act: 'create', lang: langTab as number, type, payload: { url: '', error: false } })
      default:
        return
    }
  }

  return (
    <>
      <Btn disableRipple={true} ref={anchorRef} onClick={handleToggle} className={classes.addContentBtn} type='button' width='82px' height='40px'>
        新增 {!open ? <ArrowDown /> : <ArrowUp />}
      </Btn>
      <Popper
        popperOptions={{
          modifiers: {
            offset: {
              offset: '0 ,9',
            },
            preventOverflow: { enabled: false },
            hide: { enabled: false },
          },
        }}
        placement='top-start'
        className={classes.addContentPopper}
        style={{ zIndex: 2, width: '128px' }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'center bottom' }}>
            <Paper className={classes.addContentPaper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className={classes.contentMenuList} autoFocusItem={open} id='menu-list-grow' onKeyDown={handleListKeyDown}>
                  <MenuItem className={classes.contentMenuItem} onClick={() => doAddBlock(1)}>
                    文字
                  </MenuItem>
                  <MenuItem className={classes.contentMenuItem} onClick={() => doAddBlock(2)}>
                    照片
                  </MenuItem>
                  <MenuItem className={classes.contentMenuItem} onClick={() => doAddBlock(3)}>
                    影片
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
})

AddContentBtn.displayName = 'AddContentBtn'

export default AddContentBtn
