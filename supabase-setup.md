# Supabase 配置指南

## 已配置信息
- **URL**: https://xhglunllxuwxgtsezpyi.supabase.co
- **公开密钥**: sb_publishable_H0C0qjtrwZn52Xc9GO2ufw_6TJNRD7b

## 需要在 Supabase 控制台执行的操作

### 1. 创建示例表
```sql
-- 创建访客记录表
CREATE TABLE visitors (
  id BIGSERIAL PRIMARY KEY,
  ip_address TEXT,
  user_agent TEXT,
  visited_at TIMESTAMP DEFAULT NOW(),
  page_url TEXT
);

-- 创建消息表
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- 启用行级安全
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 设置安全策略
-- 任何人都可以插入访客记录
CREATE POLICY "允许插入访客记录" ON visitors
  FOR INSERT WITH CHECK (true);

-- 只有认证用户可以查看所有访客记录
CREATE POLICY "认证用户可查看访客" ON visitors
  FOR SELECT USING (auth.role() = 'authenticated');

-- 任何人都可以插入消息
CREATE POLICY "允许插入消息" ON messages
  FOR INSERT WITH CHECK (true);

-- 只有认证用户可以查看消息
CREATE POLICY "认证用户可查看消息" ON messages
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 2. 配置 CORS
在 Supabase 控制台 → 设置 → API：
- 添加允许的来源：`https://tttiuuu.github.io`
- 添加：`http://localhost:3000`（本地开发）

### 3. 获取服务端密钥（可选）
对于敏感操作，需要服务端密钥：
- 在 Supabase 控制台 → 设置 → API
- 复制 `service_role` 密钥（仅用于服务器端）

## 前端使用示例

### 记录访客
```javascript
async function recordVisitor() {
  const { data, error } = await supabase
    .from('visitors')
    .insert([
      { 
        page_url: window.location.href,
        user_agent: navigator.userAgent
      }
    ])
}
```

### 提交留言
```javascript
async function submitMessage(name, email, message) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message }])
}
```

### 实时订阅
```javascript
// 实时监听新消息
supabase
  .channel('new-messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('新消息:', payload.new)
    }
  )
  .subscribe()
```

## 安全注意事项
1. ✅ 前端使用公开密钥（publishable）
2. ✅ 启用行级安全（RLS）
3. ✅ 配置 CORS 限制域名
4. ❌ 不要在前端暴露服务端密钥
5. ✅ 敏感操作使用边缘函数