// 感谢鱼皮大佬的代码
// https://github.com/liyupi/yudada/blob/master/yudada-frontend/openapi.config.ts

const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/request.ts'",
  schemaPath: "http://localhost:8081/v2/api-docs",
  serversPath: "./src",
});