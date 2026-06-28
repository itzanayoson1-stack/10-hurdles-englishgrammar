# Grammar 10 Hurdles

**암기가 아니다. 넘어라.**

by UK TIGER 영어코치 × tenhurdles.com

---

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기

## 빌드

```bash
npm run build
```

## GitHub + Vercel 배포 방법

### 1. GitHub 저장소 생성
- github.com 접속 → New repository
- 이름: `grammar-10-hurdles`
- Public 선택 → Create

### 2. 이 프로젝트 업로드
```bash
git init
git add .
git commit -m "Initial commit: Grammar 10 Hurdles"
git branch -M main
git remote add origin https://github.com/[YOUR_USERNAME]/grammar-10-hurdles.git
git push -u origin main
```

### 3. Vercel 배포
- vercel.com 접속 → Add New Project
- GitHub 저장소 연결 → grammar-10-hurdles 선택
- Framework: Vite (자동 감지)
- Deploy 클릭

### 4. 커스텀 도메인 (tenhurdles.com)
- Vercel 프로젝트 → Settings → Domains
- tenhurdles.com 입력 → Add
- 도메인 구매처 DNS 설정에 Vercel이 안내하는 값 입력

---

## 기술 스택

- React 18
- Vite 5
- CSS Modules (Tailwind 없이 순수 CSS)
- localStorage (진행 상황 저장)

## 프로젝트 구조

```
src/
  data/
    hurdles.js        # 10개 허들 데이터
  hooks/
    useProgress.js    # 진행 상황 관리 (localStorage)
  components/
    Hero.jsx          # 메인 히어로 섹션
    HurdleMap.jsx     # 허들 맵 그리드
    HurdleDetail.jsx  # 허들 상세 내용
    QuizBox.jsx       # 퀴즈 컴포넌트
    CompletionScreen.jsx  # 완주 화면
  App.jsx             # 메인 앱
  main.jsx            # 엔트리 포인트
  index.css           # 글로벌 스타일
```
