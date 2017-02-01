(function ($, api) {
  var deviceUri = api.url('device');

  // Get the device list
  function getDevices(DeviceId, GetDeviceTKey) {
    var uri = deviceUri;

    if (DeviceId) {
      uri += '/' + DeviceId;
    }

    if (GetDeviceTKey && GetDeviceTValue) {
      uri += '?tkey=' + GetDeviceTKey + '&tval=' + GetDeviceTValue;
    }

    api.get(uri);
  }

  // Get the device linked devices
  function getDeviceLinkedDevices(DeviceIdLinked) {
    var uri = deviceUri;

    if (!DeviceIdLinked) {
      return alert('DeviceId missing');
    }

    uri += '/' + DeviceIdLinked + '/devices';
    api.get(uri);
  }

  // Get device state
  function getDeviceState(DeviceIdState, GetDeviceStateName) {
    var uri = deviceUri;

    if (!DeviceIdState) {
      return alert('DeviceId missing');
    }

    uri += '/' + DeviceIdState + '/state';

    if (GetDeviceStateName) {
      uri += '?name=' + GetDeviceStateName;
    }

    api.get(uri);
  }

  // Get capabilities of device
  function getDeviceCapabilities(DeviceIdCaps) {
    var uri = deviceUri;

    if (!DeviceIdCaps) {
      return alert('DeviceId missing');
    }

    uri += '/' + DeviceIdCaps + '/capabilities';
    api.get(uri);
  }

  // Get states of the device
  function getDeviceConfig(DeviceIdConfig, GetDeviceConfigName) {
    var uri = deviceUri;

    if (!DeviceIdConfig) {
      return alert('DeviceId missing');
    }

    uri += '/' + DeviceIdConfig + '/config';

    if (GetDeviceConfigName) {
      uri += '?name=' + GetDeviceConfigName;
    }

    api.get(uri);
  }

  // Get tags of the device
  function getDeviceTag(DeviceIdTag, GetDeviceTagName) {
    var uri = deviceUri;

    if (!DeviceIdTag) {
      return alert('DeviceId missing');
    }

    uri += '/' + DeviceIdTag + '/tag';

    if (GetDeviceTagName) {
      uri += '?name=' + GetDeviceTagName;
    }

    api.get(uri);
  }

  // Get ALL devices states
  function getDevicesStates() {
    var uri = deviceUri + '/states';
    api.get(uri);
  }

  function postDevices(PostDeviceId, PostDeviceType, PostDeviceManufacturer, PostDeviceVersion, PostDeviceProduct, PostDeviceProtocol, PostDeviceName, PostDeviceSN, PostDeviceLocationId) {
    if (!PostDeviceId ||
        !PostDeviceType ||
        !PostDeviceManufacturer ||
        !PostDeviceVersion ||
        !PostDeviceProduct ||
        !PostDeviceProtocol ||
        !PostDeviceName) {       
      return alert('Device details not complete');
    }

    var payload = [{
      'id': PostDeviceId,
      'manufacturer': PostDeviceManufacturer,
      'version': PostDeviceVersion,
      'product': PostDeviceProduct,
      'serialnumber': PostDeviceSN,
      'type': PostDeviceType,
      'config': [
        {
          'name': 'protocolid',
          'value': PostDeviceProtocol
        },
        {
          'name': 'name',
          'value': PostDeviceName
        }
      ]
    }];

    if (PostDeviceLocationId) {
      payload[0].Location = [{
        'value': '/location/' + PostDeviceLocationId
      }]
    }

    api.create(deviceUri, JSON.stringify(payload));
  }

  function postAnyDevices(PostDevicesPayload) {
    if (!PostDevicesPayload) {
      return alert('Device post paylod missing');
    }

    api.create(deviceUri, PostDevicesPayload);
  }

  function putDevices(PutDevicesPayload) {
    if (!PutDevicesPayload) {
      return alert('Device payload missing');
    }

    api.update(deviceUri, PutDevicesPayload);
  }

  function deleteDevice(DeleteDeviceId) {
    if (!DeleteDeviceId) {
      return alert('Device ID mandatory');
    }

    var payload = [DeleteDeviceId];
    api.remove(deviceUri, JSON.stringify(payload));
  }

  function updateApiCommands(bind) {
    bind({
      deviceStatesUri: deviceUri + '/states',
      deviceUri: deviceUri,
      deviceTagUri: deviceUri + '/{id}/tag',
      deviceConfigUri: deviceUri + '/{id}/config',
      deviceStateUri: deviceUri + '/{id}/state',
      deviceLinkedUri: deviceUri + '/{id}/devices',
      deviceCapabilityUri: deviceUri + '/{id}/capabilities'
    });
  }

  api.extend({
    deviceUri: deviceUri,
    getDevices: getDevices,
    getDeviceLinkedDevices: getDeviceLinkedDevices,
    getDeviceState: getDeviceState,
    getDeviceCapabilities: getDeviceCapabilities,
    getDeviceConfig: getDeviceConfig,
    getDeviceTag: getDeviceTag,
    getDevicesStates: getDevicesStates,
    postDevices: postDevices,
    postAnyDevices: postAnyDevices,
    putDevices: putDevices,
    deleteDevice: deleteDevice,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));