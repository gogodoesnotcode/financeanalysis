'use client'

import { useState, useEffect } from 'react'

export function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue)

  // Load persisted state on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setState(JSON.parse(item))
      }
    } catch (error) {
      console.error('Error loading persisted state:', error)
    }
  }, [key])

  // Save state changes to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
      console.error('Error saving persisted state:', error)
    }
  }, [key, state])

  return [state, setState] as const
}

