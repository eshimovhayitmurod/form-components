import { memo, useMemo } from 'react';
import styled from 'styled-components';
const StyledOption = styled.div`
   align-items: center;
   border-radius: 7px;
   border: none;
   cursor: pointer;
   display: flex;
   height: 44px;
   justify-content: space-between;
   max-width: 100%;
   outline: none;
   padding: 0 8px 0 12px;
   width: 100%;
   & .label {
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
   & .selected-icon {
      display: flex;
      align-items: center;
      justify-content: center;
   }
`;
const Option = memo(
   ({
      activeIndex = 0,
      getItemProps,
      index = 0,
      isMultiple = false,
      listRef,
      onSelect,
      option,
      setPointer,
      value,
   }) => {
      const label = option?.label;
      const memoizedLabel = useMemo(() => {
         const isValid = ['string', 'number'].includes(typeof label) || label;
         const memoizedLabel = isValid ? label : '';
         return memoizedLabel;
      }, [label]);
      const isFocused = useMemo(
         () => activeIndex === index,
         [activeIndex, index]
      );
      const isSelected = useMemo(() => {
         const newValue = Array.isArray(value) ? value : [];
         const some = newValue.some(value => value?.value === option?.value);
         const isSelected = isMultiple ? some : value?.value === option?.value;
         return isSelected;
      }, [isMultiple, value, option]);
      return (
         <StyledOption
            {...getItemProps({
               onClick: onSelect,
               onMouseEnter() {
                  setPointer(true);
               },
               onMouseLeave() {
                  setPointer(false);
               },
            })}
            aria-selected={activeIndex === index}
            key={index}
            ref={node => (listRef.current[index] = node)}
            role='option'
            tabIndex={-1}
            style={{
               background: isFocused ? 'rgba(82, 85, 241, 0.1)' : 'none',
            }}
         >
            <div
               className='label'
               style={{ width: isSelected ? 'calc(100% - 24px)' : '100%' }}
            >
               {memoizedLabel}
            </div>
            {isSelected && (
               <div className='selected-icon'>
                  <svg height='24' viewBox='0 0 24 24' width='24'>
                     <path
                        fill='#3a79f3'
                        d='M12,22A10,10,0,1,0,2,12,10,10,0,0,0,12,22ZM8.293,11.293a.9994.9994,0,0,1,1.414,0L11,12.5859,14.293,9.293a1,1,0,0,1,1.414,1.414l-4,4a.9995.9995,0,0,1-1.414,0l-2-2A.9994.9994,0,0,1,8.293,11.293Z'
                     ></path>
                  </svg>
               </div>
            )}
         </StyledOption>
      );
   }
);
export default Option;
