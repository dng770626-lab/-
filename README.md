# 나우지음

Next.js App Router + React + TypeScript 기반 프로젝트입니다. 기존 화면과 CSS, 이미지, 외부 링크를 유지합니다.

## 실행

Node.js 20.9 이상이 필요합니다.

```sh
npm ci
npm run dev
```

- 개발: http://localhost:3000
- 프로덕션 빌드: `npm run build`
- 프로덕션 실행: `npm start`
- 검사: `npm run lint`, `npm run typecheck`

## 구조

- `src/app/page.tsx`: 메인 화면
- `src/app/{architecture,culture,garden,outdoor,promotional}/page.tsx`: 사업별 화면
- `src/app/layout.tsx`: 공통 문서와 메타데이터
- `src/app/globals.css`: 기존 스타일
- `src/app/api/health/route.ts`: 서버 API 예제 (GET /api/health)
- `src/app/admin/`: 관리자 로그인 및 작업 사례 등록 화면
- `src/components/PortfolioSection.tsx`: Supabase 작업 사례 공개 영역
- `src/lib/supabase/`: 브라우저 및 서버용 Supabase 클라이언트
- `supabase/migrations/`: 포트폴리오 테이블, 접근 정책, 이미지 저장소 설정
- `public/`: 이미지 등 정적 자산
- `legacy/`: 전환 전 원본 HTML/CSS 보관용. 이후 수정은 src/app에서 합니다.

기존 /index.html 및 사업별 .html 주소는 Next.js rewrite로 계속 작동합니다. 신규 페이지는 src/app 아래에, 서버 API는 src/app/api 아래에 추가합니다. 서버 비밀값은 .env.local에 두고 커밋하지 않습니다.

관리자는 `/admin/login`에서 로그인한 뒤 대표 메뉴와 세부 메뉴, 사진, 제목, 설명, 작업 날짜와 장소를 등록할 수 있습니다. 등록 자료는 Supabase Database와 Storage에 저장되며 선택한 상세 페이지에서 세부 메뉴별 단락에 등록 순서대로 표시됩니다.

등록된 작업은 관리자 화면의 수정 버튼으로 분류와 내용을 변경할 수 있습니다. 공개 페이지의 사진 설명판을 누르면 원본 사진이 확대됩니다.

## Vercel

Framework Preset은 Next.js를 사용합니다. 기존 프로젝트 설정에 Output Directory(예: .)를 직접 지정했다면 해당 override를 해제합니다. 빌드는 npm run build를 사용합니다.
