interface listType{
    userId:number,
    id:number,
    title:string,
    introduce:string
}
type paginationType={
    currentpage:number
    pagesize:number
}
export class initData{
    pagination:paginationType={
        currentpage:1,
        pagesize:10
    }
    list:listType[]=[]
}