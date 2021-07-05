"use strict";
// 直接根目录执行 【tsc src/index.ts】 也行
var tuple = ['gjf', 10, true];
// 像元组中增加数据，只能增加元组中存放的类型
tuple.push('小石头');
console.log(tuple);
// 声明数组中元素数据类型
var arr1 = [1, 2, 3];
var arr2 = ['1', '2', '3'];
var arr3 = [1, '2', 3];
var arr4 = [1, '2', 3]; // 泛型方式来声明
// 枚举类型
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE[USER_ROLE["USER"] = 0] = "USER";
    USER_ROLE["USER1"] = "user";
    USER_ROLE[USER_ROLE["ADMIN"] = 1] = "ADMIN";
    USER_ROLE[USER_ROLE["MANAGER"] = 2] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}
var a = USER_ROLE[0];
console.log(a);
console.log(USER_ROLE[1]);
console.log(USER_ROLE.USER1);
console.log(0 /* USER */); // console.log(0 /* USER */);
// let name1:number | boolean;
// name1 = null;
// const s1 = Symbol('key'); 
