import { useCallback, useState } from 'react';

const useHandleModal = (defaultOpen = false) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const open = useCallback(() => {
      setIsOpen(true);
    }, []);
  
    const close = useCallback(() => {
      setIsOpen(false);
    }, []);
  
    return {
      isOpen,
      open,
      close,
    };
  };

  export default useHandleModal;
