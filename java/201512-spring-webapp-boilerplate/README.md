# Spring Based Web Application Boilerplate

최근의 추세에 맞는 자바 기반의 웹 어플리케이션의 뼈대를 만들어보자.

최근의 트렌드를 추구하면서 자바기반의 웹 어플리케이션을 개발을 위해 필요해서 시작하게 되었다. 다우오피스가 `require.js + backbone.js` 기반으로 3년 전 프로젝트를 시작했을 당시에는 새로운 아키텍쳐였으나, 지난 3년간 프론트엔드 개발 트렌드가 너무나 급속도로 발전하게 되었다.

특히, 웹도 컴포넌트화 되는 트렌드는 매우 중요하다. `require.js + backbone.js` 조합으로도 재사용성이 어느정도 확보되지만, 개발 과정에서 신경써줘야 할게 너무 많다. 그러므로, 강력한 코드 컨벤션을 마련해놓지 않는다면, 코드 스타일이 통일되지 않고 실수도 잦아진다. 

(서론 쓰다 지치겠다. 나중에 퇴고해야지...)


## 사용 프레임워크 및 라이브러리들
- Spring Framework 4.X : Spring Boot(Embeded Tomcat)
- Gradle 2.9(using Gradle Wrapper)
- React.js 0.4.X


## gradle 설치
gradle 설치는 쉽다.

> 집 PC가 Window 10이므로 Window 10 기준으로 설명한다.

- [Gradle 다운로드 페이지](http://gradle.org/gradle-download/)에서 최신버전을 다운받는다.(2015년 12월 기준 최신버전은 2.9이다)
- 다운받은 압축파일을 원하는 곳에 압축해제한다.
- 환경변수 창을 연다
- 시스템 변수에 `GRADLE_HOME`를 추가하고 압축해제한 폴더를 가리키도록 한다.
- Path에 `%GRADLE_HOME%\bin`을 추가한다.
- 명령 프롬프트 실행해서 `gradle -v`을 실행한다. 버전정보 등이 출력되면 정상적으로 설치된 것이다.

## build.gradle 생성
gradle도 grunt나 gulp 처럼 기본 설정 파일을 찾는다. gradle은 build.gradle을 기본 설정 파일로 찾는다. `-b` 옵션을 이용하면 다른 파일을 설정 파일로 사용할 수 있다.

`build.gradle` 생성하고 난 후, 테스트용 task를 생성해보자. 언제나 그렇듯 "Hello, World"를 콘솔에 찍는 task로 할 것이다.

```groovy
task helloWorld << {
	println 'Hello World'
}
```
그런 다음 콘솔에서 task를 실행해보자. 특정 task는 `-q` 옵션을 이용하여 실행할 수 있다.

```sh
$ gradle -q helloWorld
Hello World
```

## Gradle Wrapper 생성
Gradle Wrapper를 이용하면 Gradle이 설치되지 않은 PC에서도 Gradle을 사용할 수 있도록 한다. 또한, 원하는 Gradle 버전을 이용하여 Task를 수행하도록 강제하는 효과도 있다. 앞으로 대부분의 Gradle 실행은 Gradle Wrapper를 이용할 것이다.

Gradle Wrapper 생성은 간단하다. 단 Gradle Wrapper를 생성할 PC에는 Gradle이 설치되어 있어야 한다.

```sh
$ gradle wrapper --gradle-version 2.9
:wrapper

BUILD SUCCESSFUL

Total time: 1.912 secs
```

프로젝트 폴더내에 `gradlew`와 `gradlew.bat`, `gradle` 폴더, `.gradle` 폴더 등이 생성된다. 이제 `gradle` 명령대신 `gradlew`를 이용할 수 있다.

> **참고:** 설치 후 처음 `gradlew`를 실행하면 해당 버전의 gradle 소스를 다운로드 받는다. 다운받은 파일은 `.gradle` 폴더내에 위치한다.


## wrapper task 정의
gradle wrapper를 실행할 때 `--gradle-version` 옵션을 사용하지 않으면 설정파일내의 `wrapper` task에 정의된 버전을 따라간다. 따라서 되도록 wrapper task를 정의해 놓도록 하자.

```groovy
task wrapper(type:Wrapper) {
	gradleVersion='2.9'
}
```

## 자바 프로젝트로 선언
`build.gradle`에 다음과 같이 한줄만 정의하면 자바코드를 빌드가능해진다.

```groovy
apply plugin: 'java'
```

그리고 `./gradlew build`를 실행해보자. `build` 디렉토리가 생기면서 jar파일이 생성되어 있다.

## IntelliJ IDEA 사용하도록 선언
`build.gradle`에 다음과 같이 선언한다.

```groovy
apply plugin: 'idea'
```

그러면 IntelliJ IDEA 툴을 사용할 수 있도록 하는 몇가지 Task를 실행할 수 있다. 우선 `./gradlew idea`를 실행하면 IntelliJ가 프로젝트로 인식할 수 있도록 몇가지 파일 생성한다.

## 참고자료
- [Building Java Projects with Gradle](https://spring.io/guides/gs/gradle/)