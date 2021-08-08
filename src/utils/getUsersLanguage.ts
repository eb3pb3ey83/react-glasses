const getUsersLanguage = () => {
  let lang: string | null = 'en-US'
  if (!!window) {
    lang = window.localStorage.getItem('language')
  }
  return lang
}
export default getUsersLanguage
