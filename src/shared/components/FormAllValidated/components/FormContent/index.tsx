import React from 'react'
import { Controller } from 'react-hook-form'
import Title from '../Title'
import Text from '../Text'
import Video from '../Video'
import Image from '../Image'
import { Props } from './model'
import { EditType } from '../../FormConfig/model'
import { InputType } from '../../model'
import useStyles from './useStyles'

const FormContent: React.FC<Props> = ({
  disabled,
  defaultFieldType,
  item,
  setError,
  currentLanguage,
  errors,
  onRemove,
  register,
  control,
  index,
}) => {
  const fieldErrors = errors?.faq_sections
  const fieldNames = Object.keys(defaultFieldType[0])
  const classes = useStyles()
  React.useEffect(() => {
    if (fieldErrors && fieldErrors[index]) {
      setError({ type: item.section_type as number, lan: item.language, index: index })
    }
  }, [fieldErrors])

  const addType = (name: string, nameIndex: number) => {
    const isHidden = item.language !== currentLanguage
    const isHiddenLabel = isHidden || item.isHiddenLabel
    const error = fieldErrors && fieldErrors[index]?.[name]
    const errorMessage = fieldErrors && fieldErrors[index]?.[name]?.message
    const info = item.info as Record<string, InputType>
    const fields = item.fieldName as Record<string, string>
    const fieldType = info[name]
    const fieldName = fields[name]

    switch (fieldType) {
      case EditType.title:
        return (
          <div className={classes.title} key={nameIndex}>
            <Title
              disabled={disabled}
              value={item[name] as string}
              error={error}
              errorMessage={errorMessage}
              fieldName={fieldName}
              isHidden={isHidden}
              name={`faq_sections[${index}].${name}`}
              defaultValue={item[name] as string}
              control={control}
            />
          </div>
        )

      case EditType.text:
        return (
          <Text
            disabled={disabled}
            key={nameIndex}
            fieldName={fieldName}
            name={`faq_sections[${index}].${name}`}
            isHiddenLabel={isHiddenLabel as boolean}
            index={index}
            defaultValue={item[name] as string}
            isHidden={isHidden}
            error={error}
            errorMessage={errorMessage}
            onRemove={onRemove}
            control={control}
            value={item[name] as string}
          />
        )

      case EditType.video:
        return (
          <Video
            disabled={disabled}
            key={nameIndex}
            isHidden={isHidden}
            onRemove={onRemove}
            url={item.section_content as string}
            register={register}
          />
        )

      case EditType.hidden:
        return (
          <Controller
            key={nameIndex}
            name={`faq_sections[${index}].${name}`}
            defaultValue={item[name]}
            control={control}
            as={<input type='hidden' />}
          />
        )

      case EditType.bigImg:
        return (
          <Image
            disabled={disabled}
            key={nameIndex}
            fieldName={fieldName}
            name={`faq_sections[${index}].${name}`}
            control={control}
            isHidden={isHidden}
            size='big'
          />
        )

      case EditType.smallImg:
        return (
          <Image
            disabled={disabled}
            key={nameIndex}
            fieldName={fieldName}
            name={`faq_sections[${index}].${name}`}
            control={control}
            isHidden={isHidden}
            size='small'
          />
        )

      default:
        return
    }
  }

  return <div key={index}>{fieldNames.map(addType)}</div>
}

export default FormContent
