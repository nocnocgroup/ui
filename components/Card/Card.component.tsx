import React, { FC, ReactNode } from 'react'

import styles from './Card.component.module.scss'

const Card: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}

export default Card
