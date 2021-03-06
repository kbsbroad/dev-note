# Gradle로 자바프로젝트 만들기
내가 주로 개발할 프로젝트는 자바와 자바스크립트를 주로 이용하는 웹 어플리케이션이다. 따라서, 자바 프로젝트이거나 Node 기반의 프로젝트일 것이다.

## java 플러그인 사용
자바 프로젝트로 만드는 것은 간단하다. gradle의 java 플러그인을 이용하면 컴파일, 빌드, 배포와 관련된 task를 이용할 수 있다. 

`build.gradle`을 열어서 다음과 같이 추가한다.

```groovy
apply plugin: 'java'
```

그리고, 콘솔에서 task를 확인해보자.
```sh
$ gradle tasks
...
Build tasks
-----------
assemble - Assembles the outputs of this project.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
jar - Assembles a jar archive containing the main classes.
testClasses - Assembles test classes.

...

Verification tasks
------------------
check - Runs all checks.
test - Runs the unit tests.
```

위와 같이 java 플러그인에서 제공하는 build 관련 task들이 생겼음을 확인할 수 있다.

## 프로젝트 구조 설정
java 플러그인을 사용하면 기본적으로 찾는 폴더 구조들이 있다. 공식문서에는 다른 폴더를 찾도록 하는 방법들이 나와있으나, 굳이 그럴 필요는 없을 듯 하다. 대부분의 자바 프로젝트들이 가지고 있는 구성이기 때문이다.

folders           |설명
------------------|--------------------------------------------------------
src/main/java     |자바 소스가 위치하는 루트 디렉토리
src/main/resources|리소스(property 파일들, 각종 설정 파일들)파일이 위치할 루트 디렉토리
src/test/java     |자바 테스트 소스가 위치하는 루트 디렉토리
src/test/resource |테스트 리소스 파일이 위치할 루트 디렉토리

## HelloGradle.java
이제 간단한 자바파일을 작성해보자. 콘솔화면에 "Hello, Gradle!"을 출력하는 매우 간단한 프로그램이다.
```java
package greeting;

public class HelloGradle {
  public static void main(String args[]) {
    System.out.println("Hello, Gradle!");
  }
}
```

그리고, 콘솔창에서 `assemble` task를 수행해보자
```sh
$ ./gradlew assemble
```

그러면, 디렉토리내에 build 디렉토리가 생성되고 내부에 컴파일된 자바 클래스(build/classes/)와 jar 파일(build/libs/)들이 각 디렉토리에 생성되어 있다.

jar 파일명이 현재 디렉토리 이름으로부터 생성하는데, 이는 몇가지 설정으로 조정할 수 있다. build.gradle에서 다음과 같이 추가해보자.

```gradle
jar {
	baseName='hello-gradle'
    version='0.1.0-SNAPSHOT'
}
```

그리고 다시 `./gradlew assemble`을 수행하면 jar 파일명이 "hello-gradle-0.1.0-SNAPSHOT.jar"로 변경되어 있을 것이다.

## 의존모듈 설정
Maven 처럼 gradle에서도 의존모듈을 설정할 수 있다. 위의 HelloGradle을 약간 수정해보자.

```java
package greeting;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class HelloGradle {
  public static void main(String args[]) {
    System.out.println("Hello, Gradle!");
  }

  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }
}
```

그리고 `./gradlew assemble`을 수행해보자. task가 실패할 것이다. 이는 commmon-lang3 모듈이 없기 때문이다. gradle의 장점은 maven 저장소를 이용하여 자바 모듈을 다운로드 받을 수 있다는 점이다. 

maven 공용저장소를 이용하기 위해서는 다음과 같이 `repositories` 블록을 이용하여 설정하면 된다.

```groovy
repositories {
  mavenCentral()
}
```

그리고, 의존모듈 설정을 위해서 다음과 같이 설정할 수 있다.

```groovy
dependencies {
	compile group: 'org.apache.commons', name: 'commons-lang3', version: '3.3.2'
}
```
혹은 다음과 같이 짧게 줄여서 사용할 수도 있다.
```groovy
dependencies {
	compile 'org.apache.commons:commons-lang3:3.3.2'
}
```

> **참고: Maven과 비교**
> pom.xml에서는 다음과 같다.
> ```xml
> <groupId>org.appache.commons</groupId>
> <artifactId>commons-lang3</artifactId>
> <version>3.3.2</version>
> ```

## Dependency Configurations
dependencies 설정 내부에서 사용할 수 있는 설정함수들은 다음과 같다(이는 java 플러그인이 제공해주는 것이다.)

- compile
- runtime
- testCompile
- testRuntime

> 참고: Maven에서 제공하는 provided와 같은 설정이 기본으로 제공되지는 않으나, 만들수는 있다. 너무 깊은 주제이므로 필요할 경우 추후에 학습!

## References
- [권남님 위키 - Gradle](http://kwonnam.pe.kr/wiki/gradle)
- [Announcing .. Gradle Tutorial Series](http://rominirani.com/2014/07/28/gradle-tutorial-series-an-overview/)
