declare namespace API {
  type addUsingPOST2Params = {
    /** articleId */
    articleId: number;
    /** collectionId */
    collectionId: number;
  };

  type addUsingPOSTParams = {
    /** collectionId */
    collectionId: number;
  };

  type BaseResponseListListWyContent_ = {
    code?: number;
    data?: WyContent[][];
    message?: string;
  };

  type BaseResponseListWyCollection_ = {
    code?: number;
    data?: WyCollection[];
    message?: string;
  };

  type BaseResponseListWyCollectionList_ = {
    code?: number;
    data?: WyCollectionList[];
    message?: string;
  };

  type BaseResponseResWyArticleGet_ = {
    code?: number;
    data?: ResWyArticleGet;
    message?: string;
  };

  type BaseResponseResWyArticleGetList_ = {
    code?: number;
    data?: ResWyArticleGetList;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseWyArticle_ = {
    code?: number;
    data?: WyArticle;
    message?: string;
  };

  type BaseResponseWyCollection_ = {
    code?: number;
    data?: WyCollection;
    message?: string;
  };

  type changeCollectionUsingPOSTParams = {
    /** collectionId */
    collectionId: number;
    /** id */
    id: number;
  };

  type changeUsingPUT1Params = {
    /** id */
    id: number;
  };

  type changeUsingPUT2Params = {
    /** articleId */
    articleId: number;
    /** collectionId */
    collectionId: number;
  };

  type changeUsingPUTParams = {
    /** collectionId */
    collectionId: number;
    /** id */
    id: number;
  };

  type deleteArticleUsingDELETEParams = {
    /** collectionId */
    collectionId: number;
    /** id */
    id: number;
  };

  type deleteCollectionUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getByCollectionIdUsingGETParams = {
    /** collectionId */
    collectionId: number;
  };

  type getByIdUsingGET1Params = {
    /** id */
    id: number;
  };

  type getByIdUsingGETParams = {
    /** collectionId */
    collectionId: number;
    /** id */
    id: number;
  };

  type getStringUsingGETParams = {
    /** articleId */
    articleId: number;
    /** collectionId */
    collectionId: number;
  };

  type getUsingGETParams = {
    /** articleId */
    articleId: number;
    /** collectionId */
    collectionId: number;
  };

  type getWithNoCollectionUsingGETParams = {
    /** id */
    id: number;
  };

  type ReqWyArticle = {
    /** 文章被写成时的的朝代（年份） */
    dynasty?: string;
    /** 文章主旨 */
    mainIdea?: string;
    /** 文言文文章名称 */
    name?: string;
    /** 备注信息 */
    note?: string;
    /** 文章选自的书籍 */
    source?: string;
    /** 文章作者 */
    writer?: string;
  };

  type ReqWyArticleChangeCollection = {
    /** 新的文集 */
    newCollectionId: number;
  };

  type ReqWyContentAddString = {
    /** 文章内容 */
    content: string;
    /** 段 */
    paragraph?: number;
    /** 句子 */
    sentence?: number;
  };

  type ReqWyContentChange = {
    /** 文章内容 */
    content: string;
  };

  type ResWyArticleGet = {
    collection?: WyCollection;
    /** 文章内容(json) */
    content?: WyContent[][];
    /** 文章创建时间 */
    createdAt?: string;
    /** 文章被写成时的的朝代（年份） */
    dynasty?: string;
    /** id */
    id?: number;
    /** 文章主旨 */
    mainIdea?: string;
    /** 文言文文章名称 */
    name?: string;
    /** 备注信息 */
    note?: string;
    /** 文章选自的书籍 */
    source?: string;
    /** 文章作者 */
    writer?: string;
  };

  type ResWyArticleGetList = {
    articleList?: ResWyArticleGetListArticle[];
    collection?: WyCollection;
  };

  type ResWyArticleGetListArticle = {
    /** 文章简短内容 */
    content?: string;
    /** 创建日期 */
    createdAt?: string;
    /** 文章被写成时的的朝代（年份） */
    dynasty?: string;
    /** id */
    id?: number;
    /** 文言文文章名称 */
    name?: string;
    /** 文章选自的书籍 */
    source?: string;
    /** 文章作者 */
    writer?: string;
  };

  type WyArticle = {
    /** 所属集合ID，关联collection表 */
    collectionId?: number;
    /** 文章内容(json) */
    content?: string;
    /** 文章内容(文字) */
    contentString?: string;
    /** 文章创建时间 */
    createdAt?: string;
    /** 文章被写成时的的朝代（年份） */
    dynasty?: string;
    /** id */
    id?: number;
    /** 文章主旨 */
    mainIdea?: string;
    /** 文言文文章名称 */
    name?: string;
    /** 备注信息 */
    note?: string;
    /** 文章选自的书籍 */
    source?: string;
    /** 文章作者 */
    writer?: string;
  };

  type WyCollection = {
    /** 文集创建时间 */
    createdAt?: string;
    /** 集合描述（可选） */
    description?: string;
    /** id */
    id?: number;
    /** 集合名称 */
    name?: string;
  };

  type WyCollectionList = {
    /** id */
    id?: number;
    /** 文集名称 */
    name?: string;
  };

  type WyContent = {
    /** 句子内容 */
    content?: string;
    /** [文章句子注音（列表） */
    pinyin?: string[];
    /** 文章句子翻译 */
    translation?: string;
  };
}
