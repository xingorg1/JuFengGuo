-- 联表查询

-- 笛卡尔积
-- 创建一张表，记录足球队，并查询出对阵表。
    SELECT  football_team_copy.name AS 'guest',football_team.name AS 'master' -- 将结果表的列数据修改
    FROM football_team,football_team AS football_team_copy -- 拿到两个表的笛卡尔积结果
    WHERE football_team.name != football_team_copy.name -- 过滤掉自己和自己对打的数据


-- 左连接，左外连接， left join
    SELECT  * FROM department AS d LEFT JOIN employee AS e -- 连接方法：把department部门表的每一行依次拿出来，然后每次拿当前行与employee表的每一行进行对比，当前行的id与e表中对应行的deptId一致就生成结果表的一行。
    ON d.id = e.deptId

-- 右连接，右外连接，right join
    SELECT  * FROM employee AS e RIGHT JOIN department AS d
    ON d.id = e.deptId
    ORDER BY d.id DESC

-- 内连接，inner join
    SELECT  * 
    FROM employee AS e 
    INNER JOIN department AS d ON d.id = e.deptId
    INNER JOIN company AS c ON c.id < 2
    ORDER BY d.id DESC
