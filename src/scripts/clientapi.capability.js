(function ($, api) {
  var capabilityUri = api.url('capability');

  // Get capability by id
  function getCapability(GetCapabilityId, GetCapabilityTKey, GetCapabilityTValue) {
    var uri = capabilityUri;

    if (GetCapabilityId) {
      uri += '/' + GetCapabilityId;
    }

    if (GetCapabilityTKey && GetCapabilityTValue) {
      uri += '?tkey=' + GetCapabilityTKey + '&tval=' + GetCapabilityTValue;
    }

    api.get(uri);
  }

  // Get capability state
  function getCapabilityConfig(GetCapabilityConfigId, GetCapabilityConfigName) {
    var uri = capabilityUri;

    if (!GetCapabilityConfigId) {
      return alert('CapabilityId missing');
    }

    uri += '/' + GetCapabilityConfigId + '/config';

    if (GetCapabilityConfigName) {
      uri += '?name=' + GetCapabilityConfigName;
    }

    api.get(uri);
  }

  // Get capability state
  function getCapabilityState(GetCapabilityStateId, GetCapabilityStateName) {
    var uri = capabilityUri;

    if (!GetCapabilityStateId) {
      return alert('CapabilityId missing');
    }

    uri += '/' + GetCapabilityStateId + '/state';

    if (GetCapabilityStateName) {
      uri += '?name=' + GetCapabilityStateName;
    }

    api.get(uri);
  }

  // Get capability tag
  function getCapabilityTag(GetCapabilityTagId, GetCapabilityTagName) {
    var uri = capabilityUri;

    if (!GetCapabilityTagId) {
      return alert('CapabilityId missing');
    }

    uri += '/' + GetCapabilityTagId + '/tag';

    if (GetCapabilityTagName) {
      uri += '?name=' + GetCapabilityTagName;
    }

    api.get(uri);
  }

  // Get capability tag
  function getAllCapabilityStates() {
    var uri = capabilityUri + '/states';
    api.get(uri);
  }

  function putCapabilities(PutCapabilitiesPayload) {
    if (!PutCapabilitiesPayload) {
      return alert('Capabilities payload missing');
    }

    api.update(capabilityUri, PutCapabilitiesPayload);
  }

  function updateApiCommands(bind) {
    bind({
      capabilityUri: capabilityUri,
      capabilityIdUri: capabilityUri + '/{id}',
      capabilityConfigUri: capabilityUri + '/{id}/config?name={config_name}',
      capabilityStateUri: capabilityUri + '/{id}/state?name={state_name}',
      capabilityStatesUri: capabilityUri + '/states',
      capabilityTagUri: capabilityUri + '/{id}/tag?name={tag_name}'
    });
  }

  api.extend({
    getCapability: getCapability,
    getCapabilityConfig: getCapabilityConfig,
    getCapabilityState: getCapabilityState,
    getCapabilityTag: getCapabilityTag,
    getAllCapabilityStates: getAllCapabilityStates,
    putCapabilities: putCapabilities,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));