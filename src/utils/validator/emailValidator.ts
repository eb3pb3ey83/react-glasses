import * as yup from 'yup'

export default (emailMessage = '電子郵件格式不符合', requiredMessage = '此為必填欄位', duplicatedMessage = '電子郵件地址已重複') =>
  yup
    .string()
    .required(requiredMessage)
    .matches(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/, emailMessage)
    .test('email', duplicatedMessage, (_value, context) => {
      if (context.options.context && context.options.context.emailDupli === true) {
        return false
      } else {
        return true
      }
    })
