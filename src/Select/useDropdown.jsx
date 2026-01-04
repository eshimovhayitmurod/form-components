import {
   autoUpdate,
   flip,
   offset,
   size,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useListNavigation,
   useRole,
} from '@floating-ui/react';
import { useState } from 'react';
const useDropdown = ({ isDisabled = false, listRef, setFilter }) => {
   const [activeIndex, setActiveIndex] = useState(0);
   const [open, setOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setActiveIndex(0);
         setOpen(open);
         setFilter({ search: '', page: 1 });
      },
      middleware: [
         offset(0),
         flip({ padding: 10 }),
         size({
            apply({ rects, elements, availableHeight }) {
               Object.assign(elements.floating.style, {
                  maxHeight: `${availableHeight}px`,
                  minWidth: `${rects.reference.width}px`,
                  width: `${rects.reference.width}px`,
               });
            },
         }),
      ],
   });
   const role = useRole(context, { role: 'listbox' });
   const dismiss = useDismiss(context);
   const click = useClick(context, {
      enabled: !isDisabled,
   });
   const listNavigation = useListNavigation(context, {
      activeIndex,
      disabledIndices: [],
      listRef,
      loop: false,
      onNavigate: setActiveIndex,
      selectedIndex: null,
      virtual: true,
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, role, dismiss, listNavigation]);
   return {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      open,
      refs,
      setActiveIndex,
      setOpen,
   };
};
export default useDropdown;
