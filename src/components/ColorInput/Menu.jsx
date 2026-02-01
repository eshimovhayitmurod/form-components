import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { useMemo } from 'react';
import {
   HexAlphaColorPicker,
   HslaColorPicker,
   HsvaColorPicker,
   RgbaColorPicker,
} from 'react-colorful';
import styled from 'styled-components';
const StyledColor = styled.div`
   background-color: #ffffff;
   border-radius: 14px;
   padding: 12px;
   box-shadow:
      0 1px 20px 0 rgba(13, 46, 105, 0.07),
      0 1px 20px 0 rgba(13, 46, 105, 0.07);
   & .react-colorful {
      width: 300px;
      height: 220px;
      & .react-colorful__saturation {
         border-bottom: none;
         border-radius: 12px;
         cursor: all-scroll;
         margin: 0 0 12px 0;
      }
      & .react-colorful__hue {
         border-radius: 8px;
         cursor: ew-resize;
         height: 12px;
         margin: 0 0 12px 0;
      }
      & .react-colorful__alpha {
         border-radius: 8px;
         cursor: ew-resize;
         height: 12px;
      }
      & .react-colorful__saturation-pointer,
      & .react-colorful__hue-pointer,
      & .react-colorful__alpha-pointer {
         height: 20px;
         width: 20px;
      }
   }
`;
const pickers = {
   hex: HexAlphaColorPicker,
   hsla: HslaColorPicker,
   hsva: HsvaColorPicker,
   rgba: RgbaColorPicker,
};
const Menu = ({
   context,
   floatingStyles,
   format = 'hex',
   getFloatingProps,
   onChange,
   open,
   refs,
   value,
}) => {
   const MemoizedPicker = useMemo(() => {
      const isValid = ['hex', 'hsla', 'hsva', 'rgba'].includes(format);
      const newFormat = isValid ? format : 'hex';
      const MemoizedPicker = pickers?.[newFormat];
      return MemoizedPicker;
   }, [format]);
   return (
      open && (
         <FloatingPortal id='floating-ui-portal'>
            <FloatingFocusManager
               context={context}
               initialFocus={false}
               modal={false}
            >
               <StyledColor
                  {...getFloatingProps()}
                  ref={refs.setFloating}
                  style={floatingStyles}
               >
                  <MemoizedPicker color={value} onChange={onChange} />
               </StyledColor>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
