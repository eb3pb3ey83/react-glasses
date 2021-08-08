enum apiKey {
  googleSpreadSheet = 'googleSpreadSheet',
  getResetPasswordToken = 'getResetPasswordToken',
  patchResetPassword = ' patchResetPassword',
  login = 'login',
  louout = 'logout',
  role = 'role',
  account = 'account',
  dept = 'dept',

  // role
  roleInfo = 'roleInfo',
  crateRole = 'crateRole',
  updateRole = 'updateRole',
  deleteRole = 'deleteRole',

  // account
  accountInfo = 'accountInfo',
  createAccount = 'createAccount',
  updateAccount = 'updateAccount',
  deleteAccount = 'deleteAccount',
  sendOpenAccountEmail = 'sendOpenAccountEmail',
  menuButton = 'menuButton',
  getMenuList = 'getMenuList',

  // faq
  getFaqList = 'getFaqList',
  createFaq = 'createFaq',
  sortFaq = 'sortFaq',
  detailPageFaq = 'detailPageFaq',
  deleteFaq = 'deleteFaq',
  updateFaq = 'updateFaq',

  // Banner
  getBanner = 'getBanner',
  getbannerInfo = 'getBannerInfo',
  updateBannerInfo = 'updateBannerInfo',
  deleteBannerInfo = 'deleteBannerInfo',
  sortHomeBanner = 'sortHomeBanner',
  sortLoginBanner = 'sortLoginBanner',
  // news
  uploadImg = 'uploadImg',
  sysLanguage = 'sysLanguage',
  news = 'news',
  createNews = 'createNews',
  getNewsInfo = 'getNewsInfo',
  updateNews = 'updateNews',
  deleteNews = 'deleteNews',
  getOthers = 'getOthers',

  // contact
  getContact = 'getContact',
  getOtherDetail = 'getOtherDetail',
  updateOtherDetail = 'updateOtherDetail',
  getMainBanner = 'getMainBanner',
  getMainBannerInfo = 'getMainBannerInfo',
  createMainBanner = 'createMainBanner',
  editMainBanner = 'editMainBanner',
  detailPageContact = 'detailPageContact',
  createContact = 'createContact',
  deleteContact = 'deleteContact',
  updateContact = 'updateContact',

  //customer
  getCompany = 'getCompany',
  getCompanyDetail = 'getCompanyDetail',
  getERPCompany = 'getERPCompany',
  getCustomer = 'getCustomer',
  getCustomerDetal = 'getCustomerDetal',
  getDealer = 'getDealer',
  getCustomerPermission = 'getCustomerPermission',
  createCustomer = 'createCustomer',
  createCompanyOrDealer = 'createCompanyOrDealer',
  updateCustomer = 'updateCustomer',
  updateCompanyOrDealer = 'updateCompanyOrDealer',
  //product
  getProductType = 'getProductType',
  sortProductType = 'sortProductType',
  getProductList = 'getProductList',
  systemData = 'systemData',
  getProductERP = 'getProductERP',
  createOtherProduct = 'createOtherProduct',
  getProductSetting = 'getProductSetting',
}

export default apiKey
