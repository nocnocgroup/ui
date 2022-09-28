import React, { FC, useEffect } from 'react'

import styles from './Modal.component.module.scss'

const Modal: FC<{
  show: boolean,
  children: React.ReactNode,
  onDismiss: () => void
}> = ({
  show,
  onDismiss,
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
      <div className={styles.modal}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
