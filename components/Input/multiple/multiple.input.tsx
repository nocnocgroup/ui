import React, { ChangeEvent } from 'react'

import inputStyles from '../Input.component.module.scss'

import styles from './styles.multiple.input.module.scss'

export interface Mode<T extends string> {
  label: string
  mode: T
  placeholder?: string
  disabled?: boolean
}

interface Props<T extends string> {
  label?: string
  modes: Mode<T>[]
  mode: T
  value: string,
  disabled?: boolean,
  onChange: (mode: T, value: string) => void
}

const MultipleInput = <T extends string>({
  label,
  modes,
  mode,
  value,
  disabled = false,
  onChange: changeHandler
}: Props<T>) => {
  const modeChangeHandler =
    (event: ChangeEvent<HTMLSelectElement>) => changeHandler(
      event.target.value as T,
      value
    )

  const valueChangeHandler =
    (event: ChangeEvent<HTMLInputElement>) => changeHandler(
      mode,
      event.target.value
    )

  const clearHandler = () => {
    if (!disabled) {
      changeHandler(
        mode,
        ''
      )
    }
  }
  return (
    <div className={inputStyles.outterWrapper}>
      {label && <div className={inputStyles.label}>{label}</div>}
      <label
        className={`
          ${inputStyles.innerWrapper}
          ${inputStyles.innerWrapperLabel}
        `}
      >
        <label className={styles.modeSelectorWrapper}>
          <select
            value={mode}
            onChange={modeChangeHandler}
          >
            {modes.map(
              m => <option key={m.mode} value={m.mode}>{m.label}</option>
            )}
          </select>
          <div className={`${inputStyles.arrowDown} ${styles.arrowDown}`} />
        </label>
        <input
          type="text"
          value={value}
          onChange={valueChangeHandler}
          placeholder={modes.find(m => m.mode === mode)?.placeholder || ''}
        />
        <div
          style={{
            opacity: value ? '1' : '0',
            alignSelf: 'center'
          }}
          onClick={clearHandler}
          className={styles.clear}
        >
          <div>
            +
          </div>
        </div>
      </label>
    </div>
  )
}

export default MultipleInput
