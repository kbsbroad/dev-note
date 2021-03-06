# Hello, Docker!
![docker docker](images/logo.png)

도커(docker)를 시작해보자.


## 도커에 대한 간략 소개
> **docker** [dɑ:kə(r)]: *부두노동자*

- 리눅스 컨테이너(Container) 플랫폼.
- 오픈소스. 라이선스는 Apache License, Version 2.0.
- Go로 개발되었고, Github에 소스가 공개되어 있음 ([Github 도커 저장소](https://github.com/docker/docker))
- 2013년 Docker, Inc.에서 개발하여 배포 시작.
- 개발, 테스트, 운영환경을 통일하여 효율적으로 관리할 수 있음.
- 오픈소스인 Docker를 기반으로 상용관리 툴등을 개발하여 수익을 창출하고 있음.
- 공식홈페이지: [https://www.docker.com](https://www.docker.com)

Docker를 이해하려면 가상화 기술에 대한 기본적인 이해가 필요함. 도커에서 이미지(image)와 컨테이너(Container)라는 용어가 자주 사용되는데 이 둘을 이해하고 구별할 수 있어야 함.

### 도커 이미지(Docker Image)
- 서비스 운영에 필요한 서버 프로그램, 소스코드, 컴파일된 실행 프로그램 등을 묶은 형태.
- Window 설치 CD라고 생각하면 됨.
- 쉽게 말하면 번들링(Window 부팅 CD의 내용물을 .iso **이미지**라고 부르는 것과 비슷한 개념)
- 변경할 수 없음(immutable). 그러나, 이미지를 복제하여 수정 후 다른 이미지를 생성하는 것은 가능함.

### 도커 컨테이너(Docker Container)
- 도커 이미지를 실행한 형태.
- 설치된 Window 운영체제라 보면 됨. 실행 후 부가작업을 통해 내용물 변경가능. 그러나, 변경된 내용은 컨테이너가 종료되면 사라짐.
- 컨테이너란 용어는 LXC를 기반으로 하였기 때문에 나온 것 같음. 격리된 공간이라는 느낌도 있음.
- 초기에는 LXC(LinuX Container)를 기반으로 구현함. 0.9 버전 이후부터는 *libcontainer*라는 것을 직접 만들어서 구현.(실행옵션으로 선택이 가능함)

> 참고: 리눅스 컨테이너(LinuX Container, LXC)
> - 여러 개의 애플리케이션을 단일 호스트에서 구동하기 위한 개념
> - 리눅스 운영체제를 가상화하는 기술이기 때문에 서버 가상화와 달리 좀더 가볍다.
> - 리눅스 컨테이너는 새로운 개념은 아니다. 오라클 HP, IBM등이 10여년 전 부터 사용해오던 기술.
> - 리눅스 컨테이너는 가상공간만 만듬. 실행은 호스트에서 수행. 가상화보다 격리임.(리눅스 커널의 cgroups와 namespaces가 제공하는 기술이라 함)

## 도커의 특징

1. **게스트 OS가 필요없음**
	- 게스트 OS를 별도로 설치하지 않는다.
	- 격리된 공간에 서비스 운영에 필요한 라이브러리들과 리눅스 응용 프로그램만 설치한다.
	- 호스트 OS와 자원을 공유한다.

2. **하드웨어 자원 공유**
	- 하드웨어 가상화 계층이 존재하지 않는다.
	- 메모리 접근, 파일시스템, 네트워크 전송속도가 서버가상화에 비해 월등히 빠르다.
	- 호스트와 도커 컨테이너 사이의 성능 차이가 거의 없다(오차 수준 범위)

3. **이미지 버전 및 저장소 존재**
	- git과 비슷한 버전관리 개념이 존재한다.(tag, commit, pull 등의 개념이 존재)
	- Github와 유사한 Docker Hub 서비스가 있다. Docker Hub는 기본적으로 공개 도커 이미지를 제공하지만, 유료로 사설 이미지 저장소를 제공한다는 점에서도 Github와 유사하다.

4. Docker API 제공
	- Docker을 운영하고 관리하기 위한 서비스를 자체적으로 만드는게 가능함.


## Immutable Infrastructure
도커 이야기하다가 뜬금없이 이 용어가 왜 나오는 것일까? Docker를 설명한 한 자료에서 이것을 설명하고 있는데, 개발자의 입장에서 도커가 왜 인기있을 수 밖에 없는지가 완전히 이해되었기 때문이다. 우리 팀에서도 결국 이것을 깨닫고 이러한 방향으로 나가야했기에 도커를 채택하려 하기 때문이다.

### 개념
- 한 번 설정하고 (거의) 변경하지 않는 이미지 기반의 어플리케이션 배포 패러다임을 뜻한다.
- 어플리케이션을 실행하는 환경은 워낙 다양해서 설치 후 환경에 맞게 설정하는 작업이 필요했다. 개발자들은 다양한 운영환경에 수시로 대응해야 했다.
- 혹은 배포환경을 제한해야 한다. 이는 고객사 입장에서는 별도의 비용 증가를 의미하기도 한다.
- 인프라는 굉장히 빠른 속도로 변화한다. 기존 환경이 변경되어야 할 경우 기존 환경을 변경하는 것이 아니라, 새로운 환경을 구축하고 테스트한 후 기존 환경을 대체하는 것이 더 효율적이고 안전하다. 
- 서버 가상화는 운영환경 측면에서 이 패러다임에 부합하지만, 어플리케이션의 배포는 별도로 수행해야 한다. 이는 서버확장시에 별도의 작업(자동화되든 사람이 직접하든)이 필요하다는 의미이다.
- 도커는 이 패러다임에 부응한다. 도커로 인해 어플리케이션 배포 및 확장, 폐기의 완전 자동화가 가능해진다.

### 장점
- 관리가 편리함 : 서비스환경 이미지만 관리하면 됨. 어플리케이션을 변경하려면 이미지만 교체하면 됨.
- 확장성 : 어플리케이션 이미지를 복제하는 것으로 끝남. 클라우드 서비스의 자동확장기능과 손쉽게 연동.
- 테스트 용이 : 개발, 테스트, 운영환경이 통일됨("내 PC에서는 잘 되요~"를 줄일 수 있음). 운영환경상의 테스트만 통과하면 됨
- 가볍다 : 서버 가상화와 달리 어플리케이션 이미지 용량은 매우 작다.

## 도커 실습

### 설치하기

#### Linux
도커는 리눅스 배포판에서 제공하는 패키지 매니저(`apt-get`이나, `yum` 등)를 이용해서 설치할 수 있다. 하지만, 리눅스 배포판을 자동으로 감지해서 설치해주는 설치스크립트를 별도로 제공하고 있어서, 손쉽게 설치할 수 있도록 하고 있다.

```sh
$ sudo wget –qO- https://get.docker.com/ | sh
```
> 단, `wget`이 설치되어 있어야 한다. wget 설치는 구글링해보면 금방 찾을 수 있다.

위 스크립트를 이용하면 설치 후 실행까지 완료된다. 또한, sudo 명령어없이 실행할 수 있도록 하는 방법까지 알려준다.

바로 도커 실행을 쉽게 확인할 수 있도록, `hello-world` 이미지를 기본 제공하고 있다. `hello-world` 이미지를 실행시켜 설치가 잘되어 있는지 알수 있다.

```sh
$ sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b901d36b6f2f: Pull complete
0a6ba66e537a: Pull complete
Digest: sha256:8be990ef2aeb16dbcb9271ddfe2610fa6658d13f6dfb8bc72074cc1ca36966a7
Status: Downloaded newer image for hello-world:latest

Hello from Docker.
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker Hub account:
 https://hub.docker.com

For more examples and ideas, visit:
 https://docs.docker.com/userguide/
```
처음 설치 후에는 로컬호스트에 `hello-world` 이미지가 없기 때문에 Docker Hub에서 해당 이미지를 다운로드 받는다.

#### Window, Mac
도커는 리눅스 컨테이너 기술을 필요하기 때문에 리눅스가 필요하다. Window나 Mac 환경에서 도커를 사용하기 위해서는 Virtual Box와 같은 가상화 솔루션을 이용할 수 밖에 없다.

도커는 Windows, Mac 환경에서 도커를 사용할 수 있도록 하는 Docker Toolbox를 제공한다. 자세한 설치방법은 도커 공식문서에 잘 나와있으니 참고하면 된다.

- [Windows 환경에서 Docker Toolbox 설치방법](https://docs.docker.com/windows/step_one/)
- [Mac OS X 환경에서 Docker Toolbox 설치방법](https://docs.docker.com/mac/step_one/)

> **참고: Windows 10 환경에서 테스트
> - Docker Toolbox 실행시 `~ hostifonly create failed`를 만날 경우, Virtual Box 버전이 낮아서 발생한 것일 수 있으니, Virtual Box를 최신 버전으로 설치해보자.
> - Windows 10 환경에서는 Docker Toolbox가 실행이 안된다. 정확히 말하자면, VM이 실행하다가 오류난다. 그래서, Vagrant를 이용해서 실습을 진행했다.


## 도커 실행

도커를 실행하는 기본 용법은 다음과 같다.

```sh
$ docker COMMAND [OPTIONS] [ARGS...]
```

각 COMMAND에서 사용할 수 있는 옵션들이 있는데, 이는 `docker COMMAND --help`를 통해 확인해볼 수 있다.

### 도커 명령어 목록
도커는 많은 명령어를 지원하고 있다. 모든 명령어를 자세히 다 기억할 필요는 없지만, 어떤 명령들을 지원하는지는 파악할 필요가 있다.

도커 공식문서의 Docker commands 페이지([https://docs.docker.com/engine/reference/commandline/](https://docs.docker.com/engine/reference/commandline/)) 에 나온 목록에 간단한 설명을 추가했다.

#### Docker management commands

COMMAND NAME| DESC.
------------|-------------------------------------------
deamon      | 도커를 데몬으로 실행한다(?)
info        | 도커 엔진 정보를 출력한다.
inspect     | 도커 이미지 혹은 컨테이너의 상세정보를 반환한다.
version     | 도커 엔진의 버전정보를 출력한다.

#### Image commands

COMMAND NAME| DESC.
------------|-----------------------------------------------
build       | 새 이미지를 만든다.
commit      | 변경이 일어난 컨테이너로부터 새로운 이미지를 생성한다.
export      | 컨테이너를 익스포트한다(tar 파일로 압축됨)
history     | 이미지의 변경이력을 조회한다.
images      | 호스트에서 사용가능한 이미지 목록을 출력한다.
import      | 컨테이너로 지정된 곳의 파일시스템 내용을 임포트한다.
rmi         | 하나 이상의 도커 이미지를 삭제한다.
save        | 도커 이미지를 tar로 압축한다.
tag         | 도커 이미지에 태깅한다.


#### Container commands
COMMAND NAME| DESC.
------------|------------------------------------------------------------------------
attach      | 실행중인 컨테이너에 접속한다.
cp          | 컨테이너와 호스트 간 파일(혹은 폴더)을 복사한다.
create      | (도커 이미지로 부터)새 컨테이너를 생성한다.(실행상태는 아님)
diff        | 컨테이너의 파일시스템 변경사항을 검사한다.
events      | 도커 엔진의 실시간 이벤트를 가져온다.(도커 엔진 로그 모니터한다는 의미)
exec        | 실행중인 컨테이너 내의 명령을 실행한다.
kill        | 실행중인 컨테이너를 종료시킨다(SIGKILL 혹은 별도 시그널)
logs        | 실행중인 컨테이너의 로그를 출력한다.
pause       | 실행중인 컨테이너 내부의 모든 프로세스를 일시정지한다.
port        | 컨테이너와 호스트간 포트매핑 정보를 조회한다.
ps          | 컨테이너 목록을 출력한다.
rename      | 컨테이너 이름을 변경한다.
restart     | 컨테이너를 재시작 한다.
rm          | 하나 이상의 지정된 컨테이너를 삭제한다.
run         | 새 컨테이너를 생성하고 명령을 실행한다.(기본명령은 /bin/bash)
start       | 하나 이상의 지정된 컨테이너를 시작한다.
stats       | 하나 이상의 실행중인 컨테이너의 자원 사용량을 조회한다.
stop        | 컨테이너로 SIGTERM 시그널을 보낸다.
top         | 컨테이너 내의 실행 중인 프로세스의 목록을 출력한다.
unpause     | 컨테이너 내의 모든 프로세스의 일시정지를 해제한다.
wait        | 컨테이너가 종료될 때까지 대기하고, 종료되면 exit 코드를 출력한다.

#### Hub and registry commands
COMMAND NAME| DESC.
------------|----------------------------------------
login       | 도커 레지스트리 서버에 등록하거나 로그인한다.
logout      | 도커 레지스트리 서버에서 로그아웃한다.
pull        | 도커 레지스트리 서버로부터 이미지를 가져온다.
push        | 도커 레지스트리 서버로 이미지를 전송한다.
search      | Dokcer Hub에서 이미지를 검색한다.


#### Network and connectivity commands
COMMAND NAME      | DESC.
------------------|---------------------------------------------
network_connect   | 컨테이너를 네트워크에 연결한다.
network_create    | 새로운 네트워크를 생성한다.
network_disconnect| 네트워크로부터 컨테이너 연결을 중단한다.
network_inspect   | 지정된 네트워크의 상세정보를 출력한다.
network_ls        | 사용자에 의해 생성된 모든 네트워크 목록을 출력한다.
network_rm        | 네트워크를 삭제한다.

#### Shared data volume commands
COMMAND NAME   | DESC.
---------------|--------------------------
volumn_create  | 디스크 볼륨을 생성한다.
volumn_inspect | 디스크 볼륨 정보를 조회한다.
volumn_ls      | 디스크 볼륨 목록을 출력한다.
volumn_rm      | 디스크 볼륨을 삭제한다.


## 도커 주요 명령어
자주 사용되는 명령어를 중심으로 훑어보자.

### docker pull
도커 등록소(registry)로 부터 이미지를 가지고 온다.

#### 사용법
```sh
$ docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

#### 주요 옵션들
option                    | desc.
--------------------------|------------------------------------------
`-a` or `--all-tags=false`| 저장소내에 태깅된 모든 도커 이미지를 가지고 온다.


### docker images
호스트에 있는 image 목록을 보여준다.

#### 사용법
```sh
$ docker images [OPTIONS] [REPOSITORY[:TAG]]
```

#### 주요 옵션들
option         |desc.
---------------|-----------------------------------------------------
`-a` or `--all`|호스트의 모든 이미지를 보여준다.
`--no-trunc`   |출력되는 목록을 원본대로 보여준다. 주로 IMAGE ID가 줄여준다.
`-q`           |이미지 ID만 출력한다.

### docker run
도커 이미지를 실행하는 명령어이다. `docker run` 옵션의 갯수가 많으며, 별도의 페이지로 문서가 존재할만큼 중요하고 자주 사용되는 명령어 중 하나이다.


#### 사용법
```sh
$ docker run [OPTIONS] IMAGENAME[:TAG] [ARG...]
```
- OPTIONS: run 명령어를 실행할 때 사용할 수 있는 옵션들이다.
- IMAGENAME: 실행할 이미지 이름이다.
- TAG: 특정 태그의 이미지를 실행할 경우 사용할 수 있다.
- ARG: 컨테이너 내부에서 수행해야 할 작업들을 지정한다.

`docker run` 명령어는 로컬호스트에서 해당 이미지를 찾아서 실행시킨다. 로컬호스트에 이미지가 없다면 Docker Hub에서 이미지를 찾아서 다운로드(`docker pull`)한다.

#### 주요 옵션들
option                           | desc.
---------------------------------|--------------------------------------------------------------
`-a` or `--attach=[]`            | 컨테이너의 STDIN, STDOUT, STDERR를 호스트에 바인딩한다.
`-d` or `--detach=false`         | 컨테이너를 Detached Mode로 실행한다.
`-p {host port}:{container port}`| 호스트의 port와 컨테이너 내부의 포트를 연결한다.
`-i` or `--interactive=false`    | 컨테이너의 STDIN을 연결한 채로 유지한다.
`-t` or `--tty=false`            | 가상터미널(pseudo-TTY)을 연결한다.
`--rm=false`                     | 컨테이너가 종료될 때 컨테이너도 삭제한다.
`--privileged=false`             | 시스템 명령을 수행할 수 있도록 함

> **참고) **
> - `-a` 옵션의 기본값은 STDIN, STDOUT, STDERR에 모두 바인딩하는 것이다.
> - `-d`옵션과 `--rm`옵션은 함께 사용할 수 없다.
> - `-i -t` 옵션은 `-it`로 줄여서 사용할 수 있다.

#### Detached Mode
`-d` 옵션으로 실행하면 컨테이너는 Detached mode로 실행된다. Detached mode로 실행된 컨테이너는 컨테이너에서 빠져나와도 컨테이너가 자동으로 종료되지 않는다.

다만, Detached Mode와 관련해서 도커 문서에 아래와 같은 글귀가 있다.

> By design, containers started in detached mode exit when the root process used to run the container exits.
> by [Docker Docs > Command And API references > Docker run reference](https://docs.docker.com/engine/reference/run/)

여기서 주의할 점은 컨테이너 내에서 실행되는 루트 프로세스가 종료되면, detached mode로 실행된 컨테이너도 종료된다는 사실이다. 이것은 컨테이너내에서 실행되는 루트 프로세스는 실행 중인 상태여야 한다는 의미이다.

설명이 어려우니 예제를 보자.

```sh
docker run -d my-ubutu-nginx service nginx start
```
docker run을 이용해 컨테이너내에서 `service nginx start`를 실행하면 nginx가 시작되지만, 새로운 프로세스를 만들어 백그라운드 상태로 전환 후 루트 프로세스(`service nginx start`)는 종료된다. 따라서, 컨테이너도 종료된다.

컨테이너가 종료되지 않도록 하려면, 아래와 같이 foreground 상태로 실행되도록 만들어야 한다.

```sh
docker run -d my-ubuntu-nginx nginx -g 'daemon off;'
```

### docker stop
실행중인 컨테이너(의 프로세스)를 중지시킨다(SIGTERM -> SIGKILL)

#### 사용법
```sh
$ docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

#### 주요 옵션들
option              | desc.
--------------------|-------------------------------------------
`-t` or `--time=10` | 중지시키기 전 지정한 시간(초)만큼 대기한다.

### docker ps
컨테이너 목록을 보여준다. 기본옵션은 실행중인 컨테이너 목록만 보여진다.

#### 사용법
```sh
$ docker ps [OPTIONS]
```

#### 주요 옵션들
option            |desc.
------------------|----------------------------------
`-a` or `--all`   |호스트의 모든 컨테이너를 보여준다.
`-f` or `--filter`|특정 조건에 해당하는 목록을 보여준다.
`-l` or `--latest`|제일 최근에 생성된 컨테이너를 보여준다.
`-s` or `--size`  |컨테이너의 총 용량을 표시한다.

#### Filtering
필터에 대해서는 별도로 설명할 필요가 있다. `ps -ef | grep XXX` 처럼 특정 컨테이너의 상태를 알고 싶을 때 filter 옵션을 사용해야 하기 때문이다.

필터의 값은 key=value 조합의 문자열이다. key로 지원되는 항목은 다음과 같다

key     |desc.
--------|------------------------------------------------------
id      |조건값을 포함하는 컨테이너 ID를 가진 컨테이너 목록을 보여준다.
label   |??(label의 개념을 아직 잘 파악하지 못함)
name    |조건값을 이름으로 포함하는 컨테이너 목록을 보여준다.
exited  |특정 exited 상태의 컨테이너 목록을 보여준다.
status  |조건에 해당하는 상태의 컨테이너 목록을 보여준다.
ancestor|조건에 해당하는 부모이미지에 해당하는 컨테이너 목록을 보여준다.

> **참고 1: status 값**
> - created : 생성된 상태
> - restarting : 재시작 중인 상태
> - running : 실행 중 상태
> - paused : 일시정지된 상태
> - existed : 컨테이너에서 빠져나온 상태(실행이 중단된 상태)

> **참고 2: ancestor 값의 포맷**
> - IMAGE
> - IMAGE:TAG
> - IMAGE:TAG@DIGEST
> - 축약 ID
> - 전체 ID

### docker exec
실행중인 컨테이너 내부에 명령을 전달한다.

#### 사용법
```sh
$ docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

#### 주요 옵션들
option                       | desc.
-----------------------------|--------------------------------------
`-d` or `--detach=false`     | 명령을 백그라운드로 실행(Detached Model)
`-i` or `--interactive=false`| 컨테이너의 STDIN을 연결한 채로 유지한다.
`--privileged=false`         | 시스템 명령을 수행할 수 있도록 함
`-t` or `--tty=false`        | 가상터미널(pseudo-TTY)을 연결한다.
`-u` or `--user=`            | 연결계정 지정

#### 예제
```sh
$ docker run --name ubuntu_bash --rm -i -t ubuntu bash
```
컨테이너를 생성하고 bash 세션을 시작한다.

```sh
$ docker exec -d ubuntu_bash touch /tmp/execWorks
```
`/tmp/execWorks` 파일을 생성하는 명령 수행한다.

```sh
$ docker exec -it ubuntu_bash bash
```
새로운 bash 세션 시작.


### docker attach
실행중인 컨테이너에 접속한다.

#### 사용법
```sh
$ docker attach [OPTIONS] CONTAINER
```

### docker rm
컨테이너를 삭제한다.

#### 사용법
```sh
$ docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

#### 주요 옵션들
option             |desc.
-------------------|-----------------------------------
`-f` or `--force`  |실행중인 컨테이너를 강제로 삭제(SIGKILL)
`-v` or `--volumns`|컨테이너와 관계된 디스크 볼륨을 삭제한다.

### docker rmi
이미지를 삭제한다.

#### 사용법
```sh
$ docker rmi [OPTIONS] IMAGE [IMAGE...]
```

#### 주요 옵션들
option             | desc.
-------------------|------------------------------------
`-f` or `--force`  | 이미지를 강제로 삭제(SIGKILL)
`--no-prune=false` | 태깅되지 않은 부모 이미지를 삭제하지 않음
