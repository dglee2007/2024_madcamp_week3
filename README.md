# 🤑MadStocks

# 개요

---

- 2014년으로 돌아가 최고의 매년 주식투자를 하며 최고의 수익률을 남겨보세요!
- 해당 게임은 제시되는 10년 전의 기업 12개를 보고, 10년간 12개의 기업에 대해 투자활동을 하며 최대한 많은 수익을 남기는 게임입니다.

- # 팀원

---

- 이동건(KAIST 20 EE & CS)

[dglee2007 - Overview](https://github.com/dglee2007)

- 이현호(HYU 21 CSE)

[kclhh4318 - Overview](https://github.com/kclhh4318)

# 기술 스택

---

### 프론트엔드

- React

    

### 백엔드

- server: node.js
- Databse: MySQL
- IDE: Visual Studio Code
- Cloud: Kcloud

### DB스키마
![DB schema](https://github.com/user-attachments/assets/e00d78e6-c3c7-485a-ba21-dface00db7f6)

# API 명세서

---

- 크게 네 분류로 나뉜다.

| 요청변수 | 설명 |
| --- | --- |
| api/auth | 로그인 / 회원가입과 관련된 라우트 |
| api/game | 게임 기능과 관련된 라우트 |
| api/ranking | 랭킹 집계와 관련된 라우트 |
| api/profile | 프로필 표시와 관련된 라우트 |

### api/auth: 로그인 / 회원가입과 관련된 라우트
![image](https://github.com/user-attachments/assets/3e58c63d-5143-423e-aff5-9117a3568f38)

### api/game: 게임 진행 process와 관련된 라우트
![image](https://github.com/user-attachments/assets/bcd462fc-1655-4117-8aec-3997fb1d47e7)

### api/profile: 프로필 페이지 관련 라우트
![image](https://github.com/user-attachments/assets/e7abb1ec-70d0-414e-a7fc-cacdb5f3049a)

### api/ranking: 랭킹 페이지 관련 라우트
![image](https://github.com/user-attachments/assets/061381b1-6b85-4ad4-867d-2c3db11777b8)

# 설명

---

- 로그인 화면
    - 계정이 있다면 이름과 비밀번호를 입력하여 게임에 로그인 할 수 있습니다.
    - 계정이 없다면 이름과 비밀번호, 비밀번호 확인 을 통해 계정에 가입할 수 있게 합니다.
    - `jwt` 를 사용하여 비밀번호를 해싱하여 DB에 저장합니다.
    - `refreshToken` 을 사용해 특정 시간(10분)동안 로그인 세션이 유지되도록 구현했습니다.
- 메인 화면
    - 시뮬레이션을 시작할 수 있는 버튼이 있고, 우측에는 사용방법, 랭킹, 로그아웃 버튼이 있습니다. 사이드바 버튼은 화면이 스크롤되어도 고정된 위치에 버튼이 있도록 CSS의  `position: fixed` 속성을 이용하여 구현했습니다.
- 게임 보드
    - play 버튼을 누르면 DB에 저장된 41개의 기업 중 무작위로 12개의 기업을 선정하여 게임 세션동안 12개의 기업으로 진행됩니다.
    - 게임 시작 시 초기 자본은 $1,000 에서 시작합니다. 제한된 금액 속에서 사용자는 해당 기업들에 주식 투자를 할 수 있고, 해당 기업에 대한 결정적인 소식을 얻을 수 있는 신문을 읽을 수 있습니다.
    - 기업별 아이콘을 누르게 되면 일반 정보를 읽을 지, 고급 정보를 읽을 지 선택할 수 있습니다.
        - 일반 정보는 50불로 읽을 수 있으며, 신문의 헤드라인을 읽을 수 있습니다.
        - 고급 정보는 100불로 읽을 수 있으며, 신문의 헤드라인과 더욱 상세한 내용을 읽을 수 있습니다.
    - 아래에 12개의 기업을 리스트 형식으로 불러오며, 수량을 제한 금액이 넘지 않는 선에서 구매할 수 있습니다.
    - 매매가 체결되면 내 포트폴리오에 남게 됩니다.
    - 다음 턴으로 넘어가면 기업별 전년 대비 등락폭이 결과로 표시됩니다.
    - 해당 턴을 10번 반복한 뒤 게임을 마치면 총 수익률이 표시되고,
- 랭킹 화면
    - 단일 게임동안 가장 많이 수익률을 남긴 랭킹과 전체 게임 진행동안 남긴 수익률 랭킹을 볼 수 있습니다.
 
# 미리 보기
![로그인](https://github.com/user-attachments/assets/4537ff62-0073-4bb3-ac58-51390a975ff3)
![메인화면](https://github.com/user-attachments/assets/841f6f3d-0674-4013-abbb-4c6f6cb0b36c)
![게임보드](https://github.com/user-attachments/assets/7e228203-5381-4992-9bd0-dd1268ccc357)
![뉴스선택창](https://github.com/user-attachments/assets/8604edce-f3fa-4946-88bb-b02a44efd49c)
![일반정보](https://github.com/user-attachments/assets/5301bba1-f3c5-4264-8a3e-8109fd89e9b1)
![고급정보](https://github.com/user-attachments/assets/d310898c-8fa0-4e16-93f2-fe9726539314)
![포트폴리오](https://github.com/user-attachments/assets/6f5768eb-bd16-48bf-b0e4-0b4da2fbcdea)
![주가변화창](https://github.com/user-attachments/assets/ec6044cb-035a-45d0-bb10-e22b43e43956)
![게임끝](https://github.com/user-attachments/assets/617efad9-a0f8-40d0-ab61-ba6725488cf6)
![판당최고수익률](https://github.com/user-attachments/assets/b4156fd6-acb5-4a98-9678-f60b56f63101)
![누적수익률](https://github.com/user-attachments/assets/38b200c0-536f-4683-b94d-a2b33f2103dd)
