let lastDependencies
let lastCallback;
function useCallback(callback,dependencies){
    ///先判断lastDependencies和这一次的 dependencies进行比较，如果都一样会返回上一个callback
    //如果不一样，返回这新的callback
    if(!lastDependencies || lastDependencies!==dependencies){
        lastCallback=callback;
        return lastCallback;
    }
    return lastCallback;
}