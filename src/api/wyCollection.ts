// @ts-ignore
/* eslint-disable */
import request from '@/request.ts';

/** 获取全部文集 GET /collection */
export async function getUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListWyCollection_>('/collection', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加文集 POST /collection */
export async function addUsingPost(body: API.WyCollection, options?: { [key: string]: any }) {
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
export async function getByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByIdUsingGETParams,
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
export async function putUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putUsingPUTParams,
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
export async function deleteUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseString_>(`/collection/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
