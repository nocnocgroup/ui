import React, { FC, useEffect, CSSProperties, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

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
  const modalWrapper = useRef(null)

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

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  return (
    <CSSTransition
      nodeRef={modalWrapper}
      in={show}
      timeout={250}
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        exitActive: styles.modalExitActive,
        exit: styles.modalExit
      }}
      unmountOnExit
      mountOnEnter
    >
      <div
        ref={modalWrapper}
        className={styles.modalWrapper}
        onClick={onDismiss}
      >
        <div
          onClick={event => event.stopPropagation()}
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
      </div>
    </CSSTransition>
  )
}

export default Modal
