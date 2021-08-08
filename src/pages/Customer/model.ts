export enum CustomerUrl {
  rootUrl = '/pages/customermanagement/',
  companyCreatorUrl = '/pages/customermanagement/company/create',
  companyEditorUrl = '/pages/customermanagement/company/:companyId/edit/',
  companyChildUrl = '/pages/customermanagement/company/:companyId',
  lv1AccountCreatorUrl = '/pages/customermanagement/company/:companyId/account/create',
  lv1AccountEditorUrl = '/pages/customermanagement/company/:companyId/account/edit/:accountid',
  lv2AccountCreatorUrl = '/pages/customermanagement/company/:companyId/dealer/:dealerid/create',
  lv2AccountEditorUrl = '/pages/customermanagement/company/:companyId/dealer/:dealerid/edit/:accountid',
  dealerUrl = '/pages/customermanagement/company/:companyId/dealer/:dealerid',
  dealerEditUrl = '/pages/customermanagement/company/:companyId/dealer/:dealerid/edit',
  dealerCreateUrl = '/pages/customermanagement/company/:companyId/dealerModification/create',
}
