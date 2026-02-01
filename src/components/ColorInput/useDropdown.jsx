import {
   autoUpdate,
   flip,
   offset,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { any, bool, func, string } from 'prop-types';
import { useState } from 'react';
const useDropdown = ({ isDisabled = false }) => {
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: setOpen,
      middleware: [
         offset(0),
         flip({ fallbackAxisSideDirection: 'end' }),
         shift(),
      ],
   });
   const click = useClick(context, { enabled: !isDisabled });
   const dismiss = useDismiss(context);
   const role = useRole(context);
   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
   ]);
   return {
      context,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      open,
      refs,
      setOpen,
   };
};
useDropdown.propTypes = {
   isDisabled: bool,
   isError: bool,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: any,
};
export default useDropdown;
