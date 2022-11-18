import React, { FC, ReactNode } from 'react'

import styles from './Check.component.module.scss'

const Check: FC<{
  checked: boolean,
  isRadio?: boolean
  onChange: (newState: boolean) => void,
  children: ReactNode
}> = ({ checked, onChange, children, isRadio = false }) => (
  <label className={`${styles.label} ${checked ? styles.active : ''}`}>
    <input
      className={styles.checkbox}
      type={isRadio ? 'radio' : 'checkbox'}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <div>{ children }</div>
  </label>
)

export default Check
