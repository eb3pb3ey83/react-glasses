import React from 'react'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import BlueFormContainer from 'src/shared/components/BlueFormContainer'
import InputField from 'src/shared/components/BlueFormContainer/InputField'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import AddContentBtn from '../AddContentBtn'
import LabelWithDelete from 'src/shared/components/BlueFormContainer/LabelWithDelete'
import FileUploader from 'src/shared/components/FileUploader'
import YoutubeSharing from 'src/shared/components/YoutubeSharing'
import Editor from 'src/shared/components/Editor'
import { payLoad, Props } from './model'
import { removeTag } from 'src/utils/removeTags'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const FormContent: React.FC<Props> = ({ allCreateState, content }) => {
  const { t } = useTranslation()

  const radiosArea = React.useMemo(
    () => [
      { value: 1, label: t('select.national') },
      { value: 2, label: t('select.international') },
    ],
    [],
  )

  const {
    contentEmpty,
    setContentEmpty,
    areaValue,
    setAreaValue,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    hasUpdatePermission,
    openAlert,
    closeAlert,
  } = allCreateState

  const classes = useStyles({ hasUpdatePermission })

  const onTitleChange = (tval: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ lang: langTab as number, act: 'update', type: 0, sort: 0, payload: { value: tval.target.value, error: false } })
    setContentEmpty({ 1: {}, 2: {} })
  }

  const onUploadCoverSuccess = (sort: number) => {
    return (id: null | number, src: string) => {
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 2, sort, payload: { id, src, error: { empty: false, limit: false } } })
    }
  }

  const onUploadConverError = (sort: number) => {
    return () => {
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 2, sort, payload: { id: null, src: '', error: { empty: false, limit: true } } })
    }
  }

  const onURLChange = (sort: number) => {
    return (url: string, isError: boolean) => {
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 3, sort, payload: { url, error: isError } })
    }
  }

  const onEditorChange = (value: { data: string; id: number }) => {
    setContentEmpty({ 1: {}, 2: {} })
    dispatch({ lang: langTab as number, act: 'update', type: 1, sort: value.id, payload: { value: value.data, error: false } })
  }

  const doDelete = (sort: number) => {
    openAlert({
      title: t('alert.section1'),
      content: t('alert.section2'),
      isDicidedMode: true,
      onConfirm: () => {
        dispatch({ act: 'delete', sort, lang: langTab as number })
        closeAlert()
      },
    })
  }

  const addBlockByType = (type: number, sort: number, payload: payLoad) => {
    switch (type) {
      case 0:
        return (
          <React.Fragment key={sort}>
            <InputField
              onChange={onTitleChange}
              value={removeTag(payload.value as string)}
              label={t('title.title')}
              disabled
              placeholder={t('blueForm.titlePlaceholder')}
              error={payload.error as boolean}
              errorMessage={t('validation.required')}
              errormessageclassname={classes.errorMessage}
            />
            <div className={classes.label} style={{ marginBottom: '8px', marginTop: '24px' }}>
              {t('blueForm.content')}
              {Object.keys(contentEmpty[areaValue as number]).length > 0 && <span className={classes.labelError}>{t('contact.section1')}</span>}
            </div>
          </React.Fragment>
        )
      case 1:
        return (
          <div className={`${classes.blockWithDelete} withMarginBot`} tabIndex={-1} key={sort}>
            {/* <LabelWithDelete text='文字' onClick={() => doDelete(sort)} /> */}
            <Editor
              style={{ opacity: !hasUpdatePermission ? '0.5' : '1' }}
              readonly={!hasUpdatePermission}
              data={payload.value as string}
              id={sort}
              onRemove={() => doDelete(sort)}
              onDataSet={onEditorChange}
            />
          </div>
        )

      case 2:
        return (
          <div className={`${classes.blockWithDelete} withMarginBot`} tabIndex={-1} key={sort}>
            {sort !== 1 && hasUpdatePermission && <LabelWithDelete text={t('select.image')} onClick={() => doDelete(sort)} />}
            <div className={classes.coverUpload} style={{ marginTop: sort === 1 ? '24px' : 0, marginBottom: sort !== 1 ? '24px' : 0 }}>
              <FileUploader
                readonly={!hasUpdatePermission}
                width={sort === 1 ? undefined : '800px'}
                height={sort === 1 ? undefined : '400px'}
                src={payload.src as string}
                onSuccess={onUploadCoverSuccess(sort)}
                onError={onUploadConverError(sort)}
                error={
                  (typeof payload.error === 'boolean' ? payload.error : payload.error.limit) ||
                  (typeof payload.error === 'boolean' ? payload.error : payload.error.empty)
                }
              />
              {sort !== 1 &&
                (typeof payload.error === 'boolean'
                  ? payload.error
                  : payload.error.limit && (
                      <span className={classes.labelError} style={{ marginTop: '8px' }}>
                        {t('image')}
                      </span>
                    ))}
              <div className={classes.helperText}>
                <div className='firstLine'>
                  <InfoIcon />
                  {t('img.specifications')}
                </div>
                <div className='secondLine'>
                  {t('img.dimension')}：256x 192｜{t('img.type')}：jpg, png, gif｜{t('img.size')}：5 M｜{t('img.name')}：{t('img.symbols')} (e.g. $,
                  &)
                </div>
              </div>
              {sort === 1 && (
                <>
                  <div className={classes.label} style={{ marginBottom: '8px', marginTop: '24px' }}>
                    內文{Object.keys(contentEmpty[areaValue as number]).length > 0 && <span className={classes.labelError}>請新增內文</span>}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className={`${classes.blockWithDelete} withMarginBot`} tabIndex={-1} key={sort}>
            {hasUpdatePermission && <LabelWithDelete text={t('select.video')} onClick={() => doDelete(sort)} />}
            <YoutubeSharing readonly={!hasUpdatePermission} url={payload.url as string} onURLChange={onURLChange(sort)} />
          </div>
        )
      default:
        return
    }
  }

  const onCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCountyDisabled && setAreaValue) setAreaValue(parseInt(e.target.value))
    setLangTab(0)
  }

  return (
    <div className={classes.contentContainer}>
      <RadioGroupWithLabel
        classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
        radios={radiosArea}
        value={areaValue}
        label={t('title.area')}
        disabled={isCountyDisabled}
        onChange={onCountyChange}
      />
      <BlueFormContainer className={classes.blueContainer} languageList={langList} value={langTab} onChange={setLangTab}>
        <div className='langDiffContent'>
          {content &&
            content[langTab as number].map((contentIt) => {
              return addBlockByType(Number(contentIt.type), contentIt.sort, contentIt.payload)
            })}
        </div>
        {content && <AddContentBtn readonly={!hasUpdatePermission} content={content} dispatch={dispatch} langTab={langTab} />}
      </BlueFormContainer>
    </div>
  )
}

export default FormContent
