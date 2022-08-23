import React, { FC } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import inputStyles from '../Input/Input.component.module.scss'

import styles from './TextArea.component.module.scss'

const MenuBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 }) ? styles.active : ''
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 }) ? styles.active : ''
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 }) ? styles.active : ''
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive('heading', { level: 4 }) ? styles.active : ''
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().toggleBold().run()}
        className={editor.isActive('bold') ? styles.active : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().toggleItalic().run()}
        className={editor.isActive('italic') ? styles.active : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().setParagraph().run()}
        className={editor.isActive('paragraph') ? styles.active : ''}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? styles.active : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? styles.active : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? styles.active : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().setHorizontalRule().run()}>
        vertical line
      </button>
      <button onClick={() => editor.chain().setHardBreak().run()}>
        line break
      </button>
      <button onClick={() => editor.chain().unsetAllMarks().run()}>
        clear formating
      </button>
      <button onClick={() => editor.chain().clearNodes().run()}>
        clear elements
      </button>
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
