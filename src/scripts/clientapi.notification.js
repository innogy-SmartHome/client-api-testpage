(function ($, api) {
  var notificationUri = api.url('subscription');

  // Get the notification list
  function getAllNotifications(GetNotificationChannelType) {
    var uri = notificationUri;

    if (GetNotificationChannelType) {
      uri += '?channel=' + GetNotificationChannelType;
    }

    api.get(uri);
  }

  //Create one or many notifications
  function postNotifications(PostNotificationChannelType, PostNotificationChannelPropertyPlatform, PostNotificationChannelPropertyDeviceId, PostNotificationChannelPropertyToken, PostNotificationProductIdFilter, PostNotificationTypeFilter, PostNotificationClassFilter) {
    var channelProperties = [];
    var filters = [];
    if (!PostNotificationChannelType) {
      return alert('Channel type mandatory!');
    } else {
      var channelType = PostNotificationChannelType;

      if (channelType == 'Push') {
        if (!PostNotificationChannelPropertyPlatform ||
            !PostNotificationChannelPropertyDeviceId ||
            !PostNotificationChannelPropertyToken) {
          return alert('Platform/DeviceId/Token are mandatory for Push notification subscription!');
        }

        channelProperties.push({
          'name': 'platform',
          'value': PostNotificationChannelPropertyPlatform
        });

        channelProperties.push({
          'name': 'deviceId',
          'value': PostNotificationChannelPropertyDeviceId
        });

        channelProperties.push({
          'name': 'token',
          'value': PostNotificationChannelPropertyToken
        });
      }

      if (PostNotificationProductIdFilter) {
        filters.push({
          'name': 'ProductId',
          'value': PostNotificationProductIdFilter
        })
      }

      if (PostNotificationTypeFilter) {
        filters.push({
          'name': 'Type',
          'value': PostNotificationTypeFilter
        })
      }

      if (PostNotificationClassFilter) {
        filters.push({
          'name': 'Class',
          'value': PostNotificationClassFilter
        })
      }
    }
    var payload = [{
      'channel': PostNotificationChannelType,
      'ChannelProperties': channelProperties,
      'Filters': filters
    }];

    api.create(notificationUri, JSON.stringify(payload));
  }

  function postAnyNotification(PostNotificationPayload) {
    if (!PostNotificationPayload) {
      return alert('Subscription payload missing!');
    }

    api.create(notificationUri, PostNotificationPayload);
  }

  //Updates a notification
  function putAnyNotification(PutNotificationPayload) {
    if (!PutNotificationPayload) {
      return alert('Subscription payload missing!');
    }

    api.update(notificationUri, PutNotificationPayload);
  }

  //Deletes a notification
  function deleteNotification(DeleteNotificationId) {
    if (!DeleteNotificationId) {
      return alert('Notification ID mandatory');
    }

    var payload = [DeleteNotificationId];
    api.remove(notificationUri, JSON.stringify(payload));
  }

  function updateApiCommands(bind) {
    bind({
      notificationUri: notificationUri,
      notificationIdUri: notificationUri + '/{id}'
    });

    $('select[name=PostNotificationChannelType]').change(function () {
      bind({
        isPush: $(this).val() === 'Push'
      });
    });
  }

  api.extend({
    updateApiCommands: updateApiCommands,
    getAllNotifications: getAllNotifications,
    postNotifications: postNotifications,
    postAnyNotification: postAnyNotification,
    putAnyNotification: putAnyNotification,
    deleteNotification: deleteNotification
  });
}(jQuery, ClientApi));