import { any, bool, oneOf, string } from 'prop-types';
import { memo } from 'react';
import styled from 'styled-components';
const StyledLabel = styled.label`
   align-items: center;
   color: #949494;
   display: inline-flex;
   font-size: 14px;
   font-weight: 500;
   margin: 0 0 3px 0;
   &[data-size='lg'] {
      font-size: 16px;
      margin: 0 0 4px 0;
   }
   &[data-size='sm'] {
      font-size: 12px;
      margin: 0 0 2px 0;
   }
   & strong {
      color: #d32f2f;
      font-weight: 700;
      margin: 0 0 0 4px;
   }
`;
const Label = memo(({ children, isRequired = false, htmlFor, size = 'md' }) => (
   <StyledLabel htmlFor={htmlFor} data-size={size}>
      {children}
      {isRequired && <strong>*</strong>}
   </StyledLabel>
));
Label.propTypes = {
   children: any,
   htmlFor: string,
   isRequired: bool,
   size: oneOf(['lg', 'md', 'sm']),
};
export default Label;
