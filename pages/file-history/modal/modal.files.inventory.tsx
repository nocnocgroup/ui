import React, { FC, useEffect, useState } from 'react'

import axiosMod from '../../../../utils/nextwork.utils'
import Modal from '../../../components/Modal'
import ErrorReportDownloaderComponent
  from '../ErrorReportDownloader/ErrorReportDownloader.component'
import InfinitGrid from '../../../components/Grid/Infinit'
import { File, Line, LinesResponse } from '../types.file.inventory'
import StatusBadge from '../components/file.inventory.badges'

import { buildFileLinesColumn } from './columns.modal.files.inventory'
import styles from './files.inventory.modal.styles.module.scss'

const PAGE_LIMIT = 10

const FileLinesModal: FC<{
  file: File,
  onDismiss: () => void,
  t: (k: string) => string
}> = ({
  file,
  onDismiss: onDismissHandler,
  t
}) => {
  const [fileLines, setFileLines] = useState<Line[] | null>(null)
  const [hasMore, sethasMore] = useState<boolean | null>(null)
  const [lastKey, setLastKey] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLines()
  }, [file])

  const fetchLines = async () => {
    try {
      setIsLoading(true)
      if (file) {
        const response = await axiosMod.get<LinesResponse>(
          `/inventory/files/${file.id}/lines`,
          {
            params: {
              limit: PAGE_LIMIT,
              fromId: lastKey
            }
          }
        )
        setFileLines(
          o => [...(o || []), ...response.data.lines]
        )
        sethasMore(response.data.lines.length >= PAGE_LIMIT)
        setLastKey(response.data.last_key)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      onDismiss={onDismissHandler}
    >
      <div className={styles.modalTitle}>Bulk upload file details</div>
      <div className={styles.detailsWrapper}>
        <div><label>Name:</label> {
          file.original_filename || file.file_key}</div>
        <div><label>Upload date:</label> {
          (new Date(file.created_date as string)).toLocaleString()}</div>
        <div><label>Upload type:</label> <i>{
          file.type === 'update-product'
            ? 'Update stock & price'
            : file.type === 'seller-product-asin'
              ? 'Create via ASIN'
              : 'Standard create'
        }</i></div>
        <div>
          <label>Status:</label>
          <div className={styles.statusWrapper}>
            <StatusBadge status={(file as File).status} />
            <ErrorReportDownloaderComponent
              file={file}
              sellerId={'25'}
              t={t}
            />
          </div>
        </div>
      </div>
      <InfinitGrid<Line>
        columns={buildFileLinesColumn(t)}
        rows={fileLines}
        hasMore={hasMore}
        rowKey={(line) => line.line}
        loading={isLoading}
        onBottomReach={() => fetchLines()}
        emptyMessage={t('no_file_lines_to_show')}
      />
    </Modal>
  )
}

export default FileLinesModal
