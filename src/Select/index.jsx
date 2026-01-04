import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { defaultFilter } from './constants';
import Container from './Container';
import Menu from './Menu';
import useDropdown from './useDropdown';
const Select = ({
   'data-cy': dataCY,
   className = '',
   getUrl,
   isClearable = true,
   isDisabled = false,
   isError = false,
   isMultiple = false,
   isSearchable = true,
   noOptionsMessage = 'No options',
   onBlur,
   onChange,
   onFocus,
   options = [],
   placeholder = '',
   searchPlaceholder = 'Search',
   service, // api service
   type = 'select', // select | autocomplete
   value,
   getResponse = response => {
      const results = response?.data?.results;
      const hasMore = !!response?.data?.next;
      const options = Array.isArray(results) ? results : [];
      const newOptions = options.map(apiData => ({
         apiData,
         label: apiData?.name,
         value: apiData?.id,
      }));
      return { options: newOptions, hasMore };
   },
}) => {
   const inputRef = useRef(null);
   const listRef = useRef([]);
   const [apiOptions, setApiOptions] = useState([]);
   const [filter, setFilter] = useState(defaultFilter);
   const [hasMore, setHasMore] = useState(false);
   const [loading, setLoading] = useState(false);
   const search = filter?.search;
   const memoizedOptions = useMemo(() => {
      const newOptions = Array.isArray(options) ? options : [];
      const filteredOptions = newOptions.filter(option =>
         String(option?.label)
            .toLowerCase()
            .startsWith(String(search).toLowerCase())
      );
      const newApiOptions = Array.isArray(apiOptions) ? apiOptions : [];
      const memoizedOptions =
         type === 'select' ? filteredOptions : newApiOptions;
      return memoizedOptions;
   }, [options, apiOptions, type, search]);
   const {
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      open,
      refs,
      setOpen,
      setActiveIndex,
   } = useDropdown({
      isDisabled,
      isMultiple,
      listRef,
      options: memoizedOptions,
      setFilter,
      value,
   });
   useEffect(() => {
      listRef.current = new Array(memoizedOptions?.length).fill(null);
   }, [memoizedOptions?.length]);
   return (
      <Fragment>
         <Container
            className={className}
            dataCY={dataCY}
            getReferenceProps={getReferenceProps}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isError={isError}
            isMultiple={isMultiple}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            refs={refs}
            setOpen={setOpen}
            value={value}
         />
         <Menu
            activeIndex={activeIndex}
            apiOptions={apiOptions}
            context={context}
            filter={filter}
            floatingStyles={floatingStyles}
            getFloatingProps={getFloatingProps}
            getItemProps={getItemProps}
            getResponse={getResponse}
            getUrl={getUrl}
            hasMore={hasMore}
            inputRef={inputRef}
            isMultiple={isMultiple}
            isSearchable={isSearchable}
            listRef={listRef}
            loading={loading}
            noOptionsMessage={noOptionsMessage}
            onChange={onChange}
            open={open}
            options={memoizedOptions}
            refs={refs}
            searchPlaceholder={searchPlaceholder}
            service={service}
            setActiveIndex={setActiveIndex}
            setApiOptions={setApiOptions}
            setFilter={setFilter}
            setHasMore={setHasMore}
            setLoading={setLoading}
            setOpen={setOpen}
            type={type}
            value={value}
         />
      </Fragment>
   );
};
export default Select;
