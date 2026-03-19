import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';
import Toolbar from './Toolbar';
import DOMPurify from 'dompurify';
const StyledEditor = styled.div`
   border-radius: 10px;
   overflow: hidden;
   width: 100%;
   .ProseMirror {
      border-radius: 0 0 10px 10px;
      border: 1px solid;
      height: 350px;
      max-height: 350px;
      min-height: 350px;
      outline: none;
      overflow-y: auto;
      padding: 10px;
      border-color: #e1e1e1;
      &[data-error='true'] {
         border-color: #e41d32;
      }
      &:focus {
         border-color: #3a79f3;
      }
   }
   .dark & .ProseMirror {
      border-color: #555555;
      &[data-error='true'] {
         border-color: #e41d32;
      }
      &:focus {
         border-color: #3a79f3;
      }
   }
   .ProseMirror * {
      all: revert;
      color: #000000 !important;
      isolation: isolate;
   }
`;
const sanitizeHtml = (html = '') => {
   const cleanHTML = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      KEEP_CONTENT: true,
      SANITIZE_DOM: true,
      ALLOWED_URI_REGEXP:
         /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-]|$))/i,
      FORBID_TAGS: ['script', 'style'],
      FORBID_ATTR: ['onerror', 'onclick'],
   });
   return cleanHTML;
};
const Editor = ({
   'data-cy': dataCY,
   isDisabled = false,
   isError = false,
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   value,
}) => {
   const editor = useEditor({
      content: value,
      injectCSS: false,
      onBlur,
      onFocus,
      onUpdate: ({ editor }) => {
         if (!isDisabled) {
            const rawHtml = editor.getHTML();
            const cleanHtml = sanitizeHtml(rawHtml);
            onChange(cleanHtml);
         }
      },
      extensions: [
         StarterKit.configure({
            bulletList: true,
            orderedList: true,
            listItem: true,
         }),
         Highlight.configure({ multicolor: true }),
         Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
         Subscript,
         Superscript,
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      editorProps: {
         editable: () => !isDisabled,
         attributes: { 'data-cy': dataCY, 'data-error': !!isError },
         transformPastedHTML(html) {
            const cleanHtml = sanitizeHtml(html);
            return cleanHtml;
         },
      },
   });
   return (
      <StyledEditor>
         <div>
            <Toolbar isDisabled={!!isDisabled} editor={editor} />
         </div>
         <EditorContent editor={editor} />
      </StyledEditor>
   );
};
export default Editor;
