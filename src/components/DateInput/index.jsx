import { bool, func, oneOf, string } from 'prop-types';
import { Fragment, memo, useMemo, useState } from 'react';
import Control from './Control';
import Menu from './Menu';
import useDropdown from './useDropdown';
const DateInput = memo(
   ({
      'data-cy': dataCY,
      error = '',
      isDisabled = false,
      maxDate = '',
      minDate = '',
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder = '',
      size = 'md',
      value = '',
   }) => {
      const [calendar, setCalendar] = useState(new Date());
      const {
         getReferenceProps,
         getFloatingProps,
         refs,
         floatingStyles,
         context,
         setOpen,
         open,
      } = useDropdown({
         isDisabled,
         setCalendar,
         value,
      });
      const min = useMemo(() => {
         if (typeof minDate !== 'string') return undefined;
         const regex = /^\d{4}-\d{2}-\d{2}$/;
         if (!regex.test(minDate)) return undefined;
         const date = new Date(minDate);
         const [year, month, day] = minDate.split('-').map(Number);
         const isValid =
            date.getUTCFullYear() === year &&
            date.getUTCMonth() + 1 === month &&
            date.getUTCDate() === day;
         return isValid ? date : undefined;
      }, [minDate]);
      const max = useMemo(() => {
         if (typeof maxDate !== 'string') return undefined;
         const regex = /^\d{4}-\d{2}-\d{2}$/;
         if (!regex.test(maxDate)) return undefined;
         const date = new Date(maxDate);
         const [year, month, day] = maxDate.split('-').map(Number);
         const isValid =
            date.getUTCFullYear() === year &&
            date.getUTCMonth() + 1 === month &&
            date.getUTCDate() === day;
         return isValid ? date : undefined;
      }, [maxDate]);
      return (
         <Fragment>
            <Control
               dataCY={dataCY}
               error={error}
               getReferenceProps={getReferenceProps}
               max={max}
               min={min}
               name={name}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               refs={refs}
               size={size}
               value={value}
            />
            <Menu
               calendar={calendar}
               context={context}
               floatingStyles={floatingStyles}
               getFloatingProps={getFloatingProps}
               max={max}
               min={min}
               onChange={onChange}
               open={open}
               refs={refs}
               setCalendar={setCalendar}
               setOpen={setOpen}
            />
         </Fragment>
      );
   },
);
DateInput.propTypes = {
   'data-cy': string,
   error: bool,
   isDisabled: bool,
   maxDate: string,
   minDate: string,
   name: string,
   onBlur: func,
   onChange: func,
   onFocus: func,
   placeholder: string,
   size: oneOf(['lg', 'md', 'sm']),
   value: string,
};
export default DateInput;
