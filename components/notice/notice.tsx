import React, { FC, ReactNode } from 'react'

import { NoticeType } from './notice.types'
import styles from './notice.styles.module.scss'

const Notice: FC<{
  type?: NoticeType
  children?: ReactNode
}> = ({ type = NoticeType.INFO, children }) => (
  <div className={`
    ${styles.notice}
    ${type === NoticeType.INFO ? styles.info : null}
    ${type === NoticeType.WARNING ? styles.warn : null}
    ${type === NoticeType.ERROR ? styles.error : null}
  `}>{children}</div>
)

export default Notice
