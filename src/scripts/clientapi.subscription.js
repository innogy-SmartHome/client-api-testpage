(function ($, api) {
  var subscriptionUri = api.data.url('subscription');

  function getSubscriptions(GetSubscriptionType, GetSubscriptionSubtype) {
    var uri = subscriptionUri;

    if (GetSubscriptionType) {
      uri += '/' + GetSubscriptionType;
    }

    if (GetSubscriptionSubtype) {
      uri += '/' + GetSubscriptionSubtype;
    }
    
    api.get(uri);
  }

  function postSubscription(PostSubscriptionPayload) {
    var uri = subscriptionUri;

    if (!PostSubscriptionPayload) {
      return alert('Subscription payload missing');
    }

    api.create(uri, PostSubscriptionPayload);
  }

  function deleteSubscription(DeleteSubscriptionType, DeleteSubscriptionSubtype) {
    var uri = subscriptionUri;

    if (DeleteSubscriptionType) {
      uri += '/' + DeleteSubscriptionType;
    }

    if (DeleteSubscriptionSubtype) {
      uri += '/' + DeleteSubscriptionSubtype;
    }

    api.remove(uri);
  }

  function updateApiCommands(bind) {
    bind({
      subscriptionUri: subscriptionUri
    });
  }

  api.extend({
    getSubscriptions: getSubscriptions,
    postSubscription: postSubscription,
    deleteSubscription: deleteSubscription,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));