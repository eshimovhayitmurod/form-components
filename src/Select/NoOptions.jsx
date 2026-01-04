import { useMemo } from 'react';
import styled from 'styled-components';
const StyledNoOptions = styled.div`
   align-items: center;
   display: flex;
   font-size: 16px;
   font-weight: 500;
   height: 100%;
   justify-content: center;
`;
const NoOptions = ({ noOptionsMessage = 'No options' }) => {
   const noOptions = useMemo(() => {
      const isValid = typeof noOptionsMessage === 'string' && noOptionsMessage;
      const noOptions = isValid ? noOptionsMessage : 'No options';
      return noOptions;
   }, [noOptionsMessage]);
   return <StyledNoOptions>{noOptions}</StyledNoOptions>;
};
export default NoOptions;
