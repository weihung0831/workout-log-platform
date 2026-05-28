# 個人檔案與體重紀錄 Figma 切版

建立日期：2026-05-28

## 狀態

完成

## 負責者

代理

## 最後更新

2026-05-28

## 目標

依 Figma `W2250 健身管理紀錄平台` node `281:10` 的「State 01 — 個人檔案主頁」建立可瀏覽的 `/profile` 頁面，並依 node `281:786` 的「State 02 — 體重紀錄」建立 `/profile/weight` 頁面，涵蓋手機、平板與桌機響應式版面。

## 驗收條件

- [x] `/profile` 顯示個人檔案主頁，包含使用者摘要、訓練統計、身體數據、訓練目標、設定與帳號區塊。
- [x] `/profile/weight` 顯示體重紀錄頁，包含摘要數據、趨勢圖、區間 tab、紀錄歷史與新增紀錄按鈕。
- [x] 手機寬度顯示頂部「我的」與底部 tab；平板與桌機顯示左側導覽。
- [x] 重量單位 segmented control、訓練提醒 switch 與體重區間 tab 至少有本地互動狀態與可辨識的 a11y 屬性。
- [x] 端到端驗證 `/profile` 與 `/profile/weight` 在手機與桌機 viewport 的版面不重疊、不溢出。
- [x] 如果這項工作產生可重用規則，更新持久 harness 文件。

## 非目標

- 不新增後端 API、資料庫或真實登入狀態。
- 不實作編輯資料、編輯目標、隱私、登出與刪除帳號的完整流程。
- 不實作新增體重紀錄 modal、表單送出或資料持久化。
- 不重新設計首頁或統計頁，只在必要時補導覽連結。

## 工作切片

1. 規劃與 contract：確認 Figma 節點、現有架構與驗收條件。
2. 實作：新增 profile/weight mock data、頁面元件、樣式與 route。
3. 評估與修正：執行 harness/lint/build 與瀏覽器響應式檢查。
4. Handoff：記錄變更、驗證與剩餘風險。

## Sprint Contract

日期：2026-05-28

### 計畫連結

`docs/harness/exec-plans/completed/2026-05-28-profile-page-figma-slice.md`

### 切片

完成 Figma 個人檔案主頁與體重紀錄頁的前端切片，將它們放在 `/profile` 與 `/profile/weight`。

### 完成定義

- `/profile` 與 `/profile/weight` 可在 Next dev server 開啟。
- 402px 左右的手機版接近 Figma：頂部標題、個人摘要、三欄統計、四個卡片區塊、底部 tab。
- 768px 與 1280px 版面接近 Figma：左側導覽，內容在平板為較窄兩欄卡片，在桌機為寬版兩欄卡片與頂欄。
- 互動控制有 hover/focus/active 狀態，重量單位與提醒可切換。
- 體重紀錄頁在手機與桌機版顯示摘要、趨勢圖、區間 tab 與紀錄歷史，且圖表不被拉伸或裁切。

### 需驗證的使用者流程

- 使用者進入 `/profile`，掃描個人資料與訓練統計。
- 使用者在設定區切換 `kg/lbs`。
- 使用者切換訓練提醒開關。
- 使用者從 `/profile` 的「體重紀錄」列進入 `/profile/weight`。
- 使用者在體重紀錄頁切換趨勢區間 tab。
- 使用者在手機與桌機寬度查看頁面，不出現水平捲動或文字重疊。

### 邊界案例

- 手機最小寬度 320px。
- 平板 768px 側欄與內容不互相擠壓。
- 桌機 1280px 內容寬度與 Figma 卡片節奏一致。

### 資料與狀態

- 使用 `src/mocks/profile.ts` 的本地 mock data。
- 使用 `src/components/weight-record/weight-record-data.ts` 的本地 mock data。
- `unitSystem` 與 `reminderEnabled` 使用 client component local state。
- `activeRange` 使用 client component local state。

### 命令

- [x] `npm run harness:check`
- [x] `npm run lint`
- [x] `npm run build`
- [x] 瀏覽器驗證 `/profile`
- [x] 瀏覽器驗證 `/profile/weight`

### 建置前評估者備註

- 評估重點是 Figma 視覺對齊、響應式與互動控制，不評估尚未實作的帳號管理、體重新增與資料持久化流程。

## 決策

- 沿用目前「流程 component + 同層 CSS + `globals.css` 匯入」模式。
- Profile 頁使用 local mock data，不建立新的資料邊界或 API。
- 體重紀錄頁使用同層 typed mock data，不建立新的資料邊界或 API。
- 圖示以小型 inline SVG component 呈現，避免依賴目前缺少的 Figma asset 檔案或新增 icon 套件。
- 側欄沿用 `AppSidebar` 的語意與既有 class，但允許沒有圖片資產時用 inline logo/icon。

## 風險

- Figma 匯出的 exact code 使用短效資產 URL，不適合直接放進專案；本次需以 CSS/SVG 近似視覺。
- 既有首頁/統計頁已引用尚未存在於 `public/assets` 的圖片路徑；本次避免擴大修復範圍，只確保新頁不依賴缺失資產。
- `harness:check` 有 source line 上限，新增 CSS 需避免單檔過長。

## 驗證

- [x] `npm run harness:check`
- [x] `npm run lint`
- [x] `npm run build`
- [x] Headless Chrome/CDP 驗證 `/profile` 402px 與 1280px：無水平溢出；手機/桌機導覽切換正確；`kg/lbs` 與提醒 switch 可切換；「體重紀錄」列連到 `/profile/weight`。
- [x] Headless Chrome/CDP 驗證 `/profile/weight` 402px 與 1280px：無水平溢出；手機/桌機導覽切換正確；趨勢圖尺寸正常；區間 tab 可切到「全部」。

## Handoff

日期：2026-05-28

### 摘要

- 新增 `/profile` 個人檔案主頁，對齊 Figma `281:10` 的手機與桌機主要版面。
- 新增 `/profile/weight` 體重紀錄頁，對齊 Figma `281:786` 的摘要、趨勢圖與紀錄歷史。
- 新增 profile 本地 mock data、inline SVG 圖示、同層 CSS 與 favicon。
- 新增 weight-record 本地 typed mock data、同層 CSS 與 responsive CSS。
- `AppSidebar` 現在可接受 inline logo / side icon，同時保留既有圖片資產用法。
- 首頁與統計頁的「我的」導覽連到 `/profile`；個人檔案的「體重紀錄」列連到 `/profile/weight`。

### 變更檔案

- `src/app/profile/page.tsx`
- `src/app/profile/weight/page.tsx`
- `src/components/profile/profile-page.tsx`
- `src/components/profile/profile-icons.tsx`
- `src/components/profile/profile.css`
- `src/components/profile/profile-responsive.css`
- `src/components/weight-record/weight-record-page.tsx`
- `src/components/weight-record/weight-record-data.ts`
- `src/components/weight-record/weight-record-assets.ts`
- `src/components/weight-record/weight-record.css`
- `src/components/weight-record/weight-record-responsive.css`
- `src/mocks/profile.ts`
- `src/components/navigation/app-sidebar.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/home/home-page.tsx`
- `src/components/stats/stats-data.ts`
- `public/favicon.svg`

### 驗證

- `npm run harness:check`：通過。
- `npm run lint`：通過。
- `npm run build`：通過。
- Headless Chrome/CDP 針對 `http://localhost:3000/profile` 驗證 402x874 與 1280x720：通過；檢查主要文字、無水平溢出、手機 tab / 桌機 sidebar 顯示、`kg/lbs` 與提醒 switch 可切換。
- Headless Chrome/CDP 針對 `http://localhost:3000/profile/weight` 驗證 402x874 與 1280x720：通過；檢查主要文字、無水平溢出、手機 tab / 桌機 sidebar 顯示、趨勢圖尺寸與區間 tab 互動。

### 未解問題

- 新增體重紀錄按鈕目前只有視覺狀態，尚未開啟 modal 或寫入資料。
- 既有 `public/assets/figma/*` 圖片資產仍未出現在 `public/`，本頁已避免依賴那些缺失資產。

### 下一個建議切片

- 下一步可實作新增體重紀錄 modal 與本地/後端資料寫入流程。

### 持久經驗

- Figma 短效 asset URL 不應直接進入程式碼；若 asset 尚未落地，使用 inline SVG 或 CSS 先保證頁面可驗證。
- 全域 CSS 匯入順序會影響 responsive 規則；同一流程的 base CSS 必須在 responsive CSS 前且只匯入一次。
