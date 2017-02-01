(function ($, api) {
  var actionUri = api.url('action');

  function invokeSetStateAction(PostActionLink, PostActionValue, PostActionParameter) {
    if (!PostActionLink) {
      return alert('Action link missing');
    }

    var value = PostActionValue;

    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (!isNaN(parseFloat(value))) {
      value = parseFloat(PostActionValue);
    }

    var payload = {
      'type': 'device/SHC.RWE/1.0/action/SetState',
      'Link': {
        'value': PostActionLink
      },
      'Data': [{
        'name': PostActionParameter,
        'type': '/entity/Constant',
        'constant': {
          'value': value
        }
      }]
    };
  
    api.create(actionUri, JSON.stringify(payload));
  }

  function invokeActivateDeviceDiscovery() {
    var payload = {
      'desc': '/desc/device/SHC.RWE/1.0/action/ActivateDeviceDiscovery',
      'timestamp': '2015-01-01T00:00:00',
      'type': 'device/SHC.RWE/1.0/action/ActivateDeviceDiscovery',
      'Link': {
        'value': '/desc/Device/SHC.RWE/1.0'
      }
    };
  
    api.create(actionUri, JSON.stringify(payload));
  }

  function invokeDeactivateDeviceDiscovery() {
    var payload = {
      'desc': '/desc/device/SHC.RWE/1.0/action/DeactivateDeviceDiscovery',
      'timestamp': '2015-01-01T00:00:00',
      'type': 'device/SHC.RWE/1.0/action/DeactivateDeviceDiscovery',
      'Link': {
        'value': '/desc/Device/SHC.RWE/1.0'
      }
    };
  
    api.create(actionUri, JSON.stringify(payload));
  }

  function invokeAction(PostActionPayload) {
    if (!PostActionPayload) {
      return alert('Action payload missing');
    }

    api.create(actionUri, PostActionPayload);
  }

  function updateApiCommands(bind) {
    bind({
      actionUri: actionUri
    });
  }

  api.extend({
    invokeSetStateAction: invokeSetStateAction,
    invokeActivateDeviceDiscovery: invokeActivateDeviceDiscovery,
    invokeDeactivateDeviceDiscovery: invokeDeactivateDeviceDiscovery,
    invokeAction: invokeAction,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));