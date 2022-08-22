import React, { FC } from 'react'

const Select: FC<{
  value: string | number,
  options: { label: string, value: string | number }[],
  name?: string
  onChange: (value: string | number) => void
}> = ({
  value,
  options,
  name,
  onChange: onChangeHandler
}) => {
  return (
    <select
      value={value}
      name={name}
      onChange={(event) => onChangeHandler(event.target.value)}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select
