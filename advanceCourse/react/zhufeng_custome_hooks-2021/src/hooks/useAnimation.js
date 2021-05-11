import { useState } from 'react';
//useRef只能放在函数里 

function useAnimation(baseClassName, activeClassName) {
    let [className, setClassName] = useState(baseClassName);
    const toggle = () => {
        if (className === baseClassName) {
            setClassName(`${baseClassName} ${activeClassName}`);
        } else {
            setClassName(baseClassName);
        }
    }
    return [className, toggle];
}

export default useAnimation;