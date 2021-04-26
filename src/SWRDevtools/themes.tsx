import { Themes, Theme } from './types'

const Dark: Theme = {
  header: {
    backgroundImage: 'linear-gradient(90deg,#0f2027,#203a43,#2c5364)',
    opacity: 0.8,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '2rem',
    alignItems: 'center',
    color: '#FFF'
  },
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  keys: {
    backgroundColor: '#231f20E6',
    color: '#FFF'
  },
  data: {
    backgroundColor: '#231f20'
  },
  bottom: {
    opacity: 0.9,
    backgroundColor: '#222',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    paddingBottom: '0.5rem',
    paddingTop: '0.5rem',
    boxSizing: 'border-box'
  }
}

const Light: Theme = {
  header: {
    backgroundImage: 'linear-gradient(120deg,#a6c0fe,#f68084)',
    color: '#FFF',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '2rem',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  keys: {
    backgroundColor: '#fff',
    color: '#222'
  },
  data: {
    backgroundColor: '#fff'
  },
  bottom: {
    opacity: 0.9,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    paddingBottom: '0.5rem',
    paddingTop: '0.5rem',
    boxSizing: 'border-box'
  }
}

const themes: Themes = {
  Dark,
  Light
}

export default themes
