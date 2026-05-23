# W2250 健身管理紀錄平台 Design System

來源：Figma `MSS71Kq7QoZRKrvGVNAsTi`，node `317:2`（Design System Page）

最後整理：2026-05-23

## 設計目標

這份 design system 用於 Workout Log Platform 的 MVP 介面。視覺方向是訓練工具感、可快速掃描、資訊密度高但不壓迫。介面應優先服務「訓練中快速記錄」與「訓練後理解進步」兩個情境。

## 實作原則

- 所有顏色、圓角、字級與陰影應優先使用 token，不要在 component 內任意硬編碼。
- 肌群色只用於標籤、圖表區塊、動作分類與輔助視覺，不應取代主要操作色。
- 主要 CTA 使用 `Brand/orange`，hover 或 pressed 狀態使用 `Brand/orange-dark`。
- 文字層級以 `Neutral/t1`、`Neutral/t2`、`Neutral/t3` 區分，不用透明黑臨時製作灰階。
- 卡片、modal、bottom sheet 的陰影使用 effect token；不要疊加多組自訂 shadow。
- 中文介面字型可使用 `Inter`, `Noto Sans TC`, `Noto Sans JP`, `system-ui` 的 fallback stack；Figma 文字樣式主要以 Inter 建立。

## Color Tokens

| 分類 | Figma token | CSS variable | 值 | 用途 |
| --- | --- | --- | --- | --- |
| Brand | `Brand/orange` | `--brand-orange` | `#FF6B35` | 主要 CTA、品牌重點、active 狀態。 |
| Brand | `Brand/orange-100` | `--brand-orange-100` | `#FFF0EB` | 淺色提示底、橘色淡背景。 |
| Brand | `Brand/orange-dark` | `--brand-orange-dark` | `#E85520` | CTA hover、pressed、較深重點。 |
| Muscle | `Muscle/chest` | `--muscle-chest` | `#FF6B35` | 胸部訓練分類。 |
| Muscle | `Muscle/back` | `--muscle-back` | `#4ECDC4` | 背部訓練分類。 |
| Muscle | `Muscle/shoulder` | `--muscle-shoulder` | `#45B7D1` | 肩部訓練分類。 |
| Muscle | `Muscle/arm` | `--muscle-arm` | `#96CEB4` | 手臂訓練分類。 |
| Muscle | `Muscle/core` | `--muscle-core` | `#F9CA24` | 核心訓練分類。 |
| Muscle | `Muscle/glutes` | `--muscle-glutes` | `#DDA0DD` | 臀部訓練分類。 |
| Muscle | `Muscle/thigh` | `--muscle-thigh` | `#F08080` | 大腿訓練分類。 |
| Muscle | `Muscle/calf` | `--muscle-calf` | `#87CEEB` | 小腿訓練分類。 |
| Semantic | `Semantic/success` | `--semantic-success` | `#34C759` | 儲存成功、完成訓練、PR 達成。 |
| Semantic | `Semantic/danger` | `--semantic-danger` | `#FF3B30` | 刪除、錯誤、危險操作。 |
| Semantic | `Semantic/danger-100` | `--semantic-danger-100` | `#FFF0F0` | 錯誤提示淡背景。 |
| Semantic | `Semantic/warning` | `--semantic-warning` | `#FF9F0A` | 需注意的恢復、停滯或缺席提示。 |
| Semantic | `Semantic/info` | `--semantic-info` | `#0A84FF` | 一般資訊、教練提示、輔助連結。 |
| Neutral | `Neutral/bg` | `--neutral-bg` | `#F5F5F5` | 頁面背景。 |
| Neutral | `Neutral/surface` | `--neutral-surface` | `#FFFFFF` | 卡片、表單、主要內容面。 |
| Neutral | `Neutral/sidebar` | `--neutral-sidebar` | `#FAFAFA` | 側欄與次要背景。 |
| Neutral | `Neutral/border` | `--neutral-border` | `#E5E5EA` | 分隔線、輸入框邊線。 |
| Neutral | `Neutral/t1` | `--neutral-t1` | `#1C1C1E` | 主要文字。 |
| Neutral | `Neutral/t2` | `--neutral-t2` | `#8E8E93` | 次要文字。 |
| Neutral | `Neutral/t3` | `--neutral-t3` | `#C7C7CC` | 弱化文字、placeholder。 |
| Neutral | `Neutral/t2-light` | `--neutral-t2-light` | `#888888` | 低對比輔助文字。 |
| Overlay | `Overlay/white-05` | `--overlay-white-05` | `rgba(255,255,255,.05)` | 深色介面上的弱白色層。 |
| Overlay | `Overlay/white-08` | `--overlay-white-08` | `rgba(255,255,255,.08)` | 深色介面上的 hover 或 panel。 |
| Overlay | `Overlay/black-48` | `--overlay-black-48` | `rgba(0,0,0,.48)` | Modal backdrop。 |

## Typography Tokens

Figma 的 Typography collection 有 `Mobile`、`Tablet`、`Desktop` 三個 mode。多數字級三個 mode 相同，`text-h3` 在 Mobile 為 `15px`，Tablet / Desktop 為 `16px`。

| 樣式 | CSS variable | Font | Weight | Size: Mobile / Tablet / Desktop | Line-height | 用途 |
| --- | --- | --- | ---: | --- | --- | --- |
| Display | `--text-display` | Inter Extra Bold | 800 | `28 / 28 / 28` | `1.2` | Dashboard 或頁面主標。 |
| Heading 1 | `--text-h1` | Inter Extra Bold | 800 | `22 / 22 / 22` | `1.25` | 主要區塊標題。 |
| Heading 2 | `--text-h2` | Inter Bold | 700 | `18 / 18 / 18` | `1.3` | 卡片標題、動作名稱。 |
| Heading 3 | `--text-h3` | Inter Bold | 700 | `15 / 16 / 16` | `1.35` | 小區塊標題、按鈕內強調文案。 |
| Body | `--text-body` | Inter Medium | 500 | `14 / 14 / 14` | `1.5` | 主要內文與表單文字。 |
| Body Small | `--text-body-sm` | Inter Regular | 400 | `12 / 12 / 12` | `1.5` | 輔助說明、表格次要文字。 |
| Caption | `--text-caption` | Inter Regular | 400 | `11 / 11 / 11` | `1.4` | caption、狀態輔助文字。 |
| Micro | `--text-micro` | Inter Medium | 500 | `10 / 10 / 10` | `1.4` | 標籤、極小 metadata。 |

## Radius Tokens

| Token | CSS variable | 值 | 用途 |
| --- | --- | --- | --- |
| `r-xs` | `--r-xs` | `6px` | 小標籤、微型輸入。 |
| `r-sm` | `--r-sm` | `8px` | 一般按鈕、chip、swatch。 |
| `r-md` | `--r-md` | `12px` | 卡片、輸入容器。 |
| `r-lg` | `--r-lg` | `16px` | 大卡片、summary block。 |
| `r-xl` | `--r-xl` | `20px` | 大型 panel。 |
| `r-2xl` | `--r-2xl` | `28px` | Bottom sheet 或突出容器。 |
| `r-10` | `--r-10` | `10px` | 需要介於 sm/md 的控制項。 |
| `r-18` | `--r-18` | `18px` | 行動端大按鈕或 sheet。 |
| `r-pill` | `--r-pill` | `9999px` | Pill、avatar、圓形按鈕。 |

## Effect Tokens

| Token | CSS value | 用途 |
| --- | --- | --- |
| `shadow-sm` | `0 1px 4px rgba(0,0,0,.06)` | 卡片輕微浮起。 |
| `shadow-md` | `0 2px 12px rgba(0,0,0,.08)` | 一般卡片、dropdown。 |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,.12)` | 浮層、大卡片。 |
| `glow-orange` | `0 4px 16px rgba(255,107,53,.35)` | 主要 CTA glow。 |
| `shadow-modal-sm` | `0 16px 40px rgba(0,0,0,.40)` | 小型 modal。 |
| `shadow-modal-md` | `0 20px 50px rgba(0,0,0,.50)` | 一般 modal。 |
| `shadow-modal-lg` | `0 24px 60px rgba(0,0,0,.60)` | 大型 modal 或 full-screen overlay。 |

## Spacing Scale

Figma node 中實際使用到的 layout spacing 與 padding 值如下。可先作為 web token 起點；若後續 Figma 補上正式 Spacing variable collection，應以 variable collection 為準。

| CSS variable | 值 |
| --- | ---: |
| `--space-4` | `4px` |
| `--space-8` | `8px` |
| `--space-12` | `12px` |
| `--space-16` | `16px` |
| `--space-24` | `24px` |
| `--space-28` | `28px` |
| `--space-32` | `32px` |
| `--space-64` | `64px` |
| `--space-80` | `80px` |
| `--space-96` | `96px` |

## CSS Token Starter

```css
:root {
  --brand-orange: #ff6b35;
  --brand-orange-100: #fff0eb;
  --brand-orange-dark: #e85520;

  --muscle-chest: #ff6b35;
  --muscle-back: #4ecdc4;
  --muscle-shoulder: #45b7d1;
  --muscle-arm: #96ceb4;
  --muscle-core: #f9ca24;
  --muscle-glutes: #dda0dd;
  --muscle-thigh: #f08080;
  --muscle-calf: #87ceeb;

  --semantic-success: #34c759;
  --semantic-danger: #ff3b30;
  --semantic-danger-100: #fff0f0;
  --semantic-warning: #ff9f0a;
  --semantic-info: #0a84ff;

  --neutral-bg: #f5f5f5;
  --neutral-surface: #ffffff;
  --neutral-sidebar: #fafafa;
  --neutral-border: #e5e5ea;
  --neutral-t1: #1c1c1e;
  --neutral-t2: #8e8e93;
  --neutral-t3: #c7c7cc;
  --neutral-t2-light: #888888;

  --overlay-white-05: rgba(255, 255, 255, .05);
  --overlay-white-08: rgba(255, 255, 255, .08);
  --overlay-black-48: rgba(0, 0, 0, .48);

  --text-display: 28px;
  --text-h1: 22px;
  --text-h2: 18px;
  --text-h3: 15px;
  --text-body: 14px;
  --text-body-sm: 12px;
  --text-caption: 11px;
  --text-micro: 10px;

  --r-xs: 6px;
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 20px;
  --r-2xl: 28px;
  --r-10: 10px;
  --r-18: 18px;
  --r-pill: 9999px;

  --shadow-sm: 0 1px 4px rgba(0, 0, 0, .06);
  --shadow-md: 0 2px 12px rgba(0, 0, 0, .08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, .12);
  --glow-orange: 0 4px 16px rgba(255, 107, 53, .35);
  --shadow-modal-sm: 0 16px 40px rgba(0, 0, 0, .4);
  --shadow-modal-md: 0 20px 50px rgba(0, 0, 0, .5);
  --shadow-modal-lg: 0 24px 60px rgba(0, 0, 0, .6);
}

@media (min-width: 768px) {
  :root {
    --text-h3: 16px;
  }
}
```

## Component 使用方向

| 元件/區塊 | 建議 token | 注意事項 |
| --- | --- | --- |
| Primary button | `Brand/orange`, `Brand/orange-dark`, `glow-orange`, `r-sm` 或 `r-pill` | 只給主要動作使用，例如開始訓練、完成 session。 |
| Workout card | `Neutral/surface`, `Neutral/border`, `shadow-sm`, `r-md` | 卡片內資訊應可掃描，不要塞滿長段落。 |
| Exercise chip | Muscle tokens, `r-pill`, `text-micro` | 顏色代表肌群，文字仍需有足夠對比。 |
| Error banner | `Semantic/danger`, `Semantic/danger-100`, `r-sm` | 錯誤訊息要指出欄位或操作原因。 |
| Empty state | `Neutral/sidebar`, `Neutral/t2`, `Brand/orange` | 空狀態應直接提供建立新訓練入口。 |
| Modal | `Neutral/surface`, `Overlay/black-48`, modal shadow tokens, `r-lg` | destructive modal 必須用 danger token。 |

## Preview

`Preview.html` 是這份 design system 的靜態瀏覽器預覽，可直接開啟確認 token 視覺表現。
