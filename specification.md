# 代码规范

## 格式化

* 统一使用 4 个空格进行缩进, 禁止使用 tab 键缩进
* 每行代码的最大长度不超过 120 个字符
* 字符串统一使用单引号包裹
* 代码行末尾不写分号
* 对象字面量或数组字面量中的最后一个元素后面也必须保留逗号(即启用尾随逗号)
* import 语句通过 prettier-plugin-organize-imports 插件自动进行整理与排序
* 如果项目使用 Tailwind CSS, 则通过 prettier-plugin-tailwindcss 插件对其类名进行自动排序

.prettierrc 配置文件为

```json
{
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 120,
    "tabWidth": 4,
    "endOfLine": "lf",
    "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
}
```

## 组件

* 采用模块化方式开发组件
* 单个页面组件的代码行数应控制在 300 行以内, 任何情况下最多不得超过 500 行
* 多个页面共用的公共组件, 统一放置到 `src/components` 目录下
* 组件命名均为名词形式, 采用大驼峰命名法(例如 `ReviewButton`)
* 仅在单个页面(即同一个页面目录)内使用的组件, 放置在该页面对应的 `components` 子目录下(即 `pages/current/components`)
  * 例如: `pages/dashboard/chart` 与 `pages/dashboard/text` 两条路由都需要使用 `ReviewButton` 组件, 由于二者同属于 `dashboard` 页面目录, 因此该组件应放置到 `pages/dashboard/components` 目录下, 以便两条路由共用
* 尽量避免自行编写自定义组件, 优先通过修改组件库已有属性来满足需求
* 组件统一使用命名导出方式(即 `export const XxxX = () => {}`), 不使用默认导出, 以便 IDE 自动补全与重命名
* 组件 Props 超过 5 个时, 必须单独定义 interface, 命名以 `Props` 为后缀(例如 `EditTableProps`), 不将类型内联到组件签名中
* 组件内部使用的 interface 与 type 一律采用大驼峰(PascalCase)命名(例如 `SearchParams`, 而非 `searchParams`)

## 函数

* 多个页面共用的公共函数, 放置到 `src/lib` 目录下
* 仅在单个页面内使用的公共函数, 放置到该页面目录下的 `lib` 子目录中(即 `pages/current/lib`)
* 如果组件库或既有 API 已能满足需求, 则不再重复编写自定义函数
* 函数命名均为动词形式, 采用小驼峰命名法, 并且只用动词原形表示动作, 不添加其他后缀形式, 例如使用 `handleDelete` 而非 `handleDeleting`
* 对于功能简单的回调函数, 直接在触发元素处通过箭头函数内联调用, 无需再单独定义函数
  * 例如: 在一个表单中点击重置按钮清空表单时, 直接在该按钮的 `onClick` 属性中使用箭头函数实现逻辑即可
* 自定义 React Hook 必须以 `use` 作为命名前缀(例如 `useAuth`), 以便与普通函数区分并保证 React 识别
* 异步操作统一使用 `async/await` 语法, 不与 `.then()/.catch()` 混用
* 优先编写纯函数, 将副作用(例如网络请求、订阅、DOM 操作等)隔离到特定函数或 `useEffect` 内部处理, 提升代码可读性与可测试性

## 变量

* 多个页面共用的常量, 统一放置在 `src/constant.ts` 文件中
* 仅在单个页面内使用的常量, 放置在该页面对应的 `constant.ts` 文件中, 例如 `pages/current/constant.ts`
* 常量命名均为名词形式, 全部字母大写, 多个单词之间使用下划线 `_` 进行分隔
* 变量命名均为名词形式, 采用小驼峰命名法, 例如 `latestOne`
* 布尔类型变量的命名使用 `is/has/can/should` 等作为前缀(例如 `isLoading`、`hasPermission`); 当该状态会直接作为组件库属性透传时(例如 Ant Design 的 `loading`、`disabled`), 可保留与属性同名的形式而不带前缀
* 表示集合的变量使用复数形式(例如 `users`、`items`); 若使用 `List` 后缀(例如 `userList`), 则该页面内须保持统一, 避免出现 `xxxList` 与 `xxxs` 两种形式混用
