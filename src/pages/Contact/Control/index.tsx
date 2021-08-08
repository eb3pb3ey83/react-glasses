import React from 'react'
import { Box } from '@material-ui/core'
import { Props } from './model'
import { makeStyles } from '@material-ui/core'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import { useTranslation } from 'react-i18next'
import CountryRoleTypeSelect from 'src/shared/components/CountryRoleTypeSelect'

const useStyles = makeStyles({
  search: {
    width: '280px',
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
})

const Control: React.FC<Props> = ({ searchRoleType, searchKeyword }) => {
  const { t } = useTranslation()
  const keywordName = 'contactKeywords'
  const classes = useStyles()

  const onSelectChange = (event: React.ChangeEvent<{ value: '1' | '2' }>) => {
    searchRoleType(event.target.value)
  }

  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  let currentKeyWord: string[] | [] = []

  if (keyWordFromStorage) {
    currentKeyWord = JSON.parse(keyWordFromStorage) as string[]
  }

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <SingleAutoComplete
        pageKeywordName={keywordName}
        className={classes.search}
        placeholder={t('contact.placeholder')}
        onSubmit={onInputSearch}
        options={currentKeyWord}
      />
      <CountryRoleTypeSelect onSelectChange={onSelectChange} />
    </Box>
  )
}

export default Control
