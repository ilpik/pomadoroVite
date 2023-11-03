import { useEffect, useRef } from "react";

  interface IUseOutsideClick {
    onClose?:()=>void;
  }
  export function useOutsideClick(props:IUseOutsideClick){
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        props.onClose?.();
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  }
