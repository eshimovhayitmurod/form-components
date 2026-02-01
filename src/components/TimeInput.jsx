import { bool, func, oneOf, string } from 'prop-types';
import { memo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { StyledInput } from './StyledComponents';
const TimeInput = memo(
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
   }) => (
      <StyledInput>
         <IMaskInput
            autofix={true}
            className='time-input'
            data-cy={dataCY}
            data-error={!!error}
            data-size={size}
            disabled={!!isDisabled}
            inputMode='numeric'
            inputRef={ref}
            mask='HH:MM:SS'
            name={name}
            onAccept={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            type='text'
            value={value}
            blocks={{
               HH: {
                  from: 0,
                  mask: IMask.MaskedRange,
                  maxLength: 2,
                  to: 23,
               },
               MM: {
                  from: 0,
                  mask: IMask.MaskedRange,
                  maxLength: 2,
                  to: 59,
               },
               SS: {
                  from: 0,
                  mask: IMask.MaskedRange,
                  maxLength: 2,
                  to: 59,
               },
            }}
         />
         {!!error && <h5 data-size={size}>{error}</h5>}
      </StyledInput>
   ),
);
TimeInput.propTypes = {
   'data-cy': string,
   error: bool,
   isDisabled: bool,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default TimeInput;
