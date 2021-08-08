import { FormHelperText, MenuItem, Select as SelectComponent } from '@material-ui/core'
import { useField } from 'formik'
import React from 'react'
import { Props } from './model'
import useStyles from './useStyles'

const Select: React.FC<Props> = ({ selectItems, label, width, style, value, defaultValue, placeholder, ...restProps }) => {
  const [field, meta] = useField(restProps)
  const classes = useStyles({ isSelected: Boolean(value) || Boolean(defaultValue), isError: !!meta.error })
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
    <div className={classes.formikSelect}>
      {label && <FormHelperText className={classes.blueInputLabel}>{label}</FormHelperText>}
      <SelectComponent
        {...restProps}
        {...field}
        ref={Anchor}
        open={open}
        onClose={doClose}
        onOpen={doOpen}
        placeholder={placeholder}
        style={{ ...style, width }}
        MenuProps={{
          classes: {
            paper: classes.menuPaper,
          },
          anchorOrigin: { vertical: isPopOverOverFlow ? 'top' : 'bottom', horizontal: 'left' },
          getContentAnchorEl: null,
          anchorEl: Anchor.current,
          transformOrigin: { horizontal: 0, vertical: isPopOverOverFlow ? 'bottom' : 'top' },
        }}
        classes={{ root: classes.select, icon: classes.icon }}
      >
        {selectItems &&
          selectItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </SelectComponent>
      {meta.touched && meta.error && (
        <FormHelperText className={`${classes.errorMessage} ${restProps.errormessageclassname ? restProps.errormessageclassname : ''}`}>
          {meta.error}
        </FormHelperText>
      )}
    </div>
  )
}

export default Select
