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
  // [aāáǎà] [oōóǒò] [eēéěè] [iīíǐì] [uūúǔù] [üǖǘǚǜ]
  if (pinyin.match(/[aāáǎà]/)) {
    return pinyin.replace(/[aāáǎà]/, ['a','ā','á','ǎ','à'][tone]);
  } else if (pinyin.match(/[oōóǒò]/)) {
    return pinyin.replace(/[oōóǒò]/, ['o','ō','ó','ǒ','ò'][tone]);
  } else if (pinyin.match(/[eēéěè]/)) {
    return pinyin.replace(/[eēéěè]/, ['e','ē','é','ě','è'][tone]);
  } else if (pinyin.match(/[iīíǐì]/)) {
    return pinyin.replace(/[iīíǐì]/, ['i','ī','í','ǐ','ì'][tone]);
  } else if (pinyin.match(/[uūúǔù]/)) {
    return pinyin.replace(/[uūúǔù]/, ['u','ū','ú','ǔ','ù'][tone]);
  } else if (pinyin.match(/[üǖǘǚǜ]/)) {
    return pinyin.replace(/[vüǖǘǚǜ]/, ['ü','ǖ','ǘ','ǚ','ǜ'][tone]);
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