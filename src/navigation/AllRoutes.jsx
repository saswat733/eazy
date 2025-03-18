
import {lazy} from 'react'
const DashBoard = lazy(()=>import('../views/admin/default'));

export const allRoutes = [
  {
    path: "/dashboard",
    element : <DashBoard/>,
    title : "Dashboard",
    submodules:[]
  }
]