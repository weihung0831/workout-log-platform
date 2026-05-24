# Home Main Data 首頁切版

建立日期：2026-05-24

## 狀態

進行中

## 負責者

代理

## 最後更新

2026-05-24

## 目標

依照 Figma 節點 `282:3` 實作 FitLog 登入後首頁有資料狀態。`/` 維持目前登入頁，本切片新增 `/home` 作為登入後 Home/Main Data 儀表板。

## Sprint Contract

### 切片

- 新增 `/home` 為 FitLog 登入後首頁儀表板。
- 保留 `/` 作為登入頁入口。
- 手機版顯示頂部問候、今日訓練摘要、連續訓練、開始新訓練、最近訓練卡片與底部導覽。
- 平板與桌機版顯示左側導覽；桌機版另外顯示右側連續訓練與本週總覽。

### 完成定義

- 首頁主要文案、數字與 Figma 有資料狀態一致。
- 版面在手機、平板、桌機寬度下不重疊、不水平溢出，且符合 FitLog 既有色彩與字體 token。
- 使用既有 `public/assets/figma/home` 資產，不新增第三方套件。
- 實作維持靜態展示資料，不接後端、不新增未要求的狀態管理。

### 需驗證的使用者流程

- 使用者開啟 `/` 仍會看到登入頁。
- 使用者開啟 `/home` 可以看到首頁儀表板。
- 手機寬度可以看見底部導覽與主要訓練資料。
- 桌機寬度可以看見左側導覽、主內容與本週總覽。

### 邊界案例

- 最小手機寬度 `320px` 不能造成卡片文字擠出或導覽重疊。
- 桌機寬度下主要內容與右側摘要區不能重疊。

### 資料與狀態

- 本切片只使用元件內靜態資料。
- 真實 dashboard API、登入狀態與資料持久化不在本切片內。

## 驗收條件

- [x] `/` 維持登入頁。
- [x] `/home` 呈現 Figma Home/Main Data 有資料狀態。
- [x] 響應式版面涵蓋手機、平板、桌機。
- [ ] 端到端驗證受影響流程。
- [ ] 如果這項工作產生可重用規則，更新持久 harness 文件。

## 非目標

- 不建立後端 API。
- 不串接 auth provider。
- 不實作新增訓練表單。
- 不串接登入成功後 redirect；`/home` 先作為登入後頁面的靜態切版目標。

## 工作切片

1. 規劃與 contract。
2. 實作首頁元件、資產 mapping 與樣式。
3. 評估與修正響應式問題。
4. Handoff。

## 決策

- 登入頁優先於首頁，因此 `/` 保留 `SignInPage`，登入後首頁先放在 `/home`。
- 首頁切版以 Figma 節點 `282:3` 為整體視覺來源，桌機版以節點 `282:438` 的比例、間距與欄位作為基準，但實作需維持全寬 dashboard。
- 資料先以靜態常數呈現，未來接 API 時再替換資料邊界。

## 風險

- Figma 匯出的 SVG 命名是泛用 `Icon-*`，需要以內容與畫面位置對應使用。
- 目前沒有實際 dashboard route/data contract，本切片只處理 UI 展示。

## 驗證

- [x] `npm run harness:check`
- [x] `npm run lint`
- [x] `npm run build`
- [ ] UI 變更完成瀏覽器驗證。

## QA Report

### 已驗證

- `npm run harness:check` 通過。
- `npm run lint` 通過。
- `npm run build` 通過；sandbox 內遇到 Turbopack port binding 限制，改用已核准的 sandbox 外執行後通過。
- `curl -I http://localhost:3000/` 回傳 `200 OK`。
- `curl -I http://localhost:3000/home` 回傳 `200 OK`。
- 依照 Figma 節點 `282:438` 調整桌機版：sidebar `220px`、右欄 `340px`、欄距 `24px`，shell 維持全寬，主欄使用剩餘寬度。

### 未完成

- 使用者表示瀏覽器視覺測試自行執行，因此本 plan 尚未由代理完成瀏覽器 QA。

## Handoff

### 變更內容

- 新增 `/home` route，對應登入後 Home/Main Data 靜態切版。
- 新增 `src/components/home/` 元件、資產 mapping 與 responsive CSS。
- 桌機版維持全寬 dashboard，不鎖定 `1280px` shell；Figma desktop frame 作為比例與 spacing 參考。
- `src/app/page.tsx` 未修改，`/` 仍維持登入頁。

### 剩餘風險

- 瀏覽器視覺驗證尚待使用者確認，尤其是手機 `320px`、平板與桌機三種寬度。
- 導覽與「開始新訓練」目前是靜態切版，尚未串接真實路由或資料流。
