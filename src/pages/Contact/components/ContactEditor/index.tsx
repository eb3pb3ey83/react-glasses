import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { FormErrors, Props } from './model'
import { useParams } from 'react-router'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import { getPermission } from 'src/utils/getPermission'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import Alert from 'src/shared/components/Alert'
import { useAreaValue } from 'src/shared/hooks/useAreaValue'
import { useContactFormData } from './hooks'
import useFormConfig from 'src/shared/components/FormAllValidated/FormConfig'
import Area from 'src/shared/components/Area'
import FormAllValidated from 'src/shared/components/FormAllValidated'
import useCreateContact from '../../services/createContact/hooks'
import { ContactFormDataModel, CreateContactModel } from '../../services/createContact/model'
import { ObjectShape } from 'yup/lib/object'
import * as Yup from 'yup'
import useDeletingContact from '../../services/deleteContact/hooks'
import useUpdateContact from '../../services/updateContact/hooks'
import { UpdateContactModel } from '../../services/updateContact/model'
import { useTranslation } from 'react-i18next'
import emailValidator from 'src/utils/validator/emailValidator'
import phoneValidator, { rule } from 'src/utils/validator/phoneValidator'
import useStyles from './useStyles'
import { AlertUnauthContext } from 'src/pages/model'

const { hasDeletePermission, hasUpdatePermission } = getPermission('contact')
const hasUP_DelPermission = hasUpdatePermission && hasDeletePermission
const ContactEditor: React.FC<Props> = ({ openToast, closeDrawer, isCreate = false }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { mutate } = useCreateContact(openToast, closeDrawer, openUnAuthAlert)
  const { id }: { id: string } = useParams()
  const { areaValue, setAreaValue, tablist } = useAreaValue()
  const [typeValue, setTypeValue] = useState<number | string>(2)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const classes = useStyles()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate: deleteContact } = useDeletingContact(openToast, closeDrawer, openUnAuthAlert)
  const { mutate: updateContact } = useUpdateContact(openToast, closeDrawer, openUnAuthAlert)
  const { t } = useTranslation()
  const { defaultFormData, defaultFieldType, detailPageContact } = useContactFormData(areaValue)
  const isCreatePage = id === 'create' || id === undefined
  const isTaiwanCompany = detailPageContact?.type === '1'

  const onSubmit = (data: ContactFormDataModel) => {
    if (isCreatePage) {
      const request: CreateContactModel = {
        contact_sections: data.faq_sections,
        country_type: areaValue.toString(),
        type: String(typeValue),
      }
      mutate(request)
    } else {
      const request = {
        id: id,
        updataDataInfo: {
          contact_sections: data.faq_sections,
          country_type: areaValue.toString(),
          type: typeValue,
        },
      }
      updateContact(request as UpdateContactModel)
    }
  }

  const validateEmpty = (value?: string) => {
    const isValid = (!isTaiwanCompany && !value) || value

    return Boolean(isValid)
  }

  const validateFax = (value?: string) => {
    const isPassedTest = rule.test(value as string)
    const isValueValid = (!isTaiwanCompany && !value) || (isPassedTest && value)

    return Boolean(isValueValid)
  }

  const validationSchema: ObjectShape = {
    company_name: Yup.string().required(t('validation.required')),
    phone: phoneValidator(t('validation.phoneInvalid'), t('validation.required')),
    fax: Yup.string()
      .test('validateFaxEmpty', t('validation.required'), validateEmpty)
      .test('validateFaxFormat', t('validation.phoneInvalid'), validateFax),
    email: emailValidator(t('validation.emailInvalid'), t('validation.required')),
    address: Yup.string().required(t('validation.required')),
    website_link: Yup.string().test('validateEmpty', t('validation.required'), validateEmpty),
    facebook_link: Yup.string().test('validateEmpty', t('validation.required'), validateEmpty),
    youtube_link: Yup.string().test('validateEmpty', t('validation.required'), validateEmpty),
  }

  const { handleSubmit, register, fields, append, remove, control, errors } = useFormConfig(defaultFormData, validationSchema)
  const formErrors = errors as FormErrors

  const confirmDelete = () => {
    openAlert({
      title: t('alert.section4'),
      content: t('alert.section5'),
      isDicidedMode: true,
      onConfirm: () => {
        closeAlert()
        deleteContact({ id: id })
      },
    })
  }

  React.useEffect(() => {
    if (!isCreatePage && !!detailPageContact) {
      setAreaValue(parseInt(detailPageContact?.country_type))
      setTypeValue(parseInt(detailPageContact?.type))
    }
  }, [detailPageContact])

  return (
    <InfoDrawer.Container
      title={isCreate ? t('contact.section1') : hasUP_DelPermission ? t('contact.section2') : t('contact.section3')}
      open
      onClose={closeDrawer}
      width='500px'
      editHistory={
        isCreate
          ? undefined
          : {
              updated_time: detailPageContact?.updated_time,
              updated_user: detailPageContact?.updated_user,
              created_time: detailPageContact?.created_time,
              created_user: detailPageContact?.created_user,
            }
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoDrawer.Content disabled={!hasUpdatePermission}>
          <Alert
            onClose={closeAlert}
            open={isAlertOpen}
            onConfirm={alertMessage.onConfirm}
            isDicidedMode={alertMessage.isDicidedMode as boolean}
            title={alertMessage.title}
            content={alertMessage.content}
          />
          <Area
            isCreatePage={isCreatePage}
            areaValue={areaValue}
            setAreaValue={setAreaValue}
            typeValue={typeValue}
            setTypeValue={setTypeValue}
            disabled={isCreatePage ? false : !hasUP_DelPermission}
          >
            <FormAllValidated
              disabled={isCreatePage ? false : !hasUP_DelPermission}
              defaultFieldType={defaultFieldType}
              register={register}
              fields={fields}
              control={control}
              tablist={tablist}
              errors={formErrors}
              remove={remove}
              append={append}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
          </Area>
        </InfoDrawer.Content>
        {(isCreatePage || hasUP_DelPermission) && (
          <InfoDrawer.Footer>
            <Box display='flex' justifyContent='space-between'>
              <div>
                {!isCreatePage && hasUpdatePermission && !isTaiwanCompany && (
                  <Button
                    width={115}
                    height={40}
                    className={classes.deleteButton}
                    isDeleteButton
                    startIcon={<img src={deleteIconSrc} alt='' />}
                    fullWidth={false}
                    onClick={confirmDelete}
                    type='button'
                  >
                    {t('alert.section18')}
                  </Button>
                )}
              </div>
              {
                <div>
                  <Button onClick={closeDrawer} width={83} height={40} isWhiteButton fullWidth={false} type='button'>
                    {t('button.cancel')}
                  </Button>
                  <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit' onClick={() => setIsSubmitted(true)}>
                    {t('button.save')}
                  </Button>
                </div>
              }
            </Box>
          </InfoDrawer.Footer>
        )}
      </form>
    </InfoDrawer.Container>
  )
}

export default ContactEditor
