import { bool, func, oneOf, string } from 'prop-types';
import { memo, useCallback, useMemo } from 'react';
import { StyledInput } from './StyledComponents';
const normalize = val => {
   if (!val) return '';
   let cleaned = val.replace(/[^0-9.-]/g, '');
   if (cleaned.includes('-', 1)) {
      cleaned = cleaned[0] + cleaned.slice(1).replace(/-/g, '');
   }
   const parts = cleaned.split('.');
   if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
   }
   if (cleaned === '-') return '-';
   if (cleaned.includes('.')) {
      const [integerPart, decimalPart] = cleaned.split('.');
      let cleanInteger = integerPart.replace(/^(-?)0+(?=\d)/, '$1');
      if (cleanInteger === '') cleanInteger = '0';
      if (cleanInteger === '-') cleanInteger = '-0';
      return `${cleanInteger}.${decimalPart}`;
   } else {
      let normalized = cleaned.replace(/^(-?)0+(?=\d)/, '$1');
      return normalized;
   }
};
const normalizeNumberString = str => {
   if (str === '-') return '-';
   const isNegative = str.startsWith('-');
   let s = isNegative ? str.slice(1) : str;
   if (s.includes('.')) {
      s = s.replace(/0+$/, '');
      if (s.endsWith('.')) s = s.slice(0, -1);
   }
   if (/^0*\.?0*$/.test(s)) s = '0';
   return isNegative && s !== '0' ? '-' + s : s;
};
const BigNumberInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      name,
      normalizeOnBlur = true,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      size = 'md',
      value = '',
   }) => {
      const memoizedValue = useMemo(() => {
         const isValid = typeof value === 'string';
         const memoizedValue = isValid ? value : String(value);
         return memoizedValue;
      }, [value]);
      const onChangeInput = useCallback(
         e => {
            const newValue = normalize(e.target.value);
            onChange(newValue);
         },
         [onChange],
      );
      const onBlurInput = useCallback(
         e => {
            const newValue = normalizeNumberString(value);
            if (value !== newValue && normalizeOnBlur) {
               onChange(newValue);
            }
            if (typeof onBlur === 'function') {
               onBlur(e);
            }
         },
         [onBlur, value, onChange, normalizeOnBlur],
      );
      return (
         <StyledInput>
            <input
               className='big-number-input'
               data-cy={dataCY}
               data-error={!!error}
               data-size={size}
               disabled={isDisabled}
               inputMode='numeric'
               name={name}
               onBlur={onBlurInput}
               onChange={onChangeInput}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={ref}
               type='text'
               value={memoizedValue}
            />
            {!!error && <h5 data-size={size}>{error}</h5>}
         </StyledInput>
      );
   },
);
BigNumberInput.propTypes = {
   'data-cy': string,
   isDisabled: bool,
   error: bool,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['large', 'medium', 'small']),
   value: string,
};
export default BigNumberInput;
