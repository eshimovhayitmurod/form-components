import { useMemo } from 'react';
import { IMaskInput } from 'react-imask';
import styled from 'styled-components';
import { hslaToHex, hsvaToHex, rgbaToHex } from './helpers';
const StyledControl = styled.div`
   display: flex;
   height: 48;
   position: relative;
   width: 100%;
   & .single-input {
      background-color: #ffffff;
      border-radius: 10px;
      border: 2px solid #e1e1e1;
      color: #000000;
      font-size: 17px;
      font-weight: 500;
      height: 48px;
      outline: none;
      padding-left: 15px;
      padding-right: 45px;
      width: 100%;
      &[data-size='lg'] {
         font-size: 18px;
         height: 56px;
         padding-left: 18px;
         padding-right: 18px;
         border-radius: 12px;
      }
      &[data-size='sm'] {
         font-size: 16px;
         height: 40px;
         padding-left: 12px;
         padding-right: 12px;
      }
      &::placeholder {
         color: #717171;
      }
      &[data-error='true']:not(:disabled) {
         border-color: #e41d32;
      }
      &:hover:not(:disabled) {
         border-color: #3a79f3;
      }
      &:focus {
         border-color: #3a79f3;
      }
      &:disabled {
         background-color: #f4f4f4;
         color: #717171;
         cursor: default;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
      &:focus-within {
         & .indicator-content {
            & div {
               border: 2px solid #3a79f3;
            }
         }
      }
   }
   & .color-input-container {
      background-color: #ffffff;
      border-radius: 10px;
      border: 2px solid #e1e1e1;
      display: flex;
      height: 48px;
      overflow: hidden;
      padding-right: 50px;
      width: 100%;
      &[data-size='lg'] {
         font-size: 18px;
         height: 56px;
         border-radius: 12px;
      }
      &[data-size='sm'] {
         font-size: 16px;
         height: 40px;
      }
      &[data-disabled='true'] {
         background-color: #f4f4f4;
      }
      &[data-error='true'] {
         border: 2px solid #e41d32;
      }
      &:focus-within {
         border: 2px solid #3a79f3;
         & input {
            border: none;
         }
      }
      & input {
         border: none;
         color: #000000;
         font-size: 17px;
         font-weight: 500;
         height: 100%;
         outline: none;
         padding-left: 15px;
         width: 55px;
         &::placeholder {
            color: #717171;
         }
         &:disabled {
            color: #717171;
            cursor: default;
         }
         &:focus {
            border: none;
         }
      }
   }
   & .indicator-content {
      align-items: center;
      background-color: transparent;
      border-radius: 20px;
      color: #808080;
      cursor: pointer;
      display: flex;
      height: 36px;
      justify-content: center;
      position: absolute;
      right: 6px;
      top: 6px;
      user-select: none;
      width: 36px;
      &[data-size='lg'] {
         right: 8px;
         top: 8px;
         width: 40px;
         height: 40px;
      }
      &[data-size='sm'] {
         right: 4px;
         top: 4px;
         width: 32px;
         height: 32px;
      }
      &:hover:not([data-disabled='true']) {
         background-color: #f1f1f1;
      }
      & div {
         width: 20px;
         height: 20px;
         border-radius: 8px;
      }
   }
`;
const inputs = {
   hex: [
      {
         mask: /^#[0-9a-fA-F]{0,8}$/,
         overwrite: false,
         transform: (value = '') => {
            const newValue =
               value?.length === 7 || value?.length === 9
                  ? value
                  : value?.length >= 4
                    ? value.slice(0, 4)
                    : '#000';
            return newValue;
         },
      },
   ],
   rgba: [
      {
         key: 'r',
         mask: Number,
         max: 255,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'g',
         mask: Number,
         max: 255,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'b',
         mask: Number,
         max: 255,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'a',
         mask: Number,
         max: 1,
         min: 0,
         scale: 2,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
   ],
   hsva: [
      {
         key: 'h',
         mask: Number,
         max: 360,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 's',
         mask: Number,
         max: 100,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'v',
         mask: Number,
         max: 100,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'a',
         mask: Number,
         max: 1,
         min: 0,
         scale: 2,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
   ],
   hsla: [
      {
         key: 'h',
         mask: Number,
         max: 360,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 's',
         mask: Number,
         max: 100,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'l',
         mask: Number,
         max: 100,
         min: 0,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
      {
         key: 'a',
         mask: Number,
         max: 1,
         min: 0,
         scale: 2,
         transform: value => +(value ? value : 0),
         unmask: true,
      },
   ],
};
const Control = ({
   error = '',
   format = 'hex',
   getReferenceProps,
   isDisabled = false,
   name,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   ref,
   refs,
   size = 'md',
   value,
}) => {
   const memoizedInputs = useMemo(() => inputs?.[format], [format]);
   const isHex = useMemo(() => memoizedInputs?.length === 1, [memoizedInputs]);
   const backgroundColor = useMemo(() => {
      const formatters = {
         hex: value => String(value || ''),
         hsla: value => hslaToHex(value),
         hsva: value => hsvaToHex(value),
         rgba: value => rgbaToHex(value),
      };
      const formatter = formatters?.[format];
      const backgroundColor = formatter(value);
      return backgroundColor;
   }, [value, format]);
   return (
      <StyledControl
         data-disabled={isDisabled}
         data-error={!!error}
         onFocus={onFocus}
         ref={refs.setReference}
      >
         {isHex ? (
            <IMaskInput
               className='single-input'
               data-error={!!error}
               data-size={size}
               disabled={isDisabled}
               inputRef={ref}
               lazy={true}
               mask='#HHHHHHHH'
               name={name}
               onAccept={onChange}
               overwrite={true}
               placeholder={placeholder}
               value={value}
               definitions={{
                  H: /[0-9a-fA-F]/,
               }}
               onBlur={e => {
                  const newValue =
                     value?.length === 9
                        ? value
                        : value?.length >= 7
                          ? value.slice(0, 7)
                          : value?.length >= 4
                            ? value.slice(0, 4)
                            : '';
                  onChange(newValue);
                  if (typeof onBlur === 'function') {
                     onBlur(e);
                  }
               }}
            />
         ) : (
            <div
               className='color-input-container'
               data-disabled={isDisabled}
               data-error={!!error}
            >
               {memoizedInputs.map(
                  ({ key, mask, max, min, unmask, transform }, index) => (
                     <IMaskInput
                        disabled={isDisabled}
                        key={key}
                        mask={mask}
                        max={max}
                        min={min}
                        name={`${name}-${key}`}
                        unmask={unmask}
                        value={`${value?.[key]}`}
                        onAccept={(keyValue, e) => {
                           const element = e?.el?.input;
                           const nextElement = element?.nextElementSibling;
                           const prevElement = element?.previousElementSibling;
                           const nextElementHasFocusable =
                              +`${keyValue}0` > max &&
                              index + 1 !== memoizedInputs?.length;
                           const parsedValue = transform(keyValue);
                           const prevElementHasFocusable =
                              keyValue === '' && index !== 0;
                           if (prevElementHasFocusable) {
                              prevElement.focus();
                           }
                           if (nextElementHasFocusable) {
                              nextElement.focus();
                           }
                           const newValue = {
                              ...value,
                              [key]: parsedValue,
                           };
                           onChange(newValue);
                        }}
                     />
                  ),
               )}
            </div>
         )}
         <div
            {...getReferenceProps()}
            className='indicator-content'
            data-disabled={isDisabled}
            data-size={size}
         >
            <div style={{ backgroundColor }} />
         </div>
      </StyledControl>
   );
};
export default Control;
