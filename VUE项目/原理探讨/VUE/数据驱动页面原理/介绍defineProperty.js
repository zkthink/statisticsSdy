/***
 * Object.defineProperty(obj, prop, descriptor)
 * 描述：该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象
 * 参数：obj是要在其上定义属性的对象；prop是要定义或修改的属性的名称; descriptor是将被定义或修改的属性描述符
 * 
 * 对第三个参数 --属性描述符-- 的理解
 * 描述：对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
 *      数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。
 *      存取描述符是由getter-setter函数对描述的属性。
 *      描述符必须是这两种形式之一；不能同时是两者。
 * 存取描述符：
 *    get：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。
 *        当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
 *    set: 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。
 *        当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
 * 
 * get和set的使用：
 * **/ 

// 创建一个对象
let obj = {
  b: 0,
  c: 1
}

// 在对象中添加一个 --属性-- 与 --数据描述符-- 的示例
Object.defineProperty(obj, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
})

// 对象obj拥有了属性a,值为37
console.log(obj)

// 在对象中添加一个 --属性-- 与 --存取描述符-- 的示例
var bValue
Object.defineProperty(obj, 'b', {
  get: function() {
    return bValue
  },
  set: function(val) {
    bValue = val
    console.log(obj)
  },
  enumerable: true,
  configurable: true
})

Object.defineProperty(obj, 'c', {
  configurable: true,
  enumerable: true,
  get: function proxyGetter() {
    return bValue
  },
  set: function proxySetter(val) {
    bValue = val
    console.log(obj)
  }
})

obj.b = 38
// 对象o拥有了属性b，值为38
console.log(obj.b)
// obj.b的值现在总是与bValue相同，除非重新定义o.b

obj.c = 89
console.log(obj.c)


/***
 * 基于get和set的简单数据驱动案例实现
 * ***/ 
