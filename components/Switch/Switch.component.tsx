import React, { FC } from 'react'

import styles from './Switch.component.module.scss'

const Switch: FC<{
  value: boolean,
  onChange: (value: boolean) => void
}> = ({
  value,
  onChange
}) => {
  return (
    <label
      style={{ marginBottom: '0 !important' }}
      className={styles.switch}
    >
      <input checked={value} type="checkbox" onChange={(event) => {
        onChange(event.target.checked)
      }} />
      <span className={styles.slider}></span>
    </label>
  )
}

export default Switch
