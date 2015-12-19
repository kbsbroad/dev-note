# Hello Gradle!
Gradle을 배워보자.

## 학습목표
- Gradle의 기본 사용법을 익힌다.
- Gradle 기반의 프로젝트를 생성하는 방법을 배운다.
- Gradle을 이용하여 멀티 프로젝트 환경을 구축하는 법을 배운다.

## 학습배경
앞으로 Gradle을 프로젝트의 빌드와 배포를 수행하는 Workflow 도구로서 사용할 생각이다. Gradle은 자바 프로젝트 뿐만 아니라, (플러그인을 통해) node 기반의 프로젝트를 빌드하고 배포할 수 있도록 한다.(물론 gradle이 직접한다기 보다는 node 프로젝트의 task를 위임하는 형태가 되겠지만...)

처음에는 gulp.js를 기반으로 maven 플러그인을 통해 자바 프로젝트의 빌드 및 배포까지 할 생각이었지만, 플러그인이 썩 마음에 들지 않는 면이 있었다. 결정적으로 프로젝트를 관리하는 측면에서는 gradle이 나아보였다.

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

## Project, Task, Plugin
*Gradle*은 grunt.js나 gulp.js와 같은 *Task Runner*이다. grunt나 gulp가 task들을 기반으로 프로젝트를 빌드하고 배포하는 등 개발작업의 흐름을 자동화할 수 있는 것 처럼 gradle도 가능하다. 그러나, gradle은 기본적으로 maven의 영향을 받아 프로젝트를 관리할 수 있는 기능을 기본 내장하고 있다.(grunt, gulp도 플러그인을 통해서 가능하다.)

### Project
Project는 Maven의 Project 개념과 동일하다. Project는 여러개의 하위 프로젝트를 포함할 수도 있다. 

### Task
task는 수행가능한 단위 작업을 의미한다. 이는 groovy 함수로 작성된다. 프로젝트에서 사용할 수 있는 task는 다음과 같이 확인할 수 있다.

```sh
$ gradle tasks
:tasks

------------------------------------------------------------
All tasks runnable from root project
------------------------------------------------------------

Default tasks: buildTask

Build Setup tasks
-----------------
init - Initializes a new Gradle build. [incubating]

Help tasks
----------
components - Displays the components produced by root project '2015-12-hello-gradle'. [incubating]
dependencies - Displays all dependencies declared in root project '2015-12-hello-gradle'.
dependencyInsight - Displays the insight into a specific dependency in root project '2015-12-hello-gradle'.
help - Displays a help message.
model - Displays the configuration model of root project '2015-12-hello-gradle'. [incubating]
projects - Displays the sub-projects of root project '2015-12-hello-gradle'.
properties - Displays the properties of root project '2015-12-hello-gradle'.
tasks - Displays the tasks runnable from root project '2015-12-hello-gradle'.

Other tasks
-----------
buildTask
helloGradle
wrapper

To see all tasks and more detail, run gradle tasks --all

To see more detail about a task, run gradle help --task [task]

BUILD SUCCESSFUL

Total time: 1.596 secs
```

### Plugin
gradle에는 수많은 플러그인들이 존재한다. 플러그인들은 자체적인 task들을 가지고 있다(gulp, grunt 등도 동일하다.) 모든 task를 직접 작성할 수 있지만, 플러그인이 제공하는 task들을 활용하면 효율적인 개발이 가능하다. 그리고, 대부분 업무는 gradle의 task를 작성하는 것이 주가 아닐 것이다. 그러니, 최대한 gradle 플러그인들이 제공하는 task를 활용해야 한다.

#### 플러그인 사용법
`apply` 함수를 이용하여 플러그인 적용할 수 있다.

```groovy
apply plugin: [plugin name]
```

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

## Task 설정
Gradle도 grunt나 gulp 처럼 기본 Task를 지정할 수 있다. `defaultTask` 옵션을 이용하면 된다.
```groovy
defaultTasks 'helloGradle'
```
그리고 `gradle -q` 만 실행시켜보면, `helloGradle` Task만 실행되는 걸 확인할 수 있다.

Task 간의 의존도를 설정할 수도 있다. task 함수의 인자에 dependOn 인자를 이용하여 지정할 수 있다.
```groovy
defaultTasks 'buildTask'

task compileTask << {
	println 'compiling...'
}

task buildTask(dependOn:compileTask) << {
	println 'building...'
}
```

위와 같이 수정 한 후 `gradle -q`를 실행시키면 buildTask가 수행되기 전에 compileTask가 수행된다.

## 자바프로젝트로 만들기
내가 주로 개발할 프로젝트는 자바와 자바스크립트를 주로 이용하는 웹 어플리케이션이다. 따라서, 자바 프로젝트이거나 Node 기반의 프로젝트일 것이다.

### java 플러그인 사용
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

### 프로젝트 구조 설정
java 플러그인을 사용하면 기본적으로 찾는 폴더 구조들이 있다. 공식문서에는 다른 폴더를 찾도록 하는 방법들이 나와있으나, 굳이 그럴 필요는 없을 듯 하다. 대부분의 자바 프로젝트들이 가지고 있는 구성이기 때문이다.

|folders|설명|
|-|-|
|src/main/java|자바 소스가 위치하는 루트 디렉토리|
|src/main/resources|리소스(property 파일들, 각종 설정 파일들)파일이 위치할 루트 디렉토리|
|src/test/java|자바 테스트 소스가 위치하는 루트 디렉토리|
|src/test/resource|테스트 리소스 파일이 위치할 루트 디렉토리|

### HelloGradle.java
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

### 의존모듈 설정
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

### Dependency Configurations
dependencies 설정 내부에서 사용할 수 있는 설정함수들은 다음과 같다(이는 java 플러그인이 제공해주는 것이다.)

- compile
- runtime
- testCompile
- testRuntime

> 참고: Maven에서 제공하는 provided와 같은 설정이 기본으로 제공되지는 않으나, 만들수는 있다. 너무 깊은 주제이므로 필요할 경우 추후에 학습!

## References
- [권남님 위키 - Gradle](http://kwonnam.pe.kr/wiki/gradle)
- [Announcing .. Gradle Tutorial Series](http://rominirani.com/2014/07/28/gradle-tutorial-series-an-overview/)