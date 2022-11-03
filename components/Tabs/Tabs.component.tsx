import React, { FC, ReactNode } from 'react'

import styles from './Tabs.component.module.scss'

const Tabs: FC<{
  tabs: {
    key: string | number
    label: ReactNode
    content: ReactNode
    disabled?: boolean
  }[],
  current: string | number,
  onChange: (newTab: string | number) => void
  [k: string]: unknown
}> = ({ tabs, current, onChange, ...props }) => (
  <div { ...props }>
    <div className={styles.header}>
      {tabs.map(({ label, key, disabled }) => (
        <div
          className={`
            ${styles.label}
            ${current === key ? styles.active : ''}
          `}
          onClick={() => !disabled && onChange(key) }
          key={key}
        >
          <div className={`
            ${styles.labelContent}
            ${disabled ? styles.disabled : ''}
          `}>
            {label}
          </div>
        </div>
      ))}
      <div className={styles.headerFiller}>

      </div>
    </div>
    <div className={styles.content}>
      {tabs.find(tab => tab.key === current)?.content}
    </div>
  </div>
)

export default Tabs
