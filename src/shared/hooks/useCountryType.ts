import React from 'react'
import { CountyRoleType } from 'src/pages/model'

export const useCountryType = (searchCountryType: (country_type: '1' | '2') => void) => {
  const { roleType } = React.useContext(CountyRoleType)
  const isInternational = roleType === '2'
  React.useEffect(() => {
    if (!isInternational) return

    searchCountryType('2')
  }, [isInternational])
}
