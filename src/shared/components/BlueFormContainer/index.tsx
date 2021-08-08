import React from 'react'
import BTab from 'src/shared/components/BlueTabs'
import { Props } from './model'
import { SysLanguageItem } from '../RadioGroupWithLabel/services/SystemLanguage/model'
import Loading from '../Loading'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import useStyles from './useStyles'

const BlueFormContainer: React.FC<Props> = ({ value = 0, onChange, children, languageList, className = '' }) => {
  const classes = useStyles()
  const { language } = useLanguage()

  return (
    <div className={`${classes.blueFormCont} ${className ? className : ''}`}>
      {languageList && (
        <BTab.Tabs value={value} onChange={(_e: unknown, evalue: string | number) => onChange(evalue)}>
          {languageList.map((item: SysLanguageItem, idx) => {
            return <BTab.Tab label={language === 'zh-TW' ? item.code_name_ch : item.code_name_en} value={idx} key={item.id} />
          })}
        </BTab.Tabs>
      )}
      {!languageList && (
        <div className={classes.defaultTabs}>
          <Loading />
        </div>
      )}
      <div className={classes.divider} />
      {children}
    </div>
  )
}

export default BlueFormContainer
