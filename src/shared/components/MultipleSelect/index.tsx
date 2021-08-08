import React from 'react'
import { Controller } from 'react-hook-form'
import CheckboxList from './components/CheckboxList'
import Labels from '../Labels'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Button from '../Button'
import useFormConfig from './formConfig'
import { useMachine } from '@xstate/react'
import machine from './machineConfig'
import { Items, Props } from './model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const MultipleSelect: React.FC<Props> = ({ placeholder, width, items, onSubmit: propsOnSubmit }) => {
  const [state, send] = useMachine(machine)
  const { t } = useTranslation()

  const { control, handleSubmit, onLabelClick, handleCheck, hasSelectItem, selectedList, setValue, onInputClick, onSubmit } = useFormConfig(
    send,
    state,
    propsOnSubmit,
  )

  const classes = useStyles({ hasSelectItem, expended: state.matches('expanded') })

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div onClick={onInputClick} className={classes.input} style={{ width }}>
        <div className={classes.labelContainer}>
          {!hasSelectItem && <span className={classes.placeholder}>{placeholder}</span>}
          {hasSelectItem && <Labels hasDeleteIcon={false} limited limitedLength={1} selectedList={selectedList} onClick={onLabelClick} />}
        </div>
        <ExpandMoreIcon className={classes.arrow} />
      </div>

      <div className={classes.popup}>
        <div className={classes.header}>
          <div className={classes.control}>
            <div>
              {t('account.screeningCriteria')}
              {hasSelectItem && `(${selectedList.length})`}
            </div>

            <button className={classes.clearButton} type='button' onClick={() => setValue('itemList', [])}>
              {t('account.clearAll')}
            </button>
          </div>
          {hasSelectItem && <Labels selectedList={selectedList} onClick={onLabelClick} />}
        </div>

        <PerfectScrollbar>
          <div className={classes.content}>
            <Controller
              name='itemList'
              render={(props) => (
                <CheckboxList items={items} onChange={(item: Items) => props.onChange(handleCheck(item))} selectedvalue={props.value} />
              )}
              control={control}
            />
          </div>
        </PerfectScrollbar>

        <div className={classes.submitButtonContainer}>
          <Button type='submit' height={40}>
            {t('reset16')}
          </Button>
        </div>
      </div>
    </form>
  )
}

MultipleSelect.defaultProps = {
  width: 250,
}
export default MultipleSelect
