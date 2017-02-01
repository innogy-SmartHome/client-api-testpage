(function ($, api) {
  var interactionUri = api.url('interaction');

  function getInteraction(InteractionId) {
    var uri = interactionUri;

    if (InteractionId) {
      uri += '/' + InteractionId;
    }

    api.get(uri);
  }

  function deleteInteraction(DeleteInteractionId) {
    if (!DeleteInteractionId) {
      return alert('Interaction ID mandatory');
    }

    var payload = [DeleteInteractionId];
    api.remove(interactionUri, JSON.stringify(payload));
  }

  function createOrUpdateInteraction(payload, request) {
    if (!payload) {
      return alert('Interaction payload missing');
    }

    request(interactionUri, payload);
  }

  function createInteraction(InteractionPayload) {
    createOrUpdateInteraction(InteractionPayload, api.create);
  }

  function updateInteraction(InteractionPayload) {
    createOrUpdateInteraction(InteractionPayload, api.update);
  }

  function updateApiCommands(bind) {
    bind({
      interactionUri: interactionUri,
      interactionIdUri: interactionUri + '/{id}'
    });
  }

  api.extend({
    getInteraction: getInteraction,
    deleteInteraction: deleteInteraction,
    createInteraction: createInteraction,
    updateInteraction: updateInteraction,
    updateApiCommands: updateApiCommands,
  });
}(jQuery, ClientApi));