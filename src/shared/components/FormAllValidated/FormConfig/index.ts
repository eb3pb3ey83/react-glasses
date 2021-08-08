import { useFieldArray, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import 'react-perfect-scrollbar/dist/css/styles.css'
import { FormModel } from './model'
import React from 'react'
import { ObjectShape } from 'yup/lib/object'

const useFormConfig = (defaultFormData: FormModel[] | [], validationSchema: ObjectShape) => {
  const Schema = Yup.object().shape({
    faq_sections: Yup.array().of(
      Yup.object().shape({
        ...validationSchema,
      }),
    ),
  })

  const { control, handleSubmit, setValue, errors, register } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      faq_sections: defaultFormData,
    },
  })

  // const currentData = watch('faq_sections')

  const { fields, append, remove } = useFieldArray({ control, name: 'faq_sections' })

  React.useEffect(() => {
    const hasData = defaultFormData.length > 0

    hasData && setValue('faq_sections', defaultFormData)
  }, [defaultFormData])

  return {
    control,
    handleSubmit,
    errors,
    register,
    fields,
    append,
    remove,
    setValue,
    // currentData,
  }
}

export default useFormConfig
