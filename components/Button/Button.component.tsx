import React, { FC, ReactNode } from 'react'

import Loader from '../Loader/Loader.component'

import styles from './Button.component.module.scss'

const Button: FC<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  primary?: boolean,
  secondary?: boolean,
  children?: ReactNode,
  loading?: boolean,
  disabled?: boolean,
  icon?: string,
  compact?: boolean,
  className?: string
  [key: string]: unknown
}> = ({
  onClick,
  primary,
  secondary,
  loading,
  disabled,
  icon,
  compact,
  className,
  children,
  ...props
}) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`
      ${styles.button}
      ${compact ? styles.compact : ''}
      ${disabled ? styles.disabled : ''}
      ${secondary ? styles.secondary : ''}
      ${primary ? styles.primary : ''}
      ${className ?? ''}
    `}
    {...props}
  >
    <div
      className={styles.contentWrapper}
      style={{ opacity: loading ? 0 : 1 }}
    >
      {icon && <i className={`i-${icon}`} />}
      {children}
    </div>
    {loading && <div
      className={styles.loadingWrapper}
      style={{ opacity: loading ? 1 : 0 }}
    ><Loader forPrimary={primary} /></div>}
  </button>
)

export default Button
