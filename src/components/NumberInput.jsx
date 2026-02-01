import { bool, func, oneOf, string } from 'prop-types';
import { memo } from 'react';
import { IMaskInput } from 'react-imask';
import { StyledInput } from './StyledComponents';
const NumberInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      max,
      min,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      scale = 2,
      size = 'md',
      value = '',
   }) => (
      <StyledInput>
         <IMaskInput
            autofix={true}
            className='number-input'
            data-cy={dataCY}
            data-error={!!error}
            data-size={size}
            disabled={!!isDisabled}
            inputMode='numeric'
            inputRef={ref}
            mapToRadix={[',']}
            mask={Number}
            max={max}
            min={min}
            name={name}
            normalizeZeros={true}
            onAccept={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            padFractionalZeros={false}
            placeholder={placeholder}
            radix='.'
            scale={scale}
            thousandsSeparator=' '
            type='text'
            value={value}
         />
         {!!error && <h5 data-size={size}>{error}</h5>}
      </StyledInput>
   ),
);
NumberInput.propTypes = {
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
export default NumberInput;
