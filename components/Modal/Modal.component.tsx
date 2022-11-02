import React, { FC, useEffect } from 'react'

import styles from './Modal.component.module.scss'

const Modal: FC<{
  show: boolean,
  compact?: boolean
  overflowAuto?: boolean,
  children: React.ReactNode,
  onDismiss: () => void
}> = ({
  show,
  onDismiss,
  compact = false,
  overflowAuto = true,
  children
}) => {
  if (!show) {
    return null
  }

  useEffect(() => {
    const keyupHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }
    document.addEventListener('keyup', keyupHandler)

    return () => {
      document.removeEventListener('keyup', keyupHandler)
    }
  }, [])

  return (
    <>
      <div className={styles.modalOverlay} onClick={onDismiss}></div>
      <div className={`
        ${styles.modal}
        ${compact ? styles.compact : ''}
        ${overflowAuto ? styles.overflowAuto : ''}
      `}>
        <div className={styles.contentWrapper}>
          <div className={styles.close} onClick={onDismiss}>+</div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
