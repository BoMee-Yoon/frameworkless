const parseResponse = async response => {
  const { status } = response;
  let data;
  if (status !== 204) {
    data = await response.json();
  }

  return {
    status,
    data
  }
}

const request = async params => {
  const {
    method = 'GET',
    url,
    headers = {},
    body
  } = params;

  const config = {
    method,
    headers: new window.Headers(headers), // 이렇게 하면 headers 가 객체.toString() 상태로 넘어가고 포스트에서 에러발생 됨
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await window.fetch(url, config);

  return parseResponse(response);
}

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: 'GET'
  });

  return response.data;
}

const post = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: 'POST',
    body
  });
  return response.data
}

const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: 'PUT',
    body
  });

  return response.data
}

const patch = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: 'PATCH',
    body
  });
  return response.data;
}

const deleteRequest = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: 'DELETE'
  });

  return response.data
}

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest
}

/*
fetch 가 promise 객체를 반환때문에 전통적인 콜백 기반의 XMLHttpRequest 접근 방식을 최신의 프라미스 기반으로 변환하기 위한 보일러플레이트 코드가 필요하지 않다

*/