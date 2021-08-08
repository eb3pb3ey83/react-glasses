import React from 'react'
import RadioGroupWithLabel from 'src/shared/components/RadioGroupWithLabel'
import DateTimePicker from 'src/shared/components/DateTimePicker'
import DateTimeRangePicker from 'src/shared/components/DateTimeRangePicker'
import BlueFormContainer from 'src/shared/components/BlueFormContainer'
import InputField from 'src/shared/components/BlueFormContainer/InputField'
import { ReactComponent as WarningIcon } from 'src/assets/icon/warning-icon.svg'
import { ReactComponent as InfoIcon } from 'src/assets/icon/info.svg'
import AddContentBtn from '../AddContentBtn'
import LabelWithDelete from 'src/shared/components/BlueFormContainer/LabelWithDelete'
import FileUploader from 'src/shared/components/FileUploader'
import YoutubeSharing from 'src/shared/components/YoutubeSharing'
import Editor from 'src/shared/components/Editor'
import { payLoad, Props } from './model'
import { useTranslation } from 'react-i18next'
import useStyles from './useStyles'

const FormContent: React.FC<Props> = ({ allCreateState, content, isCreate = false }) => {
  const { t } = useTranslation()

  const radiosArea = React.useMemo(
    () => [
      { value: 1, label: t('select.national') },
      { value: 2, label: t('select.international') },
    ],
    [],
  )

  const radiosTime = React.useMemo(
    () => [
      { value: 1, label: t('date.endDateIsNotLimited') },
      { value: 2, label: t('date.specificTimeSlots') },
    ],
    [],
  )

  const {
    contentEmpty,
    setContentEmpty,
    areaValue,
    setAreaValue,
    timeValue,
    setTimeValue,
    selectedDay,
    pickTime,
    setSelectedDay,
    setPickTime,
    langTab,
    setLangTab,
    dispatch,
    langList,
    isCountyDisabled,
    hasDeletePermission,
    hasUpdatePermission,
    openAlert,
    closeAlert,
    setIsdirty,
  } = allCreateState

  const classes = useStyles({ hasUpdatePermission: hasUpdatePermission || isCreate })

  const hasEditPermission = hasDeletePermission && hasUpdatePermission

  const onTitleChange = (tval: React.ChangeEvent<HTMLInputElement>) => {
    setIsdirty && setIsdirty(true)
    dispatch({ lang: langTab as number, act: 'update', type: 0, sort: 0, payload: { value: tval.target.value, error: false } })
    setContentEmpty({ 1: {}, 2: {} })
  }

  const onUploadCoverSuccess = (sort: number) => {
    return (id: null | number, src: string) => {
      setIsdirty && setIsdirty(true)
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 2, sort, payload: { id, src, error: { empty: false, limit: false } } })
    }
  }

  const onUploadConverError = (sort: number) => {
    return () => {
      setIsdirty && setIsdirty(true)
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 2, sort, payload: { id: null, src: '', error: { empty: false, limit: true } } })
    }
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

  const onURLChange = (sort: number, orgUrl: string) => {
    return (url: string, isError: boolean) => {
      if (orgUrl !== url) {
        setIsdirty && setIsdirty(true)
      }
      setContentEmpty({ 1: {}, 2: {} })
      return dispatch({ lang: langTab as number, act: 'update', type: 3, sort, payload: { url, error: isError } })
    }
  }

  const onEditorChange = (value: { data: string; id: number }) => {
    setIsdirty && setIsdirty(true)
    setContentEmpty({ 1: {}, 2: {} })
    dispatch({ lang: langTab as number, act: 'update', type: 1, sort: value.id, payload: { value: value.data, error: false } })
  }

  const addBlockByType = (type: number, sort: number, payload: payLoad) => {
    switch (type) {
      case 0:
        return (
          <InputField
            disabled={isCreate ? false : !hasEditPermission}
            key={sort}
            onChange={onTitleChange}
            value={payload.value as string | number}
            label={t('blueForm.title')}
            placeholder={t('blueForm.titlePlaceholder')}
            error={payload.error as boolean}
            errorMessage={t('validation.required')}
            errormessageclassname={classes.errorMessage}
          />
        )
      case 1:
        return (
          <div className={`${classes.blockWithDelete} ${sort !== 1 ? 'withMarginBot' : ''}`} tabIndex={-1} key={sort}>
            <Editor
              style={{ opacity: !hasUpdatePermission && !isCreate ? '0.5' : '1' }}
              readonly={isCreate ? false : !hasEditPermission}
              data={payload.value as string}
              id={sort}
              onRemove={() => doDelete(sort)}
              onDataSet={onEditorChange}
            />
          </div>
        )

      case 2:
        return (
          <div className={`${classes.blockWithDelete} ${sort !== 1 ? 'withMarginBot' : ''}`} tabIndex={-1} key={sort}>
            {(isCreate ? true : hasEditPermission) && sort !== 1 && <LabelWithDelete text={t('select.image')} onClick={() => doDelete(sort)} />}
            <div className={classes.coverUpload} style={{ marginTop: sort === 1 ? '24px' : 0, marginBottom: sort !== 1 ? '24px' : 0 }}>
              {sort === 1 && (
                <div className={classes.label} style={{ marginBottom: '8px' }}>
                  {t('blueForm.coverImage')}
                  {typeof payload.error === 'boolean'
                    ? payload.error
                    : payload.error.limit && (
                        <span className={classes.labelError}>
                          <WarningIcon />
                          {t('image')}
                        </span>
                      )}
                  {typeof payload.error === 'boolean'
                    ? payload.error
                    : payload.error.empty && (
                        <span className={classes.labelError}>
                          <WarningIcon />
                          {t('img.pleaseAdd')}
                        </span>
                      )}
                </div>
              )}
              <FileUploader
                readonly={isCreate ? false : !hasEditPermission}
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
                  {sort === 1
                    ? `${t('img.dimension')}：256x 192｜${t('img.type')}：jpg, png, gif｜${t('img.size')}：5 M｜${t('img.name')}：${t(
                        'img.symbols',
                      )} (e.g. $, &)`
                    : `${t('img.type')}：jpg, png, gif｜${t('img.size')}：5 M｜${t('img.name')}：${t('img.symbols')} (e.g. $, &)`}
                </div>
              </div>
              {sort === 1 && (
                <>
                  <div className={classes.label} style={{ marginBottom: '8px', marginTop: '24px' }}>
                    {t('blueForm.content')}
                    {Object.keys(contentEmpty[areaValue as number]).length > 0 && <span className={classes.labelError}>請新增內文</span>}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      case 3:
        return (
          <div className={`${classes.blockWithDelete} ${sort !== 1 ? 'withMarginBot' : ''}`} tabIndex={-1} key={sort}>
            {(isCreate ? true : hasEditPermission) && <LabelWithDelete text={t('select.video')} onClick={() => doDelete(sort)} />}
            <YoutubeSharing
              readonly={isCreate ? false : !hasEditPermission}
              url={payload.url as string}
              onURLChange={onURLChange(sort, payload.url as string)}
            />
          </div>
        )
      default:
        return
    }
  }

  const onSingleDateChange = (value: Date) => {
    setIsdirty && setIsdirty(true)
    setSelectedDay({ from: value, to: undefined, error: { ...selectedDay.error, from: false } })
  }

  const onSingleTimeChange = (value: string | Date) => {
    setIsdirty && setIsdirty(true)
    setPickTime({ from: value, to: '', error: { ...pickTime.error, from: false } })
  }

  const onDatesChange = (value: Date, type: 'from' | 'to') => {
    setIsdirty && setIsdirty(true)
    switch (type) {
      case 'from':
        return setSelectedDay({ ...selectedDay, from: value, error: { ...selectedDay.error, from: false } })
      case 'to':
        return setSelectedDay({ ...selectedDay, to: value, error: { ...selectedDay.error, to: false } })
      default:
        return
    }
  }

  const onTimesChange = (value: Date | string, type: 'from' | 'to') => {
    setIsdirty && setIsdirty(true)
    switch (type) {
      case 'from':
        return setPickTime({ ...pickTime, from: value, error: { ...pickTime.error, from: false } })
      case 'to':
        return setPickTime({ ...pickTime, to: value, error: { ...pickTime.error, to: false } })
      default:
        return
    }
  }

  const onCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsdirty && setIsdirty(true)
    if (!isCountyDisabled && setAreaValue) setAreaValue(parseInt(e.target.value))
    setLangTab(0)
  }

  return (
    <div className={classes.contentContainer}>
      <RadioGroupWithLabel
        classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
        radios={radiosArea}
        value={areaValue}
        label={t('area.area')}
        disabled={isCreate ? false : !hasEditPermission}
        readOnly={isCountyDisabled}
        onChange={onCountyChange}
      />
      <div className={classes.postTime}>
        <RadioGroupWithLabel
          label={t('news.releaseTime')}
          className={classes.timeRadioGroup}
          classNames={{ label: classes.label, radioGroup: classes.radioGroup, radio: classes.radioWithLabel }}
          radios={radiosTime}
          value={timeValue}
          disabled={isCreate ? !isCreate : !hasEditPermission}
          onChange={(e) => setTimeValue(parseInt(e.target.value))}
        />
        {timeValue === 1 ? (
          <div style={{ display: 'flex' }}>
            <DateTimePicker
              isDateDisabled={isCreate ? !isCreate : !hasEditPermission}
              isTimeDisabled={isCreate ? !isCreate : !hasEditPermission}
              isDateError={selectedDay.error.from}
              isTimeError={pickTime.error.from}
              valueDate={selectedDay?.from}
              onDateChange={onSingleDateChange}
              valueTime={pickTime.from}
              onTimeChange={onSingleTimeChange}
            />
          </div>
        ) : (
          <DateTimeRangePicker
            timeDisabled={{ from: isCreate ? !isCreate : !hasEditPermission, to: isCreate ? !isCreate : !hasEditPermission }}
            dateDisabled={{ from: isCreate ? !isCreate : !hasEditPermission, to: isCreate ? !isCreate : !hasEditPermission }}
            dateError={selectedDay.error}
            timeError={pickTime.error}
            onDatesChange={onDatesChange}
            onTimesChange={onTimesChange}
            fromTime={pickTime.from}
            toTime={pickTime.to}
            fromDate={selectedDay?.from}
            toDate={selectedDay?.to}
          />
        )}
      </div>
      <BlueFormContainer languageList={langList} value={langTab} onChange={setLangTab}>
        <div className='langDiffContent'>
          {content &&
            content[langTab as number].map((contentIt) => {
              return addBlockByType(Number(contentIt.type), contentIt.sort, contentIt.payload)
            })}
        </div>
        {(isCreate ? true : hasEditPermission) && content && (
          <AddContentBtn setIsdirty={setIsdirty} content={content} dispatch={dispatch} langTab={langTab} />
        )}
      </BlueFormContainer>
    </div>
  )
}

export default FormContent
