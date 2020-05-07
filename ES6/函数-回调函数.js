/**
 * 什么是回调或者高阶函数？
 * 一个回调函数，也被称为高阶函数，是一个被作为参数传递给另一个函数（在这里我们把另一个函数叫做“otherFunction”）的函数，回调函数在otherFunction中被调用。
 * 一个回调函数本质上是一种编程模式（为一个常见问题创建的解决方案），因此，使用回调函数也叫做回调模式
 * 
 * 回调函数是怎样运作的？
 * 因为函数在Javascript中是第一类对象，我们像对待对象一样对待函数，因此我们能像传递变量一样传递函数，在函数中返回函数，在其他函数中使用函数。
 * 当我们将一个回调函数作为参数传递给另一个函数是，我们仅仅传递了函数定义。我们并没有在参数中执行函数。我们并不传递像我们平时执行函数一样带有一对执行小括号()的函数。
 * 需要注意的很重要的一点是回调函数并不会马上被执行。它会在包含它的函数内的某个特定时间点被“回调”
 * 
 * 回调函数是闭包
 * 我们将一个回调函数作为变量传递给另一个函数时，这个回调函数在包含它的函数内的某一点执行，就好像这个回调函数是在包含它的函数中定义的一样。这意味着回调函数本质上是一个闭包。
 * 正如我们所知，闭包能够进入包含它的函数的作用域，因此回调函数能获取包含它的函数中的变量，以及全局作用域中的变量。
 * 
 * 实现回调函数的基本原理
 * 回调函数并不复杂，但是在我们开始创建并使用回调函数之前，我们应该熟悉几个实现回调函数的基本原理。
 * 
 * (1)使用命名或匿名函数作为回调
 * (2)传递参数给回调函数
 * (3)在执行之前确保回调函数是一个函数（typeof callback === "function"）
 * (4)使用this对象的方法作为回调函数时的问题（当回调函数是一个this对象的方法时，我们必须改变执行回调函数的方法来保证this对象的上下文。
 *    否则如果回调函数被传递给一个全局函数，this对象要么指向全局window对象（在浏览器中）。要么指向包含方法的对象。 ）
 * (5)允许多重回调函数
 * (6)“回调地狱”问题以及解决方案
 * 方案一：给你的函数命名并传递它们的名字作为回调函数，而不是主函数的参数中定义匿名函数。
 * 方案二：模块化L将你的代码分隔到模块中，这样你就可以到处一块代码来完成特定的工作。然后你可以在你的巨型应用中导入模块。
 * 
 * 创建你自己的回调函数
 * - 避免重复代码（DRY-不要重复你自己） - 在你拥有更多多功能函数的地方实现更好的抽象（依然能保持所有功能） - 让代码具有更好的可维护性 
 * - 使代码更容易阅读 
 * - 编写更多特定功能的函数
 * 
 * 在Javascript编程中回调函数经常以几种方式被使用，尤其是在现代web应用开发以及库和框架中：
 * - 异步调用（例如读取文件，进行HTTP请求，等等）
 * - 时间监听器/处理器
 * - setTimeout和setInterval方法
 * - 一般情况：精简代码
 * 
*/

// 定义一个拥有一些属性和一个方法的对象 -- 我们接着将会把方法作为回调函数传递给另一个函数
let clientData = {
  id: 00105,
  fullName: 'Set no',
  innerPrintName: function () {
    console.log('内部打印......修改信息：', this, this.fullName)
  },
  // setUserName是一个在clientData对象中的方法 -- 箭头函数可以改变this的指向
  setUserName: function (firstName, lastName) {
    // 这指向了对象中的fullName属性
    this.fullName = firstName + " " + lastName

    printName(this, this.fullName)
    // this.innerPrintName()
  }
}

// 打印函数调用
function printName(obj, val) {
  console.log('打印......修改信息：', obj, val)
}

/** 
 * 在下面你的代码例子中，当clientData.setUsername被执行时，this.fullName并没有设置clientData对象中的fullName属性。
 * 相反，它将设置window对象中的fullName属性，因为getUserInput是一个全局函数。这是因为全局函数中的this对象指向window对象。
*/
// 注意this的指向
function getUserName(firstName, lastName, callback) {
  // 存储names
  callback(firstName, lastName)
}

getUserName('Li', 'Ming', clientData.setUserName)
console.log('打印1：', clientData.fullName)

/**
 * Call和Apply -- 保存this
 * 我们可以使用Call或者Apply函数来修复上面你的问题：这两个方法用来设置函数内部的this对象以及给此函数传递变量
 * 
 * */ 

// apply方法 -- 注意增加了新的参数作为回调对象，叫做“callbackobj”
function getUserInput(firstName, lastName, callback, callbackobj) {
  // 第一个参数是在函数内部作为this的对象，然而最后一个参数确是传递给函数的值的数组
  callback.apply(callbackobj, [firstName, lastName])
}

getUserInput('Wang', 'Ling', clientData.setUserName, clientData)
console.log('打印2：', clientData.fullName)

// call方法
function getUserInputByCall(firstName, lastName, callback, callbackobj) {
  // 第一个参数为被用来在函数内部当做this的对象，传递给函数的参数被挨个传递
  callback.call(callbackobj, firstName, lastName)
}

getUserInputByCall('Ren', 'Piaomiao', clientData.setUserName, clientData)
console.log('打印3：', clientData.fullName)