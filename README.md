# Vue3 문법

## 보간법

데이터 바인딩의 가장 기본적인 형태는 "Mustache"(이중 중괄호) 문법을 사용한 텍스트 보간법입니다.

```html
<span>메세지: {{ msg }}</span>
```

이중 중괄호 태그 내 msg는 해당 컴포넌트 인스턴스의 msg 속성의 값으로 대체됩니다. 또한 msg 속성이 변경될 때마다 업데이트됩니다.</br>

v-once 디렉티브를 사용하여 데이터가 변경되어도 갱신되지 않는 일회성 보간을 수행할 수 있습니다.

## HTML 출력

```html
<p>텍스트 보간법 사용: {{ rawHtml }}</p>
<p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>
```
웹사이트에서 임의의 HTML을 동적으로 렌더링하면 XSS 취약점이 쉽게 발생할 수 있으므로 매우 위험할 수 있습니다. 신뢰할 수 있는 컨텐츠에만 v-html을 사용하고 사용자가 제공한 컨텐츠에는 절대 사용하지 마세요.

## 속성 바인딩

이중 중괄호는 HTML 속성(attribute) 내에서 사용할 수 없습니다. 대신 v-bind 디렉티브를 사용하세요:
```html
<div v-bind:id="dynamicId"></div>
```
v-bind 디렉티브는 엘리먼트의 id 속성을 컴포넌트의 dynamicId 속성과 동기화된 상태로 유지하도록 Vue에 지시합니다. 바인딩된 값이 null 또는 undefined이면 엘리먼트의 속성이 제거된 상태로 렌더링 됩니다.

```html
<div :id="dynamicId"></div>
```
v-bind는 매우 일반적으로 사용되기 때문에 전용 단축 문법이 있습니다:

## v-on 약어

```html
<!-- 전체 문법 -->
<a v-on:click="doSomething">...</a>
<!-- 약어 -->
<a @click="doSomething">...</a>
```
