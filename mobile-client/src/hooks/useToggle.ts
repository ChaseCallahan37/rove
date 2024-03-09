import { useState } from "react";

function useToggle(initialState = false) {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  function toggle() {
    setIsToggled((prev) => !prev);
  }

  return {
    toggle,
    isToggled,
  };
}

export default useToggle;
