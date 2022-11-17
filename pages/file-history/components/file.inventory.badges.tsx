import React from 'react'

import processingIcon from '../resources/clock.svg'
import completedIcon from '../resources/check.svg'
import processedWithErrorsIcon from '../resources/exclamation.svg'
import { LineStatus, FileStatus } from '../types.file.inventory'

import styles from './file.inventory.badge.styles.module.scss'

type Status = FileStatus | LineStatus

const StatusBadge = ({ status }: { status?: Status }) => {
  switch (status) {
  case 'CREATED':
  case 'PROCESSING':
    return <div className={styles.processingBadge}>
      <img src={processingIcon} alt="" /> processing
    </div>
  case 'COMPLETED':
  case 'PROCESSED_OK':
    return <div className={styles.completedBadge}>
      <img src={completedIcon} alt="" /> completed
    </div>
  case 'PROCESSED_WITH_ERRORS':
    return <div className={styles.completedWithErrorsBadge}>
      <img src={processedWithErrorsIcon} alt="" /> processed with errors
    </div>
  case 'COMPLETED_WITH_ERRORS':
    return <div className={styles.completedWithErrorsBadge}>
      <img src={processedWithErrorsIcon} alt="" /> completed with errors
    </div>
  }
  return <div className={styles.standardBadge}>
    {status}
  </div>
}

export default StatusBadge
