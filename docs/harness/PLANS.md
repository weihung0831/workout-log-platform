# 計畫

最後更新：2026-05-22

計畫是可執行的工作記憶。它們被納入版本控制，讓新的代理不需要請使用者重述上下文就能接續。

## 位置

- 進行中計畫：`docs/harness/exec-plans/active/`
- 已完成計畫：`docs/harness/exec-plans/completed/`
- 模板：`harness/templates/`

## 生命週期

1. 使用 `npm run harness:init -- short-goal` 建立 active plan。
2. 工作期間持續更新狀態、決策與驗證。
3. 必要時附上或連結 sprint contracts、QA reports 與 handoffs。
4. 當所有驗收條件與檢查通過後，將計畫移到 completed。
5. 將可持續使用的經驗寫入 `ARCHITECTURE.md`、`PRODUCT.md`、`QUALITY.md` 或 `RELIABILITY.md`。

## Active Plan 必要章節

- 狀態
- 負責者
- 最後更新
- 目標
- 驗收條件
- 工作切片
- 決策
- 驗證
- Handoff

## 輕量計畫

小修可以在最終回覆中使用短計畫。如果工作跨多個檔案、影響產品行為，或需要一種以上驗證模式，
請建立 active plan。
