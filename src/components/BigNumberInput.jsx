import Big from 'big.js';
import { any, bool, func, number, oneOf, string } from 'prop-types';
import { memo, useCallback, useMemo } from 'react';
import { StyledInput } from './StyledComponents';
const normalize = (val = '', scale = 2) => {
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
      const cleanDecimal = decimalPart.slice(0, scale);
      return `${cleanInteger}.${cleanDecimal}`;
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
const checkMin = (val = '', min) => {
   try {
      const hasMin = typeof min === 'string' && min;
      const ltMin = hasMin ? Big(val).lt(Big(min)) : false;
      return ltMin;
   } catch {
      return false;
   }
};
const checkMax = (val = '', max) => {
   try {
      const hasMax = typeof max === 'string' && max;
      const gtMax = hasMax ? Big(val).gt(Big(max)) : false;
      return gtMax;
   } catch {
      return false;
   }
};
const parseValue = (val = '', { scale = 2, min, max }) => {
   const value = normalize(val, scale);
   const gtMax = checkMax(value, max);
   const ltMin = checkMin(value, min);
   const newValue = gtMax ? max : ltMin ? min : value;
   return newValue;
};
const BigNumberInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      max,
      min,
      name,
      normalizeOnBlur = true,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      ref,
      scale = 2,
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
            const value = parseValue(e.target.value, { scale, min, max });
            onChange(value);
         },
         [onChange, min, max, scale],
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
   error: bool,
   isDisabled: bool,
   max: any,
   min: any,
   name: string,
   normalizeOnBlur: bool,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   ref: any,
   scale: number,
   size: oneOf(['large', 'medium', 'small']),
   value: string,
};
export default BigNumberInput;
