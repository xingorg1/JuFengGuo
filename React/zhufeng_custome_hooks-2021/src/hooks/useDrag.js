import {useState,useEffect,useRef,useLayoutEffect} from 'react';
//useRef只能放在函数里 

function useDrag(){
    //DOM元素位置 useRef保存的对象可以在组件多次渲染的时候保持 不变
    const positionRef = useRef({
        currentX:0,currentY:0,//当前的位置
        lastX:0,lastY:0 //上一次的位置
    });
    const domRef = useRef(null);//domRef.current =div的真实DOM元素
    const [,forceUpdate] = useState({});
    //useLayoutEffect执行的时机比 useEffect更早
    //是因为我们想尽快的把事件绑上 
    useLayoutEffect(()=>{
        //拖拽开始的X坐标和Y坐标
        let startX,startY;
        const start = function(event){
            const {clientX,clientY} = event.targetTouches[0];
            startX=clientX;
            startY=clientY;
            domRef.current.addEventListener('touchmove',move);
            domRef.current.addEventListener('touchend',end);
        }
        const move = function(event){
            const {clientX,clientY} = event.targetTouches[0];
            positionRef.current.currentX = positionRef.current.lastX+(clientX-startX);
            positionRef.current.currentY = positionRef.current.lastY+(clientY-startY);
            forceUpdate({});//调用setState方法会让组件刷新
        }
        const end = function(){
            positionRef.current.lastX = positionRef.current.currentX;
            positionRef.current.lastY = positionRef.current.currentY;
            domRef.current.removeEventListener('touchmove',move);
            domRef.current.removeEventListener('touchend',end);
        }
        domRef.current.addEventListener('touchstart',start);
    },[]);//依赖项为空数组，只会执行一次
    //你要让哪个DOM元素进行移动
   
    let style = {x:positionRef.current.currentX,y:positionRef.current.currentY};
    return [style,domRef];
}

export default useDrag;