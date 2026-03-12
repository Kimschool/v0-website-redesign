# KCP地球市民日本語学校 웹사이트 리디자인 - 설계서

> **프로젝트명:** v0-website-redesign
> **버전:** 0.1.0
> **작성일:** 2026-03-11
> **대상:** KCP地球市民日本語学校 공식 웹사이트

---

## 1. 프로젝트 개요

KCP地球市民日本語学校(KCP 지구시민 일본어학교)의 공식 웹사이트를 Next.js 기반으로 리디자인하는 프로젝트. 다국어 지원(6개 언어), 반응형 디자인, 풍부한 애니메이션을 통해 현대적인 학교 소개 웹사이트를 구현한다.

### 1.1 핵심 목표

- 학교 브랜드 이미지에 맞는 세련된 UI/UX 제공
- 6개 언어(일본어, 영어, 중국어, 한국어, 러시아어, 베트남어) 지원
- 모바일 우선 반응형 디자인
- 접근성(a11y) 준수
- Vercel 배포 환경 최적화

---

## 2. 기술 스택

### 2.1 코어 프레임워크

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.1.6 | React 풀스택 프레임워크 (App Router) |
| **React** | 19.2.4 | UI 라이브러리 |
| **TypeScript** | 5.7.3 | 타입 안전성 |

### 2.2 스타일링

| 기술 | 버전 | 용도 |
|------|------|------|
| **Tailwind CSS** | 4.2.0 | 유틸리티 기반 CSS |
| **tw-animate-css** | 1.3.3 | 확장 애니메이션 |
| **class-variance-authority** | 0.7.1 | 컴포넌트 변형 관리 |
| **clsx + tailwind-merge** | - | 클래스명 병합 유틸리티 |

### 2.3 UI 컴포넌트

| 기술 | 용도 |
|------|------|
| **shadcn/ui** (new-york 스타일) | 기본 UI 컴포넌트 라이브러리 |
| **Radix UI** (25+ 패키지) | 접근성 준수 헤드리스 UI 프리미티브 |
| **Lucide React** | 아이콘 라이브러리 |
| **Embla Carousel** | 캐러셀/슬라이더 |
| **Recharts** | 차트 컴포넌트 |

### 2.4 기능 라이브러리

| 기술 | 용도 |
|------|------|
| **i18next + react-i18next** | 다국어(i18n) 지원 |
| **React Hook Form + Zod** | 폼 상태 관리 및 유효성 검증 |
| **next-themes** | 다크/라이트 테마 |
| **Sonner** | 토스트 알림 |
| **@vercel/analytics** | 웹 분석 |

### 2.5 폰트

- **Noto Sans JP** (300, 400, 500, 700) — 본문용
- **Zen Old Mincho** (400, 500, 700, 900) — 강조/장식용

---

## 3. 아키텍처

### 3.1 디렉토리 구조

```
v0-website-redesign/
├── app/                          # Next.js App Router (페이지)
│   ├── layout.tsx               # 루트 레이아웃 (폰트, Provider)
│   ├── page.tsx                 # 홈페이지
│   ├── about/page.tsx           # KCP 소개
│   ├── education/page.tsx       # 교육 내용
│   ├── school-life/page.tsx     # 학교 생활
│   ├── admission/page.tsx       # 입학 안내
│   ├── contact/page.tsx         # 문의하기
│   └── animations/page.tsx      # 애니메이션 쇼케이스 (개발용)
│
├── components/                   # React 컴포넌트
│   ├── ui/                      # shadcn/ui 기본 컴포넌트 (46개)
│   ├── animations/              # 로딩 애니메이션 (3종)
│   ├── header.tsx               # 공통 헤더
│   ├── footer.tsx               # 공통 푸터
│   ├── hero-section.tsx         # 히어로 섹션
│   ├── intro-carousel-section.tsx
│   ├── reasons-section.tsx
│   ├── features-section.tsx
│   ├── testimonials-section.tsx
│   ├── school-life-section.tsx
│   ├── songs-section.tsx
│   ├── cta-section.tsx
│   ├── about-section.tsx
│   ├── education-section.tsx
│   ├── admission-section.tsx
│   ├── contact-section.tsx
│   └── ...                      # 기타 섹션/페이지 컴포넌트
│
├── hooks/                        # 커스텀 훅
│   ├── use-mobile.ts            # 모바일 뷰포트 감지
│   └── use-toast.ts             # 토스트 알림 훅
│
├── lib/                          # 유틸리티
│   ├── i18n.ts                  # i18next 설정 + 번역 데이터
│   └── utils.ts                 # cn() 유틸리티 (clsx + tailwind-merge)
│
├── styles/
│   └── globals.css              # 전역 스타일 + CSS 변수 + 테마
│
└── public/                       # 정적 에셋
    ├── images/                  # 이미지 파일
    ├── icons/                   # 앱 아이콘
    └── placeholders/            # 플레이스홀더 이미지
```

### 3.2 설계 패턴

```
┌─────────────────────────────────────────┐
│              Root Layout                │
│  (폰트 로드, I18nProvider, Analytics)     │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │           Header                  │  │
│  │  (네비게이션, 언어 선택, 모바일 메뉴)  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │           <main>                  │  │
│  │                                   │  │
│  │   ┌─────────────────────────┐     │  │
│  │   │    Section Component    │     │  │
│  │   │  (각 섹션이 독립적으로 구성)  │  │  │
│  │   └─────────────────────────┘     │  │
│  │              ...                  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │           Footer                  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌────────────┐                         │
│  │ ScrollToTop│                         │
│  └────────────┘                         │
└─────────────────────────────────────────┘
```

**핵심 패턴:**

1. **컴포지션 패턴** — 페이지는 독립적인 섹션 컴포넌트의 조합으로 구성
2. **Server/Client 분리** — 기본적으로 Server Component, 인터랙션 필요 시 `"use client"` 사용
3. **번역 주도 콘텐츠** — 모든 텍스트를 i18n 객체에서 가져와 다국어 지원
4. **IntersectionObserver 기반 애니메이션** — 스크롤 시 뷰포트 진입 감지하여 애니메이션 트리거

---

## 4. 페이지 구조 및 라우팅

### 4.1 라우트 맵

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 메인 랜딩 페이지 (8개 섹션) |
| `/about` | About | KCP 소개, 연혁, 이념 |
| `/education` | Education | 교육 프로그램, 대학 진학 실적 |
| `/school-life` | School Life | 학교 생활, 활동, 시설 |
| `/admission` | Admission | 입학 안내, 해외 사무소 |
| `/contact` | Contact | 문의 폼, 연락처 |
| `/animations` | Animations | 로딩 애니메이션 쇼케이스 (개발용) |

> 동적 라우트 없음. 모든 페이지는 정적 생성.

### 4.2 홈페이지 섹션 구성

```
Home (/)
├── 1. HeroSection        — 타이프라이터 애니메이션, 카운터, CTA 버튼, 배경 이미지
├── 2. IntroCarouselSection — 자동 재생 캐러셀 (7개 슬라이드)
├── 3. ReasonsSection      — KCP를 선택하는 이유 (슬라이더, 3개 항목)
├── 4. FeaturesSection     — 특징 그리드 (8개 항목, 아이콘)
├── 5. TestimonialsSection — 학생 후기 (3개 카드, 이미지)
├── 6. SchoolLifeSection   — 학교 생활 개요 + 통계 카드
├── 7. SongsSection        — 학교 노래/미디어
└── 8. CTASection          — 입학 안내 + 문의하기 CTA 카드
```

---

## 5. 컴포넌트 설계

### 5.1 공통 레이아웃 컴포넌트

| 컴포넌트 | 파일 | 주요 기능 |
|----------|------|-----------|
| **Header** | `header.tsx` | 고정 네비게이션, 스크롤 시 투명도 변경, 언어 선택 드롭다운(6개), 모바일 햄버거 메뉴, CTA 버튼 |
| **Footer** | `footer.tsx` | 학교 정보, 퀵 링크, 관련 링크, SNS 아이콘 |
| **ScrollToTop** | `scroll-to-top.tsx` | 400px 스크롤 후 표시되는 플로팅 버튼 |
| **I18nProvider** | `i18n-provider.tsx` | i18next 초기화 Provider |

### 5.2 페이지별 섹션 컴포넌트 (13개)

| 컴포넌트 | 사용 페이지 | 주요 기능 |
|----------|-------------|-----------|
| **HeroSection** | Home | 타이프라이터 효과, 카운터 애니메이션, 배경 이미지 |
| **IntroCarouselSection** | Home | 자동 재생 + 수동 조작 캐러셀 (5초 간격) |
| **ReasonsSection** | Home | 좌우 슬라이더, 이미지 + 텍스트 |
| **FeaturesSection** | Home | 8개 특징 그리드, Lucide 아이콘 |
| **TestimonialsSection** | Home | 학생 후기 카드, 비디오 오버레이 |
| **SchoolLifeSection** | Home | 이미지 + 콘텐츠 그리드, 플로팅 통계 카드 |
| **SongsSection** | Home | 학교 노래/미디어 |
| **CTASection** | Home | 입학 안내 + 문의하기 CTA |
| **AboutSection** | About | 학교 연혁 타임라인 (10+ 연혁) |
| **EducationSection** | Education | 교육 과정, 대학 진학 실적 테이블 (연도별) |
| **SchoolLifePageContent** | School Life | 학교 생활 상세 콘텐츠 |
| **AdmissionSection** | Admission | 입학 정보, 해외 사무소 (5+개소) |
| **ContactSection** | Contact | 문의 폼 (15+ 필드), 해외 사무소 정보 |

### 5.3 UI 기본 컴포넌트 (shadcn/ui, 46개)

Radix UI 기반의 접근성 준수 컴포넌트:
`Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `Button`, `Calendar`, `Card`, `Carousel`, `Chart`, `Checkbox`, `Collapsible`, `Command`, `ContextMenu`, `Dialog`, `Drawer`, `DropdownMenu`, `Form`, `HoverCard`, `Input`, `Label`, `Menubar`, `NavigationMenu`, `Popover`, `Progress`, `RadioGroup`, `ResizablePanel`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Slider`, `Sonner`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toast`, `Toggle`, `ToggleGroup`, `Tooltip` 등

### 5.4 커스텀 애니메이션 컴포넌트 (3종)

| 컴포넌트 | 파일 | 설명 |
|----------|------|------|
| **SpinnerLoader** | `animations/spinner-loader.tsx` | 삼중 링 회전 스피너 + 중앙 도트 |
| **DotsLoader** | `animations/dots-loader.tsx` | 3개 도트 바운싱 애니메이션 |
| **BarLoader** | `animations/bar-loader.tsx` | 프로그레스 바 + 퍼센티지 표시 |

---

## 6. 다국어(i18n) 설계

### 6.1 지원 언어

| 코드 | 언어 | 기본 여부 |
|------|------|-----------|
| `ja` | 日本語 (일본어) | **기본 언어** |
| `en` | English (영어) | - |
| `zh` | 中文 (중국어) | - |
| `ko` | 한국어 | - |
| `ru` | Русский (러시아어) | - |
| `vi` | Tiếng Việt (베트남어) | - |

### 6.2 번역 구조

```
resources.{lang}.translation
├── nav.*              # 네비게이션 메뉴
├── hero.*             # 히어로 섹션
├── about.*            # KCP 소개
├── reasons.*          # 선택 이유
├── features.*         # 특징
├── testimonials.*     # 학생 후기
├── schoolLife.*       # 학교 생활
├── education.*        # 교육 내용
├── admission.*        # 입학 안내
├── contact.*          # 문의하기
├── footer.*           # 푸터
└── cta.*              # CTA 섹션
```

### 6.3 언어 전환 방식

- Header의 드롭다운 메뉴를 통해 실시간 언어 전환
- `i18n.changeLanguage()` 호출 시 전체 UI 즉시 반영
- 서버 사이드 언어 감지 없음 (클라이언트 전환 방식)

---

## 7. 스타일링 & 테마

### 7.1 색상 시스템

OKLCH 포맷 기반 CSS 커스텀 프로퍼티 사용:

```css
--background       /* 배경색 */
--foreground       /* 전경색(텍스트) */
--primary          /* 주 색상 (cyan 계열, #0891b2) */
--secondary        /* 보조 색상 */
--muted            /* 비활성 색상 */
--accent           /* 강조 색상 */
--destructive      /* 위험/삭제 색상 */
--border           /* 테두리 색상 */
--ring             /* 포커스 링 색상 */
--chart-1 ~ 5      /* 차트 색상 */
--sidebar-*        /* 사이드바 전용 색상 */
```

### 7.2 반응형 브레이크포인트

Tailwind 기본 브레이크포인트 사용 (모바일 우선):

| 브레이크포인트 | 크기 | 대상 |
|----------------|------|------|
| 기본 | 0px~ | 모바일 |
| `sm` | 640px~ | 소형 태블릿 |
| `md` | 768px~ | 태블릿 |
| `lg` | 1024px~ | 데스크톱 |
| `xl` | 1280px~ | 대형 데스크톱 |

### 7.3 애니메이션 전략

1. **스크롤 트리거** — IntersectionObserver로 뷰포트 진입 시 애니메이션 실행
2. **스태거 딜레이** — `animation-delay-*` 클래스로 순차적 등장 효과
3. **타이프라이터** — 히어로 타이틀 텍스트 타이핑 효과
4. **카운터** — 숫자가 0에서 목표값까지 증가하는 애니메이션
5. **호버 효과** — 카드, 버튼에 스케일/그림자 변화

---

## 8. 데이터 흐름

### 8.1 현재 상태

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   i18n.ts    │────▶│  Components  │────▶│     DOM      │
│ (정적 번역 데이터) │     │ (useTranslation) │     │  (렌더링)    │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐
│  하드코딩 데이터  │────▶│  Components  │
│ (대학, 사무소 등) │     │  (직접 참조)    │
└──────────────┘     └──────────────┘
```

- **API 라우트 없음** — 현재 백엔드 미연동
- **폼 제출** — `console.log` + `alert()`로 처리 (백엔드 미구현)
- **외부 이미지** — `weavus-group.com` CDN에서 일부 이미지 로드
- **정적 데이터** — 대학 진학 실적, 해외 사무소 정보 등이 컴포넌트 내 하드코딩

### 8.2 향후 고려사항

- CMS 연동 또는 API 라우트를 통한 동적 콘텐츠 관리
- 문의 폼 백엔드 연동 (이메일 발송 또는 DB 저장)
- 이미지 최적화 활성화 (`unoptimized: true` → `false`)
- TypeScript 빌드 에러 해결 (`ignoreBuildErrors: true` 제거)

---

## 9. 외부 연동

| 서비스 | 용도 | 상태 |
|--------|------|------|
| **Vercel** | 호스팅 & 배포 | 활성 (Analytics 연동) |
| **Google Fonts** | 웹폰트 (Noto Sans JP, Zen Old Mincho) | 활성 |
| **weavus-group.com** | 외부 이미지 CDN | 활성 |

---

## 10. 빌드 & 배포 설정

### 10.1 스크립트

```json
{
  "dev": "next dev",        // 개발 서버 실행
  "build": "next build",    // 프로덕션 빌드
  "start": "next start",    // 프로덕션 서버 실행
  "lint": "eslint ."        // 린트 검사
}
```

### 10.2 Next.js 설정 (next.config.mjs)

```js
{
  typescript: { ignoreBuildErrors: true },  // ⚠️ TS 에러 무시
  images: { unoptimized: true }             // ⚠️ 이미지 최적화 비활성화
}
```

> **주의:** 두 설정 모두 프로덕션 전 해결이 필요합니다.

### 10.3 경로 별칭

```json
// tsconfig.json
"paths": { "@/*": ["./*"] }   // @/ → 프로젝트 루트
```

---

## 11. 컴포넌트 의존관계 다이어그램

```
app/layout.tsx
├── I18nProvider
├── Analytics
│
├── app/page.tsx (Home)
│   ├── Header
│   ├── HeroSection
│   ├── IntroCarouselSection → Carousel (shadcn)
│   ├── ReasonsSection
│   ├── FeaturesSection
│   ├── TestimonialsSection → Card (shadcn)
│   ├── SchoolLifeSection
│   ├── SongsSection
│   ├── CTASection → Card (shadcn)
│   ├── Footer
│   └── ScrollToTop
│
├── app/about/page.tsx
│   ├── Header
│   ├── TopAbout
│   ├── AboutSection
│   ├── Footer
│   └── ScrollToTop
│
├── app/education/page.tsx
│   ├── Header
│   ├── EducationSection → Table, Tabs (shadcn)
│   ├── Footer
│   └── ScrollToTop
│
├── app/school-life/page.tsx
│   ├── Header
│   ├── TopSchoolLife
│   ├── SchoolLifePageContent
│   ├── Footer
│   └── ScrollToTop
│
├── app/admission/page.tsx
│   ├── Header
│   ├── TopAdmission
│   ├── AdmissionSection → Card (shadcn)
│   ├── Footer
│   └── ScrollToTop
│
├── app/contact/page.tsx
│   ├── Header
│   ├── ContactSection → Form, Input, Select, Textarea (shadcn)
│   ├── Footer
│   └── ScrollToTop
│
└── app/animations/page.tsx
    ├── SpinnerLoader
    ├── DotsLoader
    └── BarLoader
```

---

## 12. 기술적 특이사항

### 12.1 성능 최적화

- **Next.js Image 컴포넌트** 사용 (단, 최적화는 비활성화 상태)
- **IntersectionObserver** 기반 지연 애니메이션
- **Google Fonts** Next.js 내장 로더로 최적 로딩
- **서버 컴포넌트** 기본 적용으로 클라이언트 번들 최소화

### 12.2 접근성

- Radix UI 기반으로 WAI-ARIA 패턴 준수
- 키보드 네비게이션 지원
- 시맨틱 HTML 구조

### 12.3 인터랙션 패턴

| 패턴 | 구현 방식 |
|------|-----------|
| 스크롤 감지 | Header 투명도, ScrollToTop 가시성 |
| 언어 전환 | DropdownMenu + `i18n.changeLanguage()` |
| 모바일 메뉴 | 햄버거 토글 + 슬라이드 애니메이션 |
| 캐러셀 자동재생 | 5초 간격, 사용자 조작 시 일시정지 후 재개 |
| 타이프라이터 | 히어로 타이틀 문자 순차 출력 |
| 카운터 | 스크롤 트리거 → 0에서 목표값 증가 |

---

## 부록: 파일 목록

### 페이지 파일 (7개)
- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/education/page.tsx`
- `app/school-life/page.tsx`
- `app/admission/page.tsx`
- `app/contact/page.tsx`
- `app/animations/page.tsx`

### 섹션 컴포넌트 (18개)
- `components/header.tsx`
- `components/footer.tsx`
- `components/scroll-to-top.tsx`
- `components/i18n-provider.tsx`
- `components/hero-section.tsx`
- `components/intro-carousel-section.tsx`
- `components/reasons-section.tsx`
- `components/features-section.tsx`
- `components/testimonials-section.tsx`
- `components/school-life-section.tsx`
- `components/songs-section.tsx`
- `components/cta-section.tsx`
- `components/about-section.tsx`
- `components/education-section.tsx`
- `components/admission-section.tsx`
- `components/contact-section.tsx`
- `components/school-life-page-content.tsx`
- `components/top-page.tsx`, `top-about.tsx`, `top-admission.tsx`, `top-school-life.tsx`

### 유틸리티 (4개)
- `lib/i18n.ts`
- `lib/utils.ts`
- `hooks/use-mobile.ts`
- `hooks/use-toast.ts`
