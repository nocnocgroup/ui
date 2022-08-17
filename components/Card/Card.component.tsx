import React, { FC } from 'react'

import styles from './Card.component.module.scss'

const Card: FC = () => {
  return (
    <div className={styles.card}>
      <span>Card</span>
    </div>
  )
}

export default Card
