import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import styled from 'styled-components';
const StyledEditor = styled.div`
   border-radius: 8px;
   border: 1px solid #ccc;
   overflow: hidden;
   width: 100%;
   & .editor-toolbar {
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      padding: 5px;
      & button {
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
         &:hover {
            background-color: #f1f1f1;
         }
      }
   }
   .ProseMirror {
      height: 350px;
      max-height: 350px;
      min-height: 350px;
      outline: none;
      overflow-y: auto;
      padding: 10px;
      &:focus {
         outline: 1px solid blue;
      }
   }
`;
const MenuBar = ({ editor }) => {
   if (!editor) return null;
   const buttons = [
      {
         action: () => editor.chain().focus().undo().run(),
         active: false,
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M9.70711 3.70711C10.0976 3.31658 10.0976 2.68342 9.70711 2.29289C9.31658 1.90237 8.68342 1.90237 8.29289 2.29289L3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L8.29289 13.7071C8.68342 14.0976 9.31658 14.0976 9.70711 13.7071C10.0976 13.3166 10.0976 12.6834 9.70711 12.2929L6.41421 9H14.5C15.0909 9 15.6761 9.1164 16.2221 9.34254C16.768 9.56869 17.2641 9.90016 17.682 10.318C18.0998 10.7359 18.4313 11.232 18.6575 11.7779C18.8836 12.3239 19 12.9091 19 13.5C19 14.0909 18.8836 14.6761 18.6575 15.2221C18.4313 15.768 18.0998 16.2641 17.682 16.682C17.2641 17.0998 16.768 17.4313 16.2221 17.6575C15.6761 17.8836 15.0909 18 14.5 18H11C10.4477 18 10 18.4477 10 19C10 19.5523 10.4477 20 11 20H14.5C15.3536 20 16.1988 19.8319 16.9874 19.5052C17.7761 19.1786 18.4926 18.6998 19.0962 18.0962C19.6998 17.4926 20.1786 16.7761 20.5052 15.9874C20.8319 15.1988 21 14.3536 21 13.5C21 12.6464 20.8319 11.8012 20.5052 11.0126C20.1786 10.2239 19.6998 9.50739 19.0962 8.90381C18.4926 8.30022 17.7761 7.82144 16.9874 7.49478C16.1988 7.16813 15.3536 7 14.5 7H6.41421L9.70711 3.70711Z'
                  fill='currentColor'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().redo().run(),
         active: false,
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M15.7071 2.29289C15.3166 1.90237 14.6834 1.90237 14.2929 2.29289C13.9024 2.68342 13.9024 3.31658 14.2929 3.70711L17.5858 7H9.5C7.77609 7 6.12279 7.68482 4.90381 8.90381C3.68482 10.1228 3 11.7761 3 13.5C3 14.3536 3.16813 15.1988 3.49478 15.9874C3.82144 16.7761 4.30023 17.4926 4.90381 18.0962C6.12279 19.3152 7.77609 20 9.5 20H13C13.5523 20 14 19.5523 14 19C14 18.4477 13.5523 18 13 18H9.5C8.30653 18 7.16193 17.5259 6.31802 16.682C5.90016 16.2641 5.56869 15.768 5.34254 15.2221C5.1164 14.6761 5 14.0909 5 13.5C5 12.3065 5.47411 11.1619 6.31802 10.318C7.16193 9.47411 8.30653 9 9.5 9H17.5858L14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071C14.6834 14.0976 15.3166 14.0976 15.7071 13.7071L20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L15.7071 2.29289Z'
                  fill='currentColor'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
         active: 'heading',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  d='M6 3C6.55228 3 7 3.44772 7 4V11H17V4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V13H7V20C7 20.5523 6.55228 21 6 21C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z'
                  fill='currentColor'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleBold().run(),
         active: 'bold',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M6 2.5C5.17157 2.5 4.5 3.17157 4.5 4V20C4.5 20.8284 5.17157 21.5 6 21.5H15C16.4587 21.5 17.8576 20.9205 18.8891 19.8891C19.9205 18.8576 20.5 17.4587 20.5 16C20.5 14.5413 19.9205 13.1424 18.8891 12.1109C18.6781 11.9 18.4518 11.7079 18.2128 11.5359C19.041 10.5492 19.5 9.29829 19.5 8C19.5 6.54131 18.9205 5.14236 17.8891 4.11091C16.8576 3.07946 15.4587 2.5 14 2.5H6ZM14 10.5C14.663 10.5 15.2989 10.2366 15.7678 9.76777C16.2366 9.29893 16.5 8.66304 16.5 8C16.5 7.33696 16.2366 6.70107 15.7678 6.23223C15.2989 5.76339 14.663 5.5 14 5.5H7.5V10.5H14ZM7.5 18.5V13.5H15C15.663 13.5 16.2989 13.7634 16.7678 14.2322C17.2366 14.7011 17.5 15.337 17.5 16C17.5 16.663 17.2366 17.2989 16.7678 17.7678C16.2989 18.2366 15.663 18.5 15 18.5H7.5Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleItalic().run(),
         active: 'italic',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  d='M15.0222 3H19C19.5523 3 20 3.44772 20 4C20 4.55228 19.5523 5 19 5H15.693L10.443 19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H9.02418C9.00802 21.0004 8.99181 21.0004 8.97557 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H8.30704L13.557 5H10C9.44772 5 9 4.55228 9 4C9 3.44772 9.44772 3 10 3H14.9782C14.9928 2.99968 15.0075 2.99967 15.0222 3Z'
                  fill='currentColor'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleUnderline().run(),
         active: 'underline',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4V10C5 11.8565 5.7375 13.637 7.05025 14.9497C8.36301 16.2625 10.1435 17 12 17C13.8565 17 15.637 16.2625 16.9497 14.9497C18.2625 13.637 19 11.8565 19 10V4C19 3.44772 18.5523 3 18 3C17.4477 3 17 3.44772 17 4V10C17 11.3261 16.4732 12.5979 15.5355 13.5355C14.5979 14.4732 13.3261 15 12 15C10.6739 15 9.40215 14.4732 8.46447 13.5355C7.52678 12.5979 7 11.3261 7 10V4ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H4Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleStrike().run(),
         active: 'strike',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  d='M9.00039 3H16.0001C16.5524 3 17.0001 3.44772 17.0001 4C17.0001 4.55229 16.5524 5 16.0001 5H9.00011C8.68006 4.99983 8.36412 5.07648 8.07983 5.22349C7.79555 5.37051 7.55069 5.5836 7.36585 5.84487C7.181 6.10614 7.06155 6.40796 7.01754 6.72497C6.97352 7.04198 7.00623 7.36492 7.11292 7.66667C7.29701 8.18737 7.02414 8.75872 6.50344 8.94281C5.98274 9.1269 5.4114 8.85403 5.2273 8.33333C5.01393 7.72984 4.94851 7.08396 5.03654 6.44994C5.12456 5.81592 5.36346 5.21229 5.73316 4.68974C6.10285 4.1672 6.59256 3.74101 7.16113 3.44698C7.72955 3.15303 8.36047 2.99975 9.00039 3Z'
                  fill='currentColor'
               ></path>
               <path
                  d='M18 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H14C14.7956 13 15.5587 13.3161 16.1213 13.8787C16.6839 14.4413 17 15.2044 17 16C17 16.7956 16.6839 17.5587 16.1213 18.1213C15.5587 18.6839 14.7956 19 14 19H6C5.44772 19 5 19.4477 5 20C5 20.5523 5.44772 21 6 21H14C15.3261 21 16.5979 20.4732 17.5355 19.5355C18.4732 18.5979 19 17.3261 19 16C19 14.9119 18.6453 13.8604 18 13Z'
                  fill='currentColor'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleBulletList().run(),
         active: 'bulletList',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M7 6C7 5.44772 7.44772 5 8 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H8C7.44772 7 7 6.55228 7 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 6C2 5.44772 2.44772 5 3 5H3.01C3.56228 5 4.01 5.44772 4.01 6C4.01 6.55228 3.56228 7 3.01 7H3C2.44772 7 2 6.55228 2 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 18C2 17.4477 2.44772 17 3 17H3.01C3.56228 17 4.01 17.4477 4.01 18C4.01 18.5523 3.56228 19 3.01 19H3C2.44772 19 2 18.5523 2 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleHighlight().run(),
         active: 'highlight',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M14.7072 4.70711C15.0977 4.31658 15.0977 3.68342 14.7072 3.29289C14.3167 2.90237 13.6835 2.90237 13.293 3.29289L8.69294 7.89286L8.68594 7.9C8.13626 8.46079 7.82837 9.21474 7.82837 10C7.82837 10.2306 7.85491 10.4584 7.90631 10.6795L2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17V20C2 20.5523 2.44772 21 3 21H12C12.2652 21 12.5196 20.8946 12.7071 20.7071L15.3205 18.0937C15.5416 18.1452 15.7695 18.1717 16.0001 18.1717C16.7853 18.1717 17.5393 17.8639 18.1001 17.3142L22.7072 12.7071C23.0977 12.3166 23.0977 11.6834 22.7072 11.2929C22.3167 10.9024 21.6835 10.9024 21.293 11.2929L16.6971 15.8887C16.5105 16.0702 16.2605 16.1717 16.0001 16.1717C15.7397 16.1717 15.4897 16.0702 15.303 15.8887L10.1113 10.697C9.92992 10.5104 9.82837 10.2604 9.82837 10C9.82837 9.73963 9.92992 9.48958 10.1113 9.30297L14.7072 4.70711ZM13.5858 17L9.00004 12.4142L4 17.4142V19H11.5858L13.5858 17Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleSubscript().run(),
         active: 'subscript',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M17.405 1.40657C18.0246 1.05456 18.7463 0.92634 19.4492 1.04344C20.1521 1.16054 20.7933 1.51583 21.2652 2.0497L21.2697 2.05469L21.2696 2.05471C21.7431 2.5975 22 3.28922 22 4.00203C22 5.08579 21.3952 5.84326 20.7727 6.34289C20.1966 6.80531 19.4941 7.13675 18.9941 7.37261C18.9714 7.38332 18.9491 7.39383 18.9273 7.40415C18.4487 7.63034 18.2814 7.78152 18.1927 7.91844C18.1778 7.94155 18.1625 7.96834 18.1473 8.00003H21C21.5523 8.00003 22 8.44774 22 9.00003C22 9.55231 21.5523 10 21 10H17C16.4477 10 16 9.55231 16 9.00003C16 8.17007 16.1183 7.44255 16.5138 6.83161C16.9107 6.21854 17.4934 5.86971 18.0728 5.59591C18.6281 5.33347 19.1376 5.09075 19.5208 4.78316C19.8838 4.49179 20 4.25026 20 4.00203C20 3.77192 19.9178 3.54865 19.7646 3.37182C19.5968 3.18324 19.3696 3.05774 19.1205 3.01625C18.8705 2.97459 18.6137 3.02017 18.3933 3.14533C18.1762 3.26898 18.0191 3.45826 17.9406 3.67557C17.7531 4.19504 17.18 4.46414 16.6605 4.27662C16.141 4.0891 15.8719 3.51596 16.0594 2.99649C16.303 2.3219 16.7817 1.76125 17.4045 1.40689L17.405 1.40657Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().toggleSuperscript().run(),
         active: 'superscript',
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M17.4079 14.3995C18.0284 14.0487 18.7506 13.9217 19.4536 14.0397C20.1566 14.1578 20.7977 14.5138 21.2696 15.0481L21.2779 15.0574L21.2778 15.0575C21.7439 15.5988 22 16.2903 22 17C22 18.0823 21.3962 18.8401 20.7744 19.3404C20.194 19.8073 19.4858 20.141 18.9828 20.378C18.9638 20.387 18.9451 20.3958 18.9266 20.4045C18.4473 20.6306 18.2804 20.7817 18.1922 20.918C18.1773 20.9412 18.1619 20.9681 18.1467 21H21C21.5523 21 22 21.4477 22 22C22 22.5523 21.5523 23 21 23H17C16.4477 23 16 22.5523 16 22C16 21.1708 16.1176 20.4431 16.5128 19.832C16.9096 19.2184 17.4928 18.8695 18.0734 18.5956C18.6279 18.334 19.138 18.0901 19.5207 17.7821C19.8838 17.49 20 17.2477 20 17C20 16.7718 19.9176 16.5452 19.7663 16.3672C19.5983 16.1792 19.3712 16.0539 19.1224 16.0121C18.8722 15.9701 18.6152 16.015 18.3942 16.1394C18.1794 16.2628 18.0205 16.4549 17.9422 16.675C17.7572 17.1954 17.1854 17.4673 16.665 17.2822C16.1446 17.0972 15.8728 16.5254 16.0578 16.005C16.2993 15.3259 16.7797 14.7584 17.4039 14.4018L17.4079 14.3995L17.4079 14.3995Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().setTextAlign('left').run(),
         active: { textAlign: 'left' },
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 12C2 11.4477 2.44772 11 3 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H3C2.44772 13 2 12.5523 2 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 18C2 17.4477 2.44772 17 3 17H17C17.5523 17 18 17.4477 18 18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().setTextAlign('center').run(),
         active: { textAlign: 'center' },
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().setTextAlign('right').run(),
         active: { textAlign: 'right' },
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M8 12C8 11.4477 8.44772 11 9 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H9C8.44772 13 8 12.5523 8 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M6 18C6 17.4477 6.44772 17 7 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H7C6.44772 19 6 18.5523 6 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
      {
         action: () => editor.chain().focus().setTextAlign('justify').run(),
         active: { textAlign: 'justify' },
         icon: (
            <svg fill='currentColor' height='16' viewBox='0 0 24 24' width='16'>
               <path
                  clipRule='evenodd'
                  d='M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
               <path
                  clipRule='evenodd'
                  d='M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z'
                  fill='currentColor'
                  fillRule='evenodd'
               ></path>
            </svg>
         ),
      },
   ];
   return (
      <div className='editor-toolbar'>
         {buttons.map((btn, index) => (
            <button
               key={index}
               data-active={!!(btn.active && editor.isActive(btn.active))}
               onClick={e => {
                  e.preventDefault();
                  btn.action();
               }}
            >
               {btn.icon}
            </button>
         ))}
      </div>
   );
};
const Editor = ({ value, onChange }) => {
   const editor = useEditor({
      content: value,
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML());
      },
      extensions: [
         StarterKit,
         Underline,
         Subscript,
         Superscript,
         Highlight.configure({ multicolor: true }),
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
         Link.configure({ openOnClick: false }),
      ],
   });
   useEffect(() => {
      if (editor && value !== editor.getHTML()) {
         editor.commands.setContent(value);
      }
      return () => {
         if(editor) {
            editor.destroy()
         }
      }
   }, [value, editor]);
   return (
      <StyledEditor>
         <div>
            <MenuBar editor={editor} />
         </div>
         <div>
            <EditorContent editor={editor} />
         </div>
      </StyledEditor>
   );
};
export default Editor;
