declare namespace API {
  type addUsingPOSTParams = {
    /** collectionId */
    collectionId: number;
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

  type ResWyArticleGet = {
    collection?: WyCollection;
    /** 创建日期 */
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
    articleList?: WyArticle[];
    collection?: WyCollection;
  };

  type WyArticle = {
    /** 所属集合ID，关联collection表 */
    collectionId?: number;
    /** 创建日期 */
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
}
