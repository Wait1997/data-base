// cacheRequest
const request = (url, option) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: option });
    }, 2000);
  });
};

const cache = new Map();

const cacheRequest = (url, option) => {
  const key = `${url}:${option.method}`;

  if (cache.has(key)) {
    // pending状态
    if (cache.get(key).status === 'pending') {
      return cache.get(key).wait;
    }
    // fullfilled/error
    return Promise.resolve(cache.get(key).data);
  } else {
    // 拿到promise返回的结果
    const requestApi = request(url, option);
    cache.set(key, { status: 'pending', wait: requestApi });

    return requestApi
      .then(res => {
        cache.set(key, { status: 'success', data: res });
        // console.log(cache)
        return Promise.resolve(res);
      })
      .catch(err => {
        cache.set(key, { status: 'fail', data: err });
        Promise.reject(err);
      });
  }
};
