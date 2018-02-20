export const downloadAsText = url => {
  return new Promise(res => {
    var request = new window.XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400)
        return res(request.responseText);
      throw new Error(`HTTP: Failed to download ${url}`);
    };
    request.onerror = () => {
      throw new Error(`HTTP: Failed to download ${url}`);
    };
    request.send();
  });
};
