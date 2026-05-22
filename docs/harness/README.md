# Harness

這套 harness 取材自近期 agent engineering 文章中的兩個核心原則：

- 長時間工作若將規劃者、生成者與評估者分離，並透過結構化檔案溝通，品質會更穩定。
- 當知識、計畫、品質規則與驗證命令都存在版本控制內，並能被機械化檢查時，repo 對代理更可讀。

目標不是製造流程負擔，而是把可延續的上下文從聊天紀錄搬進 repo，讓下一次代理執行比上一次更穩。

## 來源概念

- Anthropic：規劃者、生成者、評估者分工，sprint contract，獨立 QA，檔案式 handoff，硬性評估門檻。
- OpenAI：短代理入口、repo-local knowledge、可執行計畫、機械化 lint，以及把重複的人類回饋轉成持久規則。

## 工作流程

1. 規劃：把需求展開成產品結果、驗收條件、風險與少量實作切片。
2. 契約：寫程式前，先定義目前切片的「完成」意義與驗證方式。
3. 建置：除非更新計畫，否則只實作已同意的切片。
4. 評估：依照 `QUALITY.md` 的硬性門檻檢查 UI、API、狀態、邊界案例與程式品質。
5. 迭代：任何未通過硬性門檻的項目，都帶著具體 findings 回到建置階段。
6. 交接：記錄變更、檢查、待處理問題與下一步。

## 工件結構

```text
AGENTS.md
docs/harness/
  ARCHITECTURE.md
  DECISIONS.md
  PLANS.md
  PRODUCT.md
  QUALITY.md
  RELIABILITY.md
  exec-plans/
    active/
    completed/
  product-specs/
    index.md
    workout-logging-mvp.md
harness/
  config.json
  prompts/
  templates/
scripts/
  harness.mjs
```

## 命令

```bash
npm run harness:init -- short-goal
npm run harness:status
npm run harness:check
```

`harness:check` 會確認必要檔案存在、必要章節完整，並檢查 active plans 是否可被接續。

## 產品規格位置

產品意圖與共通原則放在 `PRODUCT.md`。具體產品規格，例如流程圖、API I/O、資料模型與驗收條件，
放在 `product-specs/` 底下的獨立文件。不要把完整規格複製到 completed plan；completed plan 只記錄執行歷史與交接摘要。

## 何時使用完整循環

當工作會改變產品行為、資料形狀、導覽、核心 UI 流程、驗證、持久化、部署，或可能跨多個 session 時，
請使用完整的規劃者、生成者、評估者循環。

小修可以使用輕量計畫；但如果修正教會 repo 一條可重用規則，仍應更新持久知識文件。
