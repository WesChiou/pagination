const pagination = require('./pagination.js');

test('Normal usage', () => {
  expect(pagination(1, 12).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0').join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12).join(' ')).toBe('1 ... 3 4 5 6 7 ... 12');
  expect(pagination('6', 12).join(' ')).toBe('1 ... 4 5 6 7 8 ... 12');
  expect(pagination(7, '12').join(' ')).toBe('1 ... 5 6 7 8 9 ... 12');
  expect(pagination('8', '12').join(' ')).toBe('1 ... 6 7 8 9 10 ... 12');
  expect(pagination(9, 12).join(' ')).toBe('1 ... 7 8 9 10 11 12');
  expect(pagination(10, 12).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(11, 12.0).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(12, 12).join(' ')).toBe('1 ... 8 9 10 11 12');
});

test('Large pageCount', () => {
  expect(pagination(1, 10000000).join(' ')).toBe('1 2 3 4 5 ... 10000000');
  expect(pagination(2, 10000000).join(' ')).toBe('1 2 3 4 5 ... 10000000');
  expect(pagination(3, 10000000).join(' ')).toBe('1 2 3 4 5 ... 10000000');
  expect(pagination(4, 10000000).join(' ')).toBe('1 2 3 4 5 6 ... 10000000');
  expect(pagination(5, 10000000).join(' ')).toBe('1 ... 3 4 5 6 7 ... 10000000');
  expect(pagination(100, 10000000).join(' ')).toBe('1 ... 98 99 100 101 102 ... 10000000');
  expect(pagination(9999996, 10000000).join(' ')).toBe('1 ... 9999994 9999995 9999996 9999997 9999998 ... 10000000');
  expect(pagination(9999997, 10000000).join(' ')).toBe('1 ... 9999995 9999996 9999997 9999998 9999999 10000000');
  expect(pagination(9999998, 10000000).join(' ')).toBe('1 ... 9999996 9999997 9999998 9999999 10000000');
  expect(pagination(9999999, 10000000).join(' ')).toBe('1 ... 9999996 9999997 9999998 9999999 10000000');
  expect(pagination(10000000, 10000000).join(' ')).toBe('1 ... 9999996 9999997 9999998 9999999 10000000');
});

test('Illegal input(no pageCount)', () => {
  expect(pagination().join(' ')).toBe('');
  expect(pagination(1).join(' ')).toBe('');
  expect(pagination(0).join(' ')).toBe('');
  expect(pagination(-1).join(' ')).toBe('');
  expect(pagination(-Infinity).join(' ')).toBe('');
  expect(pagination(Infinity).join(' ')).toBe('');
  expect(pagination(undefined).join(' ')).toBe('');
  expect(pagination(null).join(' ')).toBe('');
  expect(pagination('null').join(' ')).toBe('');
  expect(pagination('').join(' ')).toBe('');
  expect(pagination('*').join(' ')).toBe('');
  expect(pagination('9').join(' ')).toBe('');
  expect(pagination('9.9').join(' ')).toBe('');
});

test('Illegal input(illegal pageCount)', () => {
  expect(pagination(1, 0).join(' ')).toBe('');
  expect(pagination(0, 0).join(' ')).toBe('');
  expect(pagination(-1, -1).join(' ')).toBe('');
  expect(pagination(-Infinity, -Infinity).join(' ')).toBe('');
  expect(pagination(Infinity, Infinity).join(' ')).toBe('');
  expect(pagination(undefined, undefined).join(' ')).toBe('');
  expect(pagination(null, null).join(' ')).toBe('');
  expect(pagination('null', 'null').join(' ')).toBe('');
  expect(pagination('', '').join(' ')).toBe('');
  expect(pagination('*', '*').join(' ')).toBe('');
  expect(pagination('9', '9.1').join(' ')).toBe('');
  expect(pagination('9.9', '9.9').join(' ')).toBe('');
});

test('Usage With "blurSize = 1" config', () => {
  const config = {
    blurSize: 1,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', config).join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 ... 12');
  expect(pagination('6', 12, config).join(' ')).toBe('1 ... 4 5 6 7 8 ... 12');
  expect(pagination(7, '12', config).join(' ')).toBe('1 ... 5 6 7 8 9 ... 12');
  expect(pagination('8', '12', config).join(' ')).toBe('1 ... 6 7 8 9 10 11 12');
  expect(pagination(9, 12, config).join(' ')).toBe('1 ... 7 8 9 10 11 12');
  expect(pagination(10, 12, config).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('1 ... 8 9 10 11 12');
});

test('Usage With "blurSize = 2" config', () => {
  const config = {
    blurSize: 2,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', config).join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 ... 12');
  expect(pagination('6', 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 ... 12');
  expect(pagination(7, '12', config).join(' ')).toBe('1 ... 5 6 7 8 9 10 11 12');
  expect(pagination('8', '12', config).join(' ')).toBe('1 ... 6 7 8 9 10 11 12');
  expect(pagination(9, 12, config).join(' ')).toBe('1 ... 7 8 9 10 11 12');
  expect(pagination(10, 12, config).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('1 ... 8 9 10 11 12');
});

test('Usage With "headSize = 0" and "tailSize = 0" config', () => {
  const config = {
    headSize: 0,
    tailSize: 0,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 5 ...');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 5 ...');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 ...');
  expect(pagination(4, '12.0', config).join(' ')).toBe('... 2 3 4 5 6 ...');
  expect(pagination(5, 12, config).join(' ')).toBe('... 3 4 5 6 7 ...');
  expect(pagination('6', 12, config).join(' ')).toBe('... 4 5 6 7 8 ...');
  expect(pagination(7, '12', config).join(' ')).toBe('... 5 6 7 8 9 ...');
  expect(pagination('8', '12', config).join(' ')).toBe('... 6 7 8 9 10 ...');
  expect(pagination(9, 12, config).join(' ')).toBe('... 7 8 9 10 11 ...');
  expect(pagination(10, 12, config).join(' ')).toBe('... 8 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('... 8 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('... 8 9 10 11 12');
});

test('Usage With "headSize = 2" and "tailSize = 3" config', () => {
  const config = {
    headSize: 2,
    tailSize: 3,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 5 ... 10 11 12');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 5 ... 10 11 12');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 ... 10 11 12');
  expect(pagination(4, '12.0', config).join(' ')).toBe('1 2 3 4 5 6 ... 10 11 12');
  expect(pagination(5, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 ... 10 11 12');
  expect(pagination('6', 12, config).join(' ')).toBe('1 2 ... 4 5 6 7 8 ... 10 11 12');
  expect(pagination(7, '12', config).join(' ')).toBe('1 2 ... 5 6 7 8 9 10 11 12');
  expect(pagination('8', '12', config).join(' ')).toBe('1 2 ... 6 7 8 9 10 11 12');
  expect(pagination(9, 12, config).join(' ')).toBe('1 2 ... 7 8 9 10 11 12');
  expect(pagination(10, 12, config).join(' ')).toBe('1 2 ... 8 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('1 2 ... 8 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('1 2 ... 8 9 10 11 12');
});

test('Usage With "diameter = 4" config', () => {
  const config = {
    diameter: 4,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 ... 12');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 ... 12');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', config).join(' ')).toBe('1 ... 3 4 5 6 ... 12');
  expect(pagination(5, 12, config).join(' ')).toBe('1 ... 4 5 6 7 ... 12');
  expect(pagination('6', 12, config).join(' ')).toBe('1 ... 5 6 7 8 ... 12');
  expect(pagination(7, '12', config).join(' ')).toBe('1 ... 6 7 8 9 ... 12');
  expect(pagination('8', '12', config).join(' ')).toBe('1 ... 7 8 9 10 ... 12');
  expect(pagination(9, 12, config).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(10, 12, config).join(' ')).toBe('1 ... 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('1 ... 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('1 ... 9 10 11 12');
});

test('Usage With "diameter = pageCount" config', () => {
  const config = {
    diameter: 12,
  };
  expect(pagination(1, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(2.0, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination('3.0', 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(4, '12.0', config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(5, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination('6', 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(7, '12', config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination('8', '12', config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(9, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(10, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(11, 12.0, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
  expect(pagination(12, 12, config).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 11 12');
});

test('Illegal config (illegal diameter)', () => {
  // illegal config should be ignored.
  expect(pagination(1, 12, { diameter: 0 }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12, { diameter: 1 }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12, { diameter: -1 }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', { diameter: '0' }).join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12, { diameter: Infinity }).join(' ')).toBe('1 ... 3 4 5 6 7 ... 12');
  expect(pagination('6', 12, { diameter: '*' }).join(' ')).toBe('1 ... 4 5 6 7 8 ... 12');
  expect(pagination(7, '12', { diameter: 13 }).join(' ')).toBe('1 ... 5 6 7 8 9 ... 12');
  expect(pagination('8', '12', { diameter: undefined }).join(' ')).toBe('1 ... 6 7 8 9 10 ... 12');
  expect(pagination(9, 12, { diameter: null }).join(' ')).toBe('1 ... 7 8 9 10 11 12');
});

test('Illegal config (illegal headSize or tailSize)', () => {
  // illegal config should be ignored.
  expect(pagination(1, 12, { headSize: 1, tailSize: null }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12, { headSize: 1, tailSize: -Infinity }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12, { headSize: 1, tailSize: 'null' }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', { headSize: 1, tailSize: '*' }).join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12, { headSize: 1, tailSize: 13 }).join(' ')).toBe('1 ... 3 4 5 6 7 ... 12');
  expect(pagination('6', 12, { headSize: 1, tailSize: -1 }).join(' ')).toBe('1 ... 4 5 6 7 8 ... 12');
  expect(pagination(7, '12', { headSize: null, tailSize: 1 }).join(' ')).toBe('1 ... 5 6 7 8 9 ... 12');
  expect(pagination('8', '12', { headSize: Infinity, tailSize: 1 }).join(' ')).toBe('1 ... 6 7 8 9 10 ... 12');
  expect(pagination(9, 12, { headSize: 'null', tailSize: 1 }).join(' ')).toBe('1 ... 7 8 9 10 11 12');
  expect(pagination(10, 12, { headSize: '*', tailSize: 1 }).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(11, 12.0, { headSize: 13, tailSize: 1 }).join(' ')).toBe('1 ... 8 9 10 11 12');
  expect(pagination(12, 12, { headSize: -1, tailSize: 1 }).join(' ')).toBe('1 ... 8 9 10 11 12');
});

test('Illegal config (illegal blurSize)', () => {
  // illegal config should be ignored.
  expect(pagination(1, 12, { blurSize: 13 }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(2.0, 12, { blurSize: -1 }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination('3.0', 12, { blurSize: Infinity }).join(' ')).toBe('1 2 3 4 5 ... 12');
  expect(pagination(4, '12.0', { blurSize: -Infinity }).join(' ')).toBe('1 2 3 4 5 6 ... 12');
  expect(pagination(5, 12, { blurSize: '13' }).join(' ')).toBe('1 ... 3 4 5 6 7 ... 12');
  expect(pagination('6', 12, { blurSize: '*' }).join(' ')).toBe('1 ... 4 5 6 7 8 ... 12');
  expect(pagination(7, '12', { blurSize: 'null' }).join(' ')).toBe('1 ... 5 6 7 8 9 ... 12');
  expect(pagination('8', '12', { blurSize: null }).join(' ')).toBe('1 ... 6 7 8 9 10 ... 12');
  expect(pagination(9, 12, { blurSize: undefined }).join(' ')).toBe('1 ... 7 8 9 10 11 12');
  expect(pagination(10, 12, { blurSize: {} }).join(' ')).toBe('1 ... 8 9 10 11 12');
});

test('Other usage', () => {
  // google search result page like this.
  expect(pagination(1, 100, { diameter: 10, headSize: 0, tailSize: 0 }).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 ...');
  expect(pagination(5, 100, { diameter: 10, headSize: 0, tailSize: 0 }).join(' ')).toBe('1 2 3 4 5 6 7 8 9 10 ...');
  expect(pagination(6, 100, { diameter: 10, headSize: 0, tailSize: 0 }).join(' ')).toBe('... 2 3 4 5 6 7 8 9 10 11 ...');
})
