# 決策

## ADR-0001：Repo-local agent harness

日期：2026-05-22

狀態：已接受

## 背景

這個專案需要一套可重複的方法，讓代理在長任務中持續推進，而且不依賴聊天紀錄。
目前 repo 仍是小型 Next.js starter，因此 harness 應保持輕量，不應在產品成形前強加產品架構。

## 決策

建立檔案式 harness，包含：

- 簡短的 `AGENTS.md` 入口。
- `docs/harness/` 底下的版本化 harness 知識。
- `harness/prompts/` 底下的角色提示詞。
- `harness/templates/` 底下的結構化模板。
- `scripts/harness.mjs` 中的機械化檢查器。

只解除 ignore `docs/harness/`，讓既有 `docs/` 產品文件維持私密。

## 影響

- 代理有穩定路徑可進行規劃、評估與 handoff。
- Harness 規則未來可逐步變成可執行檢查。
- Harness 不綁定未來產品選擇，例如 auth、database 或 AI provider。
