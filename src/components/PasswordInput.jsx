import { bool, func, oneOf, string } from 'prop-types';
import { memo, useRef, useState } from 'react';
import { StyledControlInput } from './StyledComponents';
const Open = () => (
   <svg
      fill='none'
      height='20'
      stroke='#808080'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='20'
   >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
      <circle cx='12' cy='12' r='3'></circle>
   </svg>
);
const Close = () => (
   <svg
      fill='none'
      height='20'
      stroke='#808080'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='20'
   >
      <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
      <line x1='1' y1='1' x2='23' y2='23'></line>
   </svg>
);
const PasswordInput = memo(
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
      const [type, setType] = useState(false);
      const currentRef = useRef(null);
      const innerRef = ref ? ref : currentRef;
      return (
         <StyledControlInput>
            <input
               className='password-input'
               data-cy={dataCY}
               data-error={!!error}
               data-size={size}
               disabled={!!isDisabled}
               name={name}
               onBlur={onBlur}
               onChange={e => onChange(e.target.value)}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={innerRef}
               type={type ? 'text' : 'password'}
               value={value}
            />
            <div
               className='dropdown-trigger'
               data-disabled={!!isDisabled}
               data-size={size}
               onClick={() => {
                  setType(!type);
                  if (innerRef?.current) {
                     innerRef.current.focus();
                  }
               }}
            >
               {type ? <Close /> : <Open />}
            </div>
            {!!error && <h5 data-size={size}>{error}</h5>}
         </StyledControlInput>
      );
   },
);
PasswordInput.propTypes = {
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
export default PasswordInput;
