// Supabase 配置
const SUPABASE_URL = 'https://xhglunllxuwxgtsezpyi.supabase.co'
const SUPABASE_KEY = 'sb_publishable_H0C0qjtrwZn52Xc9GO2ufw_6TJNRD7b'

// 初始化客户端
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase, SUPABASE_URL, SUPABASE_KEY }