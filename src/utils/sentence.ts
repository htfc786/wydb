import { splitPinyin } from "./pinyin";

// 是否为标点
export function isPunctuation(str: string) {
  return /[，\,。\.！\!？\?；\;：\:“\"”‘\'’【\[】\]《\<》\>（\(）\)）、…]/.test(str);
}

// 是否为结束标点
export function isEndPunctuation(str: string) {
  return /[。？！?!…\.]/.test(str);
}

/**
 * 分割汉语句子
 *
 * @param text 要分割的中文文章字符串
 * @return 包含分割后句子的列表
 */
export function splitSentence(text: string): string[] {
  const sentences: string[] = [];
  if (!text) {
    return sentences;
  }
  let currentSentence = '';

  for (let i = 0; i < text.length; i++) {
    const c = text.charAt(i);

    // 遇到结束标点符号，则分割句子
    if (isEndPunctuation(c)) {
      currentSentence += c;

      // 连续标点，全部加入
      // 反正句子中出现连续的句号没有任何意义，一般来说是不允许出现的情况，
      //  所以如果出现了就给他添加到一个字段里，不用创建新的字段了
      let nc = i < text.length - 1 ? text.charAt(i + 1) : '';
      while (isPunctuation(nc)) {
        currentSentence += nc;
        i++;
        if (i === text.length - 1) {   // 是否超出了句子长度
          break;
        }
        nc = text.charAt(i + 1);
      }

      // 去除句子末尾可能的空格
      const trimmedSentence = currentSentence.trim();
      if (trimmedSentence !== '') {
        sentences.push(trimmedSentence);
      }
      currentSentence = ''; // 重置句子构建器
    } else {
      // 将当前字符添加到句子中
      currentSentence += c;
    }
  }

  // 添加最后一个句子（如果有）
  const lastSentence = currentSentence.trim();
  if (lastSentence !== '') {
    sentences.push(lastSentence);
  }
  return sentences;
}

// 判断是否一行一字
export function isOneWordPerLine(inputString: string): boolean {
  // 将输入字符串按行分割
  const lines = inputString.split('\n');
  // 计算每行中汉字的数量
  const chineseCounts = lines.map(line => line.match(/[\u4e00-\u9fa5]/g)?.length || 0);
  // chineseCounts不用每个都符合条件，只要有10个即可
  let checkNum = 10;
  // 判断输入类型 0,1,0,1,0,1 => 是一行一字：字\n拼音\n字\n拼音\n字\n拼音\n
  const checkFunc = (count: any, index: number) => 
      index + 1 === chineseCounts.length ||   // 最后一个字符
      count === 1 && chineseCounts[index + 1] === 0 || // 字后面是拼音
      count === 0 && chineseCounts[index + 1] === 1 || // 拼音后面是字
      count === 1 && chineseCounts[index + 1] === 1; // 全是字
  for (let i = 0; i < chineseCounts.length; i++) {
    if (checkFunc(chineseCounts[i], i)) {
      checkNum--;
      if (checkNum === 0) {
        return true;
      }
    }
  }
  return false;
}

// 批量添加：分割句子
export function batchAddSplitSentence(text: string): API.WyContent[][] {
  if (isOneWordPerLine(text)) {
    // 一行一字模式
    // 去除空格
    text = text.replace(/[\n\s]/g, '');
    // 分割句子
    const sentenceList = splitSentence(text);
    const result: API.WyContent[] = [];
    for (let i = 0; i < sentenceList.length; i++) {
      const sentence = sentenceList[i];
      // 拆分内容与拼音
      const split = splitPinyin(sentence);
      result.push(split);
    }
    return [result];
  } else {
    // 分割换行
    const lines = text.split('\n');
    const result: API.WyContent[][] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // 分割句子
      const sentenceList = splitSentence(line);
      const resultLine: API.WyContent[] = [];
      for (let j = 0; j < sentenceList.length; j++) {
        const sentence = sentenceList[j];
        // 拆分内容与拼音
        const split = splitPinyin(sentence);
        resultLine.push(split);
      }
      if (resultLine.length > 0) {
        result.push(resultLine);
      }
    }
    return result;
  }
}
