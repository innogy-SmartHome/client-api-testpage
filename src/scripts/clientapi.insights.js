(function ($, api) {
  var insightsUri = api.data.url('insights');

  function getAvailableInsights() {
    var uri = insightsUri;
    api.get(uri);
  }

  function getInsightResults(InsightsResultType) {
    var uri = insightsUri;

    if (InsightsResultType) {
      uri += '/' + InsightsResultType;
    }

    uri += '/result';
    api.get(uri);
  }

  function getInsightSubscriptions() {
    var uri = insightsUri + '/subscription';
    api.get(uri);
  }

  function postInsightSubscription(PostInsightSubscriptionPayload) {
    var uri = insightsUri;
    uri += '/subscription';

    if (!PostInsightSubscriptionPayload) {
      return alert('Subscription payload missing');
    }

    api.create(uri, PostInsightSubscriptionPayload);
  }

  function deleteInsightSubscription(DeleteInsightSubscriptionPayload) {
    var uri = insightsUri + '/subscription';

    if (!DeleteInsightSubscriptionPayload) {
      return alert('Delete InsightSubscription payload missing');
    }

    api.remove(uri, DeleteInsightSubscriptionPayload);
  }

  function putInsightSubscription(PutInsightSubscriptionPayload) {
    var uri = insightsUri + '/subscription';

    if (!PutInsightSubscriptionPayload) {
      return alert('Put InsightSubscription payload missing');
    }

    api.update(uri, PutInsightSubscriptionPayload);
  }

  function updateApiCommands(bind) {
    bind({
      insightsUri: insightsUri,
      insightSubscriptionUri: insightsUri + '/subscription',
      insightsResultUri: insightsUri + '/INSIGHT_RESULT/result'
    });
  }

  api.extend({
    getAvailableInsights: getAvailableInsights,
    getInsightResults: getInsightResults,
    getInsightSubscriptions: getInsightSubscriptions,
    postInsightSubscription: postInsightSubscription,
    deleteInsightSubscription: deleteInsightSubscription,
    putInsightSubscription: putInsightSubscription,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi || {}));