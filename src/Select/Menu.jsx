import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';
import { api } from './api';
import { defaultFilter } from './constants';
import Loading from './Loading';
import LoadingMore from './LoadingMore';
import NoOptions from './NoOptions';
import Option from './Option';
const StyledMenu = styled.div`
   background-color: #ffffff !important;
   border-radius: 12px;
   border: none;
   height: ${props => props.height + 'px !important'};
   max-height: ${props => props.height + 'px !important'};
   outline: none !important;
   overflow: hidden;
   padding: 0 0 6px 0;
   box-shadow: 0 1px 20px 0 rgba(13, 46, 105, 0.07),
      0 1px 20px 0 rgba(13, 46, 105, 0.07);
   & .menu-header {
      background-color: #ffffff;
      height: 47px;
      padding: 7px 6px 0 6px;
      & input {
         background-color: #ffffff;
         border-radius: 7px;
         border: 1.5px solid #e1e1e1;
         font-size: 16px;
         font-weight: 500;
         height: 40px;
         outline: none;
         padding-left: 12px;
         width: 100%;
         &:focus {
            border: 1.5px solid #3a79f3;
         }
      }
   }
   & .menu-body {
      padding: 6px 0 0 0;
      & .menu-list {
         height: 100%;
         overflow: auto;
         padding: 0 6px;
         &::-webkit-scrollbar {
            width: 7px;
         }
         &::-webkit-scrollbar-track {
            background-color: transparent;
         }
         &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.45);
            border-radius: 4px;
         }
         & .menu-items {
            border-radius: 7px;
            outline: none;
            overflow: hidden;
            position: relative;
            width: 100%;
         }
      }
   }
`;
const Menu = ({
   activeIndex,
   context,
   filter = {},
   floatingStyles,
   getFloatingProps,
   getItemProps,
   getResponse,
   getUrl,
   hasMore = false,
   inputRef,
   isMultiple = false,
   isSearchable = true,
   listRef,
   loading = false,
   noOptionsMessage = 'No options',
   onChange,
   open = false,
   options = [],
   refs,
   searchPlaceholder = 'Search',
   service,
   setActiveIndex,
   setApiOptions,
   setFilter,
   setHasMore,
   setLoading,
   setOpen,
   setPointer,
   type = 'select', // select | autocomplete
   value,
}) => {
   const abortController = useRef(null);
   const hasData = useMemo(() => options?.length > 0, [options]);
   const search = filter?.search;
   const page = filter?.page;
   const searchable = useMemo(() => {
      const searchable = type === 'select' ? !!isSearchable : true;
      return searchable;
   }, [isSearchable, type]);
   const maxHeight = useMemo(() => {
      const length = options?.length;
      const maxHeight =
         loading && page === 1
            ? 100
            : length === 0
            ? 100
            : length > 4
            ? 279
            : length * 44 + 59;
      return maxHeight;
   }, [options, loading, page]);
   const getData = useCallback(
      async ({ search = '', page = 1 }) => {
         if (abortController?.current) {
            abortController?.current?.abort();
         }
         abortController.current = new AbortController();
         const signal = abortController?.current?.signal;
         setLoading(true);
         try {
            const url = await getUrl({ search, page });
            const options = { url, signal };
            const apiService = typeof service === 'function' ? service : api;
            const response = await apiService(options);
            const transformedResponse = await getResponse(response);
            const hasMore = transformedResponse?.hasMore;
            setHasMore(hasMore);
            setApiOptions(apiOptions => {
               const options = transformedResponse?.options;
               const newOptions = Array.isArray(options) ? options : [];
               const newApiOptions =
                  page > 1 ? [...apiOptions, ...newOptions] : newOptions;
               return newApiOptions;
            });
         } catch (error) {
            if (!error?.code !== 'ERR_CANCELED') {
               if (page === 1) {
                  setApiOptions([]);
               }
               setHasMore(false);
            }
         } finally {
            if (!signal?.aborted) {
               setLoading(false);
            }
         }
      },
      [
         abortController,
         getResponse,
         getUrl,
         service,
         setApiOptions,
         setHasMore,
         setLoading,
      ]
   );
   const debouncedSearch = useDebouncedCallback(getData, [300]);
   const loadMore = useCallback(() => {
      if (!loading && hasMore) {
         const newFilter = {
            search,
            page: page + 1,
         };
         setFilter(newFilter);
         getData(newFilter);
      }
   }, [page, getData, loading, search, setFilter, hasMore]);
   const onSelect = useCallback(() => {
      if (activeIndex > -1) {
         setOpen(false);
         const valueList = Array.isArray(value) ? value : [];
         const foundValue = options.find(
            (_, index = 0) => index === activeIndex
         );
         const isSelected = valueList.some(
            value => value?.value === foundValue?.value
         );
         const addedList = [...valueList, foundValue];
         const removedList = valueList.filter(
            value => value?.value !== foundValue?.value
         );
         const multiValue = isSelected ? removedList : addedList;
         const newValue = isMultiple ? multiValue : foundValue;
         onChange(newValue);
         const filter = { search: '', page: 1 };
         setFilter(filter);
         if (type === 'autocomplete') {
            getData(filter);
         }
      }
   }, [
      activeIndex,
      getData,
      isMultiple,
      onChange,
      options,
      setFilter,
      setOpen,
      type,
      value,
   ]);
   const onInputChange = useCallback(
      e => {
         const search = e.target.value;
         const filter = { search, page: 1 };
         setFilter(filter);
         setActiveIndex(null);
         if (type === 'autocomplete') {
            debouncedSearch(filter);
         }
      },
      [setFilter, type, debouncedSearch, setActiveIndex]
   );
   useEffect(() => {
      if (type === 'autocomplete') {
         debouncedSearch(defaultFilter);
      }
   }, [type, debouncedSearch]);
   return (
      open && (
         <FloatingPortal id='floating-ui-portal'>
            <FloatingFocusManager context={context} modal={false}>
               <StyledMenu
                  {...getFloatingProps({
                     onKeyDown(e) {
                        if (e.key === 'Enter' && activeIndex !== null) {
                           onSelect();
                        }
                        if (e.key === 'ArrowUp') {
                           if (activeIndex === 0) {
                              inputRef.current.focus();
                              setActiveIndex(null);
                           }
                           if (activeIndex === null) {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveIndex(null);
                           }
                        }
                     },
                  })}
                  height={maxHeight}
                  ref={refs.setFloating}
                  style={floatingStyles}
                  tabIndex={-1}
               >
                  {searchable && (
                     <div className='menu-header'>
                        <input
                           onChange={onInputChange}
                           placeholder={searchPlaceholder}
                           ref={inputRef}
                           type='text'
                           value={search}
                           onKeyDown={e => {
                              if (e.key === 'ArrowDown') {
                                 e.preventDefault();
                                 setActiveIndex(0);
                              }
                              if (e.key === 'Enter' && activeIndex != null) {
                                 onSelect();
                                 setOpen(false);
                              }
                           }}
                        />
                     </div>
                  )}
                  <div
                     className='menu-body'
                     style={{
                        height: searchable ? 'calc(100% - 47px)' : '100%',
                     }}
                  >
                     <div className='menu-list'>
                        {loading && filter?.page === 1 ? (
                           <Loading />
                        ) : hasData ? (
                           <InfiniteScroll
                              className='menu-items'
                              hasMore={hasMore}
                              initialLoad={false}
                              loadMore={loadMore}
                              pageStart={1}
                              tabIndex={0}
                              threshold={150}
                              useWindow={false}
                           >
                              {options.map((option, index = 0) => (
                                 <Option
                                    activeIndex={activeIndex}
                                    getItemProps={getItemProps}
                                    index={index}
                                    isMultiple={isMultiple}
                                    key={`${option?.value}_${index}`}
                                    listRef={listRef}
                                    onSelect={onSelect}
                                    option={option}
                                    setPointer={setPointer}
                                    value={value}
                                 />
                              ))}
                              {hasMore && <LoadingMore key={options?.length} />}
                           </InfiniteScroll>
                        ) : (
                           <NoOptions noOptionsMessage={noOptionsMessage} />
                        )}
                     </div>
                  </div>
               </StyledMenu>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
