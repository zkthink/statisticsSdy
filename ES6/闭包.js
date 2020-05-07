/**
 * 定义描述：
 * 
 * 函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。
 * 也就是说，闭包可以让你从内部函数访问外部函数作用域。
 * 在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。
 * **/ 

/**
 * 词法作用域
 * 
 * init() 创建了一个局部变量 name 和一个名为 displayName() 的函数。
 * displayName() 是定义在 init() 里的内部函数，并且仅在 init() 函数体内可用。请注意，displayName() 没有自己的局部变量。
 * 然而，因为它可以访问到外部函数的变量，所以 displayName() 可以使用父函数 init() 中声明的变量 name 。
 * **/ 

function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  // 嵌套函数
  function displayName() { // displayName() 是内部函数，一个闭包
    console.log(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();

/**
 * 闭包的理解：
 * 
 * 运行这段代码的效果和之前 init() 函数的示例完全一样。其中不同的地方（也是有意思的地方）在于内部函数 displayName() 在执行前，从外部函数返回。
 * 
 * 第一眼看上去，也许不能直观地看出这段代码能够正常运行。在一些编程语言中，一个函数中的局部变量仅存在于此函数的执行期间。
 * 一旦 makeFunc() 执行完毕，你可能会认为 name 变量将不能再被访问。然而，因为代码仍按预期运行，所以在 JavaScript 中情况显然与此不同。
 * 
 * 原因在于，JavaScript中的函数会形成了闭包。 
 * 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。
 * 在本例子中，myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用。
 * displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。
 * 因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到alert中。
 * **/ 
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();

/**
 * 下面是一个更有意思的示例 — 一个 makeAdder 函数：
 * 
 * 在这个示例中，我们定义了 makeAdder(x) 函数，它接受一个参数 x ，并返回一个新的函数。返回的函数接受一个参数 y，并返回x+y的值。
 * 
 * 从本质上讲，makeAdder 是一个函数工厂 — 他创建了将指定的值和它的参数相加求和的函数。在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。
 * 
 * add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。
 * **/ 

function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12

/**
 * 实用的闭包
 * 
 * 闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。
 * 在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。
 * 因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。
 * **/

/**
 * 实用实例一：为响应事件而执行的函数
 * 
 * 在 Web 中，你想要这样做的情况特别常见。
 * 大部分我们所写的 JavaScript 代码都是基于事件的 — 定义某种行为，然后将其添加到用户触发的事件之上（比如点击或者按键）。我们的代码通常作为回调：为响应事件而执行的函数。
 * 
 * 假如，我们想在页面上添加一些可以调整字号的按钮。一种方法是以像素为单位指定 body 元素的 font-size，然后通过相对的 em 单位设置页面中其它元素（例如header）的字号：
 * 
 * **/

// 方法一 css：
// body {
//   font-family: Helvetica, Arial, sans-serif;
//   font-size: 12px;
// }

// h1 {
//   font-size: 1.5em;
// }

// h2 {
//   font-size: 1.2em;
// }

// 方法二 JavaScript：
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

// size12，size14 和 size16 三个函数将分别把 body 文本调整为 12，14，16 像素。我们可以将它们分别添加到按钮的点击事件上。如下所示：
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
{/* <a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>  */}

/**
 * 实用实例二：用闭包模拟私有方法
 * 
 * 编程语言中，比如 Java，是支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。而 JavaScript 没有这种原生支持，但我们可以使用闭包来模拟私有方法。
 * 私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。
 * 下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量。这个方式也称为 模块模式（module pattern）：
 * **/ 

var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */

/**
 * 在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：Counter.increment，Counter.decrement 和 Counter.value。
 * 该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 privateCounter 的变量和名为 changeBy 的函数。
 * 这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。
 * 这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 privateCounter 变量和 changeBy 函数。
 * **/ 

/**
 * 你应该注意到我们定义了一个匿名函数，用于创建一个计数器。我们立即执行了这个匿名函数，并将他的值赋给了变量Counter。
 * 我们可以把这个函数储存在另外一个变量makeCounter中，并用他来创建多个计数器。
 * **/ 

var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */

/**
 * 请注意两个计数器 Counter1 和 Counter2 是如何维护它们各自的独立性的。每个闭包都是引用自己词法作用域内的变量 privateCounter 。
 * 每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。
 * 
 * 以这种方式使用闭包，提供了许多与面向对象编程相关的好处 —— 特别是数据隐藏和封装。
 * **/ 

/**
 * 在循环中创建闭包：一个常见错误
 * 
 * 在 ECMAScript 2015 引入 let 关键字 之前，在循环中有一个常见的闭包创建问题。参考下面的示例：
 * **/ 

{/* <p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p> */}

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }

  console.log('item', item)
}

setupHelp(); 

/**
 * 数组 helpText 中定义了三个有用的提示信息，每一个都关联于对应的文档中的input 的 ID。通过循环这三项定义，依次为相应input添加了一个 onfocus  事件处理函数，以便显示帮助信息。
 * 运行这段代码后，您会发现它没有达到想要的效果。无论焦点在哪个input上，显示的都是关于年龄的信息。
 * 
 * 原因是赋值给 onfocus 的是闭包。这些闭包是由他们的函数定义和在 setupHelp 作用域中捕获的环境所组成的。
 * 这三个闭包在循环中被创建，但他们共享了同一个词法作用域，在这个作用域中存在一个变量item。
 * 这是因为变量item使用var进行声明，由于变量提升，所以具有函数作用域。当onfocus的回调执行时，item.help的值被决定。
 * 由于循环在事件触发之前早已执行完毕，变量对象item（被三个闭包所共享）已经指向了helpText的最后一项。
 * 
 * 解决这个问题的一种方案是使用更多的闭包：特别是使用前面所述的函数工厂：
 * **/ 

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp(); 

/**
 * 这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的词法环境。
 * 在这些环境中，help 指向 helpText 数组中对应的字符串。
 * **/ 

/**
 * 另一种方法使用了匿名闭包：
 * **/ 

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    (function() {
       var item = helpText[i];
       document.getElementById(item.id).onfocus = function() {
         showHelp(item.help);
       }
    })(); // 马上把当前循环项的item与事件回调相关联起来
  }
}

setupHelp();

/**
 * 避免使用过多的闭包，可以用let关键词：
 * 
 * 这个例子使用let而不是var，因此每个闭包都绑定了块作用域的变量，这意味着不再需要额外的闭包。
 * **/ 

function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    let item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();

/**
 * 性能考量
 * 
 * 如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。
 * 
 * 例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。
 * 原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建）。
 * 
 * 考虑以下示例：
 * **/ 
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}

// 在上面的代码中，我们并没有利用到闭包的好处，因此可以避免使用闭包。修改成如下：
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName: function() {
    return this.name;
  },
  getMessage: function() {
    return this.message;
  }
};

// 但我们不建议重新定义原型。可改成如下例子：
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function() {
  return this.name;
};
MyObject.prototype.getMessage = function() {
  return this.message;
};
// 在这两个示例中，继承的原型可以为所有对象共享，不必在每一次创建对象时定义方法。参见 对象模型的细节 一章可以了解更为详细的信息。