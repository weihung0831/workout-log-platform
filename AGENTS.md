# 代理入口

這個 repository 使用 agent harness 來支援長時間產品開發工作。代理應該從這份文件開始，
再依照任務需要逐步讀取其他檔案。

## 運作循環

1. 規劃者把使用者需求轉成產品規格，或更新既有規格。
2. 生成者在修改程式碼前，先提出 sprint contract。
3. 評估者審查 contract，接著像真實使用者一樣測試完成品。
4. 生成者修復所有未通過的項目，直到每個硬性門檻都通過。
5. 最後 handoff 記錄變更內容、已驗證項目與剩餘風險。

這套流程刻意採用檔案溝通，讓新的代理不依賴聊天紀錄也能接續工作。

## 知識地圖

- `docs/harness/README.md` 說明 harness 設計。
- `docs/harness/PRODUCT.md` 保存產品意圖與領域語言。
- `docs/harness/product-specs/` 保存具體產品規格；流程圖與 API I/O 應放在對應規格文件。
- `docs/harness/ARCHITECTURE.md` 描述目前程式碼架構。
- `docs/harness/QUALITY.md` 定義評估標準與硬性門檻。
- `docs/harness/RELIABILITY.md` 列出必要驗證命令。
- `docs/harness/PLANS.md` 說明可執行計畫的生命週期。
- `docs/harness/exec-plans/active/` 保存進行中的計畫。
- `harness/prompts/` 保存規劃者、生成者、評估者的角色提示詞。
- `harness/templates/` 保存計畫、contract、QA 報告與 handoff 模板。

## 必要檢查

結束非瑣碎任務前，請執行：

```bash
npm run harness:check
npm run lint
npm run build
```

如果修改 UI，也要啟動應用程式，並在瀏覽器中驗證受影響的流程。

## 語言規則

- 對使用者的回覆、harness 文件、計畫、QA 報告與 handoff 預設全部使用繁體中文。
- 程式碼識別字、套件名稱、命令、檔案路徑與既有技術名詞可保留英文。
- 如果引用外部英文資料，請用繁體中文摘要，不要只貼英文內容。

## 邊界

- 除非使用者要求公開，否則 `docs/` 底下的隱私產品資料維持不追蹤；可追蹤的代理知識放在
  `docs/harness/`。
- 優先使用有型別的資料邊界與共用工具，不要任意新增一次性 helper。
- 當重複出現的 review 意見可以機械化檢查時，請把規則加入 `harness/config.json`。
- 如果任務太大無法一次完成，建立或更新 active exec plan，並透過模板 handoff，不要依賴聊天記憶。
- 產品流程圖、API I/O、資料模型等規格內容只放在 `docs/harness/product-specs/`，其他文件只連結或摘要。

## LLM Coding 行為守則

外部參考：<https://github.com/forrestchang/andrej-karpathy-skills/blob/main/CLAUDE.md>

- 動手前先釐清：明確寫出假設；若有多種解讀，先說明選項，不要默默任選；若需求不清楚，停下來指出卡點並詢問。
- 優先保持簡單：只寫解決當前問題所需的最少程式碼；不要加入未要求的功能、抽象層、彈性設定或理論上的錯誤處理。
- 採取精準修改：只碰必要檔案與必要行；不順手重構、不整理無關格式、不改相鄰程式碼；若看到無關問題，只在回覆中提醒。
- 清掉自己造成的殘留：移除本次變更導致未使用的 import、變數或函式；不要刪除原本就存在但無關的 dead code。
- 每一行變更都要能回溯到使用者需求；若修改範圍開始膨脹，先停下來重新確認是否仍符合目標。
- 以可驗證目標推進：修 bug 時先定義可重現與可驗證的成功條件；多步驟任務先列簡短 plan，並為每步指定驗證方式。
- 驗證後再交付：完成後檢查 diff 是否有多餘變更、是否過度複雜、測試或替代驗證是否足以支持交付。
