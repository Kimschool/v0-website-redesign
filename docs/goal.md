목표:
워드프레스 사이트 https://weavus-group.com/kcp/ 의 현재 공개된 프론트엔드 디자인을
Next.js + TypeScript + Tailwind 구조로 재구성한다.

중요:
- 기능 구현보다 시각적 재현이 우선
- 섹션 구조를 컴포넌트로 분리
- Header / Hero / News / Features / Education / CampusLife / Footer 로 나눈다
- 반응형 포함
- 텍스트는 임시 하드코딩 가능
- 이미지 경로는 /public/assets 아래로 정리
- 추후 CMS 연결 가능하도록 데이터는 상수 파일로 분리
- WordPress 종속 코드(PHP, shortcode, plugin class)는 사용하지 않는다

산출물:
- app/page.tsx
- components/*
- data/home.ts
- public/assets/*
- styles migration notes 문서