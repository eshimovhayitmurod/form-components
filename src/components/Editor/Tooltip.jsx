import {
   autoUpdate,
   flip,
   FloatingPortal,
   offset,
   shift,
   useDismiss,
   useFloating,
   useFocus,
   useHover,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { any, number, string } from 'prop-types';
import { Fragment, useState } from 'react';
const Tooltip = ({
   children,
   distance = 6,
   isDisabled = false,
   title = '',
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const { refs, floatingStyles, context } = useFloating({
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'top',
      whileElementsMounted: autoUpdate,
      middleware: [
         offset(distance),
         flip({
            fallbackAxisSideDirection: 'start',
         }),
         shift(),
      ],
   });
   const dismiss = useDismiss(context, { enabled: !isDisabled });
   const focus = useFocus(context, { enabled: !isDisabled });
   const hover = useHover(context, { move: true, enabled: !isDisabled });
   const role = useRole(context, { role: 'tooltip' });
   const { getReferenceProps, getFloatingProps } = useInteractions([
      dismiss,
      focus,
      hover,
      role,
   ]);
   return (
      <Fragment>
         <div ref={refs.setReference} {...getReferenceProps()}>
            {children}
         </div>
         {isOpen && (
            <FloatingPortal id='floating-ui-portal'>
               <div
                  {...getFloatingProps()}
                  ref={refs.setFloating}
                  style={{
                     ...floatingStyles,
                     backgroundColor: '#222222f2',
                     opacity: 0.9,
                     color: '#f2f2f2',
                     borderRadius: 10,
                     fontSize: 14,
                     fontWeight: 400,
                     padding: '6px 12px',
                     whiteSpace: 'nowrap',
                  }}
               >
                  {title}
               </div>
            </FloatingPortal>
         )}
      </Fragment>
   );
};
Tooltip.propTypes = {
   children: any,
   distance: number,
   title: string,
};
export default Tooltip;
