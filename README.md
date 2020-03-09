# SWR Devtools

Devtools for [swr](https://swr.now.sh/)

## Table of Contents

* [Screenshot](#Screenshot)
* [Live Demo](#live-demo)
  * [CodeSandbox](#codesandbox)
* [Install](#install)
* [Usage](#usage)
* [Props](#props)
* [Test](#test)
* [Related](#related)
* [Changelog](#changelog)
* [License](#license)

## Screenshot
![Screenshot demo](https://raw.githubusercontent.com/jjordy/swr-devtools/master/swr-devtools.gif)

## Live Demo
 [Code Sandbox](https://codesandbox.io/s/swr-devtools-o9juu)


## Install

#### NPM

```bash
npm install @jjordy/swr-devtools
```

#### Yarn

```bash
yarn add @jjordy/swr-devtools
```

#### Initialize dev tools.

```javascript
  import SWRDevtools from '@jjordy/swr-devtools'
  import { cache } from 'swr'
  function MyApp () {
    return (
      <>
        <SWRDevtools cache={cache}>
          <App />
        </SWRDevtools>
      </>
    )
  }
```

## Maintainers

* Jordan Addison