import React, { KeyboardEvent, useEffect, useState } from 'react'

import { Stylable } from '../../types'
import styles from '../Input.component.module.scss'

export type Option<T> = { label: string, value: T }

type ChangeCallback<T> = (value: T | null) => void

interface Props<T> extends Stylable {
  value: T | null,
  label?: string,
  options: Option<T>[],
  description?: string,
  onChange: ChangeCallback<T>,
  onEnter?: ChangeCallback<T>,
  error?: string,
  icon?: string,
  placeholder?: string,
  onBlur?: () => void
  disabled?: boolean
}

const DropdownInput = <T = string>({
  value,
  error,
  options = [],
  label,
  description,
  onChange,
  onEnter,
  icon,
  placeholder,
  disabled = false,
  className = '',
  style = {},
  onBlur
}: Props<T>) => {
  const [currentValue, setCurrentValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(0)

  useEffect(() => {
    if (!value) return
    const option = options.find((o) => o.value === value)
    if (option) setCurrentValue(option.label)
  }, [value])

  useEffect(() => {
    const option = options.find(
      option => option.label.toLowerCase() === currentValue.toLowerCase()
    )
    onChange(option?.value ?? null)
  }, [currentValue])

  let filteredOptions = options
  if (currentValue) {
    filteredOptions = options.filter(
      o => o.label.toLowerCase().includes(currentValue.toLowerCase())
    )
  }

  const currentLabel = options.find(
    (o) => o.label.toLowerCase() === currentValue.toLowerCase()
  )?.label

  const keyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (filteredOptions.length > keyboardSelectedIndex) {
        const option = filteredOptions[keyboardSelectedIndex]
        setCurrentValue(option.label);
        (event.target as HTMLInputElement).blur()
        setIsFocused(false)
        onEnter && onEnter(option.value)
      }
    }

    if (!filteredOptions || filteredOptions.length === 0) return

    if (event.key === 'Escape') {
      (event.target as HTMLInputElement).blur()
      setIsFocused(false)
    }

    if (event.key === 'ArrowUp') {
      setKeyboardSelectedIndex(prev =>
        prev === 0
          ? filteredOptions.length - 1
          : prev - 1
      )
    }
    if (event.key === 'ArrowDown') {
      setKeyboardSelectedIndex(prev =>
        prev >= filteredOptions.length - 1
          ? 0
          : prev + 1
      )
    }
  }

  return (
    <div
      className={className}
      style={{ position: 'relative', ...style }}
      onBlur={onBlur}
    >
      { isFocused && !!filteredOptions?.length && <div
        className={styles.back}
        onClick={() => { setIsFocused(false) }}
      />}
      <div className={styles.outterWrapper}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={`
          ${styles.innerWrapper}
          ${filteredOptions?.length && isFocused ? styles.optionsOpen : ''}
          ${error ? styles.error : ''}
          ${disabled ? styles.disabled : ''}
        `}>
          <label className={styles.innerWrapperLabel}>
            {icon && <i className={`i-${icon}`} />}
            {(<input
              onFocus={() => {
                setIsFocused(true)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Tab') {
                  setIsFocused(false)
                }
              }}

              onKeyUp={keyUpHandler}
              className={`${error ? 'error' : ''}`}
              type="text"
              value={currentLabel || currentValue}
              placeholder={placeholder}
              onChange={(event) => {
                setKeyboardSelectedIndex(0)
                setCurrentValue(event.target.value)
              }}
              disabled={disabled}
              lang="en-US"
            />)}
            <div
              style={{
                opacity: currentValue ? '1' : '0',
                alignSelf: 'center'
              }}
              onClick={() => {
                if (!disabled) {
                  setCurrentValue('')
                }
              }}
              className={styles.clear}
            >
              <div>
                +
              </div>
            </div>
            <div className={styles.arrowDown} />
          </label>
        </div>
        {isFocused && !!filteredOptions?.length && (
          <ul className={styles.options}>
            {filteredOptions
              .map((option, index) => {
                const start = option.label.toLowerCase()
                  .indexOf(currentValue.toLowerCase())
                const end = start + currentValue.length
                return (
                  <li
                    className={`${styles.option} ${
                      index === keyboardSelectedIndex
                        ? styles.keyboardSelected
                        : ''
                    }`}
                    onMouseEnter={() => setKeyboardSelectedIndex(index)}
                    key={option.label}
                    onClick={() => {
                      setCurrentValue(option.label)
                      setIsFocused(false)
                    }}
                  >
                    {option.label.slice(0, start)}
                    <b>{option.label.slice(start, end)}</b>
                    {option.label.slice(end)}
                  </li>

                )
              })
            }
          </ul>
        )}
      </div>
      {error &&
        <div className={styles.errorMessage}>{error}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </div>
  )
}

export default DropdownInput
