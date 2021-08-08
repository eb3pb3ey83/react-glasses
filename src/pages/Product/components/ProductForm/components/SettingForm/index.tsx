import { Box } from '@material-ui/core'
import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
// import useGetProductSetting from 'src/pages/Product/services/getProductSetting/hooks'
import Button from 'src/shared/components/Button'
import Form from 'src/shared/components/FormikForm/Form'
import InfoDialog from 'src/shared/components/InfoDialog'
import SettingInfo from '../SettingInfo'
import { Props } from './model'
import useStyles from './useStyles'

const SettingForm: React.FC<Props> = ({ closeDialog }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [isFormError, setIsFormError] = React.useState(false)

  const onSubmit = (submitData: Record<string, unknown>) => {
    console.log('submit', submitData)
  }

  const initilaValues = {}

  return (
    <>
      <InfoDialog.Container title={t('account.addAccount')} open onClose={closeDialog}>
        <Formik
          onSubmit={onSubmit}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={isFormError ? true : false}
          initialValues={initilaValues}
          // validationSchema={validationSchema}
        >
          {(props) => (
            <Form {...props} setIsFormError={setIsFormError}>
              <InfoDialog.Content>
                <SettingInfo />
              </InfoDialog.Content>
              <InfoDialog.Footer>
                <Box display='flex' justifyContent='flex-end'>
                  <Box>
                    <Button onClick={closeDialog} width={113} height={40} isWhiteButton fullWidth={false} type='button'>
                      {t('button.cancel')}
                    </Button>
                    <Button className={classes.saveButton} width={113} height={40} fullWidth={false} type='submit'>
                      {t('button.addbutton')}
                    </Button>
                  </Box>
                </Box>
              </InfoDialog.Footer>
            </Form>
          )}
        </Formik>
      </InfoDialog.Container>
    </>
  )
}

export default SettingForm
