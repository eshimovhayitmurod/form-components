import styled from 'styled-components';
export const StyledContainer = styled.div`
   border-radius: 10px;
   box-sizing: border-box;
   cursor: pointer;
   min-height: 48px;
   outline: none;
   width: 100%;
   & * {
      box-sizing: border-box;
   }
   & .trigger {
      align-items: center;
      border-radius: 10px;
      border: 1.5px solid #e1e1e1;
      display: flex;
      justify-content: space-between;
      min-height: 48px;
      outline: none;
      padding: 4px 12px 4px 15px;
      width: 100%;
      &:focus {
         border: 1.5px solid #3a79f3;
      }
      &[data-error='true'] {
         border: 1.5px solid #e41d32;
      }
   }
`;
