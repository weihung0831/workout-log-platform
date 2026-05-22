# Agent Harness

建立日期：2026-05-22

## 狀態

已完成

## 負責者

Codex

## 最後更新

2026-05-22

## 目標

根據使用者提供的 Anthropic 與 OpenAI 工程文章，建立 repo-local harness。

## 驗收條件

- [x] 新增簡短代理入口。
- [x] 新增持久 repo-local harness 知識。
- [x] 新增規劃者、生成者與評估者提示詞。
- [x] 新增計畫、sprint contract、QA report 與 handoff 模板。
- [x] 新增機械化 harness checker。
- [x] 保留 `docs/` 底下既有產品文件的 ignore 狀態。
- [x] 記錄預設使用繁體中文的語言規則。

## 工作切片

1. 擷取文章中的 harness 原則。
2. 新增 harness 文件與模板。
3. 新增可執行檢查與 package scripts。
4. 使用 harness、lint 與 build 命令驗證。

## 決策

- 可追蹤 harness 文件放在 `docs/harness/`。
- 其他 `docs/` 內容維持 ignore，避免公開私密來源文件。
- 使用無外部依賴的 Node 腳本做機械化檢查。

## 驗證

- [x] `npm run harness:check`
- [x] `npm run lint`
- [x] `npm run build`

## Handoff

Harness 已可使用。未來長時間任務應從 `npm run harness:init -- "<goal>"` 開始，
接著在實作期間使用 contract、QA 與 handoff 模板。

產品規格內容請放在 `docs/harness/product-specs/`。目前訓練記錄 MVP 的流程圖、API I/O、
資料模型與驗收條件位於 `docs/harness/product-specs/workout-logging-mvp.md`。
