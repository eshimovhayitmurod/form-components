import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styled from 'styled-components';
dayjs.extend(customParseFormat);
export const StyledControlInput = styled.div`
   position: relative;
   width: 100%;
   & input {
      background-color: #ffffff;
      border-color: #e1e1e1;
      border-radius: 10px;
      border-style: solid;
      border-width: 2px;
      color: #000000;
      font-size: 17px;
      font-weight: 500;
      height: 48px;
      outline: none;
      padding-left: 15px;
      padding-right: 45px;
      width: 100%;
      &[data-size='lg'] {
         font-size: 18px;
         height: 56px;
         padding-left: 18px;
         padding-right: 18px;
         border-radius: 12px;
      }
      &[data-size='sm'] {
         font-size: 16px;
         height: 40px;
         padding-left: 12px;
         padding-right: 12px;
      }
      &::placeholder {
         color: #717171;
      }
      &[data-error='true']:not(:disabled) {
         border-color: #e41d32;
      }
      &:hover:not(:disabled) {
         border-color: #3a79f3;
      }
      &:focus {
         border-color: #3a79f3;
      }
      &:disabled {
         background-color: #f4f4f4;
         color: #717171;
         cursor: default;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
   }
   & .dropdown-trigger {
      align-items: center;
      background-color: transparent;
      color: #808080;
      display: flex;
      justify-content: center;
      position: absolute;
      user-select: none;
      border-radius: 18px;
      height: 36px;
      right: 6px;
      top: 6px;
      width: 36px;
      &[data-size='lg'] {
         border-radius: 20px;
         height: 40px;
         right: 8px;
         top: 8px;
         width: 40px;
      }
      &[data-size='sm'] {
         border-radius: 16px;
         height: 32px;
         right: 4px;
         top: 4px;
         width: 32px;
      }
      &:hover:not([data-disabled='true']) {
         background-color: #f1f1f1;
      }
   }
   & .dropdown-trigger:not([data-disabled='true']) {
      cursor: pointer;
   }
   & h5 {
      color: #e41d32;
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      margin: 4px 0 0 0;
   }
`;
export const StyledInput = styled.div`
   width: 100%;
   & input {
      background-color: #ffffff;
      border-color: #e1e1e1;
      border-radius: 10px;
      border-style: solid;
      border-width: 2px;
      color: #000000;
      font-size: 17px;
      font-weight: 500;
      height: 48px;
      outline: none;
      padding-left: 15px;
      padding-right: 15px;
      width: 100%;
      &[data-size='lg'] {
         font-size: 18px;
         height: 56px;
         padding-left: 18px;
         padding-right: 18px;
         border-radius: 12px;
      }
      &[data-size='sm'] {
         font-size: 16px;
         height: 40px;
         padding-left: 12px;
         padding-right: 12px;
      }
      &::placeholder {
         color: #717171;
      }
      &[data-error='true']:not(:disabled) {
         border-color: #e41d32;
      }
      &:hover:not(:disabled) {
         border-color: #3a79f3;
      }
      &:focus {
         border-color: #3a79f3;
      }
      &:disabled {
         background-color: #f4f4f4;
         color: #717171;
         cursor: default;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }
   }
   & h5 {
      color: #e41d32;
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      margin: 4px 0 0 0;
   }
`;
