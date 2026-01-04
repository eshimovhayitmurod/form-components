import styled from 'styled-components';
import Spinner from './Spinner';
const StyledLoading = styled.div`
   align-items: center;
   display: flex;
   height: 100%;
   justify-content: center;
   width: 100%;
`;
const Loading = () => (
   <StyledLoading>
      <Spinner />
   </StyledLoading>
);
export default Loading;
