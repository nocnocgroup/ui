import React, {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  useRef,
  useState
} from 'react'

import Loader from '../Loader/Loader.component'

import icon from './uploader.svg'
import styles from './Uploader.component.module.scss'

export const getFileArray = (
  fileList: FileList | null,
  validate?: (f: File) => { isValid: boolean, message?: string }
) => {
  const validFiles = []
  if (fileList && fileList[0]) {
    for (let index = 0; index < fileList.length; index++) {
      const file = fileList[index]
      const validation = validate
        ? validate(file)
        : { isValid: true }
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        alert(validation.message)
      }
    }
  }
  return validFiles
}

const Uploader: FC<{
  onChange: (files: File[]) => void,
  accept?: string,
  multiple?: boolean,
  validate?: (files: File) => { isValid: boolean, message?: string },
  label: string,
  loading?: boolean
}> = ({
  onChange: onChangeHandler,
  loading = false,
  accept,
  multiple = false,
  validate,
  label
}) => {
  const fileInputElement = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    if (loading) return
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const dropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    if (loading) return
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const validFiles = getFileArray(e.dataTransfer.files, validate)
    if (validFiles.length === 0) return
    onChangeHandler(validFiles)
  }

  const browseHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const validFiles = getFileArray(e.target.files, validate)
    if (validFiles.length === 0) return
    onChangeHandler(validFiles)
  }

  return (
    <div
      onClick={() => {
        fileInputElement.current?.click()
      }}
      className={`
        ${styles.inputWrapper}
        ${dragActive && styles.active}
        ${loading && styles.loading}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={dropHandler}
      onDragOver={handleDrag}
    >
      {loading && <div className={styles.coverInput}>
        <Loader />
      </div>}
      <img src={icon} />
      <div>
        {label}
      </div>
      <input
        type="file"
        multiple={multiple}
        disabled={loading}
        ref={fileInputElement}
        onChange={browseHandler}
        accept={accept}
      />
    </div>
  )
}

export default Uploader
