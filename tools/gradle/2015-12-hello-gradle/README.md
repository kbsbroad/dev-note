# Hello Gradle!
Gradle을 배워보자.

## 학습목표
- Gradle의 기본 사용법을 익힌다.
- Gradle 기반의 프로젝트를 생성하는 방법을 배운다.
- Gradle을 이용하여 멀티 프로젝트 환경을 구축하는 법을 배운다.

## 설치
Gradle 설치는 쉽다.

- [Gradle 다운로드 페이지](https://gradle.org/gradle-download/) 접속
- **Compplet distribution** 혹은 **Binary only distribution** 링크 중 하나를 이용해 다운로드 받는다.
- 원하는 곳에 압축푼다.

### Windows 환경
반드시 아래처럼 할 필요는 없다. 환경변수로 GRADLE_HOME을 만들지 않아도 된다. 다만, 추후 Gradle의 버전을 업그레이드를 할 경우 별도의 시스템 변수로 선언해놓고 사용하면 변경해야 하는 사항이 줄어든다.

- 환경변수 창을 연다
- 시스템 변수로 GRADLE_HOME을 생성하고, 압축히 풀린 디렉토리를 지정한다.
- Path 변수를 편집한다. 제일 마지막에 `%GRADLE_HOME%\bin\` 을 추가한다.
- 명령 프롬프트 창을 열어 `gradle -v`을 실행한다. 버전이 출력되면 설치가 완료된 것이다.

### *nix 환경
Mac, *nix 환경도 별반 다르지 않을 듯. 압축풀고 실행된 쉘 환경의 PATH 정보에 위와 비슷하게 해주면 될 것이다.

## build.gradle 생성
gradle도 grunt나 gulp 처럼 기본 설정 파일을 찾는다. gradle은 build.gradle을 기본 설정 파일로 찾는다. `-b` 옵션을 이용하면 다른 파일을 설정 파일로 사용할 수 있다.

`build.gradle` 생성하고 난 후, 테스트용 task를 생성해보자. 언제나 그렇듯 "Hello, World"를 콘솔에 찍는 task로 할 것이다.

```groovy
task helloGradle << {
	println 'Hello Gradle!'
}
```
그런 다음 콘솔에서 task를 실행해보자.

```sh
$ gradle -q helloGradle
Hello Gradle!
```
> **참고:** `-q` 옵션은 Error 로그만 출력할 때 사용하는 옵션이다.
> CLI 옵션은 Gradle 공식문서의 [Appendix D. Gradle Command Line](https://docs.gradle.org/current/userguide/gradle_command_line.html) 에서 참고할 수 있다.

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

`gradlew`는 `gradle`과 동일하게 사용이 가능해진다.

```sh
$ ./gradlew -q helloGradle
Hello Gradle!
```

## References
- [Announcing .. Gradle Tutorial Series](http://rominirani.com/2014/07/28/gradle-tutorial-series-an-overview/)