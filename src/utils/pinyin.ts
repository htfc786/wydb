import { isPunctuation } from "./sentence";

// 是否为拼音
export function isPinyin(str: string) {
  return /[a-zāáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜ]/i.test(str);
}

// 判断拼音声调，返回声调数字
export function getTone(pinyin: string): 0 | 1 | 2 | 3 | 4 {
  if (!pinyin) return 0;
  const tone = pinyin.match(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜ]/);
  if (tone) {
    switch (tone[tone.length - 1]) {
      case "ā":case "ō":case "ē":case "ī":case "ū":case "ǖ": return 1;
      case "á":case "ó":case "é":case "í":case "ú":case "ǘ": return 2;
      case "ǎ":case "ǒ":case "ě":case "ǐ":case "ǔ":case "ǚ": return 3;
      case "à":case "ò":case "è":case "ì":case "ù":case "ǜ": return 4;
      case "ü": return 0;
      default: return 0;
    }
  }
  return 0;
}

// 更改拼音声调
export function changeTone(pinyin: string, tone: 0 | 1 | 2 | 3 | 4) {
  if (!pinyin) return "";

  const PINYIN_REGEX = { 
    a: /[aāáǎà]/, 
    o: /[oōóǒò]/, 
    e: /[eēéěè]/, 
    i: /[iīíǐì]/, 
    u: /[uūúǔù]/, 
    v: /[vüǖǘǚǜ]/, 
    jqx: /[jqx]/ 
  };

  // jqx 小淘气，见到鱼眼要挖去
  if (pinyin.match(PINYIN_REGEX.jqx) && pinyin.match(PINYIN_REGEX.v)) {
    const oU = PINYIN_REGEX.v.exec(pinyin) || '';
    const OTone = getTone(oU[0]);
    pinyin = pinyin.replace(PINYIN_REGEX.v, changeTone('u', OTone));
  }
  
  // [aāáǎà] [oōóǒò] [eēéěè] [iīíǐì] [uūúǔù] [üǖǘǚǜ]
  if (pinyin.match(PINYIN_REGEX.a)) {
    return pinyin.replace(PINYIN_REGEX.a, ['a','ā','á','ǎ','à'][tone]);
  } else if (pinyin.match(PINYIN_REGEX.o)) {
    return pinyin.replace(PINYIN_REGEX.o, ['o','ō','ó','ǒ','ò'][tone]);
  } else if (pinyin.match(PINYIN_REGEX.e)) {
    return pinyin.replace(PINYIN_REGEX.e, ['e','ē','é','ě','è'][tone]);
  } else if (pinyin.match(PINYIN_REGEX.i)) {
    // i u 都有标在后
    if (pinyin.match(PINYIN_REGEX.u)) {
      // 查找位置
      const i_match = PINYIN_REGEX.i.exec(pinyin)
      const u_match = PINYIN_REGEX.u.exec(pinyin)
      if (i_match && u_match) {
        if (i_match.index < u_match.index) {  // i在前
          return pinyin.replace(PINYIN_REGEX.u, ['u','ū','ú','ǔ','ù'][tone]);
        } else { // u在前
          return pinyin.replace(PINYIN_REGEX.i, ['i','ī','í','ǐ','ì'][tone]);
        }
      }
    }
    return pinyin.replace(PINYIN_REGEX.i, ['i','ī','í','ǐ','ì'][tone]);
  } else if (pinyin.match(PINYIN_REGEX.u)) {
    return pinyin.replace(PINYIN_REGEX.u, ['u','ū','ú','ǔ','ù'][tone]);
  } else if (pinyin.match(PINYIN_REGEX.v)) {
    return pinyin.replace(PINYIN_REGEX.v, ['ü','ǖ','ǘ','ǚ','ǜ'][tone]);
  } else {
    return pinyin;
  }
}

// 分离汉字与拼音
export function splitPinyin(str: string) {
  // 参数归一化
  str = str.replace(/[\s\n]/g, ""); // 去除空格换行

  // 输入： [字][拼音][字][拼音][字][拼音][标点][字][拼音][字][拼音][标点]
  // 例： "你nǐ好hǎo啊ā，世shì界jiè！"
  // 输入： [拼音][字][拼音][字][拼音][字][标点][拼音][字][拼音][字][标点]
  // 例： "rén壬xū戌zhī之qiū秋，qī七yuè月jì既wàng望"
  let content :string = ""; // 汉字
  let pinyin :string[] = []; // 拼音
  
  let currentPinyin = ""; // 当前拼音
  let inPinyin = false; // 是否在拼音区域
  for (let i = 0; i < str.length; i++) {  
    const char = str[i];

    // 判断是否进入拼音区域
    if (!inPinyin && isPinyin(char)) {
      inPinyin = true;
      currentPinyin = "";
    }

    // 如果在拼音区，继续搜集拼音
    if (inPinyin) {
      currentPinyin += char;

      // 如果下一个字符不是拼音，则当前拼音结束
      if (i === str.length - 1 || !isPinyin(str[i + 1])) {
        pinyin.push(currentPinyin);
        currentPinyin = "";
        inPinyin = false;

        // 如果下1~2个字符是标点，添加一个空字符串
        if (isPunctuation(str[i + 1]) || isPunctuation(str[i + 2])) {
          pinyin.push("");
        }
      }
    } else {
      // 如果不在拼音区，添加汉字
      content += char;
    }
  }
  return { content, pinyin };
}