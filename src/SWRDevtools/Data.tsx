import React, { useEffect, memo } from 'react'
import themes from './themes'
import { DataProps } from './types'

export default memo(function Data({ JsonViewer, data, theme }: DataProps) {
  useEffect(() => {
    JsonViewer.current = require('react-json-view').default
  }, [JsonViewer])
  return (
    <div style={{ position: 'relative', backgroundColor: '#222' }}>
      <div
        style={{
          padding: 0,
          textAlign: 'left',
          overflowY: 'scroll',
          maxHeight: 400,
          boxSizing: 'border-box',
          ...themes[theme].data
        }}
      >
        <JsonViewer.current
          collapsed={1}
          displayDataTypes={false}
          indentWidth={2}
          src={data || {}}
          theme={theme === 'Dark' ? 'tube' : 'shapeshifter:inverted'}
        />
      </div>
    </div>
  )
})
