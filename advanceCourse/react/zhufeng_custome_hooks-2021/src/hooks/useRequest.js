import {useState,useEffect} from 'react';

function useRequest(url){
    //查询参籹
    let [options,setOptions] = useState({
        currentPage:1,
        pageSize:5
    });
    //接口返回的数据
    let [data,setData] = useState({
        totalPage:0,
        list:[]
    });
    //调用接口，返回数据
    function getData(){
        let {currentPage,pageSize} = options;
        fetch(`${url}?currentPage=${currentPage}&pageSize=${pageSize}`)
        .then(res=>res.json())
        .then(res=>{
            setData({...res});
        });
    }
    useEffect(getData,[options, url]);
    return [data,options,setOptions];
}

export default useRequest;