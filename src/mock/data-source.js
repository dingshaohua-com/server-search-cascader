import _ from "lodash";

const data = [
  {
    id: "org1",
    name: "机构1",
    children: [
      {
        id: "org1-part1",
        name: "机构1-部门1",
        children: [
          { id: "org1-part1-zhaoyi", name: "赵一" },
          { id: "org1-part1-zhaoer", name: "赵二" },
          { id: "org1-part1-zhaosan", name: "赵三" },
        ],
      },
      {
        id: "org1-part2",
        name: "机构1-部门2",
        children: [
          { id: "org1-part2-qianyi", name: "钱一" },
          { id: "org1-part2-qianer", name: "钱二" },
          { id: "org1-part2-qiansan", name: "钱三" },
        ],
      },
      {
        id: "org1-part3",
        name: "机构1-部门3",
        children: [
          { id: "org1-part3-sunyi", name: "孙一" },
          { id: "org1-part3-suner", name: "孙二", isLast: true },
          { id: "org1-part3-sunsan", name: "孙三" },
        ],
      },
    ],
  },
  {
    id: "org2",
    name: "机构2",
    children: [
      {
        id: "org2-part1",
        name: "机构2-部门1",
        children: [
          { id: "org2-part1-liyi", name: "李一" },
          { id: "org2-part1-lier", name: "李二" },
          { id: "org2-part1-lisan", name: "李三" },
        ],
      },
      {
        id: "org2-part2",
        name: "机构2-部门2",
        children: [
          { id: "org2-part2-zhouyi", name: "周一" },
          { id: "org2-part2-zhouer", name: "周二" },
          { id: "org2-part2-zhousan", name: "周三" },
        ],
      },
      {
        id: "org2-part3",
        name: "机构2-部门3",
        children: [
          { id: "org2-part3-wuyi", name: "吴一" },
          { id: "org2-part3-wuer", name: "吴二" },
          { id: "org2-part3-wusan", name: "吴三" },
        ],
      },
    ],
  },
  {
    id: "org3",
    name: "机构3",
    children: [
      {
        id: "org3-part1",
        name: "机构3-部门1",
        children: [
          { id: "org3-part1-zhengyi", name: "郑一" },
          { id: "org3-part1-zhenger", name: "郑二" },
          { id: "org3-part1-zhengsan", name: "郑三" },
        ],
      },
      {
        id: "org3-part2",
        name: "机构3-部门2",
        children: [
          { id: "org3-part2-wangyi", name: "王一" },
          { id: "org3-part2-wanger", name: "周二" },
          { id: "org3-part2-wangsan", name: "王三 " },
        ],
      },
      {
        id: "org3-part3",
        name: "机构3-部门3",
        children: [
          { id: "org3-part3-fengyi", name: "冯一" },
          { id: "org3-part3-fenger", name: "冯二" },
          { id: "org3-part3-fengsan", name: "冯三 " },
        ],
      },
    ],
  },
];

const addFullPath = () => {
  const handleDate = (pre, iterator) => {
    // 移除fullPath元素中的children，防止套娃
    const noChildren = _.cloneDeep(iterator);
    delete noChildren.children;
    if (pre) {
      iterator.fullPath = [...pre.fullPath, noChildren];
    } else {
      iterator.fullPath = [noChildren];
    }
    return iterator;
  };
  const handle = (pre, data) => {
    for (const iterator of data) {
      const addFullPathRes = handleDate(pre, iterator);
      if(addFullPathRes.children){
        handle(addFullPathRes, addFullPathRes.children);
      }
    }
  };

  const dataSource = _.cloneDeep(data);
  handle(null, dataSource);
  return dataSource;
};

const res = addFullPath();

export default res;
