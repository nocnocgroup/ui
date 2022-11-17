import React from 'react'

import { Column } from '../../components/Grid'

import styles from './Files.Inventory.page.module.scss'
import detailsIcon from './resources/zoom.svg'
import { File } from './types.file.inventory'
import ErrorReportDownloader from
  './ErrorReportDownloader/ErrorReportDownloader.component'
import StatusBadge from './components/file.inventory.badges'

const buildFileInventoryColumns = (
  onSelected: (file: File) => void,
  t: (k: string) => string
): Column<File>[] => [
  {
    title: t('file_name'),
    field: (file: File) => file.original_filename || file.file_key,
    width: '30%'
  },
  {
    title: t('uploaded_date') + ' ⌄',
    field: (file: File) =>
      (new Date(file.created_date as string)).toLocaleString()
  },
  {
    title: 'Type',
    field: (file: File) => <i>{
      file.type === 'update-product'
        ? 'Update stock & price'
        : file.type === 'seller-product-asin'
          ? 'Create via ASIN'
          : 'Standard create'
    }</i>
  },
  {
    title: t('current_status'),
    field: (file: File) => <StatusBadge status={file.status} />
  },
  {
    title: 'Details',
    field: (file: File) => (
      <div
        onClick={() => onSelected(file)}
        className={styles.clickable}
      >
        <img src={detailsIcon} alt="" />
      </div>
    ),
    width: '10px'
  },
  {
    title: 'Error file',
    field: (file: File) => (file.status === 'COMPLETED_WITH_ERRORS') &&
      <ErrorReportDownloader file={file} sellerId="25" compact t={t} />,
    width: '100px'
  }
]

export default buildFileInventoryColumns
