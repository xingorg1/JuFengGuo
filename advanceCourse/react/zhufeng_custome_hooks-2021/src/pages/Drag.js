import React from 'react';
import useDrag from '../hooks/useDrag';
const basicStyle = {width:'100px',height:'100px',borderRadius:'50%'};
//自定义Hook本质是逻辑的复用，而非数据的复用
//translate不会引用回流
export default function Drag(){
    const [style1,dragRef1] = useDrag();  //dragRef1={current:div这个真实的DOM元素}  
    const [style2,dragRef2] = useDrag(); 
    return (
        <>
            <div
               ref={dragRef1}
               style={{...basicStyle,backgroundColor:'red',
               transform:`translate(${style1.x}px,${style1.y}px)`}}
            ></div>
             <div
               ref={dragRef2}
               style={{...basicStyle,backgroundColor:'green',
               transform:`translate(${style2.x}px,${style2.y}px)`}}
            ></div>
        </>
    )   
}