# 可執行 Harness

這個資料夾包含 repo-local agent harness 使用的提示詞、模板與設定。

- `config.json` 定義必要工件、門檻與機械化檢查。
- `prompts/` 保存規劃者、生成者與評估者的角色提示詞。
- `templates/` 保存計畫、contract、QA 與 handoff 的結構化檔案。

執行：

```bash
npm run harness:check
```
