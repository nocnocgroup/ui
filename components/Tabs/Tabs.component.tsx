import React, { FC, ReactNode } from 'react'

import styles from './Tabs.component.module.scss'

const Tabs: FC<{
  tabs: {
    key: string | number,
    label: string,
    content: ReactNode,
  }[],
  current: string | number,
  onChange: (newTab: string | number) => void
  [k: string]: unknown
}> = ({ tabs, current, onChange, ...props }) => (
  <div { ...props }>
    <div className={styles.header}>
      {tabs.map(({ label, key }) => (
        <div
          className={`
            ${styles.label}
            ${current === key ? styles.active : ''}
          `}
          onClick={() => onChange(key) }
          key={key}
        >
          {label}
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
