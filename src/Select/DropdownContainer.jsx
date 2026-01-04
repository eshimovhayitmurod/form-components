import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
const StyledDropdownContainer = styled.div`
   align-items: center;
   color: #949494;
   display: flex;
   justify-content: center;
   & .clear-button {
      align-items: center;
      border-radius: 12px;
      display: flex;
      height: 24px;
      justify-content: center;
      width: 24px;
      &:hover {
         background-color: #e8e8e8;
      }
   }
   & .dropdown-button {
      align-items: center;
      display: flex;
      justify-content: center;
   }
`;
const DropdownContainer = ({
   isClearable = true,
   isDisabled = false,
   isMultiple = false,
   onChange,
   setOpen,
   value,
}) => {
   const hasValue = useMemo(() => {
      const newValue = Array.isArray(value) ? value : [];
      const hasMultipleValue = newValue?.length > 0;
      const hasSingleValue = !!(value?.label || value?.value);
      const hasValue = isMultiple ? hasMultipleValue : hasSingleValue;
      return hasValue;
   }, [value, isMultiple]);
   const clearable = useMemo(() => {
      const clearable = !!isClearable && hasValue && !isDisabled;
      return clearable;
   }, [isClearable, hasValue, isDisabled]);
   const clearValue = useCallback(
      e => {
         e.stopPropagation();
         e.preventDefault();
         const newValue = isMultiple ? [] : null;
         onChange(newValue);
         setOpen(false);
      },
      [isMultiple, onChange, setOpen]
   );
   return (
      <StyledDropdownContainer>
         {clearable && (
            <div className='clear-button' onClick={clearValue}>
               <svg fill='none' height='16' viewBox='0 0 16 16' width='16'>
                  <path
                     d='M12 4L4 12'
                     stroke='#949494'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                  ></path>
                  <path
                     d='M4 4L12 12'
                     stroke='#949494'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth='2'
                  ></path>
               </svg>
            </div>
         )}
         <div className='dropdown-button'>
            <svg height='18' width='18' viewBox='0 0 20 20'>
               <path
                  fill='currentColor'
                  d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
               ></path>
            </svg>
         </div>
      </StyledDropdownContainer>
   );
};
export default DropdownContainer;
