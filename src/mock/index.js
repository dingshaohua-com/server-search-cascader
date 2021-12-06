import Mock from "mockjs";
import _ from "lodash";
import dataSource from "./data-source";
import { findTreeById, findTreeByName } from "./tree-helper";

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: "1000-2000",
});

Mock.mock("/getTeachers", (options) => {
  const params = JSON.parse(options.body);

  if(params.name){
    return findTreeByName(params.name);
  }


  let result = [];
  if (params.id === "0") {
    result = {
      id: "0",
      name: "root",
      children: _.cloneDeep(dataSource),
    };
  } else {
    result = _.cloneDeep(findTreeById(params?.id));
  }

  if (result.hasOwnProperty("children")) {
    result.children.forEach((item) => {
      delete item.children;
    });
  }

  return result;
});