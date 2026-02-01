import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMemo } from 'react';
import { IMask, IMaskInput } from 'react-imask';
import { StyledControlInput } from '../StyledComponents';
dayjs.extend(customParseFormat);
const DownIcon = () => (
   <svg fill='none' height='20' viewBox='0 0 20 20' width='20'>
      <path
         d='M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5Z'
         stroke='currentColor'
         strokeLinecap='round'
         strokeLinejoin='round'
         strokeWidth='2'
      />
   </svg>
);
const Control = ({
   dataCY,
   getReferenceProps,
   isDisabled = false,
   error = '',
   max,
   min,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   refs,
   size = 'md',
   value = '',
}) => {
   const memoizedValue = useMemo(() => {
      const stringValue = typeof value === 'string' ? value : '';
      const memoizedValue = stringValue.split('-').reverse().join('-');
      return memoizedValue;
   }, [value]);
   return (
      <StyledControlInput ref={refs.setReference}>
         <IMaskInput
            autofix={true}
            className='date-input'
            data-cy={dataCY}
            data-error={!!error}
            data-size={size}
            disabled={!!isDisabled}
            format={date => dayjs(date).format('DD-MM-YYYY')}
            inputMode='numeric'
            lazy={true}
            mask={Date}
            onBlur={onBlur}
            onFocus={onFocus}
            overwrite={true}
            parse={date => dayjs(date, 'DD-MM-YYYY')}
            pattern='DD-MM-YYYY'
            placeholder={placeholder}
            placeholderChar=''
            type='text'
            value={memoizedValue}
            blocks={{
               DD: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 31,
                  maxLength: 2,
               },
               MM: {
                  mask: IMask.MaskedRange,
                  from: 1,
                  to: 12,
                  maxLength: 2,
               },
               YYYY: {
                  mask: IMask.MaskedRange,
                  from: 1900,
                  to: 9999,
               },
            }}
            onChange={e => {
               const value = e.target.value;
               const input = value.split('-').reverse().join('-');
               if (value?.length === 10) {
                  const inputDate = new Date(input).getTime();
                  const maxDate = max ? max.getTime() : null;
                  const minDate = min ? min.getTime() : null;
                  const newValue =
                     inputDate > maxDate && maxDate
                        ? new Date(maxDate).toISOString().slice(0, 10)
                        : inputDate < minDate && minDate
                          ? new Date(minDate).toISOString().slice(0, 10)
                          : input;
                  onChange(newValue);
                  return;
               } else {
                  onChange(input);
               }
            }}
         />
         <div
            {...getReferenceProps()}
            className='dropdown-trigger'
            data-disabled={isDisabled}
            data-size={size}
         >
            <DownIcon />
         </div>
         {!!error && <h5 data-size={size}>{error}</h5>}
      </StyledControlInput>
   );
};
export default Control;
