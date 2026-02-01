import { any, bool, func, string } from 'prop-types';
import { Fragment, memo, useMemo } from 'react';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const ColorInput = memo(
   ({
      'data-cy': dataCY,
      error = false,
      format = 'hex',
      isDisabled = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      size = 'md',
      value,
      ref,
   }) => {
      const {
         context,
         floatingStyles,
         getFloatingProps,
         getReferenceProps,
         open,
         refs,
      } = useDropdown({
         isDisabled,
      });
      const memoizedFormat = useMemo(() => {
         const isValid = ['hex', 'hsla', 'hsva', 'rgba'].includes(format);
         const memoizedFormat = isValid ? format : 'hex';
         return memoizedFormat;
      }, [format]);
      return (
         <Fragment>
            <Control
               dataCY={dataCY}
               error={error}
               format={memoizedFormat}
               getReferenceProps={getReferenceProps}
               isDisabled={isDisabled}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               ref={ref}
               refs={refs}
               size={size}
               value={value}
            />
            <Menu
               context={context}
               floatingStyles={floatingStyles}
               format={format}
               getFloatingProps={getFloatingProps}
               onChange={onChange}
               open={open}
               refs={refs}
               value={value}
            />
         </Fragment>
      );
   },
);
ColorInput.propTypes = {
   isDisabled: bool,
   error: bool,
   onChange: func,
   onFocus: func,
   placeholder: string,
   value: any,
   name: string,
};
export default ColorInput;
