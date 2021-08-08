import { MenuItem } from '@material-ui/core'
import { Select } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowDown } from 'src/assets/icon/arrow-down-icon.svg'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'

interface Props {
  [key: string]: unknown
}

const LanguageButton: React.FC<Props> = ({ ...restProps }) => {
  const { language, setLanguage } = useLanguage()
  const { i18n } = useTranslation()
  const [anchor, setAnchor] = React.useState<Element>()
  React.useEffect(() => {
    //解popper位置異常的問題, 需在languageButton 的元件加一個classname langBtn
    //ex:  <LanguageButton className={`${classes.languageButton} langBtn`} />
    const anchorRef = document.getElementsByClassName('langBtn')[0]
    setAnchor(anchorRef)
  }, [])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newLanguage = event.target.value as string

    window.localStorage.setItem('language', newLanguage)
    setLanguage && setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Select
      value={language}
      onChange={handleChange}
      IconComponent={ArrowDown}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        MenuListProps: { style: { width: '100px' } },
        getContentAnchorEl: null,
        anchorEl: anchor,
      }}
      {...restProps}
    >
      <MenuItem value='zh-TW'>繁體中文</MenuItem>
      <MenuItem value='en-US'>English</MenuItem>
    </Select>
  )
}

export default LanguageButton
