import React, { FC, ReactNode, useState } from 'react'

import styles from './Select.component.module.scss'

const Select: FC<{
  value: string,
  options: { label: string, value: string, disabled?: boolean }[],
  onChange: (value: string) => void,
  children: ReactNode
}> = ({
  value,
  options,
  onChange: onChangeHandler,
  children
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      {expanded && <div
        onClick={() => setExpanded(false)}
        className={styles.backdrop} />
      }
      <button
        onClick={() => setExpanded(o => !o)}
        className={`
          ${styles.expandButtonWrapper}
          ${value ? styles.active : ''}
        `}
      >
        <div className={styles.expandButtonInner}>
          <div>
            <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.57074
                8.17841C6.18082 8.45016 5.64053 8.41213 5.29271 8.06431L2.46428
                5.23588C2.07376 4.84536 2.07376 4.21219 2.46428 3.82167C2.8548
                3.43114 3.48797 3.43114 3.87849 3.82167L5.99982 5.94299L8.12117
                3.82164C8.51169 3.43112 9.14486 3.43112 9.53538 3.82164C9.9259
                4.21216 9.9259 4.84533 9.53538 5.23585L6.70695 8.06428C6.70432
                8.06691 6.70168 8.06953 6.69902 8.07213C6.65861 8.11167 6.61567
                8.14709 6.57074 8.17841Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
          </div>
          {children}
        </div>
        {value && <div
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onChangeHandler('')
          }}
          className={styles.clear}
        >
          <i>+</i>
        </div>}
      </button>
      {expanded && <ul className={styles.options}>
        {options.map(option => (
          <li
            value={option.value}
            key={option.value}
            className={
              `${styles.option} ${option.disabled ? styles.disabled : ''}`
            }
            onClick={() => {
              if (option.disabled) return
              setExpanded(false)
              onChangeHandler(option.value)
            }}
          >
            <div className={styles.outerRadio}>
              <div className={`
                ${styles.innerRadio}
                ${value === option.value ? styles.radioSelected : ''}
              `}>
              </div>
            </div>
            {option.label}
          </li>
        ))}
      </ul>}
    </div>
  )
}

export default Select
