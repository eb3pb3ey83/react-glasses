const removeTagRegex = /(<([^>]+)>)/gi

export const removeTag = (value: string) => {
  return value.replace(removeTagRegex, '')
}
