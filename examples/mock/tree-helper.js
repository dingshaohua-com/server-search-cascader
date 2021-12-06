import dataSource from "./data-source";


// 根据id 查找到元素
export const findTreeById = (id) => {
  let res = null;
  const handle = (data) => {
    for (const iterator of data) {
      if (iterator.id === id) {
        res = iterator;
        return false;
      } else {
        if (iterator.children) {
          handle(iterator.children);
        }
      }
    }
  };
  handle(dataSource);
  return res;
};

export const findTreeByName = (name) => {
  let res = null;
  // pre 上一级， 当前tree（即上一级tree的children）
  const handle = (pre, data) => {
    for (const iterator of data) {
      if (iterator.name === name) {
        res = iterator;
        return false;
      } else {
        if (iterator.children) {
          handle(iterator, iterator.children);
        }
      }
    }
  };
  handle(null, dataSource);
  return res ? [res]:null;
};
