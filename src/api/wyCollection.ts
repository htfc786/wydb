// @ts-ignore
/* eslint-disable */
import request from '@/request.ts';

/** 获取全部文集 GET /collection */
export async function getAll(options?: { [key: string]: any }) {
  return request<API.BaseResponseListWyCollection_>('/collection', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加文集 POST /collection */
export async function add(body: API.WyCollection, options?: { [key: string]: any }) {
  return request<API.BaseResponseWyCollection_>('/collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取文集 GET /collection/${param0} */
export async function getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseWyCollection_>(`/collection/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改文集内容 PUT /collection/${param0} */
export async function change(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeUsingPUT1Params,
  body: API.WyCollection,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseWyCollection_>(`/collection/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除文集 DELETE /collection/${param0} */
export async function deleteCollection(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCollectionUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/collection/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取文集列表 GET /collection/list */
export async function getList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListWyCollectionList_>('/collection/list', {
    method: 'GET',
    ...(options || {}),
  });
}
