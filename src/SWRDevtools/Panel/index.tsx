import React from 'react'
import usePanelState from './usePanelState'
import { Rnd } from 'react-rnd'
import { PanelProps } from '../types'
import GithubIcon from '../Icons/GithubIcon'
import CloseIcon from '../Icons/CloseIcon'
import themes from '../themes'

export default function Panel({
  toolbarPosition,
  previousToolbarPosition,
  show,
  children,
  toggleShow,
  debug
}: PanelProps) {
  const { theme, handleChangeTheme, width, height, x, y, handleResize } = usePanelState({
    toolbarPosition,
    previousToolbarPosition,
    debug,
    show
  })
  return (
    <>
      {show && (
        <Rnd
          onResizeStop={handleResize}
          default={{
            x,
            y,
            width,
            height
          }}
          style={{
            cursor: 'auto',
            position: 'fixed',
            zIndex: 999999
          }}
        >
          <div style={themes[theme].container}>
            <div style={themes[theme].header}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  userSelect: 'none'
                }}
              >
                SWR Devtools
              </span>
              <div style={{ display: 'flex' }}>
                <button
                  type="button"
                  aria-label="Close SWR Devtools"
                  title="Close"
                  onClick={toggleShow}
                  style={{
                    border: 0,
                    padding: '0.5rem',
                    backgroundColor: 'transparent'
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            {children({ theme })}
            <div style={themes[theme].bottom}>
              <a
                target="_blank"
                href="https://github.com/jjordy/swr-devtools"
                aria-label="Check us out on Github"
                rel="noopener noreferrer"
              >
                <GithubIcon fill={theme === 'Dark' ? 'white' : 'black'} />
              </a>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  htmlFor="select_theme"
                  style={{
                    marginRight: '1rem',
                    color: theme === 'Dark' ? '#FFF' : '#222'
                  }}
                >
                  Select Theme
                </label>
                <select
                  value={theme}
                  style={{
                    padding: '0.2rem',
                    border: '1px solid #e7e7e7',
                    backgroundColor: theme === 'Light' ? '#FFF' : '#222',
                    color: theme === 'Light' ? '#222' : '#FFF',
                    borderRadius: 4
                  }}
                  onChange={evt => handleChangeTheme(evt.target.value)}
                >
                  {Object.keys(themes).map(key => (
                    <option key={`select_theme_option_${key}`} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Rnd>
      )}
    </>
  )
}
