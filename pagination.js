function pagination(currentPage, pageCount, {
  diameter = 5,
  headSize = 1,
  tailSize = 1,
  blurSize = 0,
} = {}) {
  // https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
  function isNonNegativeInteger(n) {
    // eslint-disable-next-line
    return n >>> 0 === parseFloat(n);
  }
  function isPositiveInteger(n) {
    return isNonNegativeInteger(n) && n > 0;
  }
  // validation
  if (!isPositiveInteger(pageCount)
    || !isNonNegativeInteger(currentPage)
    || parseInt(currentPage, 10) > parseInt(pageCount, 10)
  ) {
    return [];
  }
  // correct parameters
  const CURR = parseInt(currentPage, 10);
  const COUNT = parseInt(pageCount, 10);
  const DIAMETER = isPositiveInteger(diameter) && diameter <= COUNT && diameter > 1 ? +diameter : 5;
  const HEADSIZE = isNonNegativeInteger(headSize) && headSize <= COUNT ? +headSize : 1;
  const TAILSIZE = isNonNegativeInteger(tailSize) && tailSize <= COUNT ? +tailSize : 1;
  const BLURSIZE = isNonNegativeInteger(blurSize) && blurSize <= COUNT ? +blurSize : 0;

  const FIRST = 1;
  const radius = Math.floor(DIAMETER / 2);
  const isEven = DIAMETER % 2 === 0;

  const set = new Set();

  for (let i = FIRST; i <= HEADSIZE && i <= COUNT; i += 1) {
    set.add(i);
  }
  for (let i = Math.max(CURR - DIAMETER, FIRST); i <= CURR + DIAMETER && i <= COUNT; i += 1) {
    if ((CURR <= radius && i <= DIAMETER)
      || (CURR >= COUNT - radius && i > COUNT - DIAMETER)
      || (i - CURR >= -radius + isEven && i - CURR <= radius)
    ) {
      set.add(i);
    }
  }
  for (let i = COUNT - TAILSIZE + 1; i <= COUNT && i >= FIRST; i += 1) {
    set.add(i);
  }

  const tmp = Array.from(set);
  const result = [];

  if (tmp[0] && tmp[0] > FIRST && tmp[0] - FIRST <= BLURSIZE) {
    for (let i = FIRST; i < tmp[0]; i += 1) {
      result.push(i);
    }
  } else if (tmp[0] && tmp[0] > FIRST) {
    result.push('...');
  }
  for (let i = 0; i < tmp.length; i += 1) {
    const it = tmp[i];
    result.push(it);

    const next = tmp[i + 1];
    if (next === undefined) break;

    if (next - it > 1 && next - it - 1 <= BLURSIZE) {
      for (let j = it + 1; j < next; j += 1) {
        result.push(j);
      }
    } else if (next - it > 1) {
      result.push('...');
    }
  }
  if (tmp[tmp.length - 1] < COUNT && COUNT - tmp[tmp.length - 1] <= BLURSIZE) {
    for (let i = tmp[tmp.length - 1] + 1; i <= COUNT; i += 1) {
      result.push(i);
    }
  } else if (tmp[tmp.length - 1] < COUNT) {
    result.push('...');
  }

  return result;
}

module.exports = pagination;
