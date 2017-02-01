(function ($, api) {
  var friendUri = api.account.url('friend');

  function getFriends() {
    var uri = friendUri;
    api.get(uri);
  }

  function deleteFriend(DeleteFriend) {
    var uri = friendUri;

    if (!DeleteFriend) {
      return alert("Account name can't be null!");
    }

    uri += '/' + DeleteFriend;
    api.remove(uri);
  }

  function createFriend(CreateFriend_AccountName, CreateFriend_Permissions, CreateFriend_FriendlyName) {
    var uri = friendUri + '?redirecturl=' + encodeURIComponent('https://localhost');
    var payload = {
      'accountName': CreateFriend_AccountName,
      'config': [
        {
          'name': 'Permission',
          'value': CreateFriend_Permissions || null
        },
        {
          'name': 'Name',
          'value': CreateFriend_FriendlyName || null
        }
      ]
    };

    api.create(uri, JSON.stringify(payload));
  }

  function updateFriend(UpdateFriend_AccountName, UpdateFriend_Permissions, UpdateFriend_FriendlyName) {
    var uri = friendUri;
    var payload = {
      'accountName': UpdateFriend_AccountName,
      'config': [
        {
          'name': 'Permission',
          'value': UpdateFriend_Permissions || null
        },
        {
          'name': 'Name',
          'value': UpdateFriend_FriendlyName || null
        }
      ]
    };

    api.update(uri, JSON.stringify(payload));
  }

  function updateApiCommands(bind) {
    bind({
      friendUri: friendUri,
      friendDeleteUri: api.account.url('friend', '{accountName}')
    });
  }

  api.extend({
    getFriends: getFriends,
    deleteFriend: deleteFriend,
    createFriend: createFriend,
    updateFriend: updateFriend,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));
