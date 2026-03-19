import { Fragment } from 'react';
import styled from 'styled-components';
import Heading from './Heading';
import Bold from './Icons/Bold';
import BulletList from './Icons/BulletList';
import Center from './Icons/Center';
import HighLight from './Icons/Highlight';
import Italic from './Icons/Italic';
import Justify from './Icons/Justify';
import Left from './Icons/Left';
import OrderedList from './Icons/OrderedList';
import Redo from './Icons/Redo';
import Right from './Icons/Right';
import Strike from './Icons/Strike';
import SubScript from './Icons/SubScript';
import SuperScript from './Icons/SuperScript';
import UnderLine from './Icons/Underline';
import Undo from './Icons/Undo';
import Tooltip from './Tooltip';
const StyledToolbar = styled.div`
   border-left-color: #e1e1e1;
   border-left-width: 1px;
   border-radius: 10px 10px 0 0;
   border-right-color: #e1e1e1;
   border-right-width: 1px;
   border-style: solid;
   border-top-color: #e1e1e1;
   border-top-width: 1px;
   display: flex;
   flex-wrap: wrap;
   gap: 5px;
   padding: 5px;
   & .tool-group {
      display: flex;
      gap: 2px;
      position: relative;
      &:not(:last-child):before {
         background-color: #e1e1e1;
         content: '';
         height: calc(100% - 4px);
         position: absolute;
         right: -3px;
         top: 2px;
         width: 1px;
      }
      .dark &:not(:last-child):before {
         background-color: #555555;
      }
      & .editor-toolbar-btn {
         background-color: transparent;
         border: none;
         border-radius: 12px;
         cursor: pointer;
         width: 32px;
         height: 32px;
         outline: none;
         display: flex;
         align-items: center;
         justify-content: center;
         &[data-active='true'] {
            background-color: #e2e2e2;
         }
         &:hover:not(:disabled) {
            background-color: #f1f1f1;
         }
         &:disabled {
            cursor: default;
         }
      }
      .dark & .editor-toolbar-btn {
         background-color: transparent !important;
         color: #ffffff !important;
         &[data-active='true'] {
            background-color: #222222 !important;
         }
         &:hover:not(:disabled) {
            background-color: #222222 !important;
         }
      }
   }
   .dark & {
      border-left-color: #555555;
      border-right-color: #555555;
      border-top-color: #555555;
   }
`;
const language = 'en';
const Toolbar = ({ editor, isDisabled = false }) => {
   if (!editor) return null;
   const toolGroups = [
      {
         buttons: [
            {
               action: () => editor.chain().focus().undo().run(),
               active: false,
               icon: <Undo />,
               title_en: 'Undo',
               title_ru: 'Отменить',
               title_uz: 'Bekor qilish',
            },
            {
               action: () => editor.chain().focus().redo().run(),
               active: false,
               icon: <Redo />,
               title_en: 'Redo',
               title_ru: 'Повторить',
               title_uz: 'Qayta bajarish',
            },
         ],
      },
      {
         buttons: [
            {
               type: 'heading',
               component: <Heading editor={editor} isDisabled={isDisabled} />,
            },
            {
               action: () => editor.chain().focus().toggleBulletList().run(),
               active: 'bulletList',
               icon: <BulletList />,
               title_en: 'Bullet List',
               title_ru: 'Маркированный список',
               title_uz: 'Belgili ro‘yxat',
            },
            {
               action: () => editor.chain().focus().toggleOrderedList().run(),
               active: 'orderedList',
               icon: <OrderedList />,
               title_en: 'Ordered List',
               title_ru: 'Нумерованный список',
               title_uz: 'Tartiblangan ro‘yxat',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleBold().run(),
               active: 'bold',
               icon: <Bold />,
               title_en: 'Bold',
               title_ru: 'Жирный',
               title_uz: 'Qalin',
            },
            {
               action: () => editor.chain().focus().toggleItalic().run(),
               active: 'italic',
               icon: <Italic />,
               title_en: 'Italic',
               title_ru: 'Курсив',
               title_uz: 'Kursiv',
            },
            {
               action: () => editor.chain().focus().toggleUnderline().run(),
               active: 'underline',
               icon: <UnderLine />,
               title_en: 'Underline',
               title_ru: 'Подчёркнутый',
               title_uz: 'Tagiga chizilgan',
            },
            {
               action: () => editor.chain().focus().toggleStrike().run(),
               active: 'strike',
               icon: <Strike />,
               title_en: 'Strike',
               title_ru: 'Зачёркнутый',
               title_uz: 'Ustidan chizilgan',
            },
            {
               action: () => editor.chain().focus().toggleHighlight().run(),
               active: 'highlight',
               icon: <HighLight />,
               title_en: 'Highlight',
               title_ru: 'Выделение',
               title_uz: 'Ajratish',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleSubscript().run(),
               active: 'subscript',
               icon: <SubScript />,
               title_en: 'Subscript',
               title_ru: 'Нижний индекс',
               title_uz: 'Pastki indeks',
            },
            {
               action: () => editor.chain().focus().toggleSuperscript().run(),
               active: 'superscript',
               icon: <SuperScript />,
               title_en: 'SuperScript',
               title_ru: 'Верхний индекс',
               title_uz: 'Yuqori indeks',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().setTextAlign('left').run(),
               active: { textAlign: 'left' },
               icon: <Left />,
               title_en: 'Left',
               title_ru: 'По левому краю',
               title_uz: 'Chapga',
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('center').run(),
               active: { textAlign: 'center' },
               icon: <Center />,
               title_en: 'Center',
               title_ru: 'По центру',
               title_uz: 'Markazga',
            },
            {
               action: () => editor.chain().focus().setTextAlign('right').run(),
               active: { textAlign: 'right' },
               icon: <Right />,
               title_en: 'Right',
               title_ru: 'По правому краю',
               title_uz: 'O‘ngga',
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('justify').run(),
               active: { textAlign: 'justify' },
               icon: <Justify />,
               title_en: 'Justify',
               title_ru: 'По ширине',
               title_uz: 'To‘liq tekislash',
            },
         ],
      },
   ];
   return (
      <StyledToolbar>
         {toolGroups.map((group, index) => (
            <div key={index} className='tool-group'>
               {group?.buttons?.map((btn, subIndex) => {
                  return btn?.type === 'heading' ? (
                     <Fragment key={`${index}_${subIndex}`}>
                        {btn?.component}
                     </Fragment>
                  ) : (
                     <Tooltip
                        isDisabled={isDisabled}
                        key={`${index}_${subIndex}`}
                        title={btn?.['title_' + language]}
                     >
                        <button
                           disabled={isDisabled}
                           type='button'
                           className='editor-toolbar-btn'
                           data-active={
                              !!(btn.active && editor.isActive(btn.active))
                           }
                           onClick={e => {
                              e.preventDefault();
                              btn.action();
                           }}
                        >
                           {btn.icon}
                        </button>
                     </Tooltip>
                  );
               })}
            </div>
         ))}
      </StyledToolbar>
   );
};
export default Toolbar;
