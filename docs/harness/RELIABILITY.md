# 可靠性

最後更新：2026-05-22

## 必要命令

結束非瑣碎工作前，請執行：

```bash
npm run harness:check
npm run lint
npm run build
```

如果是 UI 工作，也要啟動 dev server，並在瀏覽器中驗證受影響路徑。

## 驗證階梯

- 靜態：TypeScript、ESLint、harness checks、格式一致性。
- 單元或元件：當邏輯變成可重用或風險較高時，加入聚焦測試。
- 瀏覽器：驗證 layout、互動、鍵盤與 focus 行為，以及響應式狀態。
- 資料：有資料庫時，驗證持久化、migration、seed data 與 rollback 行為。
- Production：發布前驗證環境變數、部署輸出、logs 與 health checks。

## Logging 指引

加入 server-side 行為時，優先使用結構化 logs，並包含穩定 event name、request identifier 與 domain identifier。
不要記錄 secrets、auth tokens、健康資料或私人訓練備註。

## 失敗處理流程

檢查失敗時：

1. 在 active plan 或 QA report 中記錄完整命令與失敗內容。
2. 修復最小且相關的原因。
3. 重新執行失敗命令。
4. 如果修正碰到共用行為，重新執行相鄰檢查。

重複失敗是 harness 訊號。請新增文件或機械化規則，讓下一個代理更接近正解。
