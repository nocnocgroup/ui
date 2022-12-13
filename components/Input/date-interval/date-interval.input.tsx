import React, { useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import inputStyles from '../Input.component.module.scss'

import styles from './styles.date-interval.input.module.scss'

interface Props {
  label?: string
  from: Date | null,
  until: Date | null,
  onChangeFrom: (from: Date | null) => void
  onChangeUntil: (until: Date | null) => void
}

const DateIntervalInput = ({
  label,
  from,
  until,
  onChangeFrom,
  onChangeUntil
}: Props) => {
  const [isFromSelectorExpanded, setIsFromSelectorExpanded] = useState(false)
  const [isUntilSelectorExpanded, setIsUntilSelectorExpanded] = useState(false)
  const isSelectorExpanded = isFromSelectorExpanded || isUntilSelectorExpanded

  return (
    <div className={inputStyles.outterWrapper}>
      {label && <div className={inputStyles.label}>{label}</div>}
      <label
        className={`
          ${inputStyles.innerWrapper}
          ${inputStyles.innerWrapperLabel}
        `}
      >
        <div className={styles.gridWrapper}>
          <div className={styles.innerWrapper}>
            <div
              onClick={() => {
                setIsFromSelectorExpanded(true)
                setIsUntilSelectorExpanded(false)
              }}
              className={`
                ${styles.dateInput}
                ${from ? '' : styles.anytime}
              `}
            >
              {from ? format(from, 'PP') : 'anytime'}
            </div>
            {from && <div
              className={inputStyles.clear}
              onClick={() => onChangeFrom(null)}
            >
              <div>+</div>
            </div>}
          </div>
          <div className={styles.separator}>to</div>
          <div className={styles.innerWrapper}>
            <div
              onClick={() => {
                setIsFromSelectorExpanded(false)
                setIsUntilSelectorExpanded(true)
              }}
              className={`
                ${styles.dateInput}
                ${until ? '' : styles.anytime}
              `}
            >
              {until ? format(until, 'PP') : 'anytime'}
            </div>
            {until && <div
              className={inputStyles.clear}
              onClick={() => onChangeUntil(null)}
            >
              <div>+</div>
            </div>}
          </div>
        </div>
        {isSelectorExpanded && <div
          className={styles.selectorOverlay}
          onClick={() => {
            setIsFromSelectorExpanded(false)
            setIsUntilSelectorExpanded(false)
          }}
        />}
        {isSelectorExpanded && <div className={styles.selectorsWrapper}>
          {isFromSelectorExpanded && <DayPicker
            mode="single"
            toDate={until || new Date()}
            selected={from ?? undefined}
            onSelect={(d) => {
              onChangeFrom(d ?? null)
              setIsFromSelectorExpanded(false)
            }}
          />}
          {isUntilSelectorExpanded && <DayPicker
            mode="single"
            fromDate={from ?? undefined}
            toDate={new Date()}
            selected={until ?? undefined}
            onSelect={(d) => {
              onChangeUntil(d ?? null)
              setIsUntilSelectorExpanded(false)
            }}
          />}
        </div>}
      </label>
    </div>
  )
}

export default DateIntervalInput
