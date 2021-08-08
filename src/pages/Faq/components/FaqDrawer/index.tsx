import { Box } from '@material-ui/core'
import React from 'react'
import Button from 'src/shared/components/Button'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import { FormErrors, Props } from './model'
import FormContent from '../FormContent'
import { AlertUnauthContext, CountyRoleType } from 'src/pages/model'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import useCreateFaq from '../../services/createFaq/hooks'
import useFormConfig from 'src/shared/components/FormAllValidated/FormConfig'
import { CreateFaqModel } from '../../services/createFaq/model'
import { useParams } from 'react-router'
// import useDetailPageFaq from '../../services/detailPageFaq/hooks'
import deleteIconSrc from 'src/assets/icon/delete.svg'
import { getPermission } from 'src/utils/getPermission'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import useDeletingFaq from '../../services/deleteFaq/hooks'
import Alert from 'src/shared/components/Alert'
import { useFaqFormData } from './hooks'
import useUpdateFaq from '../../services/updateFaq/hooks'
import { UpdateFaqModel } from '../../services/updateFaq/model'
import { ObjectShape } from 'yup/lib/object'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const { hasDeletePermission, hasUpdatePermission } = getPermission('faq')
const hasUP_DelPermission = hasDeletePermission && hasUpdatePermission
const FaqDrawer: React.FC<Props> = ({ openToast, closeDrawer }) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { mutate } = useCreateFaq(openToast, closeDrawer, openUnAuthAlert)
  const { roleType, langListForign, langListLocal } = React.useContext(CountyRoleType)
  const defalutCounty = roleType === '0' ? 1 : Number(roleType)
  const { id }: { id: string } = useParams()
  const [areaValue, setAreaValue] = React.useState<number | string>(defalutCounty)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const classes = useStyles()
  const tablist = areaValue === 1 ? langListLocal : langListForign
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { mutate: deleteRole } = useDeletingFaq(openToast, closeDrawer, openUnAuthAlert)
  const { mutate: updateRole } = useUpdateFaq(openToast, closeDrawer, openUnAuthAlert)
  const { defaultFormData, defaultFieldType, detailPageFaq } = useFaqFormData(areaValue)
  const { t } = useTranslation()
  const isCreatePage = id === 'create' || id === undefined

  const onSubmit = (data: CreateFaqModel | UpdateFaqModel) => {
    if (isCreatePage) {
      const request = {
        country_type: areaValue.toString(),
        faq_sections: data.faq_sections,
      }
      mutate(request as CreateFaqModel)
    } else {
      const request = {
        id: id,
        faq_sections: data.faq_sections,
      }
      updateRole(request as UpdateFaqModel)
    }
  }

  const validationSchema: ObjectShape = { section_content: Yup.string().ensure().required('Name is required') }

  const { handleSubmit, register, fields, append, remove, control, errors } = useFormConfig(defaultFormData, validationSchema)
  const formErrors = errors as FormErrors

  const confirmDelete = () => {
    openAlert({
      title: t('alert.section6'),
      content: t('alert.section5'),
      isDicidedMode: true,
      onConfirm: () => {
        deleteRole({ id: id, country_type: areaValue })
        closeAlert()
      },
    })
  }

  React.useEffect(() => {
    if (!isCreatePage && !!detailPageFaq) {
      setAreaValue(parseInt(detailPageFaq?.country_type))
    }
  }, [detailPageFaq])

  return (
    <InfoDrawer.Container
      editHistory={
        isCreatePage
          ? undefined
          : {
              updated_time: detailPageFaq?.updated_time,
              updated_user: detailPageFaq?.updated_user,
              created_time: detailPageFaq?.created_time,
              created_user: detailPageFaq?.created_user,
            }
      }
      title={isCreatePage ? t('title.section2') : hasUpdatePermission ? t('title.section3') : t('title.section4')}
      open
      onClose={closeDrawer}
      width='100%'
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

          <FormContent
            defaultFieldType={defaultFieldType}
            list={tablist as SysLanguageItem[]}
            control={control}
            areaValue={areaValue}
            setAreaValue={setAreaValue}
            register={register}
            fields={fields}
            append={append}
            remove={remove}
            errors={formErrors}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            disabled={isCreatePage ? false : !hasUP_DelPermission}
            radioButtonDisabled={!isCreatePage}
          />
        </InfoDrawer.Content>
        {(isCreatePage || hasUpdatePermission) && (
          <InfoDrawer.Footer>
            <Box display='flex' justifyContent='space-between'>
              <div>
                {hasDeletePermission && !isCreatePage && (
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
              <div>
                <Button onClick={closeDrawer} width={83} height={40} isWhiteButton fullWidth={false} type='button'>
                  {t('button.cancel')}
                </Button>
                <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit' onClick={() => setIsSubmitted(true)}>
                  {t('button.save')}
                </Button>
              </div>
            </Box>
          </InfoDrawer.Footer>
        )}
      </form>
    </InfoDrawer.Container>
  )
}

export default FaqDrawer
