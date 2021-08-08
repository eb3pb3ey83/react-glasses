import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Props } from './model'
import { Items } from '../../model'
import useStyles from './useStyles'

const CheckboxList: React.FC<Props> = ({ items, onChange, selectedvalue }) => {
  const classes = useStyles()

  return (
    <>
      {items.map((item) => {
        const isChecked = Boolean(selectedvalue.find((currentItem: Items) => currentItem.id === item.id))
        return (
          <FormControlLabel
            className={isChecked ? classes.itemChecked : classes.item}
            control={<Checkbox onChange={() => onChange(item)} checked={isChecked} />}
            key={item.id}
            label={item.name}
          />
        )
      })}
    </>
  )
}

export default CheckboxList
