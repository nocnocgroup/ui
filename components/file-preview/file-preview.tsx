import React, { FC } from 'react'

import Button from '../Button'
import { fileExtension, readableSize } from '../../../utils/file'

import trashIcon from './resources/trash.svg'
import genericIcon from './resources/generic.svg'
import csvIcon from './resources/csv.svg'
import xlsIcon from './resources/xls.svg'
import xlsxIcon from './resources/xlsx.svg'
import styles from './file-preview.styles.module.scss'

const FilePreview: FC<{
  file: File,
  removeText?: string
  onRemove?: () => void
}> = ({ file, onRemove: removeHandler, removeText = 'Remove' }) => {
  const extension = fileExtension(file)
  let extensionIcon = genericIcon
  if (extension === 'xls') extensionIcon = xlsIcon
  else if (extension === 'xlsx') extensionIcon = xlsxIcon
  else if (extension === 'xlsx') extensionIcon = csvIcon

  return (
    <div className={styles.fileWrapper}>
      <img src={extensionIcon} className={styles.formatIcon} alt="" />
      <div className={styles.fileInfoWrapper}>
        <div className={styles.fileName}>
          {file.name}
        </div>
        <div className={styles.fileSize}>
          {readableSize(file.size)}
        </div>
      </div>
      {removeHandler && <Button
        compact
        onClick={removeHandler}
        className={styles.fileRemove}
      >
        <img src={trashIcon} alt="" />
        {removeText}
      </Button>}
    </div>
  )
}

export default FilePreview
