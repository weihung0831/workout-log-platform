# 架構

最後更新：2026-05-22

## 技術棧

- 框架：Next.js App Router。
- 語言：TypeScript，啟用 strict mode。
- 樣式：在 `src/app/globals.css` 中透過 `@import "tailwindcss"` 使用 Tailwind CSS，並只作為全域樣式入口。
- Runtime：預設使用 React Server Components；只有互動需求明確時才使用 client components。
- 套件管理：npm。

## 目前程式碼地圖

- `src/app/layout.tsx`：根 HTML shell、metadata 與字體設定。
- `src/app/page.tsx`：目前首頁。
- `src/app/globals.css`：全域樣式入口，依序匯入 Tailwind、共用 token/base 與流程樣式。
- `src/styles/theme.css`：全域 design tokens 與 Tailwind `@theme` 映射。
- `src/styles/base.css`：最小 reset、body 字體與跨頁基礎背景規則。
- `src/components/*/*.css`：與該流程元件同層的 global class 樣式；目前用於 sign-in、sign-up 與 email verification。
- `next.config.ts`：Next.js 設定。
- `eslint.config.mjs`：Next.js ESLint 設定。

目前應用程式仍是 starter shell。產品功能、持久化、驗證與 domain model 尚未實作。

## 預期邊界

- 在真正需要重用前，UI components 與該流程專屬樣式儘量靠近 route 或 component folder。
- 新增頁面流程時，不要把流程 selector 直接塞進 `globals.css`；先放在對應 `src/components/<flow>/<flow>.css`，再由 `globals.css` 匯入。
- 加入持久化時，在邊界定義 schema 與 validation，不要從範例物件猜資料形狀。
- 優先採用框架慣例，不要過早自訂 routing 或 build tooling。
- 一次性腳本放在 `scripts/`；可重用 harness 工件放在 `harness/`。

## 代理注意事項

- 做產品決策前，先讀 `PRODUCT.md`。
- 判斷完成前，先讀 `QUALITY.md`。
- 選擇驗證步驟前，先讀 `RELIABILITY.md`。
- 如果新的架構模式變成持久規則，請補到這份文件；可機械化時也加入 `harness/config.json`。
