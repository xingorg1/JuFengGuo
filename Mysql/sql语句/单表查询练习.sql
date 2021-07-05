-- 做登录验证：查询user表中用户为admin、密码为123456的用户
-- 查得到就有一条结果数据，查不到就是错误密码或用户名不存在
select * from company.`user`
WHERE loginId = 'admin' AND loginPwd = '123123';

-- 翻页数据查询
-- 获取员工数据，按照入职时间降序，并且分页数据为第二页（每页10条）

select * from company.employee
ORDER BY employee.joinDate DESC
LIMIT 10,10;


-- 查询：工资最高的女生
-- 性别=0，按照工资降序，取第一条
select *,
CASE employee.ismale
WHEN 0 
THEN '女'
END sex
from company.employee
WHERE employee.ismale = 0
ORDER BY employee.salary DESC
LIMIT 0, 1;