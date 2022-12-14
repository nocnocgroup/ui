import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { Stylable } from '../types'

import styles from './Input.component.module.scss'

export type ComplexOption = { value: string, label: string }
type Option = string | ComplexOption

// DEPRECATION WARNING: this will be for input controls,
// please use the dropdow component
interface Props extends Stylable {
  value?: string,
  error?: string,
  options?: Option[],
  type?: string,
  label?: ReactNode,
  description?: string,
  onChange?: (value: string) => void,
  onEnter?: (value: string) => void,
  icon?: string,
  placeholder?: string,
  clearable?: boolean,
  step?: number,
  min?: number,
  max?: number,
  name?: string,
  noSort?: boolean,
  onBlur?: () => void
  disabled?: boolean
}

const Input = ({
  value,
  error,
  options,
  type,
  label,
  description,
  onChange,
  onEnter,
  icon,
  name,
  step,
  min,
  max,
  placeholder,
  clearable = false,
  noSort = false,
  disabled = false,
  className = '',
  style = {},
  onBlur
}: Props) => {
  const [currentValue, setCurrentValue] = useState(value || '')
  const [isFocused, setIsFocused] = useState(false)
  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState(0)

  const outterElem = useRef(null)

  useEffect(() => {
    if (value) {
      setCurrentValue(value)
    }
  }
  , [value])

  useEffect(() => {
    if (!options || !currentValue) {
      return onChange && onChange(currentValue || '')
    }
    const option = options.find(
      (option) => typeof option === 'string'
        ? option === currentValue
        : option.value === currentValue
    )

    if (option) onChange && onChange(currentValue)
    else onChange && onChange('')
  }
  , [currentValue])

  let filteredOptions = options
  if (currentValue) {
    filteredOptions = options?.filter(
      (option) => {
        const labelVal = typeof option === 'string' ? option : option.label
        return labelVal.toLowerCase().includes(currentValue.toLowerCase())
      }
    )
  }

  if (!noSort) {
    filteredOptions?.sort((a, b) => {
      const aLabel = typeof a === 'string' ? a : a.label
      const bLabel = typeof b === 'string' ? b : b.label
      return aLabel.toLowerCase() > bLabel.toLowerCase() ? -1 : 1
    })
  }

  const currentOption = options?.find(
    (option) => typeof option === 'string'
      ? option === currentValue
      : option.value === currentValue
  )

  const currentLabel = typeof currentOption === 'string'
    ? currentOption
    : currentOption?.label

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
      <div
        ref={outterElem}
        className={styles.outterWrapper}
      >
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
              name={name}
              onFocus={() => {
                setIsFocused(true)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Tab') {
                  setIsFocused(false)
                }
              }}

              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  if (filteredOptions &&
                    filteredOptions.length > keyboardSelectedIndex) {
                    const option = filteredOptions[keyboardSelectedIndex]
                    setCurrentValue(
                      typeof option === 'string' ? option : option.value
                    );
                    (event.target as HTMLInputElement).blur()
                    setIsFocused(false)
                  }
                  onEnter && onEnter(currentValue)
                }

                if (!filteredOptions || filteredOptions.length === 0) return

                if (event.key === 'Escape') {
                  (event.target as HTMLInputElement).blur()
                  setIsFocused(false)
                }

                if (event.key === 'ArrowUp') {
                  setKeyboardSelectedIndex(prev =>
                    prev === 0
                      ? (filteredOptions as Option[]).length - 1
                      : prev - 1
                  )
                }
                if (event.key === 'ArrowDown') {
                  setKeyboardSelectedIndex(prev =>
                    prev >= (filteredOptions as Option[]).length - 1
                      ? 0
                      : prev + 1
                  )
                }
              }}
              className={`${error ? 'error' : ''}`}
              type={ type || 'text'}
              value={currentLabel || currentValue}
              placeholder={placeholder}
              onChange={(event) => {
                setKeyboardSelectedIndex(0)
                setCurrentValue(event.target.value)
              }}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              lang="en-US"
            />)}
            {
              (clearable || options) && <i
                style={{
                  opacity: currentValue ? '1' : '0',
                  alignSelf: type === 'textarea' ? 'flex-start' : 'center'
                }}
                onClick={() => {
                  if (!disabled) {
                    setCurrentValue('')
                  }
                }}
                className={`${styles.clear} i-Close`}
              />
            }
            {options && <i className={`${styles.clear} i-Down-3`} />}
          </label>
        </div>
        {isFocused && !!filteredOptions?.length && (
          <ul className={styles.options}>
            {filteredOptions
              .map((option, index) => {
                const value = typeof option === 'string' ? option : option.value
                const label = typeof option === 'string' ? option : option.label
                const start = label.toLowerCase()
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
                    key={`${value}-${label}`}
                    onClick={() => {
                      setCurrentValue(value)
                      setIsFocused(false)
                    }}
                  >
                    {label.slice(0, start)}
                    <b>{label.slice(start, end)}</b>
                    {label.slice(end)}
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

export default Input
