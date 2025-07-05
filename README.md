# wydb - 百文斩

### 翻译对应存储数据结构数据结构
1. 数据结构
见 types.d.ts
```
{
  original: {
    tokens: [
      { id: 'p1-0-233', c: '子' },
      { id: 'p1-1-189', c: '曰' },
      { id: 'p1-2-201', c: '：' },
      { id: 'p1-3-055', c: '“' },
      { id: 'p1-4-122', c: '以' },
      { id: 'p1-5-078', c: '吾' },
      { id: 'p1-6-045', c: '一' },
      { id: 'p1-7-156', c: '日' },
      { id: 'p1-8-211', c: '长' },
    ],
  },
  translation: {
    tokens: [
      { id: 'tr1', c: '孔子' },
      { id: 'tr2', c: '说' },
      { id: 'tr3', c: '：' },
      { id: 'tr4', c: '“' },
      { id: 'tr5', c: '因为' },
      { id: 'tr6', c: '我' },
      { id: 'tr7', c: '年纪' },
    ],
  },
  connections: [
  ],
}
```
connections:
```
[
  {
    type: "direct",   // 直接连接
    from: ["t1"],     // 原文token
    to: ["tr1"]       // 译文token
  },
  {
    type: "reverse",  // 语序颠倒
    from: ["t3", "t4"],
    to: ["tr2"],
    marker: {         // 颠倒符号位置
      tokenId: "t3",  // 在原文t3处显示颠倒符号
      position: "top" // 符号位置（top/bottom）
    }
  }
]
```

2. Token id
生成规则：paraId + 位置索引 + 首字CRC8校验码
```
function genTokenId(paraId, position, char) {
  const crc = crc8(char); // 1字节校验码（0-255）
  return `${paraId}-${position}-${crc}`;
}

// 示例：para1段落第0位置的"学"字
// => "p1-0-158"
```
