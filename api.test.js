// filepath: /workspaces/supabase-keep-alive/api.test.js
require('dotenv').config();
const axios = require('axios');

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLE } = process.env;

// 添加日志
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '已设置' : '未设置');
console.log('SUPABASE_TABLE:', SUPABASE_TABLE);

test('测试 Supabase 数据库 REST API', async () => {
    expect(SUPABASE_URL).toBeTruthy();
    expect(SUPABASE_ANON_KEY).toBeTruthy();
    expect(SUPABASE_TABLE).toBeTruthy();

    const response = await axios.get(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
});