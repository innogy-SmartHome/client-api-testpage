(function ($, api) {
  var imageUri = api.data.url('image');

  function getImages(GetImages_Camera, GetImages_CameraId, GetImages_Start, GetImages_End, GetImages_Page, GetImages_PageSize) {
    var uri = imageUri;

    api.get(api.query(uri, {
      camera: GetImages_Camera,
      cameraId: GetImages_CameraId,
      start: GetImages_Start,
      end: GetImages_End,
      page: GetImages_Page,
      pageSize: GetImages_PageSize
    }));
  }

  function getImageById(GetImageById_Id) {
    var uri = imageUri;

    if (GetImageById_Id) {
      uri += '/' + GetImageById_Id;
    }

    api.get(uri);
  }

  function deleteImages(DeleteImages_Camera, DeleteImages_CameraId, DeleteImages_Start, DeleteImages_End, DeleteImages_Page, DeleteImages_PageSize) {
    var uri = imageUri;

    api.remove(api.query(uri, {
      camera: DeleteImages_Camera,
      cameraId: DeleteImages_CameraId,
      start: DeleteImages_Start,
      end: DeleteImages_End,
      page: DeleteImages_Page,
      pageSize: DeleteImages_PageSize
    }), '');
  }

  function deleteImageById(DeleteImageById_Id) {
    var uri = imageUri;

    if (DeleteImageById_Id) {
      uri += '/' + DeleteImageById_Id;
    }

    api.remove(uri, '');
  }

  function getRawImages(GetRawImages_Camera, GetRawImages_CameraId, GetRawImages_Start, GetRawImages_End, GetRawImages_Page, GetRawImages_PageSize) {
    var uri = imageUri + '/raw';

    api.get(api.query(uri, {
      camera: GetRawImages_Camera,
      cameraId: GetRawImages_CameraId,
      start: GetRawImages_Start,
      end: GetRawImages_End,
      page: GetRawImages_Page,
      pageSize: GetRawImages_PageSize
    }));
  }

  function getRawImageById(GetRawImageById_Id) {
    var uri = imageUri;

    if (GetRawImageById_Id) {
      uri += '/' + GetRawImageById_Id;
    }

    uri += '/raw';
    api.get(uri);
  }

  function getThumbnails(GetThumbnails_Size, GetThumbnails_Camera, GetThumbnails_CameraId, GetThumbnails_Start, GetThumbnails_End, GetThumbnails_Page, GetThumbnails_PageSize) {
    var uri = imageUri + '/thumbnail';

    api.get(api.query(uri, {
      size: GetThumbnails_Size,
      camera: GetThumbnails_Camera,
      cameraId: GetThumbnails_CameraId,
      start: GetThumbnails_Start,
      end: GetThumbnails_End,
      page: GetThumbnails_Page,
      pageSize: GetThumbnails_PageSize
    }));
  }

  function getThumbnailById(GetThumbnailById_Id, GetThumbnailById_Size) {
    var uri = imageUri;

    if (GetThumbnailById_Id) {
      uri += '/' + GetThumbnailById_Id;
    }

    uri += '/thumbnail?size=' + GetThumbnailById_Size;
    api.get(uri);
  }

  function getImageMetadata(GetMetadata_Camera, GetMetadata_CameraId) {
    var uri = imageUri + '/metadata';

    api.get(api.query(uri, {
      camera: GetMetadata_Camera,
      cameraId: GetMetadata_CameraId
    }));
  }

  function showImages() {
    $('#output ul li > span:contains("thumbnail")').next().each(function () {
      var current = $(this);
      var thumbnail = current.text();
      thumbnail = thumbnail.substring(1, thumbnail.length - 1);
      current.html('<img alt="Embedded Image" src="data:image/png;base64,' + thumbnail + '">');
    });

    $('#output ul li > span:contains("raw")').next().each(function () {
      var current = $(this);
      var raw = current.text();
      raw = raw.substring(1, raw.length - 1);
      current.html('<img style="max-width:800px;" alt="Embedded Image" src="data:image/png;base64,' + raw + '">');
    });
  }

  function updateApiCommands(bind) {
    bind({
      imageIdUri: imageUri + '/{id}',
      imageRawIdUri: imageUri + '/{id}/raw',
      imagesUri: imageUri + '?camera={cameraName}&cameraId={cameraId}&start={start}&end={end}&page={page}&pageSize={pageSize}',
      imagesDeleteUri: imageUri + '?camera={cameraName}&cameraId={cameraId}&start={start}&end={end}',
      imagesRawUri: imageUri + '/raw?camera={cameraName}&cameraId={cameraId}&start={start}&end={end}&page={page}&pageSize={pageSize}',
      imageThumbnailsUri: imageUri + '/thumbnail?camera={cameraName}&cameraId={cameraId}&size={size}&start={start}&end={end}&page={page}&pageSize={pageSize}',
      imageThumbnailUri: imageUri + '/{id}/thumbnail&size={size}',
      imageMetadataUri: imageUri + '/metadata?camera={cameraName}&cameraId={cameraId}'
    });
  }

  api.extend({
    getImages: getImages,
    getImageById: getImageById,
    deleteImages: deleteImages,
    deleteImageById: deleteImageById,
    showImages: showImages,
    getRawImages: getRawImages,
    getRawImageById: getRawImageById,
    getThumbnails: getThumbnails,
    getThumbnailById: getThumbnailById,
    getImageMetadata: getImageMetadata,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));
