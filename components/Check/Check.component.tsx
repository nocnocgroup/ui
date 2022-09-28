import React, { FC, ReactNode } from 'react'

import styles from './Check.component.module.scss'

const Check: FC<{
  checked: boolean,
  onChange: (newState: boolean) => void,
  children: ReactNode
}> = ({ checked, onChange, children }) => (
  <label className={`${styles.label} ${checked ? styles.active : ''}`}>
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <div>{ children }</div>
  </label>
)

export default Check
