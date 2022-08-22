import React, { FC, useEffect, useRef, useState } from 'react'

import styles from './Input.component.module.scss'

export type ComplexOption = { value: string, label: string }
type Option = string | ComplexOption

const Input: FC<{
  value?: string,
  error?: string,
  options?: Option[],
  type?: string,
  label?: string,
  description?: string,
  onChange?: (value: string) => void,
  onEnter?: (value: string) => void,
  icon?: string,
  placeholder?: string,
  clearable?: boolean,
  name?: string,
  disabled?: boolean,
  [key: string]: unknown
}> = ({
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
  placeholder,
  clearable = true,
  disabled = false,
  ...props
}) => {
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

  filteredOptions?.sort((a, b) => {
    const aLabel = typeof a === 'string' ? a : a.label
    const bLabel = typeof b === 'string' ? b : b.label
    return aLabel.toLowerCase() > bLabel.toLowerCase() ? -1 : 1
  })

  const currentOption = options?.find(
    (option) => typeof option === 'string'
      ? option === currentValue
      : option.value === currentValue
  )

  const currentLabel = typeof currentOption === 'string'
    ? currentOption
    : currentOption?.label

  return (
    <div style={{ position: 'relative' }} {...props}>
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
            { type === 'textarea'
              ? (
                <textarea
                  name={name}
                  onFocus={() => {
                    setIsFocused(true)
                  }}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      onEnter && onEnter(currentValue)
                    }
                  }}
                  className={`${error ? 'error' : ''}`}
                  value={currentLabel || currentValue}
                  placeholder={placeholder}
                  onChange={(event) => setCurrentValue(event.target.value)}
                  disabled={disabled}
                  rows={3}
                />
              )
              : (
                <input
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
                  disabled={disabled}
                />
              )
            }
            {
              clearable && <i
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
        {description && <div className={styles.description}>{description}</div>}
        {error &&
          <div className={styles.errorMessage}>{error}</div>}

        {isFocused && !!filteredOptions?.length && (
          <ul className={styles.options}>
            {filteredOptions
              .sort((option) => {
                const label =
                  (typeof option === 'string' ? option : option.label)
                    .toLowerCase()
                return label.startsWith(currentValue.toLowerCase()) ? -1 : 1
              })
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
                    <b>{currentValue.toLowerCase()}</b>
                    {label.slice(end)}
                  </li>

                )
              })
            }
          </ul>
        )}
      </div>
    </div>
  )
}

export default Input
