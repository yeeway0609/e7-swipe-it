# UIDD 2024 Project

## Getting started
1. 下載 [Node.js](https://nodejs.org/en)
2. 在終端機輸入
```bash
git clone https://github.com/yeeway0609/uidd2024.git
cd uidd2024
npm i
npm run dev
```

## 開發流程
1. 建立分支

    `git checkout -b 分支名稱`，主要用功能作為分支名稱，例如：about_page, dashboard, calendar...等等

2. 開發完後使用 Lint 工具檢查程式碼

    用 `bun run lint` 指令就能使用 Linter 檢查程式碼，也可以用 `bun run lint:fix` 自動修改。如果沒有通過檢查的話在 commit 階段也會被 husky 腳本自動擋下來。

3. 推到遠端repo

    `git commit` 之後就能 `git push` 到 GitHub 上，然後開一個 Pull requst。 @yeeway0609 會負責進行 code review，沒問題的話就能直接 merge 進 main 分支，如果需要修改的話就直接再 push 一次修改過後的程式碼 Pull requst 也會自動更新。

## 開發環境
- Husky
  - git 指令自動腳本，用來檢查commit前有沒有先執行 lint 指令
- ESLint
  - 採用預設規則包，目前主要是規定結尾要加分號之類的
  - 教學文章：https://denny.qollie.com/2016/07/11/eslint-fxcking-setup/#Configuration-of-ESLint
- StyleLint
  - 採用預設規則包，目前主要是規定CSS屬性的排序
  - 教學文章：https://ithelp.ithome.com.tw/m/articles/10232650

