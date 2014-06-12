


#API: history

##Specification
[w3文档：html5/spec-LC/history.html#the-history-interface](http://dev.w3.org/html5/spec-LC/history.html#the-history-interface)

###history api interface

```
interface History {
  readonly attribute long length;
  readonly attribute any state;
  void go(in optional long delta);
  void back();
  void forward();
  void pushState(in any data, in DOMString title, in optional DOMString url);
  void replaceState(in any data, in DOMString title, in optional DOMString url);
};
```

+ `length` :当前session浏览过的页面数
+ `state` : 返回当前页面状态, 实际上是个stateObj
+ `go([delta])` : 前进或后退指定步数; 不指定参数的时候等同于`location.reload()`
+ `back()` : 后退一步
+ `forward()` : 前进一步
+ `pushState(data, title, [url])`: 把给定的数据推入history，可指定title，url；
    + data可以是任意数据类型，即stateObj
    >stateObj – The state object is used to store data that is associated the new history entry. This could include the page title, a URL to load via AJAX or even the page content itself.
    + title作为描述性辅助，可在hover后退前进按钮的时候看到
    + 可在地址栏看到，不会触发加载请求
+ `replaceState(data, title, [url])`: 更新当前stateObject

注：

+ w3文档内有两个有趣的demo

###event: popState
window事件。
当history有变化时触发。如果该变化得到的stateObj是由`pushState`或者`replaceState`创造的，则event对象下的state属性即为该次变化的history entry的state object.

+ __pushState和replaceState不会触发该事件__
>Note that just calling history.pushState() or history.replaceState() won't trigger a popstate event. The popstate event is only triggered by doing a browser action such as a click on the back button (or calling history.back() in JavaScript).


+ chrome和Safari在页面载入的时候便会触发一次该事件；firefox不会 
    + 注：文档里都是这么写的，但是实际测试却未见到

##Usage
[MDN:Manipulating_the_browser_history](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)

pushState会改变url，也改变在这之后的ajax请求头部的reffer, 但是不会触发请求；

>Example:
Suppose http://mozilla.org/foo.html executes the following JavaScript:
>
```var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
```
>This will cause the URL bar to display http://mozilla.org/bar.html, but won't cause the browser to load bar.html or even check that bar.html exists.


##compatibility

|IE	|FIREFOX|CHROME|	SAFARI|	OPERA|
|--|--|--|--|--|
|10+|	4.0+|	5.0+|	5.0+|	11.5+|

All major mobile browsers also include support for the History API.

|IOS SAFARI|	ANDROID BROWSER	|CHROME FOR ANDROID	|FIREFOX FOR ANDROID|	OPERA MOBILE|	IE MOBILE|	BLACKBERRY|
|--|--|--|--|--|--|--|
|4.2+|	2.2, 2.3, 4.2+|	29.0+|	23.0+|	11.1+|	10.0+|	7.0+|
>Safari 5.0 sometimes exhibits one oddity: navigating between states causes the loading spinner to appear and stay even when the state has been loaded. This stops when you navigate away using a link or action that does not involve a state saved by the History API.

##polyfill
A polyfill does exist for the History API. The aptly named [History.js](https://github.com/browserstate/history.js) uses HTML4’s hashchange event with document fragment identifiers to mimic the history API in older browsers. If one of the hash URLs is used by a modern browser, it uses replaceState to quietly correct the URL.

##hashChange
>The hashchange event is fired when the fragment identifier of the URL has changed (the part of the URL that follows the # symbol, including the # symbol).
监测fragments变化

IE8及其以上支持，[mdn上提供了pofyfill脚本](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/hashchange)
 
`location.hash`  [标准](http://www.w3.org/TR/2006/WD-Window-20060407/#location)

>If the absolute URI reference[RFC2396] for the Location's current location has a fragment identifier[RFC2396], then the value of the hash attribute the value of this attribute MUST be the string concatenation of the hash mark(#) and the fragment identifier.  

注：重设location.hash的行为很有趣，如果是'#search=abc'的话，敲入`location.hash=short`就变成了'#search=short'；如果就是‘#console’的话，就变成了‘#short’;

 
##Misc
####hashtag的问题
>The fragment identifier is only accessible on the client side. This means that only JavaScript can utilise it, so browsers without JavaScript enabled are out of luck.
As the server does not receive the path following the hashbang, removing that JavaScript drops support for all those URLs. That’s a lot of broken links, so you’re stuck with that JavaScript forever.
It’s ugly. It’s a hack and it looks like one.

##Reference
[html5Doctor](http://html5doctor.com/history-api/)