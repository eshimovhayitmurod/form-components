import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
const StyledValueContainer = styled.div`
   width: calc(100% - 42px);
   & .multiple-value {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
   }
   & .single-value {
      color: #000000;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
`;
const StyledMultiValue = styled.div`
   align-items: center;
   background-color: #f1f1f1;
   border-radius: 8px;
   cursor: default;
   display: flex;
   max-width: 100%;
   min-height: 38px;
   padding: 4px 7px 4px 10px;
   &[data-disabled='true'] {
      background-color: #ffffff;
      & .label {
         width: 100%;
      }
   }
   & .label {
      font-size: 16px;
      font-weight: 500;
      margin: 0 4px 0 0;
      white-space: pre-wrap;
      width: calc(100% - 25px);
   }
   & .remove {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: 22px;
      justify-content: center;
      width: 22px;
   }
`;
const MultipleValue = memo(
   ({
      index = 0,
      isDisabled = false,
      onChange,
      setOpen,
      value,
      valueList = [],
   }) => {
      const label = value?.label;
      const valueLabel = useMemo(() => {
         const isValid = ['string', 'number'].includes(typeof label) && label;
         const valueLabel = isValid ? label : '';
         return valueLabel;
      }, [label]);
      const removeOption = useCallback(
         e => {
            e.preventDefault();
            e.stopPropagation();
            const newValueList = valueList.filter(
               (_, order = 0) => order !== index
            );
            onChange(newValueList);
            setOpen(false);
         },
         [index, setOpen, onChange, valueList]
      );
      return (
         <StyledMultiValue>
            <div className='label'>{valueLabel}</div>
            {!isDisabled && (
               <div className='remove' onClick={removeOption}>
                  <svg
                     fill='#949494'
                     height='18'
                     viewBox='0 0 20 20'
                     width='18'
                  >
                     <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
                  </svg>
               </div>
            )}
         </StyledMultiValue>
      );
   }
);
const ValueContainer = ({ isMultiple = false, value, onChange, setOpen }) => {
   const label = value?.label;
   const multiple = useMemo(() => !!isMultiple, [isMultiple]);
   const valueList = useMemo(
      () => (Array.isArray(value) ? value : []),
      [value]
   );
   const valueLabel = useMemo(() => {
      const isValid = ['string', 'number'].includes(typeof label) && label;
      const valueLabel = isValid ? label : '';
      return valueLabel;
   }, [label]);
   return (
      <StyledValueContainer>
         {multiple ? (
            <div className='multiple-value'>
               {valueList.map((value, index = 0) => (
                  <MultipleValue
                     index={index}
                     key={index}
                     onChange={onChange}
                     setOpen={setOpen}
                     value={value}
                     valueList={valueList}
                  />
               ))}
            </div>
         ) : (
            <div className='single-value'>{valueLabel}</div>
         )}
      </StyledValueContainer>
   );
};
export default ValueContainer;
