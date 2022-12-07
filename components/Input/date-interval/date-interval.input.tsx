import React from 'react'

import inputStyles from '../Input.component.module.scss'

import styles from './styles.date-interval.input.module.scss'

interface Props {
  label?: string
  from: string,
  until: string,
  onChange: (from: string, until: string) => void
}

const DateIntervalInput = ({ label, from, until, onChange }: Props) => (
  <div className={inputStyles.outterWrapper}>
    {label && <div className={inputStyles.label}>{label}</div>}
    <label
      className={`
        ${inputStyles.innerWrapper}
        ${inputStyles.innerWrapperLabel}
      `}
    >
      <input
        className={`${styles.date} ${!from ? styles.placeholder : ''}`}
        value={from}
        onChange={(e) => onChange(e.target.value, until)}
        type="date"
      />
      {from && <div
        className={inputStyles.clear}
        onClick={() => onChange('', until)}
      >
        <div>+</div>
      </div>}
      <div>-</div>
      <input
        className={`${styles.date} ${!until ? styles.placeholder : ''}`}
        value={until}
        onChange={(e) => onChange(from, e.target.value)}
        type="date"
        min="2000-01-01"
      />
      {until && <div
        className={inputStyles.clear}
        onClick={() => onChange(from, '')}
      >
        <div>+</div>
      </div>}
    </label>
  </div>
)

export default DateIntervalInput
