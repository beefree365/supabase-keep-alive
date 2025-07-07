function getRandomLetter(exclude = '') {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let char;
  do {
    char = letters[Math.floor(Math.random() * letters.length)];
  } while (exclude.includes(char));
  return char;
}

function generateName(mode = 'mirror') {
  let x, y, z;

  switch (mode) {
    case 'mirror': // 回文结构 abcba
      x = getRandomLetter();
      y = getRandomLetter(x);
      z = getRandomLetter(x + y);
      return x + y + z + y + x;

    case 'repeat_center': // x + yyy + x
      x = getRandomLetter();
      y = getRandomLetter(x);
      return x + y.repeat(3) + x;

    case 'alternating': // x + y + x + y + x
      x = getRandomLetter();
      y = getRandomLetter(x);
      return x + y + x + y + x;

    case 'prefix_digit': // x + digit + digit + digit + x
      x = getRandomLetter();
      const digits = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      return x + digits + x;

    case 'xy_z_yx': // xy + z + yx
      x = getRandomLetter();
      y = getRandomLetter(x);
      z = getRandomLetter(x + y);
      return x + y + z + y + x;
    case 'xxyzz': // 正确的模式：x x y z z
      x = getRandomLetter();
      y = getRandomLetter(x);
      z = getRandomLetter(x + y);
      return x + x + y + z + z;

    default:
      throw new Error('Unsupported mode: ' + mode);
  }
}

// 🌟 示例：生成每种模式 3 个
['mirror', 'repeat_center', 'alternating', 'xy_z_yx', 'xxyzz'].forEach(mode => {
  console.log(`--- ${mode} ---`);
  for (let i = 0; i < 30; i++) {
    console.log(generateName(mode));
  }
});
