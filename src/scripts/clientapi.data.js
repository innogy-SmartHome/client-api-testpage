(function ($, api) {
  var deviceDataUri = api.data.url('device');
  
  function getDeviceData(GetDeviceDataId, GetDeviceDataActivity, GetDeviceDataStart, GetDeviceDataEnd, GetDeviceDataPage, GetDeviceDataPageSize) {
    var uri = deviceDataUri;

    if (GetDeviceDataId) {
      uri += '/' + GetDeviceDataId;
    }

    api.get(api.query(uri, {
      activity: GetDeviceDataActivity,
      start: GetDeviceDataStart,
      end: GetDeviceDataEnd,
      page: GetDeviceDataPage,
      pagesize: GetDeviceDataPageSize
    }));
  }

  function deleteDeviceData() {
    //intentionally left blank
  }

  function updateApiCommands(bind) {
    bind({
      deviceDataUri: deviceDataUri
    });
  }

  api.extend({
    getDeviceData: getDeviceData,
    deleteDeviceData: deleteDeviceData,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));