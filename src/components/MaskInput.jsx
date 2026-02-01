import { bool, func, oneOf, string } from 'prop-types';
import { memo, useMemo } from 'react';
import { IMaskInput } from 'react-imask';
import { StyledInput } from './StyledComponents';
const types = [
   {
      mask: '00000000000000000000',
      transform: value => value,
      value: 'account',
   },
   {
      mask: '000000000',
      transform: value => value,
      value: 'tin',
   },
   {
      mask: '00000',
      transform: value => value,
      value: 'mfo',
   },
   {
      mask: 'aa 0000000',
      transform: value => value.replace(' ', '').toUpperCase(),
      value: 'passport',
   },
   {
      mask: '00000000000000',
      transform: value => value,
      value: 'pinfl',
   },
   {
      mask: '00/00',
      transform: value => value,
      value: 'card-expire',
   },
   {
      mask: '0000 0000 0000 0000',
      transform: value => value.replace(/ /g, ''),
      value: 'card',
   },
];
const typesList = types.map(type => type?.value);
const MaskInput = memo(
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
      type = 'pinfl',
      value = '',
   }) => {
      const inputMode = useMemo(
         () => (type === 'passport' && value?.length < 2 ? 'latin' : 'numeric'),
         [type, value],
      );
      const newType = useMemo(
         () => (typesList.includes(type) ? type : 'tin'),
         [type],
      );
      const transform = useMemo(() => {
         const transform = types.find(
            type => type?.value === newType,
         )?.transform;
         return transform;
      }, [newType]);
      const mask = useMemo(() => {
         const mask = types.find(type => type?.value === newType)?.mask;
         return mask;
      }, [newType]);
      return (
         <StyledInput>
            <IMaskInput
               className='mask-input'
               data-cy={dataCY}
               data-error={!!error}
               data-size={size}
               disabled={!!isDisabled}
               inputMode={inputMode}
               mask={mask}
               name={name}
               onAccept={value => onChange(transform(value))}
               onBlur={onBlur}
               onFocus={onFocus}
               placeholder={placeholder}
               inputRef={ref}
               type='text'
               value={value}
            />
            {!!error && <h5 data-size={size}>{error}</h5>}
         </StyledInput>
      );
   },
);
MaskInput.propTypes = {
   'data-cy': string,
   error: string,
   isDisabled: bool,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   type: oneOf(typesList),
   value: string,
};
export default MaskInput;
