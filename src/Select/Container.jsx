import { useMemo } from 'react';
import styled from 'styled-components';
import DropdownContainer from './DropdownContainer';
import Placeholder from './Placeholder';
import ValueContainer from './ValueContainer';
const StyledContainer = styled.div`
   border-radius: 10px;
   box-sizing: border-box;
   cursor: pointer;
   min-height: 48px;
   outline: none;
   width: 100%;
   & * {
      box-sizing: border-box;
   }
   & .trigger {
      align-items: center;
      border-radius: 10px;
      border: 1.5px solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      min-height: 48px;
      outline: none;
      padding: 4px 12px 4px 15px;
      width: 100%;
      &:focus {
         border: 1.5px solid #3a79f3;
      }
      &[data-error='true'] {
         border: 1.5px solid #e41d32;
      }
   }
`;
const Container = ({
   dataCY,
   className = '',
   isClearable = true,
   isDisabled = false,
   isError = false,
   isMultiple = false,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   value,
   getReferenceProps,
   refs,
   setOpen,
}) => {
   const hasValue = useMemo(() => {
      const newValue = Array.isArray(value) ? value : [];
      const hasMultipleValue = newValue?.length > 0;
      const hasSingleValue = !!(value?.label || value?.value);
      const hasValue = isMultiple ? hasMultipleValue : hasSingleValue;
      return hasValue;
   }, [value, isMultiple]);
   return (
      <StyledContainer>
         <div
            {...getReferenceProps()}
            className={`${className} trigger`}
            data-cy={dataCY}
            data-error={!!isError}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={refs.setReference}
            tabIndex={0}
            style={{
               padding:
                  isMultiple && hasValue
                     ? '4px 12px 4px 4px'
                     : '4px 12px 4px 15px',
            }}
         >
            {hasValue ? (
               <ValueContainer
                  isMultiple={isMultiple}
                  onChange={onChange}
                  setOpen={setOpen}
                  value={value}
               />
            ) : (
               <Placeholder placeholder={placeholder} />
            )}
            <DropdownContainer
               isClearable={isClearable}
               isDisable={isDisabled}
               isMultiple={isMultiple}
               onChange={onChange}
               setOpen={setOpen}
               value={value}
            />
         </div>
      </StyledContainer>
   );
};
export default Container;
