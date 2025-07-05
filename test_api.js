require('dotenv').config();
const axios = require('axios');

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLE } = process.env;

axios.get(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?limit=5`, {
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
  }
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err.response?.data || err.message);
});