# 💣 카드 선택 게임

안전한 카드를 모두 찾아보세요! 꽝 카드를 선택하면 게임이 끝납니다.

## 🎮 게임 소개

카드 선택 게임은 운과 전략이 필요한 간단한 웹 게임입니다. 바닥에 깔린 카드들 중에서 안전한 카드만을 골라내는 것이 목표입니다.

### 🎯 게임 규칙

1. **게임 설정**: 총 카드 수와 꽝 카드 수를 선택합니다
2. **게임 시작**: 카드들이 무작위로 배치됩니다
3. **카드 선택**: 카드를 클릭하여 선택합니다
4. **게임 결과**:
   - 안전한 카드 선택 → 계속 진행
   - 꽝 카드 선택 → 게임 종료 (패배)
   - 모든 안전한 카드 선택 → 승리!

## 🚀 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Architecture**: Feature-Sliced Design (FSD)

## 📁 프로젝트 구조

```
src/
├── entities/          # 비즈니스 엔티티
│   └── game/         # 게임 관련 엔티티
├── features/         # 기능 단위
│   ├── game-board/   # 게임 보드
│   ├── game-settings/# 게임 설정
│   └── game-status/  # 게임 상태
├── pages/            # 페이지 컴포넌트
├── shared/           # 공통 컴포넌트
│   ├── lib/          # 유틸리티
│   └── ui/           # UI 컴포넌트
└── main.tsx          # 앱 진입점
```

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview

# 린트 검사
pnpm lint
```

## 🎨 주요 기능

### ✨ 게임 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원
- **직관적인 UI**: 사용자 친화적인 인터페이스
- **애니메이션 효과**: 카드 선택, 폭탄 폭발 등 생동감 있는 효과
- **게임 상태 관리**: React Context와 useReducer를 활용한 상태 관리

### 🎯 게임 설정

- 총 카드 수: 6~24개
- 꽝 카드 수: 1개 이상 (총 카드의 50% 이하)
- 실시간 게임 정보 표시

### 🎪 시각적 효과

- 카드 공개 애니메이션
- 폭탄 폭발 효과
- 화면 흔들림 효과
- 폭탄 모달 팝업

## 🎮 게임 플레이

1. **게임 설정 페이지**에서 원하는 카드 수와 꽝 카드 수를 선택
2. **게임 시작** 버튼을 클릭하여 게임 시작
3. **카드를 클릭**하여 선택 (꽝이 아닌 안전한 카드만 선택!)
4. **모든 안전한 카드**를 찾으면 승리! 🎉
5. **꽝 카드**를 선택하면 게임 종료 💥

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### 반응형 브레이크포인트

- **sm**: 640px+ (작은 태블릿)
- **md**: 768px+ (중간 태블릿)
- **xl**: 1280px+ (큰 데스크톱)

## 🚀 배포

```bash
# 프로덕션 빌드
pnpm build

# dist 폴더의 내용을 웹 서버에 배포
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

💣 **즐거운 게임 되세요!** 💣
