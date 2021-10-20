# SWR Devtools

Devtools for [swr](https://swr.now.sh/)

## Table of Contents

* [Screenshot](#Screenshot)
* [Live Demo](#live-demo)
  * [CodeSandbox](#codesandbox)
* [Install](#install)
* [Usage](#usage)
* [Props](#props)
* [Maintainers](#maintainers)
* [License](#license)

## Live Demo
[![Edit swr-devtools (forked)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/exciting-benz-t5pq0?file=/src/App.tsx)


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

**``swr - 1.0.0`` is required at minimum .**

Import SWRDevtools and our custom devtools cache and use like below.
Custom cache is required > 1.0 swr to re-implement subscribe behavior which swr devtools relys on.
The SWRConfig with custom devtools cache should be above any request using swr.
```javascript
import { SWRConfig } from "swr";
import SWRDevtools from "@jjordy/swr-devtools";

export default function App({ Component, pageProps }) {
  return (
    <SWRDevtools>
      <Component {...pageProps} />
    </SWRDevtools>
  );
}
```

#### Props 


| Name  | Type  | Required  | Default |
|---|---|---|---| 
| CustomOpenComponent  | `React.ReactNode`  |  no |
| debug | `boolean` | no |
| position | `string`: `"right","left"` | no | right



## Maintainers

* Jordan Addison

## License

The MIT License (MIT)

Copyright (c) 2021 Jordan Addison

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.