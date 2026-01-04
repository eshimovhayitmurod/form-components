import styled, { keyframes } from 'styled-components';
const animation1 = keyframes`
   0% {
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
   }
   50% {
      clip-path: polygon(
         0% 0%,
         0% 100%,
         0% 100%,
         50% 50%,
         100% 0%,
         100% 0%,
         0% 0%
      );
   }
   100% {
      clip-path: polygon(
         0% 0%,
         0% 100%,
         100% 100%,
         50% 50%,
         100% 100%,
         100% 0%,
         0% 0%
      );
   }
`;
const animation2 = keyframes`
   to {
      transform: rotate(1turn);
   }
`;
const StyledSpinner = styled.div`
   height: 23px;
   width: 23px;
   & div {
      animation: ${animation1} 0.7s linear alternate infinite,
         ${animation2} 0.3s linear infinite;
      border-radius: 50%;
      border: 2px solid #3a79f3;
      box-sizing: border-box;
      height: 23px;
      width: 23px;
   }
`;
const Spinner = () => (
   <StyledSpinner>
      <div></div>
   </StyledSpinner>
);
export default Spinner;
