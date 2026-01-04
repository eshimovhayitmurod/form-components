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
import { useEffect, useState } from 'react';
const useDropdown = ({
   isDisabled = false,
   isMultiple,
   listRef,
   options = [],
   page = 1,
   setFilter,
   value,
}) => {
   const [activeIndex, setActiveIndex] = useState(null);
   const [open, setOpen] = useState(false);
   const [selectedIndex, setSelectedIndex] = useState(0);
   const { refs, floatingStyles, context } = useFloating({
      open,
      whileElementsMounted: autoUpdate,
      onOpenChange: open => {
         setActiveIndex(null);
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
      selectedIndex: -1,
      virtual: false,
      onNavigate: newIndex => {
         setActiveIndex(oldIndex => {
            const newOrder =
               activeIndex === null && oldIndex === 0 ? 0 : newIndex;
            return newOrder;
         });
      },
   });
   const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, role, dismiss, listNavigation]);
   useEffect(() => {
      if (open && page === 1) {
         const singleIndex = options.findIndex(
            option => option?.value === value?.value
         );
         const selectedIndex = isMultiple ? 0 : singleIndex;
         setSelectedIndex(selectedIndex);
      }
   }, [open, options, isMultiple, value, page]);
   return {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      listRef,
      open,
      refs,
      selectedIndex,
      setActiveIndex,
      setOpen,
      setSelectedIndex,
   };
};
export default useDropdown;
