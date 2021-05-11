import React from 'react';
import useRequest from '../hooks/useRequest';
//请求的接口地址，此接口可以实现分支请求
const URL = 'http://localhost:8000/api/users';

/**
 * 
 *  useRequest 自定义Hook 用来请求远程 接口，用来实现分页数据的获取 
 */
export default function Table(){
    const [data,options,setOptions]=useRequest(URL);
    //currentPage=当前页 totalPage=总页数 list=本页的数据(对象的数组)
    const {currentPage,totalPage,list} = data;
    console.log(data,options);
    return (
        <>
            <table className="table table-striped">
                <thead><tr><td>ID</td><td>NAME</td></tr></thead>
                <tbody>
                    {
                        list.map(item=>(
                            <tr key={item.id}><td>{item.id}</td><td>{item.name}</td></tr>
                        ))
                    }
                </tbody>
            </table>
            <nav>
               <ul className="pagination">
                   {
                       new Array(totalPage).fill(0).map((item,index)=>(
                           <li><button 
                           onClick={()=>setOptions({...options,currentPage:index+1})}
                           className="btn btn-primary">{index+1}</button></li>
                       ))
                   }
               </ul>         
            </nav>
        </>
    )
}