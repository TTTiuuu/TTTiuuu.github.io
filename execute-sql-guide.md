# Supabase SQL 执行指南

## 步骤 1：登录 Supabase
1. 访问 https://supabase.com
2. 点击右上角 "Login"
3. 使用 GitHub 或其他方式登录
4. 进入你的项目：`xhglunllxuwxgtsezpyi`

## 步骤 2：打开 SQL 编辑器
1. 在左侧菜单点击 **SQL Editor**
2. 点击 **New query** 创建新查询

## 步骤 3：执行建表 SQL
复制以下代码到 SQL 编辑器：

```sql
-- 1. 创建访客记录表
CREATE TABLE IF NOT EXISTS visitors (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT,
  user_agent TEXT,
  visited_at TIMESTAMP DEFAULT NOW(),
  page_url TEXT
);

-- 2. 创建消息表
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- 3. 启用行级安全
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. 设置安全策略
-- 任何人都可以插入访客记录
CREATE POLICY "允许插入访客记录" ON visitors
  FOR INSERT WITH CHECK (true);

-- 只有认证用户可以查看所有访客记录
CREATE POLICY "认证用户可查看访客" ON visitors
  FOR SELECT USING (auth.role() = 'authenticated');

-- 任何人都可以插入消息
CREATE POLICY "允许插入消息" ON messages
  FOR INSERT WITH CHECK (true);

-- 任何人都可以查看消息（留言板需要公开显示）
CREATE POLICY "允许查看消息" ON messages
  FOR SELECT USING (true);

-- 认证用户可以更新消息状态（标记已读）
CREATE POLICY "认证用户可更新消息" ON messages
  FOR UPDATE USING (auth.role() = 'authenticated');
```

## 步骤 4：运行 SQL
1. 点击 **Run** 按钮（或按 Ctrl+Enter）
2. 等待执行完成
3. 应该看到 "Success. No rows returned"

## 步骤 5：验证表已创建
1. 在左侧菜单点击 **Table Editor**
2. 应该看到两个表：`visitors` 和 `messages`
3. 点击表名查看结构

## 步骤 6：配置 CORS
1. 在左侧菜单点击 **Settings** → **API**
2. 找到 **CORS** 部分
3. 在 "Additional URLs" 添加：
   - `https://tttiuuu.github.io`
   - `http://localhost:3000`（本地开发用）
4. 点击 **Save**

## 步骤 7：测试功能
1. 访问 https://tttiuuu.github.io/message-board.html
2. 尝试提交一条留言
3. 返回 Table Editor 查看 `messages` 表中是否有新记录

## 故障排除

### 如果 SQL 执行失败：
1. **表已存在**：删除 `IF NOT EXISTS` 或先删除旧表
2. **权限错误**：确保你是项目所有者
3. **语法错误**：逐段执行 SQL

### 如果留言板无法连接：
1. **检查 CORS**：确保域名已添加
2. **检查表名**：确认表名是 `messages`（复数）
3. **检查网络**：浏览器控制台查看错误信息

### 快速测试连接：
```javascript
// 在浏览器控制台测试
const supabase = supabase.createClient(
  'https://xhglunllxuwxgtsezpyi.supabase.co',
  'sb_publishable_H0C0qjtrwZn52Xc9GO2ufw_6TJNRD7b'
)

// 测试查询
supabase.from('messages').select('*').then(console.log)
```

## 获取服务端密钥（可选）
如果需要服务端操作：
1. Settings → API
2. 复制 `service_role` 密钥
3. **重要**：不要在前端代码中使用此密钥

完成以上步骤后，你的留言板就可以正常工作了！