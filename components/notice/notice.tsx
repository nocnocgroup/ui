import React, { CSSProperties, FC, ReactNode } from 'react'

import { NoticeType } from './notice.types'
import styles from './notice.styles.module.scss'

const Notice: FC<{
  className?: string,
  style?: CSSProperties
  type?: NoticeType
  children?: ReactNode
}> = ({ type = NoticeType.INFO, className = '', style = {}, children }) => (
  <div
    className={`
      ${styles.notice}
      ${type === NoticeType.INFO ? styles.info : null}
      ${type === NoticeType.WARNING ? styles.warn : null}
      ${type === NoticeType.ERROR ? styles.error : null}
      ${className}
    `}
    style={style}
  >
    {children}
  </div>
)

export default Notice
