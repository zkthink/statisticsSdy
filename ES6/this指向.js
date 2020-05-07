/**
 * 首先必须要说的是：this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，实际上this的最终指向的是那个调用它的对象
 * */ 

/*******************************************************************************************************************************************************/ 

/**
 * 总结 js 中 this 的常见用法
 * */ 

/** 1. 全局作用域或者普通函数中 this 指向全局对象 window。*/
//直接打印
console.log(this)

//function声明函数
function bar () {console.log(this)}
bar() //window

//function声明函数赋给变量
var bar = function () {console.log(this)}
bar() //window

//自执行函数
(function () {console.log(this)})(); //window


//jquery的ajax
$.ajax({
  self: this,
  type: "get",
  url: url,
  async: true,
  success: function (res) {
    console.log(this) // this指向传入$.ajxa()中的对象
    console.log(self) // window
  }
});
//这里说明以下，将代码简写为$.ajax（obj） ，this指向obj,在obj中this指向window，因为在在success方法中，独享obj调用自己，所以this指向obj


/** 
 * 构造函数版this：看下面的例子
 * 这里之所以对象a可以点出函数Fn里面的user是因为 new 关键字可以改变this的指向，将这个this指向对象a，为什么我说a是对象，
 *    因为用了 new 关键字就是创建一个对象实例，我们这里用变量a创建了一个Fn的实例
 * （相当于复制了一份Fn到对象a里面），此时仅仅只是创建，并没有执行，而调用这个函数Fn的是对象a，那么this指向的自然是对象a，那么为什么对象a中会有user，
 *    因为你已经复制了一份Fn函数到对象a中，用了new关键字就等同于复制了一份。
 * 除了上面的这些以外，我们还可以自行改变this的指向，关于自行改变this的指向请看JavaScript中call,apply,bind方法的总结这篇文章，详细的说明了我们如何手动更改this的指向。
 * 
*/
function Fn(){
  this.user = "zkp...";
  console.log('....', this)
}
var a = new Fn();
console.log(a, a.user); //zkp...



/*******************************************************************************************************************************************************/ 

/**
 * this 指向问题是入坑前端必须了解知识点，现在迎来了ES6时代，因为箭头函数的出现，所以感觉有必要对 this 问题梳理一下，遂有此文
 * 在非箭头函数下：
 * this 指向调用其所在函数的对象，而且是离谁近就是指向谁（此对于常规对象，原型链， getter & setter等都适用）；构造函数下，this与被创建的新对象绑定；
 * DOM事件，this指向触发事件的元素；内联事件分两种情况，bind绑定， call & apply 方法等， 
 * 容以下一步一步讨论。箭头函数也会穿插其中进行讨论。
 * 
 * */ 

/** 
 * 一、全局环境下
 * 
 * 在全局环境下，this 始终指向全局对象（window）, 无论是否严格模 -- 要看环境，不同环境全局对象不同（这里是浏览器环境）
 * */ 
console.log(this.document === document); // true
// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true
this.a = 37;
console.log(window.a); // 37


/**
 * 二、函数上下文调用
 * 函数直接调用
 * 普通函数内部的this分两种情况，严格模式和非严格模式。
 * 非严格模式下，this 默认指向全局对象window
 * 而严格模式下， this为undefined
 * */ 

function f1(){
  return this;
}

f1() === window; // true

function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true

/**
 * 三、对象中的this
 * 对象内部方法的this指向调用这些方法的对象，
 * 1、函数的定义位置不影响其this指向，this指向只和调用函数的对象有关。
 * 2、多层嵌套的对象，内部方法的this指向离被调用函数最近的对象（window也是对象，其内部对象调用方法的this指向内部对象， 而非window）。
 * */ 

// 1
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
console.log(o.f());  //37
// this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的，虽然函数f是被对象a所引用，但是在将f赋值给变量a的时候并没有执行，所以最终指向的是window
var a = o.f;
console.log(a())  //undefined

var o = {prop: 37};
function independent() {
  return this.prop;
}

o.f = independent;
console.log(o.f()); // logs 37

// 2
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // logs 42

/**
 * 四、原型链中this
 * 
 * 原型链中的方法的this仍然指向调用它的对象，与以上讨论一致；看个例子，
 * */ 

var o = {
  f: function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;
console.log(p.f()); // 5

/**
 * 五、构造函数中this
 * 
 * 构造函数中的this与被创建的新对象绑定。
 * 注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。
 * 
 * 小问题当this碰到return时
 * 如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
 * 
 * */ 

function C(){
  this.a = 37;
}
var o = new C();
console.log(o.a); // logs 37

function C2(){
  this.a = 37;
  return {a:38};
}
var b = new C2();
console.log(b.a); // logs 38

// 返回对象
function fn()
{  
  this.user = 'zkp...';
  return {}; // 返回对象
  // return function(){}; // 返回函数
}
var a = new fn;
// var a = new fn()  // 和上面写法等同
console.log(a.user); //undefined

// 返回非对象
function fn()  
{  
  this.user = 'zkp...';
  return 1; // 返回常量
  // return undefined; // 返回未定义
  // return null; // 返回null -- 虽然null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊
}
var a = new fn;  
console.log(a.user); //zkp...


/**
 * 六、call & apply
 * 
 * 当函数通过Function对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的this值可绑定到 call() & apply() 方法指定的第一个对象上，
 *  如果第一个参数不是对象，JavaScript内部会尝试将其转换成对象然后指向它。
 * */ 

function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

function tt() {
  console.log(this);
}
// 返回对象见下图（图1）
tt.call(5);  // Number {[[PrimitiveValue]]: 5} 
tt.call('asd'); // String {0: "a", 1: "s", 2: "d", length: 3, [[PrimitiveValue]]: "asd"}


/**
 * 七、bind 方法
 * 
 * bind方法在ES5引入， 在Function的原型链上， Function.prototype.bind。
 * 通过bind方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。
 * */ 

function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o = {a:37, f:f, g:g};
console.log(o.f(), o.g()); // 37, azerty


/**
 * 八、DOM 事件处理函数中的 this & 内联事件中的 this
 * 
 * 1、DOM事件处理函数：当函数被当做监听事件处理函数时， 其 this 指向触发该事件的元素 （针对于addEventListener事件）
 * 2、内联事件：内联事件中的this指向分两种情况
 *    （1）当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素
 *    （2）当代码被包括在函数内部执行时，其this指向等同于 函数直接调用的情况，即在非严格模式指向全局对象window， 在严格模式指向undefined
 * */ 
// DOM事件处理函数--被调用时，将关联的元素变成蓝色
function bluify(e){
  //在控制台打印出所点击元素
  console.log(this);
  //阻止时间冒泡
  e.stopPropagation();
  //阻止元素的默认事件
  e.preventDefault();
  this.style.backgroundColor = '#A5D9F3';
}
// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');
// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}

// 内联事件
<button onclick="console.log(this);"> show me </button>
<button onclick="(function () {console.log(this)})();" > show inner this </button>
<button onclick="(function () {'use strict';console.log(this)})();" > use strict </button>

/**
 * 九、setTimeout & setInterval
 * 
 * 对于延时函数内部的回调函数的this指向全局对象window（当然我们可以通过bind方法改变其内部函数的this指向）
 * */
// 默认情况下代码
function Person() {
  this.age = 0;  
  setTimeout(function() {
    console.log(this);
  }, 3000);
}

var p = new Person();//3秒后返回 window 对象
// ==============================================
//通过bind绑定
function Person() {  
  this.age = 0;  
  setTimeout((function() {
    console.log(this);
  }).bind(this), 3000);
}

var p = new Person();//3秒后返回构造函数新生成的对象 Person{...}


/**
 * 箭头函数中的 this
 * 由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，
 * 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
 * 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）
 * */ 
function Person() {  
  this.age = 0;  
  setInterval(() => {
    // 回调里面的 `this` 变量就指向了期望的那个对象了
    this.age++;
    console.log(this) 
  }, 3000);
}
var p = new Person(); // 打印p


var adder = {
  base : 1,
  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },
  addThruCall: function inFun(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };
            
    return f.call(b, a);
  }
};
console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3，其内部的this并没有因为call() 而改变，其this值仍然为函数inFun的this值，指向对象adder

/**
 * 对于是否严格模式示例代码（可以复制进控制台进行验证）
 * 
 * 1、箭头函数当做一个非方法的方式使用
 * 2、箭头函数当做一个方法使用
 * */ 
// 箭头函数当做一个非方法的方式使用
var f = () => {'use strict'; return this};
var p = () => { return this};
console.log(1,f() === window);
console.log(2,f() === p());
//1 true
//2 true

// 箭头函数当做一个方法使用 -- 作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b();  // undefined window{...}
obj.c();  // 10 Object {...}