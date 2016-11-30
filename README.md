# change-scriptural-tag-id
安裝步驟只有兩個

1. 下載安裝 node.js

2. 下載並在 change-scriptural-tag-id 資料夾開啟命令列視窗，輸入
```
npm i
```
把要更動的文字檔放到 old-texts 資料夾，執行以下指令後，改好的檔案會出現在 new-pb-order 資料夾

指令如下：

(1)根據 sutra id 命名和排序 bampo 
```
node index.js --bampo
```
(2)統一加減 sutra id 的排序數字

shiftNumber 前面可以加 ' - ' 號，代表負值

grq 和 lsq 都是數字

sutra id 的排序數字在 大於等於 grq 和小於等於 lsq 的範圍內，才會變動

[] 方括號表示這個設定值可以省略
```
node index.js shift-sutra  shiftNumber [grq,lsq] [--bampo]
```
(3)重新排序 sutra id

firstNumber 表示重新排序的第一個數字

sutra id 的數字在 大於 gre 和小於等於 lss 的範圍內，才會重新排序

如果碰到非數字結尾的 sutra id，則停止排序 
```
node index.js reorder-sutra firstNumber [gre,lss] [--bampo]
```
(4)從頭開始命名和排序 sutra id

firstSutraId 是第一個 sutra id，根據這個 sutra id 依序命名後面的 sutra id

firstSutraId 不可以用非數字結尾
```
node index.js rename-sutra firstSutraId [--bampo]
```
