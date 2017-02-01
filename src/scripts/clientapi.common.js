var ClientApi = (function () {
  var apiProtocol = 'https://';
  var wsProtocol = 'wss://';
  var apiVersion = '1.0';
  var apiPath = 'api.services-smarthome.de/API';
  var apiUri = [apiProtocol + apiPath, apiVersion].join('/');
  var apiDataUri = [apiProtocol + 'data.services-smarthome.de/DATA', apiVersion].join('/');
  var apiAccountUri = [apiProtocol + 'api.services-smarthome.de/ACCOUNT', apiVersion].join('/');
  var apiExtensionUri = [apiProtocol + 'api.services-smarthome.de/EXTENSION', apiVersion].join('/');
  var apiAuthorizationUri = apiProtocol + 'api.services-smarthome.de/AUTH';
  var events = {};
  var token = '';
  var areas = [];
  var ws;

  function measure(start) {
    var end = window.performance.now();
    return end - start;
  }

  function openSocket() {
    var wsUri = [wsProtocol + apiPath, apiVersion, 'events'].join('/');
    var uri = wsUri + '?token=' + encodeURI(token);
    ws = new WebSocket(uri);
    return ws;
  }

  function closeSocket() {
    ws.close();
    ws = undefined;
  }

  function getCall(url, acceptHeaderValue) {
    var time = window.performance.now();

    dispatchEventListener('request', {
      url: url, 
      type: 'GET',
      body: ''
    });

    $.ajax({
      type: 'GET',
      url: url,
      crossDomain: true,
      success: function (data) {
        dispatchEventListener('response', {
          data: data,
          time: measure(time)
        });
      },
      error: function (jqXHR, error, errorThrown) {
        dispatchEventListener('error', {
          data: jqXHR.responseJSON,
          type: error,
          message: errorThrown,
          time: measure(time)
        });
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', acceptHeaderValue || 'application/json');
      }
    });
  }

  function putCall(url, payload) {
    var time = window.performance.now();

    dispatchEventListener('request', {
      url: url, 
      type: 'PUT',
      body: payload
    });

    $.ajax({
      type: 'PUT',
      url: url,
      contentType: 'application/json',
      data: payload,
      processData: false,
      crossDomain: true,
      success: function () {
        dispatchEventListener('response', {
          data: '',
          time: measure(time)
        });
      },
      error: function (jqXHR, error, errorThrown) {
        dispatchEventListener('error', {
          data: jqXHR.responseJSON,
          type: error,
          message: errorThrown,
          time: measure(time)
        });
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
      }
    })
  }

  function deleteCall(url, payload) {
    var time = window.performance.now();

    dispatchEventListener('request', {
      url: url, 
      type: 'DELETE',
      body: payload
    });

    $.ajax({
      type: 'DELETE',
      url: url,
      contentType: 'application/json',
      data: payload,
      processData: false,
      crossDomain: true,
      success: function () {
        dispatchEventListener('response', {
          data: '',
          time: measure(time)
        });
      },
      error: function (jqXHR, error, errorThrown) {
        dispatchEventListener('error', {
          data: jqXHR.responseJSON,
          type: error,
          message: errorThrown,
          time: measure(time)
        });
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
      }
    })
  }

  function postCall(url, payload) {
    var time = window.performance.now();

    dispatchEventListener('request', {
      url: url, 
      type: 'POST',
      body: payload
    });

    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: payload,
      processData: false,
      crossDomain: true,
      success: function (data) {
        dispatchEventListener('response', {
          data: data,
          time: measure(time)
        });
      },
      error: function (jqXHR, error, errorThrown) {
        dispatchEventListener('error', {
          data: jqXHR.responseJSON,
          type: error,
          message: errorThrown,
          time: measure(time)
        });
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.setRequestHeader('Accept', 'application/json');
      }
    })
  }

  function authorize(clientId, clientSecret, payload, success) {
    var time = window.performance.now();
    var tokenUri = [apiAuthorizationUri, 'token'].join('/');

    $.ajax({
      type: 'POST',
      url: tokenUri,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(payload),
      crossDomain: true,
      success: function (response) {
        success(response, measure(time));
      },
      error: function (jqXHR, error, errorThrown) {
        alert('Token generation failed:\r\n' + jqXHR.status + ' : ' + errorThrown);
      },
      beforeSend: function (xhr) {
        var base64 = btoa(clientId + ':' + clientSecret);
        xhr.setRequestHeader('Authorization', 'Basic ' + base64);
      }
    });
  }

  function isConnected() {
    return ws && ws.readyState === 1;
  }

  function withArea(area) {
    areas.push(area);
  }

  function concatAddress(root) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(root);
      return args.join('/');
    };
  }

  function initialize(success, error) {
    var loginUri = [apiUri, 'initialize'].join('/');
    var time = window.performance.now();

    $.ajax({
      type: 'GET',
      url: loginUri,
      crossDomain: true,
      success: function (data) {
        success(data, measure(time));
      },
      error: function (jqXHR, err, errorThrown) {
        if (jqXHR.status === 409) {
          success(jqXHR.responseText, measure(time));
        } else {
          error(jqXHR, err, errorThrown);
        }
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    });
  }

  function uninitialize(success, error) {
    var logoutUri = [apiUri, 'uninitialize'].join('/');
    var time = window.performance.now();

    $.ajax({
      type: 'GET',
      url: logoutUri,
      crossDomain: true,
      success: function (data) {
        success(data, measure(time));
      },
      error: error,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    })
  }

  function setToken(accessToken) {
    token = accessToken;
  }

  function addEventListener(name, callback) {
    events[name] = events[name] || [];
    events[name].push(callback);
  }

  function removeEventListener(name, callback) {
    var cbs = events[name] || [];
    cbs.splice(cbs.indexOf(callback), 1);
  }

  function dispatchEventListener(name, ev) {
    var cbs = events[name] || [];
    cbs.forEach(cb => cb(ev));
  }

  function forEachArea(callback) {
    for (var i = 0; i < areas.length; i++) {
      callback(areas[i]);
    }
  }

  function appendQuery(url, query) {
    var parts = [];

    Object.keys(query).forEach(key => {
      var value = query[key];

      if (typeof(value) === 'string' && value.length > 0) {
        parts.push(key + '=' + value);
      }
    });

    if (parts.length > 0) {
      return url + '?' + parts.join('&');
    }

    return url;
  }

  return {
    bearer: setToken,
    login: authorize,
    connected: isConnected,
    connect: openSocket,
    disconnect: closeSocket,
    extend: withArea,
    create: postCall,
    update: putCall,
    remove: deleteCall,
    initialize: initialize,
    uninitialize: uninitialize,
    get: getCall,
    all: forEachArea,
    url: concatAddress(apiUri),
    auth: {
      url: concatAddress(apiAuthorizationUri),
    },
    account: {
      url: concatAddress(apiAccountUri),
    },
    data: {
      url: concatAddress(apiDataUri),
    },
    product: {
      url: concatAddress(apiExtensionUri),
    },
    query: appendQuery,
    on: addEventListener,
    off: removeEventListener,
  };
})();

$(document).ready(function () {
  var refreshToken = '';
  var state = queryParameter('state');
  var code = queryParameter('code');
  var apiOutput = $('pre[data-bind=apiOutput]');
  var eventOutput = $('pre[data-bind=eventOutput]');
  var interfacesArea = $('.interfacesArea').hide();
  var converters = {
    text: function (host, value) {
      host.text(value);
    },
    action: function (host, value) {
      host.attr('action', value);
    },
    json: function (host, value) {
      if (typeof(value) === 'object') {
        host.JSONView(value);
      } else {
        host.text('');
      }
    },
    api: function (host, value) {
      if (typeof(value) === 'string') {
        switch (value[0]) {
          case '[':
          case '{':
            return host.JSONView(JSON.stringify(value));
          case '<':
            return host.text((new XMLSerializer()).serializeToString(value));
          default:
            return host.text(value);
        }
      } else {
        converters.json(host, value);
      }
    },
    value: function (host, value) {
      host.val(value);
    },
    visibility: function (host, value) {
      if (value) {
        host.show();
      } else {
        host.hide();
      }
    },
    invisibility: function (host, value) {
      converters.visibility(host, !value);
    },
    enabled: function (host, value) {
      host.prop('disabled', !value);
    }
  };

  ClientApi.on('request', function (ev) {
    updateBinding({
      apiOutput: '',
      requestBody: ev.body,
      requestUri: ev.url,
      requestType: ev.type
    });
  });

  ClientApi.on('response', function (ev) {
    updateBinding({
      timing: ev.time,
      apiOutput: ev.data || 'OK'
    });
  });

  ClientApi.on('error', function (ev) {
    updateBinding({
      timing: ev.time,
      apiOutput: ev.data || (ev.type + ': ' + ev.message)
    });
  });

  $('input[type=button][data-command]').click(function () {
    var cmd = $(this).data('command');
    var actions = [];

    ClientApi.all(function (area) {
      var action = area[cmd];

      if (action) {
        actions.push(action);
      }
    });

    console.log(actions);

    actions.forEach(function (action) {
      var args = parameters(action).map(function (parameter) {
        return $('[name=' + parameter + ']:input').val();
      });
      action.apply(this, args);
    });
  });

  $('.area').each(function (i, v) {
    var url = $(v).data('script');
    $('<script/>').attr('src', 'scripts/' + url).appendTo(document.body);
  });

  $('select[name=grantType]').change(function () {
    var key = $(this).val();
    var names = {
      'oauth_redirect': 'Redirect URL:',
      'authorization_code': 'Code:',
      'refresh_token': 'Token:'
    };

    updateBinding({
      parameterName: names[key]
    });
  });

  var headings = $('.headingbold').click(function () {
    var index = headings.index(this);
    var selected = interfacesArea.eq(index).toggle();
    interfacesArea.not(selected).hide();
  });

  ClientApi.extend({
    toggleJson: function () {
      apiOutput.JSONView('toggle');
    },
    authorize: function (code, grantType, clientId, clientSecret) {
      var payload = {};

      if (grantType === 'oauth_redirect') {
        payload = {
          clientId: clientId,
          clientSecret: clientSecret,
          redirectUri: code
        };
        var uri = ClientApi.auth.url('authorize');
        var qs = {
          response_type: 'code',
          client_id: encodeURIComponent(clientId),
          redirect_uri: encodeURIComponent(code),
          scope: '',
          state: encodeURIComponent(btoa(JSON.stringify(payload))).replace(/%/g, '-'),
          lang: 'en-GB'
        };
        document.location.href = ClientApi.query(uri, qs);
        return;        
      } else if (grantType === 'refresh_token') {
        payload = {
          Grant_Type: grantType,
          Refresh_Token: code
        };
      } else if (grantType === 'authorization_code') {
        payload = {
          Grant_Type: grantType,
          Code: code,
          Redirect_Uri: window.location.href.split('?')[0]
        };
      } else {
        return alert('Unknown grant type used!');
      }

      ClientApi.login(clientId, clientSecret, payload, tokenReceived);
    },
    connect: function () {
      if (!ClientApi.connected()) {
        connectSocket();
      } else {
        eventOutput.prepend('<b>CONNECT:</b> WebSocket already connected.<br/>');
      }
    },
    disconnect: function () {
      //already closed
      if (!ClientApi.connected()) {
        eventOutput.prepend('<b>CONNECT:</b> WebSocket already closed.<br/>');
      } else {
        ClientApi.disconnect();
      }
    },
    login: function () {
      var success = function (data, time) {
        updateBinding({
          timing: time,
          apiOutput: data,
          loggedIn: true
        });

        eventOutput.empty();

        // Establish WebSocket connection for receiving events
        if (!ClientApi.connected()) {
          connectSocket();
        }
      };

      var error = function (jqXHR, err, errorThrown) {
        updateBinding({
          apiOutput: jqXHR.responseJSON || ''
        });

        alert('Login failed:\r\n' + jqXHR.status + ' : ' + errorThrown);
      };

      ClientApi.initialize(success, error);
    },
    logout: function () {
      ClientApi.disconnect();

      var success = function (data, time) {
        updateBinding({
          timing: time,
          apiOutput: '',
          loggedIn: false
        });
      };

      var error = function (jqXHR, error, errorThrown) {
        updateBinding({
          apiOutput: jqXHR.responseJSON || ''
        });

        alert('Logout failed:\r\n' + jqXHR.status + ' : ' + errorThrown);
      };

      ClientApi.uninitialize(success, error);
    },
    refresh: function (clientId, clientSecret) {
      var payload = {
        Grant_Type: 'refresh_token',
        Refresh_Token: refreshToken
      };

      ClientApi.login(clientId, clientSecret, payload, tokenReceived);
    },
    reset: function () {
      updateBinding({
        apiOutput: ''
      });
    },
  });

  function connectSocket() {
    var ws = ClientApi.connect();

    ws.onopen = function () {
      eventOutput.prepend('<b>CONNECT:</b> Connected to API endpoint for retrieving events<br/>');

      updateBinding({
        connected: true
      });
    };

    ws.onerror = function () {
      eventOutput.prepend('<b>ERROR:</b> Error with Web Socket connection occurred<br/>');
    };

    ws.onmessage = function (ev) {
      var time = now();
      eventOutput.prepend('<b>' + time + '</b><br/>' + ev.data + '<br/>');
      updateBinding({
        lastTime: time
      });
    };

    ws.onclose = function () {
      eventOutput.prepend('<b>CLOSED:</b> Connection to API endpoint closed<br/>');

      updateBinding({
        connected: false
      });
    };
  }

  function padZero(value) {
    var str = value < 10 ? '0' : '';
    return str + value;
  }

  function padZeros(value) {
    var str = value < 10 ? '00' : (value < 100 ? '0' : '');
    return str + value;
  }

  function now() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    var time = [padZero(hour), padZero(minute), padZero(second)].join(':');
    return [time, padZeros(milliseconds)].join('.');
  }

  function updateAllAreas() {
    ClientApi.all(function (area) {
      if (typeof(area.updateApiCommands) === 'function') {
        area.updateApiCommands(updateBinding); 
      }
    });
  }

  function resetAllAreas() {
    ClientApi.all(function (area) {
      if (typeof(area.reset) === 'function') {
        area.reset(); 
      }
    });
  }

  function tokenReceived(data, time) {
    var token = '';

    if (data) {
      refreshToken = data.refresh_token;
      token = data.access_token;
      ClientApi.bearer(token);
      updateAllAreas();
    } else {
      resetAllAreas();
    }
    
    updateBinding({
      timing: time,
      token: token
    });
  }

  function updateBinding(data) {
    Object.keys(data).forEach(function (key) {
      var value = data[key];

      $('[data-bind="' + key + '"]').each(function (index, element) {
        var host = $(element);
        var converter = host.data('converter') || 'text';
        var change = converters[converter];

        if (typeof(change) === 'function') {
          change(host, value);
        }
      });
    });
  }

  function queryParameter(variable) {
    var query = window.location.search.substring(1);
    var variables = query.split('&');

    for (var i = 0; i < variables.length; i++) {
      var items = variables[i].split('=');

      if (decodeURIComponent(items[0]) === variable) {
        return decodeURIComponent(items[1]);
      }
    }
  }

  function parameters(func) {
    var fnStr = func.toString();
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
    return result || [];
  }

  function autoLogin() {
    var msg = decodeURIComponent(state.replace(/\-/g, '%'));
    var obj = JSON.parse(atob(msg));
    var payload = {
      Code: code,
      Grant_Type: 'authorization_code',
      Redirect_Uri: obj.redirectUri,
    };
    ClientApi.login(obj.clientId, obj.clientSecret, payload, tokenReceived);
  }

  updateBinding({
    clientName: 'Innogy SmartHome API',
    appUri: ClientApi.url(),
    authUri: ClientApi.auth.url('authorize', 'TaC')
  });

  if (state && code) {
    autoLogin();
  }
});
