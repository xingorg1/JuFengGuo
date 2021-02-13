# 练习题
> 老师的（我的见“函数.sql”文件）

### 1. 查询渡一每个部门的员工数量
```sql
SELECT d.`name`, COUNT(e.id) AS number
FROM company as c INNER JOIN department as d on c.id = d.companyId
INNER JOIN employee as e on d.id = e.deptId
WHERE c.`name` LIKE '%渡一%'
GROUP BY d.id, d.`name`
```
### 2. 查询每个公司的员工数量
```sql
SELECT c.`name`, COUNT(e.id) AS number
FROM company as c INNER JOIN department as d on c.id = d.companyId
INNER JOIN employee as e on d.id = e.deptId
GROUP BY c.id, c.`name`
```
### 3. 查询所有公司五年内入职的居住在万家湾的女员工数量
```sql
SELECT company.`name`,
-- 当显示null时换成0
CASE
	WHEN result_table.number IS	NULL THEN
		0
	ELSE
		result_table.number 
END AS 符合条件的员工数量
-- 将上边的结果表当成一张表，左连接到company表。
FROM company LEFT JOIN (
	SELECT c.id, c.`name`, COUNT(e.id) AS number
	FROM company as c INNER JOIN department as d on c.id = d.companyId
	INNER JOIN employee as e on d.id = e.deptId
	WHERE TIMESTAMPDIFF(YEAR, e.joinDate, CURDATE()) <= 6 -- 20年卡5，21年卡6
	AND e.location LIKE '%万家湾%'
	AND e.ismale = 0
	GROUP BY c.id, c.`name`
) AS result_table ON result_table.id = company.id
```
### 4. 查询渡一所有员工分布在哪些居住地，每个居住地的数量
```sql
SELECT e.location, COUNT(e.id) AS number
FROM company AS c INNER JOIN department AS d ON c.id = d.companyId
INNER JOIN employee AS e ON d.id = e.deptId
WHERE c.`name` LIKE '%渡一%'
GROUP BY e.location
```
### 5. 查询员工人数大于200的公司信息
```sql
SELECT * FROM company
WHERE id in ( -- 把查询的结果表当子句进行过滤
	SELECT c.id
	FROM company as c INNER JOIN department as d on c.id = d.companyId
	INNER JOIN employee as e on d.id = e.deptId
	GROUP BY c.id, c.`name`
	HAVING COUNT(e.id) >= 200
)
```
### 6. 查询渡一公司里比他平均工资高的员工
```sql
SELECT e.*
FROM company as c INNER JOIN department as d on c.id = d.companyId
INNER JOIN employee as e on d.id = e.deptId
WHERE c.`name` LIKE '%渡一%' AND
e.salary > (
    -- 子句
    SELECT avg(e.salary)
    FROM company as c INNER JOIN department as d on c.id = d.companyId
    INNER JOIN employee as e on d.id = e.deptId
    WHERE c.`name` LIKE '%渡一%'
)
ORDER BY e.salary
```
### 7. 查询渡一所有名字为两个字和三个字的员工对应人数
```sql
SELECT CHAR_LENGTH(e.`name`) as 姓名长度, COUNT(e.`name`) as 员工数量
FROM company as c INNER JOIN department as d on c.id = d.companyId
INNER JOIN employee as e on d.id = e.deptId
WHERE c.`name` LIKE '%渡一%' 
GROUP BY CHAR_LENGTH(e.`name`) -- 按照姓名长度分组
HAVING 姓名长度 in (2,3) -- 这里要么写聚合，要么写别名，已经娶不到e.`name`了 
```

### 8. 查询每个公司每个月的总支出薪水，并按照从低到高排序【使用视图】
```sql
SELECT c.`id`, c.`name`,  SUM(e.salary) AS sumSalary
FROM company as c INNER JOIN department as d on c.id = d.companyId
INNER JOIN employee as e on d.id = e.deptId
GROUP BY c.`name`, c.id
ORDER BY sumSalary -- ORDER BY 顺序最后，所以需要别名
```