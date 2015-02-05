# call-n-times

Calls a provided function a specified number of times, synchronously, and returns an array of the return values.

Can optionally call a provided callback right before returning.

Should work in IE7+. Perhaps even older.

Tests included.

``` js
var call = require("call-n-times");

var logAndReturnFoo = function(){
  console.log("foo");
  return "foo";
};

var returns = call(logAndReturnFoo, 3);
// 'Foo'
// 'Foo'
// 'Foo'

returns.length === 3;
// true
returns[0] === "foo"
// true
returns[1] === "foo"
// true
returns[2] === "foo"
// true
```
