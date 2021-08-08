import React from 'react'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import BlueFormContainer from 'src/shared/components/BlueFormContainer'
import InputField from 'src/shared/components/BlueFormContainer/InputField'
import { ReactComponent as WarningIcon } from 'src/assets/icon/warning-icon.svg'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import FileUploader from 'src/shared/components/FileUploader'
import { Props } from './model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const FormContent: React.FC<Props> = ({ allCreateState, content, isCreate }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const radiosArea = React.useMemo(
    () => [
      { value: 1, label: t('select.national') },
      { value: 2, label: t('select.international') },
    ],
    [],
  )

  const radiosTarget = React.useMemo(
    () => [
      { value: 1, label: t('homeBanner.originalWindow') },
      { value: 2, label: t('homeBanner.newWindow') },
    ],
    [],
  )

  const {
    areaValue,
    setAreaValue,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    // hasDeletePermission,
    hasUpdatePermission,
  } = allCreateState

  const contenLang = content[langTab as number]

  const onTitleChange = (tval: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ lang: langTab as number, act: 'update', type: 'ban_title', payload: { value: tval.target.value, error: false } })
  }

  const onUploadCoverSuccess = (imgType: string) => {
    return (id: null | number, src: string) => {
      return dispatch({ lang: langTab as number, act: 'update', type: imgType, payload: { id, src, error: { empty: false, limit: false } } })
    }
  }

  const onUploadConverError = (imgType: string) => {
    return () => {
      return dispatch({ lang: langTab as number, act: 'update', type: imgType, payload: { id: null, src: '', error: { empty: false, limit: true } } })
    }
  }

  const onURLChange = (tval: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ lang: langTab as number, act: 'update', type: 'ban_link', payload: { value: tval.target.value, error: false } })
  }

  const onCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCountyDisabled && setAreaValue) setAreaValue(parseInt(e.target.value))
    setLangTab(0)
  }

  const onTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ lang: langTab as number, act: 'update', type: 'ban_target', payload: { value: parseInt(e.target.value), error: false } })
  }

  // const hasEditPermission = hasDeletePermission && hasUpdatePermission

  return (
    <div className={classes.contentContainer}>
      <RadioGroupWithLabel
        classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
        radios={radiosArea}
        value={areaValue}
        label='地區'
        disabled={isCountyDisabled}
        onChange={onCountyChange}
      />
      <BlueFormContainer className={classes.blueFormCont} languageList={langList} value={langTab} onChange={setLangTab}>
        <div className='langDiffContent'>
          <div className={classes.coverUpload} style={{ marginTop: '24px' }}>
            <div className={classes.label} style={{ marginBottom: '8px' }}>
              {t('banner.desktop2')}
              {contenLang &&
                (typeof contenLang[0].payload.error === 'boolean'
                  ? contenLang[0].payload.error
                  : contenLang[0].payload.error.limit && (
                      <span className={classes.labelError}>
                        <WarningIcon />
                        {t('image')}
                      </span>
                    ))}
              {contenLang &&
                (typeof contenLang[0].payload.error === 'boolean'
                  ? contenLang[0].payload.error
                  : contenLang[0].payload.error.empty && (
                      <span className={classes.labelError}>
                        <WarningIcon />
                        {t('banner.desktop3')}
                      </span>
                    ))}
            </div>
            <FileUploader
              readonly={!hasUpdatePermission && !isCreate}
              width='588px'
              height='163px'
              src={contenLang[0].payload.src as string}
              onSuccess={onUploadCoverSuccess('ban_web_img_id')}
              onError={onUploadConverError('ban_web_img_id')}
              error={
                (typeof contenLang[0].payload.error === 'boolean' ? contenLang[0].payload.error : contenLang[0].payload.error.limit) ||
                (typeof contenLang[0].payload.error === 'boolean' ? contenLang[0].payload.error : contenLang[0].payload.error.empty)
              }
            />
            <div className={classes.helperText}>
              <div className='firstLine'>
                <InfoIcon />
                {t('img.specifications')}
              </div>
              <div className='secondLine'>
                {t('img.dimension')}：1024x 270｜{t('img.dimension')}：jpg, png, gif｜{t('img.size')}：5 M｜{t('img.name')}：{t('img.symbols')} (e.g.
                $, &)
              </div>
            </div>
          </div>
          <div className={classes.coverUpload} style={{ marginTop: '24px' }}>
            <div className={classes.label} style={{ marginBottom: '8px' }}>
              {t('banner.desktop4')}
              {contenLang &&
                (typeof contenLang[1].payload.error === 'boolean'
                  ? contenLang[1].payload.error
                  : contenLang[1].payload.error.limit && (
                      <span className={classes.labelError}>
                        <WarningIcon />
                        {t('image')}
                      </span>
                    ))}
              {contenLang &&
                (typeof contenLang[1].payload.error === 'boolean'
                  ? contenLang[1].payload.error
                  : contenLang[1].payload.error.empty && (
                      <span className={classes.labelError}>
                        <WarningIcon />
                        {t('banner.desktop5')}
                      </span>
                    ))}
            </div>
            <FileUploader
              readonly={!hasUpdatePermission && !isCreate}
              width='460px'
              height='390px'
              src={contenLang[1].payload.src as string}
              onSuccess={onUploadCoverSuccess('ban_mobile_img_id')}
              onError={onUploadConverError('ban_mobile_img_id')}
              error={
                (typeof contenLang[1].payload.error === 'boolean' ? contenLang[1].payload.error : contenLang[1].payload.error.limit) ||
                (typeof contenLang[1].payload.error === 'boolean' ? contenLang[1].payload.error : contenLang[1].payload.error.empty)
              }
            />
            <div className={classes.helperText}>
              <div className='firstLine'>
                <InfoIcon />
                {t('img.specifications')}
              </div>
              <div className='secondLine'>
                {t('img.dimension')}：375x 320｜{t('img.type')}：jpg, png, gif｜{t('img.size')}：5 M｜{t('img.name')}：{t('img.symbols')} (e.g. $, &){' '}
              </div>
            </div>
          </div>
          <>
            <InputField
              onChange={onTitleChange}
              value={contenLang[2].payload.value ? (contenLang[2].payload.value as string | number) : ''}
              label={t('blueForm.title')}
              placeholder={t('validation.titleRequired')}
              error={contenLang[2].payload.error as boolean}
              errorMessage={t('validation.required')}
              errormessageclassname={classes.errorMessage}
              disabled={!hasUpdatePermission && !isCreate}
            />
            <div className={classes.helperText}>
              <div className='secondLine'>
                <InfoIcon />
                {t('addBanner.title')}
              </div>
            </div>
          </>
          <InputField
            style={{ marginBottom: '24px' }}
            onChange={onURLChange}
            value={contenLang[3].payload.value ? (contenLang[3].payload.value as string | number) : ''}
            label={t('homeBanner.link')}
            placeholder={t('banner.desktop6')}
            disabled={!hasUpdatePermission && !isCreate}
          />
          <RadioGroupWithLabel
            classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
            radios={radiosTarget}
            value={Number(contenLang[4].payload.value) as number}
            label={t('role.category')}
            onChange={onTargetChange}
            disabled={!hasUpdatePermission && !isCreate}
          />
        </div>
      </BlueFormContainer>
    </div>
  )
}

export default FormContent
