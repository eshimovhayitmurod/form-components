import styled from 'styled-components';
import Spinner from './Spinner';
const StyledLoadingMore = styled.div`
   align-items: center;
   display: flex;
   height: 44px;
   justify-content: center;
   width: 100%;
`;
const LoadingMore = () => (
   <StyledLoadingMore>
      <Spinner />
   </StyledLoadingMore>
);
export default LoadingMore;
