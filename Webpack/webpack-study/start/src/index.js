/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-20 22:30:46 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-20 23:40:23
 */
import {add} from './add';
import subduction from './subduction';
var multi = require('./multi');
var division = require('./division');
console.log(add, subduction);
add && add(1, 2);
subduction && subduction(9, 2);
console.log('哈哈哈');
console.log(multi, division);
multi && multi(2, 2);
division && division.division(16, 8);