import React, { FC, useEffect, CSSProperties } from 'react'

import styles from './Modal.component.module.scss'

const Modal: FC<{
  show?: boolean,
  compact?: boolean
  overflowAuto?: boolean,
  children?: React.ReactNode,
  className?: string,
  closeWhite?: boolean
  style?: CSSProperties
  onDismiss?: () => void
}> = ({
  show = true,
  onDismiss,
  compact = false,
  overflowAuto = true,
  children,
  className = '',
  closeWhite = false,
  style = {}
}) => {
  if (!show) {
    return null
  }

  useEffect(() => {
    const keyupHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss && onDismiss()
      }
    }
    document.addEventListener('keyup', keyupHandler)

    return () => {
      document.removeEventListener('keyup', keyupHandler)
    }
  }, [])

  return (
    <>
      <div className={styles.modalOverlay} onClick={onDismiss} />
      <div
        className={`
          ${styles.modal}
          ${compact ? styles.compact : ''}
          ${overflowAuto ? styles.overflowAuto : ''}
          ${className}
        `}
        style={style}
      >
        {onDismiss &&
          <div
            className={`${styles.close} ${closeWhite ? styles.black : ''}`}
            onClick={onDismiss}
          >
            +
          </div>}
        {children}
      </div>
    </>
  )
}

export default Modal
