import React, { FC } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import inputStyles from '../Input/Input.component.module.scss'

import h1Icon from './h1.TextArea.component.svg'
import h2Icon from './h2.TextArea.component.svg'
import h3Icon from './h3.TextArea.component.svg'
import boldIcon from './bold.TextArea.component.svg'
import italicIcon from './italic.TextArea.component.svg'
import pIcon from './p.TextArea.component.svg'
import brIcon from './br.TextArea.component.svg'
import ulIcon from './ul.TextArea.component.svg'
import olIcon from './ol.TextArea.component.svg'
import quoteIcon from './quote.TextArea.component.svg'
import clearIcon from './clear.TextArea.component.svg'
import hlIcon from './hl.TextArea.component.svg'
import styles from './TextArea.component.module.scss'

const MenuBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  // in case we want to set underline: https://tiptap.dev/api/marks/underline
  return (
    <>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 }) ? styles.active : ''
        }
      >
        <img src={h1Icon} alt="Header 1" title="Header 1" />
      </button>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 }) ? styles.active : ''
        }
      >
        <img src={h2Icon} alt="Header 2" title="Header 2" />
      </button>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 }) ? styles.active : ''
        }
      >
        <img src={h3Icon} alt="Header 3" title="Header 2" />
      </button>
      <button
        onClick={() => editor.chain().setParagraph().run()}
        className={editor.isActive('paragraph') ? styles.active : ''}
      >
        <img src={pIcon} alt="Paragraph" title="Paragraph" />
      </button>
      <button
        onClick={() => editor.chain().toggleBold().run()}
        className={editor.isActive('bold') ? styles.active : ''}
      >
        <img src={boldIcon} alt="Bold" title="Bold" />
      </button>
      <button
        onClick={() => editor.chain().toggleItalic().run()}
        className={editor.isActive('italic') ? styles.active : ''}
      >
        <img src={italicIcon} alt="Italic" title="Italic" />
      </button>
      <button
        onClick={() => editor.chain().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? styles.active : ''}
      >
        <img src={ulIcon} alt="Unordered list" title="Unordered list" />
      </button>
      <button
        onClick={() => editor.chain().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? styles.active : ''}
      >
        <img src={olIcon} alt="Ordered list" title="Ordered list" />
      </button>
      <button
        onClick={() => editor.chain().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? styles.active : ''}
      >
        <img src={quoteIcon} alt="Quote" title="Quote" />
      </button>
      <button onClick={() => editor.chain().setHorizontalRule().run()}>
        <img src={hlIcon} alt="Horizontal line" title="Horizontal line" />
      </button>
      <button onClick={() => editor.chain().setHardBreak().run()}>
        <img src={brIcon} alt="New line" title="New line" />
      </button>
      <button onClick={() => editor.chain().unsetAllMarks().clearNodes().run()}>
        <img src={clearIcon} alt="Clear format" title="Clear format" />
      </button>
      <hr style={{ marginTop: '8px', marginBottom: '0' }} />
    </>
  )
}

const TextArea: FC<{
  label?: string,
  value?: string,
  onChange?: (value: string) => void,
  description?: string,
  error?: string,
  className?: string,
  [key: string]: unknown
}> = ({
  label,
  value = '',
  onChange: onChangeHandler,
  description,
  error,
  className,
  ...props
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit
    ],
    content: value,
    onUpdate: (event) => onChangeHandler && onChangeHandler(
      event.editor.getHTML()
    )
  })

  return (
    <div
      className={`${className} ${inputStyles.outterWrapper}`}
      onClick={() => editor?.chain().focus()}
      {...props}
    >
      {label && <div className={inputStyles.label}>{label}</div>}
      <div
        className={`
          ${error ? inputStyles.error : ''}
          ${inputStyles.innerWrapper}
        `}
      >
        <div className={styles.textArea}>
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
          />
        </div>
      </div>
      {error &&
        <div className={inputStyles.errorMessage}>{error}</div>}
      {description && <div className={inputStyles.description}>
        {description}
      </div>}
    </div>
  )
}

export default TextArea
