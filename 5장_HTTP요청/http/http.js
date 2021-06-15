// XMLHttpRequest 를 사용하는 HTTP 클라이언트

const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach(entry => {
    const [
      name,
      value
    ] = entry;

    xhr.setRequestHeader(
      name,
      value
    )
  });
}

const parseResponse = xhr => {
  const {
    status,
    responseText
  } = xhr;

  let data;
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return {
    status,
    data
  }
}

const request = params => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const {
      method = 'GET',
      url,
      headers = {},
      body
    } = params;
  
    xhr.open(method, url);

    setHeaders(xhr, headers);

    xhr.send(JSON.stringify(body));

    xhr.onerror = () => reject(new Error('HTTP Error'));
    xhr.ontimeout = () => reject(new Error('Timeout Error'));
    xhr.onload = () => resolve(parseResponse(xhr));
  });
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
  return response.data;
}

const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: 'PUT',
    body
  });
  return response.data;
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

  return response.data;
}

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest
};

/*
HTTP 클라이언트의 핵심은 request 메서드다
XMLHttpRequest 는 2006년에 정의된 API로 콜백을 기반으로 한다
완료된 요청에 대한 onload 콜백,
오류로 끝나는 HTTP에 대한 onerror 콜백,
타임아웃 요청에 대한 ontimeout 콜백
디폴트로 타임아웃은 없지만 xhr 객체의 timeout 속성을 수정하면 타임아웃을 변경할 수 있다

HTTP 클라이언트의 공개 API는 프라미스를 기반으로 한다
따라서, request 메서드는 표준 XMLHttpRequest 요청을 새로운 Promise 객체로 묶는다
공개 메서드 get, post, put, patch, delete는 코드를 더 읽기 쉽게 해주는 request 메서드의 래퍼(적절한 매개변수를 전달하는)다

*/
