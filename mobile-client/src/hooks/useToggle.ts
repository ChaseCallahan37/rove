import { useState } from "react";

function useToggle(initialState = true) {
    const [isToggled, setIsToggled] = useState(initialState)

    function toggle(){
        setIsToggled(prev => !prev)
    }

    return {
        toggle,
        isToggled
    }
}

export default useToggle