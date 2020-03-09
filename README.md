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
![swr-devtools](https://user-images.githubusercontent.com/2831940/76174150-86dd3a00-6173-11ea-84c2-72b557d4292d.gif)

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

#### Usage

Import the devtools component and pass it your instance of the swr cache and mutate function.
Dont worry about production if your ```NODE_ENV``` is not equal to development we will return an empty react fragment so nothing will be imported or rendered but your children.

```javascript
  import SWRDevtools from '@jjordy/swr-devtools'
  import { cache, mutate } from 'swr'
  function MyApp () {
    return (
      <>
        <SWRDevtools cache={cache} mutate={mutate}>
          <App />
        </SWRDevtools>
      </>
    )
  }
```

#### Props 


| Name  | Type  | Required  | Default |
|---|---|---|---|
| cache  | `cacheInterface`  | yes | 
| children  | `React.ReactNode`   | yes  |
| CustomOpenComponent  | `React.ReactNode`  |  no |
| debug | `boolean` | no |
| mutate   | `mutateInterface`  | yes  |
| position | `string`: `"right","left","bottom"` | no | right

## Maintainers

* Jordan Addison