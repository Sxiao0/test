function myAjax(url, method, data, successCallback, errorCallback) {
  var xhr = new XMLHttpRequest();
  var params = "";

  if (data) {
    for (var key in data) {
      if (params != "") {
        params += "&";
      }
      params += key + "=" + encodeURIComponent(data[key]);
    }
  }

  if (method === "GET") {
    if (params) {
      url += "?" + params;
    }
    xhr.open(method, url, true);
    xhr.send();
  } else if (method === "POST") {
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        successCallback(JSON.parse(xhr.responseText));
      } else {
        errorCallback(xhr.status);
      }
    }
  };
}
