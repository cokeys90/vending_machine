# 음료수 자반기


## 🔧 Development Environment

![npm](https://img.shields.io/badge/npm-v11.3.0-CB3837?logo=npm)
![Node.js](https://img.shields.io/badge/node-v18.20.3-blue?logo=node.js)
![Vite](https://img.shields.io/badge/vite-v6.3.5-646CFF?logo=vite)

---
<br>

#### STEP1. nvm install
[nvm install](https://github.com/coreybutler/nvm-windows/releases)

<br>

#### STEP2. node install

```bash
nvm install 18.20.3
```

```bash
nvm use 18.20.3
```

<br>


#### STEP3. 프로젝트 생성
```bash
npm create vite@latest . -- --template react-ts
```


<br>

#### 실행
```bash
npm run dev
```

### 덤
1. 대기 상태 일때 자판기 버튼이 랜덤으로 하이라이트되어 관심을 유발

### 경우의 수 및 예외 케이스
1. 현금을 투입한 상태에서 카드를 투입한 경우, 카드 회수 요청(투입 후 20초)
2. 카드를 투입한 상태에서 현금을 투입한 경우, 현금 회수 요청(투입 후 20초)
