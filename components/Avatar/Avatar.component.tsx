import React, { FC } from 'react'

import styles from './Avatar.component.module.scss'

const Avatar: FC<{name?: string}> = ({ name }) => {
  const initials = (name || 'No Name')
    .split(' ')
    .map(part => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={styles.avatar}>
      {initials}
    </div>
  )
}

export default Avatar
