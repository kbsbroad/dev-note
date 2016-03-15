# springboot-react
Gradle + Spring Boot + React.js 기반의 웹앱개발용 프로젝트 템플릿(일명 boilerplate)를 만들어보자.

> **참고: boot-react 프로젝트**
> 이 프로젝트는 [boot-react](https://github.com/geowarin/boot-react)를 참고하여 학습한 것이므로, 전체 구조와 내용은 거의 동일하며 일부 수정된 내용이 추가되었다.


## client test 작성
클라이언트 코드도 babel을 이용하여 ECMA2015 스펙을 이용할 수 있도록 할 것이다. 테스트 프레임워크로는 **boot-react** 프로젝트와 동일하게 [mocha](https://mochajs.org/)를 사용했다. mocha 프레임워크는 나에게도 익숙한 테스트 프레임워크이기 때문에 변경할 필요가 없다.


### babel과 연동하기
자바스크립트 모듈에서 ECMA2015 기반 문법을 사용하기 위해서는 babel의 도움이 필요하다. babel의 여러 지원 메커니즘 중에는 [Require Hook](https://babeljs.io/docs/usage/require/) 이 있는데, 이것을 이용하여 테스트 코드에 ES2015 문법을 사용할 수 있다.

#### 모듈 설치
babel은 여러 프리셋(preset)과 플러그인(plugin) 들로 구성되어 있다. babel만 설치한다고 모든 기능을 사용할 수 있는 것이 아니라 사용하고자 하는 스펙이나 기능을 확인하여 적절한 프리셋이나 플러그인을 설치해야 한다.

우선 ES2015 문법을 사용하기 위해서는 es2015와 관련된 기능이 필요하다. 이는 프리셋으로 제공되고 있다. `npm`을 통해 모듈을 먼저 설치해야 한다.

```sh
$ npm install babel-preset-es2015 --save-dev
```

다른 프리셋이나 플러그인의 경우에도 위와 같이 먼저 설치 후 이용할 수 있게 된다.

#### .babelrc 작성
`.babelrc` 파일은 프로젝트내에서 babel 전역으로 사용할 옵션을 정의하기 위한 파일이다(`.bash`와 같은 역할을 한다고 생각하면 쉬움) 내용은 `JSON` 포맷으로 작성할 수 있다.

앞서 설치한 ES2015 프리셋을 적용할려면 다음과 같이 정의해 주면 된다.

```json
{
    "presets": ["es2015"]
}
```

#### 테스트코드 작성
`test` 디렉토리를 만들고 `mocha.opts`를 작성하면 mocha 옵션을 손쉽게 관리할 수 있다. 옵션에 대한 자세한 설명은 다른 학습노트에서 다루기로 하고 생략한다.
```
-u bdd
--recursive
--full-trace
--reporter spec
--require babel-register
```

그리고 `test.js` 작성한다. mocha 홈페이지에 있는 테스트 코드에서 require 부분만 import 구문을 사용하여 변경한 것이다.

```js
import assert from 'assert';
describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});
```

#### npm test 스크립트 추가
package.json에 다음과 같이 작성한 후, 
```json
{
  "scripts": {
    "test": "./node_modules/.bin/cross-env NODE_ENV=test ./node_modules/.bin/mocha"
  },
}
```
`npm test`를 실행해보자.
```sh
$ npm test

> springboot-react@0.0.1-SNAPSHOT test D:\Workspace\spring-webapp-boilerplate\client
> cross-env NODE_ENV=test ./node_modules/.bin/mocha



  Array
    #indexOf()
      √ should return -1 when the value is not present


  1 passing (10ms)

```

> 참고: cross-env와 mocha는 이미 설치되어 있다고 가정하였다.
