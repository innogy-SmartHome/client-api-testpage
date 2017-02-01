(function ($, api) {
  var locationUri = api.url('location');

  // Get the location list
  function getAllLocations() {
    var uri = locationUri;
    api.get(uri);
  }

  // Get the location for id
  function getLocation(LocationId) {
    var uri = locationUri;

    if (LocationId) {
      uri += '/' + LocationId;
    }

    api.get(uri);
  }

  function postLocation(PostLocationId, PostLocationConfigName) {
    if (!PostLocationId ||
        !PostLocationConfigName ||
        !PostLocationConfigType ||
        !PostLocationTagName ||
        !PostLocationTagValue) {
      return alert('Location details not complete');
    }

    var payload = [{
      'id': PostLocationId,
      'Config': [
        {
          'name': 'Name',
          'value': PostLocationConfigName
        },
        {
          'name': 'Type',
          'value': PostLocationConfigType
        }
      ],
      'Tags': [{
        'name':  PostLocationTagName,
        'value': PostLocationTagValue
      }]
    }];

    api.create(locationUri, JSON.stringify(payload));
  }

  function deleteLocation(DeleteLocationId) {
    if (!DeleteLocationId) {
      return alert('Location ID mandatory');
    }

    var payload = [DeleteLocationId];
    api.remove(locationUri, JSON.stringify(payload));
  }

  function updateApiCommands(bind) {
    bind({
      locationUri: locationUri,
      locationIdUri: locationUri + '/{id}'
    });
  }

  api.extend({
    getAllLocations: getAllLocations,
    getLocation: getLocation,
    postLocation: postLocation,
    deleteLocation: deleteLocation,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));