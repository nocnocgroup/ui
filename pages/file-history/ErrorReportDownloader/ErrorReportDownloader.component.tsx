import React, { useEffect, useState } from 'react'

import Loader from '../../../components/Loader'
import axiosMod from '../../../../utils/nextwork.utils'
import downloadIcon from '../resources/download.svg'
import downloadWhiteIcon from '../resources/download-white.svg'
import { File } from '../types.file.inventory'

import styles from './ErrorReportDownloader.component.module.scss'

interface Props {
  file: File,
  sellerId:string,
  compact?: boolean
  t: (k: string) => string
}

const ErrorReportDownloader = ({
  file,
  sellerId,
  compact = false,
  t
}: Props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [reportId, setReportId] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)

  const display = file.status === 'COMPLETED_WITH_ERRORS'

  const generateReport = async (fileId?: string | null) => {
    try {
      setIsProcessing(true)
      const res = await axiosMod.post(`/inventory/files/${fileId}/report`, {}, {
        headers: { 'X-Seller-Id': sellerId }
      })
      setReportId(res.data.id)
      const status = res.data.status
      if (status === 'PROCESSED_OK') {
        downloadReport(res.data.id)
        return
      }
      const processing = status === 'IN_PROCESS'
      setIsProcessing(processing)
    } catch (e) {
      setIsProcessing(false)
      if ((e as { request?: { status?: number } }).request?.status === 422) {
        setIsBlocked(true)
        return
      }
      alert(t('errors_file_error'))
      console.error(e)
    }
  }

  const getReportStatus = async (fileId: string | null) => {
    if (reportId !== '') {
      const url = `/inventory/files/${fileId}`
      const res = await axiosMod.get(url)
      const status = res.data.status
      const processing = status !== 'PROCESSED_OK' &&
          status !== 'COMPLETED_WITH_ERRORS'
      setIsProcessing(processing)
      if (status === 'PROCESSED_OK') {
        downloadReport(reportId)
      }
    }
  }

  const downloadReport = async (fileId: string | null) => {
    const res = await axiosMod
      .get(`inventory/files/${fileId}/reports/download-link`)
    location.href = res.data.download_link
    setIsProcessing(false)
  }

  useEffect(() => {
    if (reportId !== '') {
      getReportStatus(reportId)
    }
  }, [reportId])
  return (
    <>
      {isProcessing
        ? <Loader />
        : display && (
          compact
            ? (
              <div
                onClick={
                  () => !(isProcessing || isBlocked) && generateReport(file.id)
                }
                className={styles.clickable}
              >
                <img src={downloadIcon} alt="" />
              </div>
            )
            : (
              <button
                className={styles.reportButton}
                onClick={ () => generateReport(file.id)}
                disabled={isProcessing || isBlocked}
              >
                { !isProcessing && <>
                  {t('download_errors_file')}
                  <img
                    src={downloadWhiteIcon}
                    className={styles.downloadWhiteIcon}
                    alt=""
                  />
                </>}
              </button>
            )
        )
      }
    </>
  )
}

export default ErrorReportDownloader
