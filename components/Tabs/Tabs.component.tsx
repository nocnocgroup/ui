import React, { FC, ReactNode, useState } from 'react'

import styles from './Tabs.component.module.scss'

const Tabs: FC<{
  tabs: {
    key?: string,
    label: string,
    content: ReactNode,
  }[],
  [k: string]: unknown
}> = ({ tabs, ...props }) => {
  const [curretTab, setCurrentTab] = useState(0)
  return (
    <div { ...props }>
      <div className={styles.header}>
        {tabs.map(({ label }, index) => (
          <div
            className={`
              ${styles.label}
              ${curretTab === index ? styles.active : ''}
            `}
            onClick={() => setCurrentTab(index) }
            key={index}
          >
            {label}
          </div>
        ))}
        <div className={styles.headerFiller}>

        </div>
      </div>
      <div className={styles.content}>
        {tabs[curretTab].content}
      </div>
    </div>
  )
}

export default Tabs
