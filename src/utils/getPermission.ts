import authConfig from 'src/utils/authConfig'
export const getPermission = (pageName: string) => {
  const hasDeletePermission = authConfig.getPermissions(`${pageName}:del`)
  const hasUpdatePermission = authConfig.getPermissions(`${pageName}:up`) || authConfig.getPermissions(`${pageName}:upd`)

  return {
    hasQueryPermission: !hasDeletePermission && !hasUpdatePermission,
    hasDeletePermission: hasDeletePermission,
    hasUpdatePermission: hasUpdatePermission,
    hasAllPermission: hasDeletePermission && hasUpdatePermission,
  }
}
