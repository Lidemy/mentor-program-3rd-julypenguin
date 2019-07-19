# What is this?

``` javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

- `obj.inner.hello()` 可以思考成 `obj.inner.hello.call(obj.inner)`，而 `obj.inner.value` 的值為 2

- `obj2.hello()` 可以思考成 `obj2.hello.call(obj2)`，而 `obj2.value` 的值為 2

- `hello()` 可以思考成 `hello.call(undefined)`，因為 this 是傳入 undefined，所以當然是 undefined 囉

- 所以如果要取 value 為 1 就要使用 `obj.hello()`，因為這可以看做是 `obj.hello.call(obj)`，而 `obj.value` 的值就是 1