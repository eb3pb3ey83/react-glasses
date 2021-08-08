import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { Props, RolesAllIndexType, RolesIndexType } from './model'
import { useField, useFormikContext } from 'formik'
import { FormSchema, RolesType } from 'src/pages/Customer/Components/AccountEditor/model'
import useStyles from './useStyles'

const CheckBoxGroup: React.FC<Props> = ({ id, checkButtons, label, title, disabled = false, ...restParams }) => {
  const classes = useStyles({ isDisabled: !!disabled })
  const [field] = useField(restParams)
  const formikContext = useFormikContext<FormSchema>()
  const name = restParams.name
  const sameIdButtons = formikContext.values[restParams.name as RolesIndexType].filter((item) => checkButtons.find((btn) => btn.id === item.id))
  const removeIdButtons = formikContext.values[restParams.name as RolesIndexType].filter((item) => !checkButtons.find((btn) => btn.id === item.id))

  //select all status: '0':unchecked, '1':checked, '2':indetermine
  const doSelectAll = () => {
    if (
      formikContext.values[(restParams.name + '_all') as RolesAllIndexType][id] === '2' ||
      formikContext.values[(restParams.name + '_all') as RolesAllIndexType][id] === '1'
    ) {
      return formikContext.setValues({
        ...formikContext.values,
        [restParams.name as RolesIndexType]: removeIdButtons,
        [(restParams.name + '_all') as RolesAllIndexType]: {
          ...formikContext.values[(restParams.name + '_all') as RolesAllIndexType],
          [id]: '0',
        },
      })
    }
    let localRoles = [
      ...formikContext.values[restParams.name as RolesIndexType],
      ...checkButtons.map((btn) => ({ id: btn.id, code: btn.button_code })),
    ]
    formikContext.setValues({
      ...formikContext.values,
      [restParams.name as RolesIndexType]: localRoles,
      [(restParams.name + '_all') as RolesAllIndexType]: {
        ...formikContext.values[(restParams.name + '_all') as RolesAllIndexType],
        [id]: '1',
      },
    })
  }
  const doCheck = (value: RolesType) => {
    const filterValue = formikContext.values[restParams.name as RolesIndexType].filter((item) => item.id === value.id)
    if (filterValue.length > 0) {
      if (value.code.includes('qry')) {
        return formikContext.setValues({
          ...formikContext.values,
          [restParams.name as RolesIndexType]: removeIdButtons,
          [(restParams.name + '_all') as RolesAllIndexType]: {
            ...formikContext.values[(restParams.name + '_all') as RolesAllIndexType],
            [id]: '0',
          },
        })
      }
      let localRoles = formikContext.values[restParams.name as RolesIndexType].filter((item) => item.id !== value.id)
      let localAllRoles: {
        [key: number]: '0' | '1' | '2'
      } = {
        ...formikContext.values[(restParams.name + '_all') as RolesAllIndexType],
        [id]: sameIdButtons.length > 1 ? '2' : '0',
      }
      return formikContext.setValues({
        ...formikContext.values,
        [(restParams.name + '_all') as RolesAllIndexType]: localAllRoles,
        [restParams.name as RolesIndexType]: localRoles,
      })
    }
    const hasQry = checkButtons.filter((item) => item.button_code.includes('qry'))
    let localRoles = value.code.includes('qry')
      ? [...formikContext.values[restParams.name as RolesIndexType], value]
      : sameIdButtons.find((item) => item.code.includes('qry'))
      ? [...formikContext.values[restParams.name as RolesIndexType], value]
      : [...formikContext.values[restParams.name as RolesIndexType], value, { id: hasQry[0].id, code: hasQry[0].button_code }]
    let localAllRoles: {
      [key: number]: '1' | '2' | '0'
    } = {
      ...formikContext.values[(restParams.name + '_all') as RolesAllIndexType],
      [id]:
        (!sameIdButtons.find((item) => item.code.includes('qry'))
          ? value.code.includes('qry')
            ? sameIdButtons.length + 1
            : sameIdButtons.length + 2
          : sameIdButtons.length + 1) === checkButtons.length
          ? '1'
          : '2',
    }
    formikContext.setValues({
      ...formikContext.values,
      [(restParams.name + '_all') as RolesAllIndexType]: localAllRoles,
      [restParams.name as 'roles1' | 'roles2' | 'roles3']: localRoles,
    })
  }

  return (
    <Box className={classes.container}>
      <Box display='flex' alignItems='center' marginBottom='3px'>
        {title && (
          <Typography className={classes.title} variant='h6'>
            {title}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              disableRipple
              className={classes.checkBox}
              indeterminate={formikContext.values[(restParams.name + '_all') as RolesAllIndexType][id] === '2'}
              name={`${name}_all`}
              disabled={disabled}
              checked={formikContext.values[(restParams.name + '_all') as RolesAllIndexType][id] === '1'}
              onChange={() => doSelectAll()}
            />
          }
          className={classes.formControlCheckBox}
          label={label}
        />
      </Box>
      <Box>
        {checkButtons.map((btn) => {
          return (
            <FormControlLabel
              key={btn.id}
              control={
                <Checkbox
                  {...field}
                  disableRipple
                  className={classes.checkBox}
                  name={name}
                  disabled={disabled}
                  value={btn.id}
                  onChange={() => doCheck({ id: btn.id, code: btn.button_code })}
                  checked={(formikContext.values[name] as Array<RolesType>).filter((item) => item.id === btn.id).length > 0}
                />
              }
              label={btn.button_name}
              className={classes.formControlCheckBox}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default CheckBoxGroup
