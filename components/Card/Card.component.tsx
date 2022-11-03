import React, { FC, ReactNode } from 'react'

import styles from './Card.component.module.scss'

const Card: FC<{ children?: ReactNode, className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  )
}

export default Card
