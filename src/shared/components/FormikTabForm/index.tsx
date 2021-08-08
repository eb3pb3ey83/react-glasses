import React from 'react'
import BlueFormContainer from 'src/shared/components/BlueFormContainer'
import Loading from 'src/shared/components/Loading'
import { useAreaValue } from 'src/shared/hooks/useAreaValue'
import FormContent from './components/FormContent'

import { Props } from './model'
import useStyles from './useStyles'
import { useValidation } from './useValidation'

const FormikTabForm: React.FC<Props> = ({ components, fieldName, tabName }) => {
  const { tablist } = useAreaValue()

  console.log('tablist :>> ', tablist)

  const { langTab, setLangTab, currentTab, setError } = useValidation(tablist)
  const classes = useStyles()

  if (!tablist) {
    return <Loading />
  }

  return (
    <BlueFormContainer className={classes.blueContainter} value={langTab} onChange={setLangTab} languageList={tablist}>
      {components.map((item, index) => {
        const isHidden = item[tabName] !== currentTab

        return <FormContent key={index} index={index} tabName={tabName} isHidden={isHidden} fieldName={fieldName} setError={setError} item={item} />
      })}
    </BlueFormContainer>
  )
}

export default FormikTabForm
