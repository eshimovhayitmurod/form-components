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
import { useState } from 'react';
const useDropdown = ({ isDisabled = false, setCalendar, value = '' }) => {
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         const calendar = value?.length === 10 ? new Date(value) : new Date();
         setCalendar(calendar);
         setOpen(open);
      },
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
export default useDropdown;
