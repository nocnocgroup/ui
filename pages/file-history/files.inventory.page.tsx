import React, { useEffect, useState } from 'react'
import axios from 'axios'

import axiosMod from '../../../utils/nextwork.utils'
import InfinitGrid from '../../components/Grid/Infinit'
import Notice, { NoticeType } from '../../components/notice'

import FileLinesModal
  from './modal/modal.files.inventory'
import styles from './Files.Inventory.page.module.scss'
import buildFileInventoryColumns from './file.inventory.columns'
import { File } from './types.file.inventory'

const LIMIT = 100

interface Props {
  t: (k: string) => string
  filterBySeller?: boolean
}

const InventoryFiles = ({
  t,
  filterBySeller = false
}: Props) => {
  const [fileList, setFileList] = useState<File[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [lastKey, setLastKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axiosMod.get(
        '/inventory/files',
        { params: { limit: LIMIT, fromId: lastKey } }
      )
      const newFetchedFiles = response.data.files
      setHasMore(newFetchedFiles.length >= LIMIT)
      setLastKey(response.data.last_key)
      setFileList(o => [...(o || []), ...newFetchedFiles])
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if ([400, 401, 403].includes(error.response?.status || 0)) {
          window.location.pathname = '/login'
        } else {
          setError(error.message || t('error_loading_files'))
        }
      }
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const columns = buildFileInventoryColumns(
    (file: File) => setSelectedFile(file),
    t
  )
  return (
    <>
      <div className={styles.headerContainer}>
        <div className="breadcrumb">
          <h1>{t('file_history')}</h1>
          <ul>
            <li>{t('inventory')}</li>
          </ul>
        </div>
      </div>
      <div className="separator-breadcrumb border-top" />
      {error && <Notice
        style={{ marginBottom: '24px' }}
        type={NoticeType.ERROR}
      >{error}</Notice>}
      { filterBySeller ? 'here goes the filter' : ''}
      <div>
        <InfinitGrid
          columns={columns}
          rows={fileList}
          rowKey={(file) => file.id as string}
          loading={isLoading}
          emptyMessage={t('no_files_to_show')}
          onBottomReach={() => {
            fileList &&
              fetchFiles()
          }}
          hasMore={hasMore}
        />
        {selectedFile && <FileLinesModal
          file={selectedFile as File}
          onDismiss={() => { setSelectedFile(null) }}
          t={t}
        />}
      </div>
    </>
  )
}

export default InventoryFiles
