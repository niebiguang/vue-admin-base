import store from '../store'

export function hasPermission(permission) {
  
  const myPermissions = store.getters.permissions;
  // let  permissions = []
  // console.log(permission)
  // myPermissions.map((item,index)=>{
  //   if(item.childPermissionList.length>0){
  //     item.childPermissionList.map((v,i)=>{
  //       permissions = v.permissionCode
  //       console.log('v',v.permissionCode,v.permissionCode.indexOf(permission))
  //       return permissions.indexOf(permission) > -1;
  //     })
  //   }else{
  //     console.log('item',item.permissionCode)
  //     permissions = item.permissionCode
  //     return permissions.indexOf(permission) > -1;
  //   }
  //   return myPermissions
  // })
  // console.log(myPermissions)
  return myPermissions.indexOf(permission) > -1;
}
