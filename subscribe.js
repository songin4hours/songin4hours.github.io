function makeParamString(obj) {
  return "?" + Object.keys(obj).map(function (key) {
    return key + "=" + encodeURIComponent(obj[key]);
  }).join('&');
}

function get(url, args, callback) {
  var request;
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {}
    }
  }

  if (!request) callback(console.log("Cannot create XMLHTTP request"));

  request.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    if (this.status !== 200) callback(this.responseText);
    try {
      callback(null, JSON.parse(this.responseText));
    } catch (e) {
      callback(e);
    }
  };
  request.open('GET', url + makeParamString(args));
  request.send();
}

function subscribe(e) {
  console.log(this);
  var baseURL = 'https://docs.google.com/forms/d/1suO0diKx_8dhxwolBiy__c_ZtaBNV4ItabCM1FjozIA/formResponse';
  var params = [].slice.call(this.getElementsByTagName('input'))
    .reduce(function (string, elem) {
      return string + elem.name + '=' + elem.value + '&';
    }, "");
  var formURL = (baseURL + '?' + params);
  console.log(formURL);
  get(formURL, {}, function () {
    console.log('ignore the error, it worked');
  });
  e.preventDefault();
  return false;
}
