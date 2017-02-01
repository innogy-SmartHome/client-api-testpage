(function ($, api) {
  var messageUri = api.url('message');

  // Get the location for id
  function getMessages(GetMessageId, GetMessageTKey, GetMessageTValue) {
    var uri = messageUri;

    if (GetMessageId) {
      uri += '/' + GetMessageId;
    }

    if (GetMessageTKey && GetMessageTValue) {
      uri += '?tkey=' + GetMessageTKey + '&tval=' + GetMessageTValue;
    }

    api.get(uri);
  }

  function deleteMessages(DeleteMessageId) {
    if (!DeleteMessageId) {
      return alert('Message ID mandatory');
    }

    var payload = [DeleteMessageId];
    api.remove(messageUri, JSON.stringify(payload));
  }

  function updateApiCommands(bind) {
    bind({
      messageUri: messageUri,
      messageIdUri: messageUri + '/{id}'
    });
  }

  api.extend({
    getMessages: getMessages,
    deleteMessages: deleteMessages,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));