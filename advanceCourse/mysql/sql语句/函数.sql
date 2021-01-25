-- 数学
SELECT ABS(-1); -- 1
SELECT ABS(3); -- 3

SELECT CEIL(1.23); -- 2
SELECT CEIL(1.9); -- 2

SELECT FLOOR(1.23); -- 1
SELECT FLOOR(1.93); -- 1

SELECT MOD(1,3); -- 1
SELECT MOD(2,8); -- 2 2/8的余数
SELECT MOD(3,1) -- 0

SELECT PI(); -- 3.141593

SELECT RAND(); -- 其中一次的随机值为 0.34172691809174316

SELECT round(1.5); -- 2
SELECT round(1.25); -- 1
SELECT round(1.2355555, 3); -- 1.236
SELECT round(1, 3); -- 1 // 整数即使传了第二个参数也是保留整数， 不会补足小数

SELECT TRUNCATE(1.3234234,4); -- 1.3234
SELECT TRUNCATE(34,4); -- 34 // 不会补足小数

-- 聚合
SELECT COUNT(id) AS '员工个数',
AVG(salary) AS '平均薪资',
MAX(salary) AS '最高薪资',
MIN(salary) AS '最低薪资',
SUM(salary) AS '公司总支出'
FROM employee
SELECT COUNT(*) FROM employee; -- 【不推荐写法】* 的查法，就是先把employee表查出来，然后看这个表的每一行，只要每一行中至少一个单元格不为NULL，就算一个数。

-- 字符串
SELECT CONCAT(`name`, '_', id, '_', location) FROM employee; -- 涂萌紫_2_人民北路
SELECT CONCAT_WS('/',`name`, location, salary) FROM employee; -- 涂萌紫/人民北路/14684.16SELECT TRIM('  bar   ');

SELECT TRIM(LEADING 'x' FROM 'xxxbarxxx'); -- 删除指定的首字符x，得到「barxxx」
SELECT TRIM(BOTH 'x' FROM 'xxxbarxxx'); -- 删除指定的首尾字符 x， 得到「bar」
SELECT TRIM(TRAILING 'xyz' FROM 'barxxyz');  -- 删除指定的尾字符 x， 得到「barx」

SELECT LTRIM('   guo   ') -- 得到‘guo   ’
SELECT RTRIM('   guo   ') -- 得到‘   guo’

-- 日期
SELECT CURRENT_DATE(); -- 2021-01-19 得到今天
SELECT CURTIME(); -- 22:08:12 得到当前时间点

SELECT TIMESTAMPDIFF(MICROSECOND, '2019-2-25', '2021-1-19'); -- 相差毫秒值 59961600000000
SELECT TIMESTAMPDIFF(SECOND, '2019-2-25', '2021-1-19'); -- 相差秒值 59961600
SELECT TIMESTAMPDIFF(MINUTE, '2019-2-25', '2021-1-19'); -- 相差分钟值 999360
SELECT TIMESTAMPDIFF(HOUR, '2019-2-25', '2021-1-19'); -- 相差小时值 16656
SELECT TIMESTAMPDIFF(DAY, '2019-2-25', '2021-1-19'); -- 相差天数 694
SELECT TIMESTAMPDIFF(WEEK, '2019-2-25', '2021-1-19'); -- 相差周 99
SELECT TIMESTAMPDIFF(MONTH, '2019-2-25', '2021-1-19'); -- 相差月 22
SELECT TIMESTAMPDIFF(QUARTER, '2019-2-25', '2021-1-19'); -- 相差季度 7
SELECT TIMESTAMPDIFF(YEAR, '2019-2-25', '2021-1-19'); -- 相差年 1

-- 练习题

-- 1. 查询渡一每个部门的员工数量
SELECT d.name AS '所属部门',
COUNT(e.id) AS '员工数量'
FROM company.employee AS e
INNER JOIN company.department AS d ON e.deptId = d.id
inner JOIN company.company AS c ON d.companyId = c.id
WHERE c.`name` LIKE '%渡一%'
GROUP BY d.name;

-- 2. 查询每个公司的员工数量
SELECT c.name AS '企业',
COUNT(e.id) AS '员工数量'
FROM employee AS e
INNER JOIN department AS d ON d.id = e.deptId
INNER JOIN company AS c ON c.id = d.companyId
GROUP BY c.name

-- 扩展，再继续按性别分组
    SELECT c.name AS '企业',
    CASE e.ismale 
    WHEN 1 THEN '男' 
    ELSE '女'
    END '性别',
    COUNT(e.id) AS '员工数量'
    FROM employee AS e
    INNER JOIN department AS d ON d.id = e.deptId
    INNER JOIN company AS c ON c.id = d.companyId
    GROUP BY c.name, e.ismale

-- 3. 查询所有公司五年内入职的居住在万家湾的女员工数量
SELECT companyName AS '企业名称',
COUNT(result_table.id) AS '员工数量'
FROM (
-- SQL子句
select e.id,e.location, e.ismale,
-- d.name as 'departmentName',
c.name as 'companyName',
timestampdiff(year, e.joinDate, current_date) as '司龄'
from employee as e
inner join department as d on d.id = e.deptId
inner join company as c on c.id = d.companyId
where timestampdiff(year, e.joinDate, current_date) > 5 
and e.location like '%万家湾%' and e.ismale = 0
order by e.id
) as result_table
group by result_table.companyName

-- 4. 查询渡一所有员工分布在哪些居住地，每个居住地的数量
SELECT location AS '居住地',
COUNT(location) AS '居住人数',
-- companyName AS '企业名称'
FROM (
-- SQL子句
select e.id, e.location,
c.name as 'companyName'
from employee as e
inner join department as d on d.id = e.deptId
inner join company as c on c.id = d.companyId
where c.name like '%渡一%'
) as result_table
GROUP BY location,companyName

-- 5. 查询员工人数大于200的公司信息
SELECT c2.*
FROM (
-- -- SQL子句
select c.id
from employee as e
inner join department as d on d.id = e.deptId
inner join company as c on c.id = d.companyId
GROUP BY c.id
HAVING count(e.id) > 200
) AS result_table
INNER JOIN company AS c2 ON c2.id = result_table.id

-- 6. 查询渡一公司里比他平均工资高的员工
SELECT e2.id, 
e2.`name`, 
salary, 
result_table.name AS 'company',
avgSalary
FROM (
-- SQL子句
select c.id, c.`name`, AVG(e.salary) as avgSalary
from employee as e
inner join department as d on d.id = e.deptId
inner join company as c on c.id = d.companyId
where c.name like '%渡一%'
GROUP BY c.id, c.`name`
) AS result_table
INNER JOIN employee AS e2
WHERE e2.salary > avgSalary
ORDER BY e2.salary

-- 7. 查询渡一所有名字为两个字和三个字的员工对应人数


-- 8. 查询每个公司每个月的总支出薪水，并按照从低到高排序【使用视图】
SELECT companyId, companyName, SUM(salary) as salary
FROM three_table_join
GROUP BY companyId, companyName
ORDER BY salary