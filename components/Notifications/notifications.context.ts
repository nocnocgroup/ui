import React from 'react'

export enum NotificationType {
  INFO,
  WARNING,
  SUCCESS,
  ERROR
}

interface NotificationsContext {
  notify: (message: string, type: NotificationType) => void
}

const defaultLanguageState = {
  notify: () => {}
}

export const notificationsContext = React.createContext<NotificationsContext>(
  defaultLanguageState
)
