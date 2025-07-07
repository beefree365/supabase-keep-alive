const axios = require('axios');
const fs = require('fs');

// 随机生成 username，包含字母与数字
function generateRandomValue(length = 4) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generatePatternedValue(repeatCount = 5) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  const x = letters[Math.floor(Math.random() * letters.length)]; // 首尾字母
  let y;
  do {
    y = letters[Math.floor(Math.random() * letters.length)];
  } while (y === x); // 避免和 x 重复

  return x + y.repeat(repeatCount) + x;
}

function getRandomLetter(exclude = '') {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let char;
  do {
    char = letters[Math.floor(Math.random() * letters.length)];
  } while (exclude.includes(char));
  return char;
}

function generateName(mode = 'xxyzz') {
  let x, y, z;

  switch (mode) {
    case 'xxyzz': // 正确的模式：x x y z z
      x = getRandomLetter();
      y = getRandomLetter(x);
      z = getRandomLetter(x + y);
      return x + x + y + z + z;

    // 其他模式可插入此处（略）
    
    default:
      throw new Error('Unsupported mode: ' + mode);
  }
}

// 检查用户名是否可用
async function checkUsername(value) {
  try {
    const response = await axios.get('https://github.com/signup_check/username', {
      params: { value },
      headers: {
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://github.com/signup'
      }
    });
    if (response.status === 200) {
      console.log(`✅ 可用: ${value}, response: ${response.data}`);
      fs.appendFileSync('available_usernames.txt', `${value}\n`);
    } else {
      console.log(`⚠️ 异常状态码: ${value} → ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log(`❌ 不合法: ${value}`);
    } else {
      console.error(`❌ 请求失败: ${value} → ${error.message}`);
    }
  }
}

// Track already generated names
const generatedSet = new Set();

// 循环检查并控制速率
function runRequests(count = 10, delay = 1000, index = 0) {
  if (index >= count) return;

  let value;
  do {
    value = generateName('xxyzz');
  } while (generatedSet.has(value));

  generatedSet.add(value);
  checkUsername(value).then(() => {
    setTimeout(() => runRequests(count, delay, index + 1), delay);
  });
}

// 启动
runRequests(500, 1000);
