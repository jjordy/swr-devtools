import React, { useState, useEffect, useCallback, useRef } from 'react'
import Data from './Data'
import Keys from './Keys'
import Panel from './Panel'
import { ToolbarPositions, SWRDevtoolsProps } from './types'
import { usePrevious } from './hooks'

function filterErrors(keys: string[]) {
  return keys.filter(key => !key.includes('err@'))
}

const DefaultOpenComponent = (
  <span
    aria-label="Open Devtools"
    style={{
      fontSize: 16,
      boxSizing: 'border-box',
      borderTopRightRadius: '3px',
      borderTopLeftRadius: '3px',
      backgroundImage: 'linear-gradient(90deg,#0f2027,#203a43,#2c5364)',
      fontWeight: 'bolder',
      color: '#fff'
    }}
  >
    <span style={{ padding: '1rem', fontSize: 12 }}>SWR DEVTOOLS</span>
  </span>
)

export function SWRDevtools({
  debug = false,
  cache,
  position = 'right',
  mutate,
  CustomOpenComponent,
  openBtnPosition = 'left',
  defaultOpen = false
}: SWRDevtoolsProps) {
  const [show, toggleShow] = useState(false)
  //@ts-ignore
  const ReactJson = useRef(() => <></>)
  const [toolbarPosition, setToolbarPosition] = useState<ToolbarPositions>(position)
  const prevPosition = usePrevious(toolbarPosition)
  const [cacheKeys, setCacheKeys] = useState(filterErrors(cache.keys()))
  const [selectedCacheItemData, setSelectedCacheItemData] = useState(null)
  const [selectedCacheKey, setSelectedCacheKey] = useState<string | null>(null)
  const handleToggleShow = () => toggleShow(!show)

  const handleSetCacheKey = useCallback(() => {
    setCacheKeys(filterErrors(cache.keys()))
    if (selectedCacheKey) {
      setSelectedCacheItemData(cache.get(selectedCacheKey))
    }
  }, [cache, selectedCacheKey])

  useEffect(() => toggleShow(defaultOpen), [defaultOpen])

  useEffect(() => cache.subscribe(handleSetCacheKey), [cache, handleSetCacheKey])

  const handleSelectedCacheItem = (key: string) => {
    setSelectedCacheKey(key)
    setSelectedCacheItemData(cache.get(key))
  }

  const clearCacheByKey = (key: string) => {
    cache.set(key, null)
  }

  const revalidate = (key: string) => {
    mutate(key)
  }
  return (
    <>
      {!show && (
        <div
          style={{
            position: 'fixed',
            boxSizing: 'border-box',
            bottom: 0,
            left: openBtnPosition === 'left' ? 150 : null,
            right: openBtnPosition === 'right' ? 150 : null,
            zIndex: 999999
          }}
        >
          <button
            title="Open SWR Devtools"
            onClick={handleToggleShow}
            style={{
              border: 0,
              backgroundColor: 'transparent',
              boxSizing: 'border-box',
              padding: 0
            }}
          >
            {CustomOpenComponent || DefaultOpenComponent}
          </button>
        </div>
      )}
      <Panel
        show={show}
        debug={debug}
        toolbarPosition={toolbarPosition}
        previousToolbarPosition={prevPosition || ''}
        setToolbarPosition={setToolbarPosition}
        toggleShow={handleToggleShow}
      >
        {({ theme }) => (
          <div
            style={{
              display: 'flex',
              height: '100%',
              backgroundColor: theme === 'Dark' ? '#231f20' : '#FFF',
              flex: toolbarPosition === 'bottom' ? '1 1 auto' : 0
            }}
          >
            <div style={{ width: '40%' }}>
              <Keys
                theme={theme}
                keys={cacheKeys}
                selectedKey={selectedCacheKey}
                onSelect={handleSelectedCacheItem}
                onClear={clearCacheByKey}
                onRevalidate={revalidate}
              />
            </div>
            <div style={{ width: '60%' }}>
              <Data
                theme={theme}
                data={selectedCacheItemData}
                cacheKey={selectedCacheKey}
                JsonViewer={ReactJson}
                toolbarPosition={toolbarPosition}
              />
            </div>
          </div>
        )}
      </Panel>
    </>
  )
}

export default SWRDevtools
