import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import FormikField from 'src/shared/components/FormikField'
import FormikTabForm from 'src/shared/components/FormikTabForm'
import FormikMultipleFileUploader from 'src/shared/components/FormikMultipleFileUploader'
import InfoDrawer from 'src/shared/components/InfoDrawer'
import Loading from 'src/shared/components/Loading'
import { useAreaValue } from 'src/shared/hooks/useAreaValue'
import Box from '@material-ui/core/Box'
import Button from 'src/shared/components/Button'
import FormikTextarea from 'src/shared/components/FormikTextarea'
import FormikEditor from 'src/shared/components/FormikEditor'
import FormikRadio from 'src/shared/components/FormikRadio'
import { useAreaRadio, usePromoteRadio, useStatusRadio } from '../../utils/SharedHooks'
import LabelTitle from 'src/shared/components/BlueTable/LabelTitle'
import { useGetBrand, useGetPackageUnit } from '../../services/getSystemData/hooks'
import Select from 'src/shared/components/FormikSelect'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import FormikNumberInputWithBtn from 'src/shared/components/FormikNumberInputWithBtn'
import ERPSelector from '../ERPSelector'
import { Props } from './model'
import { useDiscardEdit } from 'src/utils/discardEdit'
import { useAlertMachine } from 'src/shared/machine/alertMachine/hooks'
import { useHistory, useParams } from 'react-router'
import Alert from 'src/shared/components/Alert'
import { useCreateOtherProduct } from '../../services/createOtherProduct/hooks'
import { RequestProps } from '../../services/createOtherProduct/model'
import { TableContext } from 'src/shared/components/TableProvider/model'
import Form from 'src/shared/components/FormikForm/Form'
import { useProductValidate } from 'src/utils/validator/formikValidate'
import Setting from './components/Setting'

const ProductForm = ({ isCreate = false, type_no }: Props) => {
  const [isGlassesPage, setIsGlassesPage] = React.useState(false)
  const { language: userLanguage } = useLanguage()
  const { formList } = useAreaValue()
  const { productValidate } = useProductValidate()
  const { t } = useTranslation()
  const history = useHistory()
  const { openToastSingle } = React.useContext(TableContext)
  const { product_id } = useParams<{ product_id?: string }>()
  const { areaRadios } = useAreaRadio()
  const { statusRadios } = useStatusRadio()
  const { promoteRadios } = usePromoteRadio()
  const { data: packUnitData } = useGetPackageUnit()
  const { data: brandData } = useGetBrand()
  const { openAlert, closeAlert, isAlertOpen, alertMessage } = useAlertMachine()
  const { doFormCancel } = useDiscardEdit(openAlert, closeAlert, closeDrawer)
  const [isOpen, setIsOpen] = React.useState(true)
  const { mutate } = useCreateOtherProduct()

  const packUnitItems = packUnitData?.data.result_data.map((ui) => ({
    label: userLanguage === 'zh-TW' ? ui.code_name_ch : ui.code_name_en,
    value: ui.code_no,
  }))
  const brandItems = brandData?.data.result_data.map((bd) => ({
    label: userLanguage === 'zh-TW' ? bd.code_name_ch : bd.code_name_en,
    value: bd.code_no,
  }))

  function closeDrawer() {
    setIsOpen(false)
    return history.push(`/pages/productManagement/${product_id}`)
  }
  React.useEffect(() => {
    if (!type_no) return

    const glassesTypeNoList = ['O', 'R', 'S', 'M', 'H']
    const isGlassesType = glassesTypeNoList.some((value) => value === type_no.slice(0, 1))

    isGlassesType ? setIsGlassesPage(true) : setIsGlassesPage(false)
  }, [type_no])

  const components =
    formList &&
    formList.map((language, index) => ({
      ...language,
      jsx: (
        <>
          <FormikField name={`infos.${index}.product_name`} placeholder={t('product.productNamePlaceholder')} label={t('product.productName')} />
          <FormikTextarea name={`infos.${index}.product_info`} placeholder={t('product.productInfoPlaceholder')} label={t('product.productInfo')} />
          <FormikTextarea
            name={`infos.${index}.market_contact`}
            placeholder={t('product.marketContactPlaceholder')}
            label={t('product.marketContact')}
          />
          <FormikMultipleFileUploader parentFieldName='infos' fieldName='images' label={t('product.images')} index={index} hasUpdatePermission />
          <FormikEditor label={t('product.productContent')} name={`infos.${index}.product_contact`} />
        </>
      ),
    }))

  const infoValues: RequestProps = {
    country_type: '1',
    type_no,
    status: '1',
    market_type: '0',
    package_unit: '',
    brand_code: '',
    product_no: '',
    package_amt: 1,
    infos: formList
      ? formList.map((language) => ({
          ...language,
          product_name: '',
          product_info: '',
          market_contact: '',
          product_contact: '',
          images: [0],
        }))
      : [],
  }

  const [isProductNoErr, setIsProductNoErr] = React.useState(false)

  const onSubmit = (newData: RequestProps, formikHelper: FormikHelpers<RequestProps>) => {
    console.log('data :>> ', newData)
    if (isCreate) {
      mutate(newData, {
        onSuccess: () => {
          formikHelper.setSubmitting(false)
          closeDrawer()
          openToastSingle && openToastSingle(t('product.createSuccess'), false)
          formikHelper.setSubmitting(false)
        },
        onError: (error) => {
          if (error.response.status === 400 && error.response.data.return_message.email) {
            setIsProductNoErr(true)
            formikHelper.validateForm()
            openToastSingle && openToastSingle(t('toast.formhasErrors'), true)
            formikHelper.setSubmitting(false)
          } else if (error.response.status !== 401 && error.response.status !== 403) {
            formikHelper.setSubmitting(false)
            openAlert({
              title: t('alert.internetErrorTitle'),
              content: t('alert.internetErrorDes'),
              isDicidedMode: false,
              confirmBtnLabel: t('alert.internetErrorBtn'),
            })
          }
        },
      })
    }

    formikHelper.setSubmitting(false)
  }

  const [isFormError, setIsFormError] = React.useState(false)

  if (!formList) {
    return <Loading />
  }

  return components ? (
    <InfoDrawer.Container title={'新增'} open={isOpen} onClose={closeDrawer} width='700px'>
      <Formik
        onSubmit={onSubmit}
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={isFormError ? true : false}
        initialValues={infoValues}
        // validationSchema={validationSchema}
        validate={(val) => productValidate(val, { pNDupli: isProductNoErr })}
      >
        {(props) => (
          <Form<RequestProps> setIsFormError={setIsFormError} {...props}>
            <Alert
              isDicidedMode={alertMessage.isDicidedMode as boolean}
              onConfirm={alertMessage.onConfirm}
              onClose={closeAlert}
              open={isAlertOpen}
              confirmBtnLabel={alertMessage.confirmBtnLabel}
              title={alertMessage.title}
              content={alertMessage.content}
            />
            <InfoDrawer.Content>
              <LabelTitle label={t('product.formLabelBasicInfo')} />
              <FormikRadio label={t('area.area')} radios={areaRadios} name='country_type' />
              <FormikRadio label={t('company.openFlag')} radios={statusRadios} name='status' />
              <FormikRadio label={t('product.glassesTableHeadPromote')} radios={promoteRadios} name='market_type' />
              <Select
                inputProps={{ placeholder: t('product.PUSelectPlaceholder'), style: { color: 'transparent' } }}
                width='100%'
                name='package_unit'
                selectItems={packUnitItems}
                label={t('product.PULabel')}
              />
              <FormikNumberInputWithBtn label={t('product.PKamtLabel')} name='package_amt' />
              <Select
                inputProps={{ placeholder: t('product.BdSelectPlaceholder'), style: { color: 'transparent' } }}
                width='100%'
                name='brand_code'
                selectItems={brandItems}
                label={t('product.brandLabel')}
              />
              <ERPSelector
                label={t('product.resourceLabel')}
                disabled={!isCreate}
                isCreate={isCreate}
                placeholder={t('product.productResourceInfoPlaceholder')}
              />
              <LabelTitle label={t('product.formLabelDescription')} />
              <FormikTabForm tabName='language' components={components} fieldName='infos' />
              {isGlassesPage && <Setting />}
            </InfoDrawer.Content>
            <InfoDrawer.Footer>
              <Box display='flex' justifyContent='flex-end'>
                {
                  <div>
                    <Button
                      style={{ marginRight: '16px', width: '100px', height: '40px' }}
                      onClick={() => doFormCancel(props.dirty)}
                      isWhiteButton
                      fullWidth={false}
                      type='button'
                    >
                      {t('button.cancel')}
                    </Button>
                    <Button width={100} height={40} fullWidth={false} type={props.isSubmitting ? 'button' : 'submit'}>
                      {isCreate ? t('button.addbutton') : t('button.save')}
                    </Button>
                  </div>
                }
              </Box>
            </InfoDrawer.Footer>
          </Form>
        )}
      </Formik>
    </InfoDrawer.Container>
  ) : (
    <Loading />
  )
}

export default ProductForm
