import { bool, func, oneOf, string } from 'prop-types';
import { memo } from 'react';
import { StyledInput } from './StyledComponents';
const TextInput = memo(
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
         <input
            className='text-input'
            data-cy={dataCY}
            data-error={!!error}
            data-size={size}
            disabled={!!isDisabled}
            name={name}
            onBlur={onBlur}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            placeholder={placeholder}
            ref={ref}
            type='text'
            value={value}
         />
         {!!error && <h5 data-size={size}>{error}</h5>}
      </StyledInput>
   ),
);
TextInput.propTypes = {
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
export default TextInput;
