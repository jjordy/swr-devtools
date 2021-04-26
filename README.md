# SWR Devtools

Devtools for [swr](https://swr.now.sh/)

## Table of Contents

- [Screenshot](#Screenshot)
- [Live Demo](#live-demo)
  - [CodeSandbox](#codesandbox)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Maintainers](#maintainers)
- [License](#license)

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

**WARNING THIS LIBRARY IS IN ITS INFANCY AND WILL HAVE LOTS OF BUGS**

**`swr - 0.2.0` is required at minimum because it makes the cache available.**

Import the devtools component and pass it your instance of the swr cache and mutate function.
Dont worry about production if your `NODE_ENV` is not equal to development we will return an empty react fragment so nothing will be imported or rendered but your children.

```javascript
import SWRDevtools from '@jjordy/swr-devtools'
import { cache, mutate } from 'swr'
function MyApp() {
  return (
    <>
      <SWRDevtools cache={cache} mutate={mutate} />
      <App />
    </>
  )
}
```

#### Props

| Name                | Type                       | Required | Default |
| ------------------- | -------------------------- | -------- | ------- |
| cache               | `cacheInterface`           | yes      |
| CustomOpenComponent | `React.ReactNode`          | no       |
| debug               | `boolean`                  | no       |
| mutate              | `mutateInterface`          | yes      |
| position            | `string`: `"right","left"` | no       | right   |

## Maintainers

- Kento Watanabe

## License

The MIT License (MIT)

Copyright (c) 2020 Jordan Addison

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
