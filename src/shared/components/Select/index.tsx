import { FormHelperText, Select as SelectComponent } from '@material-ui/core'
import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const Select: React.FC<Props> = ({ children, isError, width, style, value, defaultValue, errorMessage, ...restProps }) => {
  const classes = useStyles({ isSelected: Boolean(value) || Boolean(defaultValue), isError })
  const Anchor = React.useRef<HTMLElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [isPopOverOverFlow, setIsPopOverOverFlow] = React.useState(false)

  const doOpen = (evt: React.ChangeEvent<unknown>) => {
    const bodyRect = document.body.getBoundingClientRect()
    const { y } = (evt.currentTarget as HTMLElement).getBoundingClientRect()
    if (y + (evt.currentTarget as HTMLElement).offsetHeight - bodyRect.y + 208 > window.innerHeight) {
      setIsPopOverOverFlow(true)
    }
    setOpen(true)
  }

  const doClose = () => {
    setOpen(false)
    setIsPopOverOverFlow(false)
  }

  return (
    <>
      <SelectComponent
        {...restProps}
        value={value}
        defaultValue={defaultValue}
        style={{ ...style, width }}
        classes={{ root: classes.select, icon: classes.icon }}
        ref={Anchor}
        open={open}
        onClose={doClose}
        onOpen={doOpen}
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
          anchorOrigin: { vertical: isPopOverOverFlow ? 'top' : 'bottom', horizontal: 'left' },
          getContentAnchorEl: null,
          anchorEl: Anchor.current,
          transformOrigin: { horizontal: 'left', vertical: isPopOverOverFlow ? 'bottom' : 'top' },
        }}
      >
        {children}
      </SelectComponent>
      {errorMessage && <FormHelperText className={classes.errorMessage}>{errorMessage}</FormHelperText>}
    </>
  )
}

export default Select
