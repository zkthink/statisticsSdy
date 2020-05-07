/**
 * 函数是 JavaScript 中的基本组件之一。 
 * 一个函数是 JavaScript 过程 — 一组执行任务或计算值的语句。
 * 要使用一个函数，你必须将其定义在你希望调用它的作用域内。
 * 
 * 定义函数：一个JavaScript 函数用function关键字定义，后面跟着函数名和圆括号。
 * 
 * 一个函数定义（也称为函数声明，或函数语句）由一系列的function关键字组成，依次为：
 * 1、函数的名称。
 * 2、函数参数列表，包围在括号中并由逗号分隔。
 * 3、定义函数的 JavaScript 语句，用大括号{}括起来。
 * 
 * 原始参数（比如一个具体的数字）被作为值传递给函数；值被传递给函数，如果被调用函数改变了这个参数的值，这样的改变不会影响到全局或调用函数。
 * 如果你传递一个对象（即一个非原始值，例如Array或用户自定义的对象）作为参数，而函数改变了这个对象的属性，这样的改变对函数外部是可见的。
 * 
 * 当一个函数是一个对象的属性时，称之为方法。了解更多关于对象和方法的知识 使用对象。
 * 
 * 函数表达式
 * */

/** 
 * （匿名函数）虽然上面的函数声明在语法上是一个语句，但函数也可以由函数表达式创建。这样的函数可以是匿名的；它不必有一个名称。例如，函数square也可这样来定义：
 * */
var square = function(number) { return number * number; };
var x = square(4); // x gets the value 16
 
/**
 * 然而，函数表达式也可以提供函数名，并且可以用于在函数内部代指其本身，或者在调试器堆栈跟踪中识别该函数：
 * */
var factorial = function fac(n) {return n<2 ? 1 : n*fac(n-1)};
console.log(factorial(3));

/** 
* （回调函数）当将函数作为参数传递给另一个函数时，函数表达式很方便。下面的例子演示了一个叫map的函数如何被定义，而后使用一个表达式函数作为其第一个参数进行调用：
* */ 
function map(f, a) {
  var result = []; // 创建一个数组
  var i; // 声明一个值，用来循环
  for (i = 0; i != a.length; i++)
    result[i] = f(a[i]);
      return result;
}
var f = function(x) {
   return x * x * x; 
}
var numbers = [0,1, 2, 5,10];
var cube = map(f,numbers);
console.log(cube);

/**
 * 调用函数
 * 
 * 定义一个函数并不会自动的执行它。定义了函数仅仅是赋予函数以名称并明确函数被调用时该做些什么。调用函数才会以给定的参数真正执行这些动作。
 * */ 


/**
 * 函数域是指函数声明时的所在的地方，或者函数在顶层被声明时指整个程序。
 * 
 * */

/**
 * 函数可以被递归，就是说函数可以调用其本身。
 * **/  

/**
 * 函数作用域
 * 
 * 在函数内定义的变量不能在函数之外的任何地方访问，因为变量仅仅在该函数的域的内部有定义。
 * 相对应的，一个函数可以访问定义在其范围内的任何变量和函数。换言之，定义在全局域中的函数可以访问所有定义在全局域中的变量。
 * 在另一个函数中定义的函数也可以访问在其父函数中定义的所有变量和父函数有权访问的任何其他变量。
 * 
 * **/ 


/**
 * 递归
 * 
 * 一个函数可以指向并调用自身。有三种方法可以达到这个目的：
 * 1、函数名
 * 2、arguments.callee()（ES5禁止在严格模式下使用此属性）
 * 3、作用域下的一个指向该函数的变量名
 * **/ 

// 例如，思考一下如下的函数定义：
var foo = function bar() {
  // statements go here
  // 在这个函数体内，以下的语句是等价的：
  // bar()
  // arguments.callee() （译者注：ES5禁止在严格模式下使用此属性）
  // foo()
};

/**
 * 调用自身的函数我们称之为递归函数。在某种意义上说，递归近似于循环。
 * 两者都重复执行相同的代码，并且两者都需要一个终止条件（避免无限循环或者无限递归）。
 * 例如以下的循环：
 * **/ 
function loop(x) {
  if (x >= 10) // "x >= 10" 是退出条件（等同于 "!(x < 10)"）
    return;
  // 做些什么
  loop(x + 1); // 递归调用
}
loop(0);

// 将递归算法转换为非递归算法是可能的，不过逻辑上通常会更加复杂，而且需要使用堆栈。事实上，递归函数就使用了堆栈：函数堆栈。

/**
 * 嵌套函数和闭包
 * 你可以在一个函数里面嵌套另外一个函数。嵌套（内部）函数对其容器（外部）函数是私有的。它自身也形成了一个闭包。
 * 一个闭包是一个可以自己拥有独立的环境与变量的表达式（通常是函数）。
 * 
 * 既然嵌套函数是一个闭包，就意味着一个嵌套函数可以”继承“容器函数的参数和变量。换句话说，内部函数包含外部函数的作用域。
 * 
 * 可以总结如下：
 * 1、内部函数只可以在外部函数中访问。
 * 2、内部函数形成了一个闭包：它可以访问外部函数的参数和变量，但是外部函数却不能使用它的参数和变量。
 * **/ 

//  由于内部函数形成了闭包，因此你可以调用外部函数并为外部函数和内部函数指定参数：
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // 可以这样想：给一个函数，使它的值加3
result = fn_inside(5); // returns 8

result1 = outside(3)(5); // returns 8

/**
 * 保存变量
 * 注意到上例中 inside 被返回时 x 是怎么被保留下来的。一个闭包必须保存它可见作用域中所有参数和变量。
 * 因为每一次调用传入的参数都可能不同，每一次对外部函数的调用实际上重新创建了一遍这个闭包。只有当返回的 inside 没有再被引用时，内存才会被释放。
 * 这与在其他对象中存储引用没什么不同，但是通常不太明显，因为并不能直接设置引用，也不能检查它们。
 * 
 * 多层嵌套函数
 * 函数可以被多层嵌套。例如，函数A可以包含函数B，函数B可以再包含函数C。B和C都形成了闭包，所以B可以访问A，C可以访问B和A。
 * 因此，闭包可以包含多个作用域；他们递归式的包含了所有包含它的函数作用域。这个称之为作用域链。（稍后会详细解释）
 * **/ 
function A(x) {
  function B(y) {
    function C(z) {
      console.log(x + y + z);
    }
    C(3);
  }
  B(2);
}
A(1); // logs 6 (1 + 2 + 3)

/**
 * 命名冲突
 * 当同一个闭包作用域下两个参数或者变量同名时，就会产生命名冲突。
 * 更近的作用域有更高的优先权，所以最近的优先级最高，最远的优先级最低。这就是作用域链。链的第一个元素就是最里面的作用域，最后一个元素便是最外层的作用域。
 * 看以下的例子：
 * **/ 

function outside() {
  var x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}
outside()(10); // returns 20 instead of 10
// 命名冲突发生在return x上，inside的参数x和outside变量x发生了冲突。这里的作用链域是{inside, outside, 全局对象}。因此inside的x具有最高优先权，返回了20（inside的x）而不是10（outside的x）。

/**
 * 闭包
 * 
 * 闭包是 JavaScript 中最强大的特性之一。JavaScript 允许函数嵌套，并且内部函数可以访问定义在外部函数中的所有变量和函数，以及外部函数能访问的所有变量和函数。
 * 但是，外部函数却不能够访问定义在内部函数中的变量和函数。这给内部函数的变量提供了一定的安全性。
 * 此外，由于内部函数可以访问外部函数的作用域，因此当内部函数生存周期大于外部函数时，外部函数中定义的变量和函数的生存周期将比内部函数执行时间长。
 * 当内部函数以某一种方式被任何一个外部函数作用域访问时，一个闭包就产生了。
 * **/ 
var pet = function(name) {          //外部函数定义了一个变量"name"
  var getName = function() {            
    //内部函数可以访问 外部函数定义的"name"
    return name; 
  }
  //返回这个内部函数，从而将其暴露在外部函数作用域
  return getName;               
};
myPet = pet("Vivie");
    
myPet();                            // 返回结果 "Vivie"



var getCode = (function(){
  var secureCode = "0]Eal(eh&2";    // A code we do not want outsiders to be able to modify...
  
  return function () {
    return secureCode;
  };
})();

getCode();    // Returns the secret code

/**
 * 使用 arguments 对象
 * 
 * 函数的实际参数会被保存在一个类似数组的arguments对象中。在函数内，你可以按如下方式找出传入的参数：arguments[i]
 * 其中i是参数的序数编号（译注：数组索引），以0开始。所以第一个传来的参数会是arguments[0]。参数的数量由arguments.length表示。
 * 使用arguments对象，你可以处理比声明的更多的参数来调用函数。这在你事先不知道会需要将多少参数传递给函数时十分有用。你可以用arguments.length来获得实际传递给函数的参数的数量，然后用arguments对象来取得每个参数。
 * 例如，设想有一个用来连接字符串的函数。唯一事先确定的参数是在连接后的字符串中用来分隔各个连接部分的字符（译注：比如例子里的分号“；”）。该函数定义如下：
 * 
 * 提示：arguments变量只是 ”类数组对象“，并不是一个数组。
 * 称其为类数组对象是说它有一个索引编号和length属性。尽管如此，它并不拥有全部的Array对象的操作方法。
 * 
 * **/ 
function myConcat(separator) {
   var result = ''; // 把值初始化成一个字符串，这样就可以用来保存字符串了！！
   var i;
   // iterate through arguments
   for (i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
   }
   return result;
}
// 你可以给这个函数传递任意数量的参数，它会将各个参数连接成一个字符串“列表”：
// returns "sage. basil. oregano. pepper. parsley. "
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");


/**
 * 函数参数
 * 
 * 从ECMAScript 6开始，有两个新的类型的参数：默认参数，剩余参数。
 * 1、默认参数：在JavaScript中，函数参数的默认值是undefined。然而，在某些情况下设置不同的默认值是有用的。这时默认参数可以提供帮助。
 * 在过去，用于设定默认参数的一般策略是在函数的主体中测试参数值是否为undefined，如果是则赋予这个参数一个默认值。
 * 如果在下面的例子中，调用函数时没有实参传递给b，那么它的值就是undefined，于是计算a*b得到、函数返回的是 NaN。但是，在下面的例子中，这个已经被第二行获取处理：
 * **/ 
function multiply(a, b) {
  b = (typeof b !== 'undefined') ?  b : 1;

  return a*b;
}
multiply(5); // 5

// 使用默认参数，在函数体的检查就不再需要了。现在，你可以在函数头简单地把1设定为b的默认值：
function multiply(a, b = 1) {
  return a*b;
}
multiply(5); // 5

/**
 * 2、剩余参数：剩余参数语法允许将不确定数量的参数表示为数组。
 * 在下面的例子中，使用剩余参数收集从第二个到最后参数。然后，我们将这个数组的每一个数与第一个参数相乘。
 * 这个例子是使用了一个箭头函数，这将在下一节介绍。
 * **/ 

function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]


/**
 * 箭头函数
 * 
 * 箭头函数表达式（也称胖箭头函数）相比函数表达式具有较短的语法并以词法的方式绑定 this。箭头函数总是匿名的。
 * 另见 hacks.mozilla.org 的博文：“深度了解ES6：箭头函数”。
 * 有两个因素会影响引入箭头函数：更简洁的函数和 this。
 * 
 * this 的词法
 * 在箭头函数出现之前，每一个新函数都重新定义了自己的 this 值（在构造函数中是一个新的对象；在严格模式下是未定义的；在作为“对象方法”调用的函数中指向这个对象；等等）。
 * 以面向对象的编程风格，这样着实有点恼人。
 * **/ 
function Person() {
  // 构造函数Person()将`this`定义为自身
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式下，growUp()函数将`this`定义为“全局对象”，
    // 这与Person()定义的`this`不同，
    // 所以下面的语句不会起到预期的效果。
    this.age++;
  }, 1000);
}
var p = new Person();

// 在ECMAScript 3/5里，通过把this的值赋值给一个变量可以修复这个问题。
function Person() {
  var self = this; // 有的人习惯用`that`而不是`self`，
                   // 无论你选择哪一种方式，请保持前后代码的一致性
  self.age = 0;

  setInterval(function growUp() {
    // 以下语句可以实现预期的功能
    self.age++;
  }, 1000);
}

// 另外，创建一个约束函数可以使得 this值被正确传递给 growUp() 函数。
// 箭头函数捕捉闭包上下文的this值，所以下面的代码工作正常。
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // 这里的`this`正确地指向person对象
  }, 1000);
}
var p = new Person();



/**
 * 预定义函数
 * 
 * eval()
 * eval()方法会对一串字符串形式的JavaScript代码字符求值。
 * 
 * uneval() 
 * uneval()方法创建的一个Object的源代码的字符串表示。
 * 
 * isFinite()
 * isFinite()函数判断传入的值是否是有限的数值。 如果需要的话，其参数首先被转换为一个数值。
 * 
 * isNaN()
 * isNaN()函数判断一个值是否是NaN。注意：isNaN函数内部的强制转换规则十分有趣； 
 * 另一个可供选择的是ECMAScript 6 中定义Number.isNaN() , 或者使用 typeof来判断数值类型。
 * 
 * parseFloat()
 * parseFloat() 函数解析字符串参数，并返回一个浮点数。
 * 
 * parseInt()
 * parseInt() 函数解析字符串参数，并返回指定的基数（基础数学中的数制）的整数。
 * 
 * decodeURI()
 * decodeURI() 函数对先前经过encodeURI函数或者其他类似方法编码过的字符串进行解码。
 * 
 * decodeURIComponent()
 * decodeURIComponent()方法对先前经过encodeURIComponent函数或者其他类似方法编码过的字符串进行解码。
 * 
 * encodeURI()
 * encodeURI()方法通过用以一个，两个，三个或四个转义序列表示字符的UTF-8编码替换统一资源标识符（URI）的某些字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。
 * 
 * encodeURIComponent()
 * encodeURIComponent() 方法通过用以一个，两个，三个或四个转义序列表示字符的UTF-8编码替换统一资源标识符（URI）的每个字符来进行编码（每个字符对应四个转义序列，这四个序列组了两个”替代“字符）。
 * 
 * escape() 
 * 已废弃的 escape() 方法计算生成一个新的字符串，其中的某些字符已被替换为十六进制转义序列。使用 encodeURI或者encodeURIComponent替代本方法。
 * 
 * unescape() 
 * 已废弃的 unescape() 方法计算生成一个新的字符串，其中的十六进制转义序列将被其表示的字符替换。上述的转义序列就像escape里介绍的一样。因为 unescape 已经废弃，建议使用decodeURI()或者decodeURIComponent 替代本方法。
 * 
 * **/ 