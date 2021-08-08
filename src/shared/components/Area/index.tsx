import React from 'react'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import { Props } from './model'
import { CountyRoleType } from 'src/pages/model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const Area: React.FC<Props> = ({ isCreatePage, areaValue, setAreaValue, typeValue, setTypeValue, disabled, children }) => {
  const classes = useStyles()
  const { roleType } = React.useContext(CountyRoleType)
  const isCountyDisabled = Number(roleType) === 1 || Number(roleType) === 2 || disabled
  const { t } = useTranslation()

  const radiosArea = React.useMemo(
    () => [
      { value: 1, label: t('select.national') },
      { value: 2, label: t('select.international') },
    ],
    [],
  )
  const radiosTypes = React.useMemo(
    () => [
      { value: 2, label: t('select.section4') },
      { value: 3, label: t('select.section5') },
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
        disabled={disabled}
        readOnly={!isCreatePage || (isCreatePage && isCountyDisabled)}
        onChange={(e) => setAreaValue(parseInt(e.target.value))}
      />
      {typeValue && (
        <RadioGroupWithLabel
          classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
          radios={radiosTypes}
          value={typeValue === 1 ? 2 : typeValue}
          label={t('area.category')}
          readOnly={typeValue === 1}
          disabled={disabled}
          onChange={(e) => setTypeValue && setTypeValue(Number(e.target.value))}
        />
      )}
      {children}
    </div>
  )
}

export default Area
