import React, { useState, useEffect, useCallback, useRef } from 'react'
import { openDB } from 'idb'

export function useStore({ store = 'default-db' }) {
  const [db, setDb] = useState<any>(null)
  useEffect(() => {
    openDB(store, 1, {
      upgrade(db) {
        db.createObjectStore('settings')
      }
    }).then(db => setDb(db))
  }, [store])

  const get = useCallback(
    async key => {
      if (db !== null) {
        try {
          return (await db).get('settings', key)
        } catch (err) {
          console.log(err)
        }
      }
      return null
    },
    [db]
  )
  const set = useCallback(
    async (key, values) => {
      if (db !== null) {
        try {
          return (await db).put('settings', values, key)
        } catch (err) {
          console.log(err)
        }
      }
      return null
    },
    [db]
  )
  return {
    set,
    get,
    ready: db ? true : false
  }
}

const events = new Set<() => void>()
const onResize = () => events.forEach(fn => fn())

export function useWindowSize(options: { throttleMs?: number } = {}) {
  const { throttleMs = 100 } = options
  const [size, setSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  const handle = throttle(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, throttleMs)

  useEffect(() => {
    if (events.size === 0) {
      window.addEventListener('resize', onResize, true)
    }

    events.add(handle)

    return () => {
      events.delete(handle)

      if (events.size === 0) {
        window.removeEventListener('resize', onResize, true)
      }
    }
  }, [handle])

  return size
}

export function throttle<T extends (...args: any[]) => void>(func: T, threshold: number = 250, scope?: any): T {
  let last: number, deferTimer: any
  return function (this: any) {
    let context = scope || this

    let now = Date.now(),
      args = arguments
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        func.apply(context, args as any)
      }, threshold)
    } else {
      last = now
      func.apply(context, args as any)
    }
  } as T
}

export function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
