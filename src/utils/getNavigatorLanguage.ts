const getNavigatorLanguage = () => {
  const isEnglish = navigator.language.includes('en')

  return isEnglish ? 'en-US' : navigator.language
}

export default getNavigatorLanguage
