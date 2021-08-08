import React from 'react'
import BlueFormContainer from '../BlueFormContainer'
import Button from '../Button'
import { Props } from './model'
import { useValidation } from './hooks'
import FormContent from './components/FormContent'
import useStyles from './useStyle'

const FormAllValidated: React.FC<Props> = ({
  defaultFieldType,
  register,
  fields,
  control,
  tablist,
  errors,
  remove,
  append,
  isSubmitted,
  setIsSubmitted,
  isAdd,
  disabled,
}) => {
  const classes = useStyles()
  const { currentLanguage, langTab, setLangTab, setError } = useValidation({ tablist, isSubmitted, setIsSubmitted })

  const addCkeditor = () => {
    append({ language: currentLanguage, section_content: '', section_type: 1, isHiddenLabel: true })
  }

  return (
    <BlueFormContainer className={classes.blueContainter} value={langTab} onChange={setLangTab} languageList={tablist}>
      <div className={classes.TextBox}>
        {fields.map((item, index) => (
          <FormContent
            defaultFieldType={defaultFieldType}
            key={index}
            setError={setError}
            item={item}
            index={index}
            currentLanguage={currentLanguage}
            errors={errors}
            onRemove={() => remove && remove(index)}
            register={register}
            control={control}
            disabled={disabled}
          />
        ))}

        {isAdd && (
          <Button width={113} height={40} fullWidth={false} type='button' onClick={addCkeditor}>
            新增
          </Button>
        )}
      </div>
    </BlueFormContainer>
  )
}

export default FormAllValidated
