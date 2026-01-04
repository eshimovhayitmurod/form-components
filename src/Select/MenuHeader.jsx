import { useCallback } from 'react';
import styled from 'styled-components';
const StyledMenuHeader = styled.div`
   height: 47px;
   padding: 7px 6px 0 6px;
   position: relative;
   & input {
      border-radius: 7px;
      border: 1.5px solid #e1e1e1;
      font-size: 16px;
      font-weight: 500;
      height: 40px;
      outline: none;
      padding-left: 12px;
      padding-right: 36px;
      width: 100%;
      background-color: transparent;
      &:focus {
         border: 1.5px solid #3a79f3;
      }
   }
   &:focus-within {
      & .search-icon {
         color: #3a79f3;
      }
   }
   & .search-icon {
      align-items: center;
      color: #949494;
      display: flex;
      height: 24px;
      justify-content: center;
      position: absolute;
      right: 15px;
      top: 14px;
      width: 24px;
      z-index: -1;
   }
`;
const MenuHeader = ({
   activeIndex,
   debouncedSearch,
   inputRef,
   onSelect,
   search = '',
   searchPlaceholder = 'Search',
   setActiveIndex,
   setFilter,
   setOpen,
   type = 'select', // select | autocomplete
}) => {
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
   const onKeyDown = useCallback(
      e => {
         if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(0);
         }
         if (e.key === 'Enter' && activeIndex !== null) {
            onSelect();
            setOpen(false);
         }
      },
      [activeIndex, onSelect, setOpen, setActiveIndex]
   );
   return (
      <StyledMenuHeader>
         <input
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder={searchPlaceholder}
            ref={inputRef}
            type='text'
            value={search}
         />
         <span className='search-icon'>
            <svg
               fill='none'
               height='21'
               stroke='currentColor'
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth='2'
               viewBox='0 0 24 24'
               width='21'
            >
               <circle cx='11' cy='11' r='8' />
               <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
         </span>
      </StyledMenuHeader>
   );
};
export default MenuHeader;
