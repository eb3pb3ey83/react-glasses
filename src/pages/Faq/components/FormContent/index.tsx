import React from 'react'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import { Props } from './model'
import { CountyRoleType } from 'src/pages/model'
import FormAllValidated from 'src/shared/components/FormAllValidated'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const FormContent: React.FC<Props> = ({
  defaultFieldType,
  disabled,
  register,
  fields,
  control,
  list: tablist,
  errors,
  areaValue,
  setAreaValue,
  remove,
  append,
  isSubmitted,
  setIsSubmitted,
  radioButtonDisabled,
}) => {
  const classes = useStyles()
  const { roleType } = React.useContext(CountyRoleType)
  const isCountyDisabled = roleType !== '0' || radioButtonDisabled
  const { t } = useTranslation()
  const radiosArea = React.useMemo(
    () => [
      { value: 1, label: t('select.national') },
      { value: 2, label: t('select.international') },
    ],
    [],
  )

  return (
    <div className={classes.contentContainer}>
      <RadioGroupWithLabel
        classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
        radios={radiosArea}
        value={areaValue}
        label={t('area.area')}
        disabled={isCountyDisabled}
        onChange={(e) => setAreaValue(parseInt(e.target.value))}
      />
      <FormAllValidated
        disabled={disabled}
        isAdd={false}
        defaultFieldType={defaultFieldType}
        register={register}
        fields={fields}
        control={control}
        tablist={tablist}
        errors={errors}
        remove={remove}
        append={append}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </div>
  )
}

export default FormContent
