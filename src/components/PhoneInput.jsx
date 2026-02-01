import { bool, func, oneOf, string } from 'prop-types';
import { memo, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { StyledInput } from './StyledComponents';
const PhoneInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const [lazy, setLazy] = useState(true);
      return (
         <StyledInput>
            <IMaskInput
               className='phone-input'
               data-cy={dataCY}
               data-error={!!error}
               data-size={size}
               disabled={!!isDisabled}
               inputMode='numeric'
               inputRef={ref}
               lazy={lazy}
               mask='+998 (00) 000 00 00'
               name={name}
               placeholder={placeholder}
               placeholderChar=' '
               type='text'
               value={value}
               onAccept={value => {
                  const cleaned = value.replace(/\D/g, '');
                  const newValue =
                     cleaned === '998' ? '' : value.replace(/\)|\(| /g, '');
                  onChange(newValue);
               }}
               onBlur={e => {
                  setLazy(true);
                  if (typeof onBlur === 'function') {
                     onBlur(e);
                  }
               }}
               onFocus={e => {
                  setLazy(false);
                  if (typeof onFocus === 'function') {
                     onFocus(e);
                  }
               }}
            />
            {!!error && <h5 data-size={size}>{error}</h5>}
         </StyledInput>
      );
   },
);
PhoneInput.propTypes = {
   'data-cy': string,
   error: string,
   isDisabled: bool,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default PhoneInput;
