import React, { FC, ReactNode } from 'react'

import styles from './Card.component.module.scss'

const Card: FC<{
  children?: ReactNode,
  className?: string,
  onClick?: () => void
}> = ({
  children,
  className = '',
  onClick: clickHandler
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={clickHandler}>
      {children}
    </div>
  )
}

export default Card
