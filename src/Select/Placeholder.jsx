import { useMemo } from 'react';
import styled from 'styled-components';
const StyledPlaceholder = styled.div`
   color: #949494;
   font-size: 16px;
   font-weight: 500;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   width: calc(100% - 18px);
`;
const Placeholder = ({ placeholder = 'Select' }) => {
   const memoizedPlaceholder = useMemo(() => {
      const isValid = typeof placeholder === 'string' && placeholder;
      const memoizedPlaceholder = isValid ? placeholder : '';
      return memoizedPlaceholder;
   }, [placeholder]);
   return <StyledPlaceholder>{memoizedPlaceholder}</StyledPlaceholder>;
};
export default Placeholder;
