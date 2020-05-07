/**
 * JS函数递归
 * 概念：函数自己调用自己，称为递归函数
 * 递归一定要有结束条件
 * 
 * 主要从“变量+函数”和“函数+变量”两个方面说明解释
 * 
 * */ 


/**
 * 函数+变量
 * 
 * 定义一个函数，用于求 n 的阶乘 -- 用递归 
 * */ 

function func(n) {
  if (n === 1) {
    return 1
  }
  
  // func(n-1) 因为传递的参数是 n-1,那么就是求 (n-1) 的阶乘
  return n * func(n-1);
}

console.log('N的阶层：', func(5))

/**
 * 函数+函数
 * 
 * 斐波拉契题(兔子生兔子题目)--从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子对数为多少
 * 
 * 产量分析：1， 1， 2， 3， 5， 8， 13， 21, 34, 55(第十位), 89 ...
 * 第n个月的兔子总数  =  第n-1个月的兔子总数 + 第n-2个月的兔子总数
 * 问题： 求任意月兔子的总数
 * 
 * */ 

function func2(n) {
  if(n === 1 || n === 2) {
    return 1
  }

  return func2(n - 1) + func2(n - 2)
}

console.log('第N个月的兔子总数：', func2(10))

/**
 * js递归函数应用：用来调用json的子节点，把所有json中的子节点中包含某个数的object，都push到一个数组中，然后对其进行绑定。
 * */ 

var new_array=[];
function _getChilds(data){
  if(data.ObjType === "某个数") {
    new_array.push(cs_data);
  }

  if(data.Childs) {
    if(data.Childs.length>0) {
      getChilds(data.Childs)
    }
  }
}

function getChilds(data) {
  for(var i=0; i < data.length; i++) {
    _getChilds(data[i]);
  }
}