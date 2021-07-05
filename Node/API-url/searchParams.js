const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// 打印 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// 打印 https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(11, myURL.href);
// 打印 https://example.org/?a=b

myURL.searchParams.set('a', 'bc'); // 对已有的属性使用set，会被替换
myURL.searchParams.append('a', '123'); // 对已有的属性使用append，会被追加，两个同名属性都会存在
console.log(00, myURL.href);
const newSearchParams = new URLSearchParams(myURL.searchParams);
// 上面的代码等同于：
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
newSearchParams.append('d', '44');
console.log(12, myURL.href);
console.log(newSearchParams, typeof newSearchParams)
console.log(newSearchParams.toString());