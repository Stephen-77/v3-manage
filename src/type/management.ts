export interface userList {
  uid: number;
  uname: string;
  role: string;
  role_name: string;
  createtime:string
}
export class initData {
  userList:userList[]= [];
}
