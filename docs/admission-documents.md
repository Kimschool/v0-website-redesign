# 입학원서(願書) 문서 제공 방식

이 프로젝트의 입학원서 다운로드는 **패턴 A: “PDF 미리보기 + 원본 파일 다운로드”** 를 사용합니다.

## 파일 배치 규칙

- 모든 파일은 Next.js의 정적 파일로 제공되도록 `public` 아래에 둡니다.
- 경로 규칙:
  - `public/documents/application/<파일명>`
  - 예: `public/documents/application/Application-EnglishJapanese.pdf`
- 브라우저에서 접근되는 URL:
  - `/documents/application/<파일명>`

## 필요한 파일 목록(예시)

`components/admission-section.tsx`의 매핑과 파일명이 1:1로 일치해야 합니다.

- 미리보기 PDF (각 언어별):
  - `Application-EnglishJapanese.pdf`
  - `Application-Chinese.pdf`
  - `Application-Korean.pdf`
  - `Application-Vietnamese.pdf`
  - `Application-Taiwan.pdf`
- 원본 파일(유저가 실제 작성할 파일):
  - `Application-EnglishJapanese.xlsx`
  - `中国履歴書などのセット.xlsx`
  - `KCP長期韓国語版願書セット.xlsx`
  - `application-Vietnam Japanese.doc`
  - `FORMTAIWAN-new.doc`

## 운영 팁

- 파일명이 바뀌면 `components/admission-section.tsx`의 `previewPdfPath`/`originalFilePath`도 함께 변경하세요.
- PDF는 **미리보기용**이고, 유저가 실제 작성하는 파일은 **원본(Excel/Word)** 입니다.

