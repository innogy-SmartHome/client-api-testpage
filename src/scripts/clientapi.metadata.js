(function ($, api) {
  var metadataUri = api.url('/desc');

  // Get capability by id
  function getMetadata(MetadataUrl, MetadataFormat) {
    if (!MetadataUrl) {
      return alert('Metadata URL missing');
    }

    var uri = metadataUri + MetadataUrl;
    api.get(uri, MetadataFormat);
  }

  function updateApiCommands(bind) {
    var text = [
      metadataUri,
      '/device/{deviceProductId}/{deviceVersion}',
      '/device/{deviceProductId}/{deviceVersion}/capability/{capabilityType}',
      '/device/{deviceProductId}/{deviceVersion}/action/{actionType}',
      '/device/{deviceProductId}/{deviceVersion}/event/{eventType}',
      '/device/{deviceProductId}/{deviceVersion}/capability/{capabilityType}/action/{actionType}',
      '/device/{deviceProductId}/{deviceVersion}/capability/{capabilityType}/event/{eventType}',
      '/device/{deviceProductId}/{deviceVersion}/capability/{capabilityType}/types/{type}',
      '/types/{type}',
      '/event/{eventType}',
      '/action/{actionType}',
      '/entity/{entityType}'
    ].join('\r\n');
    bind({
      metadataUri: text
    });
  }

  api.extend({
    getMetadata: getMetadata,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));