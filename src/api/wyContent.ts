// @ts-ignore
/* eslint-disable */
import request from '@/request.ts';

/** 获取文章内容 GET /collection/${param1}/article/${param0}/content */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingGETParams,
  options?: { [key: string]: any },
) {
  const { articleId: param0, collectionId: param1, ...queryParams } = params;
  return request<API.BaseResponseListListWyContent_>(
    `/collection/${param1}/article/${param0}/content`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 修改文章部分段的内容 PUT /collection/${param1}/article/${param0}/content */
export async function change(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeUsingPUT2Params,
  body: API.ReqWyContentChange,
  options?: { [key: string]: any },
) {
  const { articleId: param0, collectionId: param1, ...queryParams } = params;
  return request<API.BaseResponseListListWyContent_>(
    `/collection/${param1}/article/${param0}/content`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 添加文章字符段落内容 POST /collection/${param1}/article/${param0}/content */
export async function add(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addUsingPOST2Params,
  body: API.ReqWyContentAddString,
  options?: { [key: string]: any },
) {
  const { articleId: param0, collectionId: param1, ...queryParams } = params;
  return request<API.BaseResponseListListWyContent_>(
    `/collection/${param1}/article/${param0}/content`,
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

/** 获取文章字符内容 GET /collection/${param1}/article/${param0}/content/string */
export async function getString(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStringUsingGETParams,
  options?: { [key: string]: any },
) {
  const { articleId: param0, collectionId: param1, ...queryParams } = params;
  return request<string>(`/collection/${param1}/article/${param0}/content/string`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
