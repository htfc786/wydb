// @ts-ignore
/* eslint-disable */
import request from '@/request.ts';

/** 根据id获取文章（无需collectionId） GET /article/${param0} */
export async function getWithNoCollection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWithNoCollectionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseResWyArticleGet_>(`/article/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部文章 GET /collection/${param0}/article */
export async function getByCollectionId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByCollectionIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, ...queryParams } = params;
  return request<API.BaseResponseResWyArticleGetList_>(`/collection/${param0}/article`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加文章 POST /collection/${param0}/article */
export async function add(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addUsingPOSTParams,
  body: API.ReqWyArticle,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, ...queryParams } = params;
  return request<API.BaseResponseWyArticle_>(`/collection/${param0}/article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取文章 GET /collection/${param0}/article/${param1} */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, id: param1, ...queryParams } = params;
  return request<API.BaseResponseResWyArticleGet_>(`/collection/${param0}/article/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章内容 PUT /collection/${param0}/article/${param1} */
export async function change(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeUsingPUTParams,
  body: API.ReqWyArticle,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, id: param1, ...queryParams } = params;
  return request<API.BaseResponseWyArticle_>(`/collection/${param0}/article/${param1}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章 DELETE /collection/${param0}/article/${param1} */
export async function deleteArticle(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteArticleUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, id: param1, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/collection/${param0}/article/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文章所在文集的位置 POST /collection/${param0}/article/${param1}/changeCollection */
export async function changeCollection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeCollectionUsingPOSTParams,
  body: API.ReqWyArticleChangeCollection,
  options?: { [key: string]: any },
) {
  const { collectionId: param0, id: param1, ...queryParams } = params;
  return request<API.BaseResponseResWyArticleGet_>(
    `/collection/${param0}/article/${param1}/changeCollection`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}
