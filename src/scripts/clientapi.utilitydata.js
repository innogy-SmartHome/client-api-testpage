(function ($, api) {
  var waterUri = api.data.url('utility', 'water');
  var storageUri = api.data.url('utility', 'storage');
  var powerUri = api.data.url('utility', 'power');
  var energyUri = api.data.url('utility', 'energy');

  function getEnergyData(GetUtilityTypeEnergy, GetUtilityMeterIdEnergy, GetUtilityAggregationEnergy, GetUtilityStartEnergy, GetUtilityEndEnergy, GetUtilityPageEnergy, GetUtilityPageSizeEnergy) {
    var uri = energyUri;

    if (GetUtilityTypeEnergy) {
      uri += '/' + GetUtilityTypeEnergy;
    }

    api.get(api.query(uri, {
      meterid: GetUtilityMeterIdEnergy,
      aggregation: GetUtilityAggregationEnergy,
      start: GetUtilityStartEnergy,
      end: GetUtilityEndEnergy,
      page: GetUtilityPageEnergy,
      pagesize: GetUtilityPageSizeEnergy
    }));
  }

  function getPowerData(GetUtilityTypePower, GetUtilityMeterIdPower, GetUtilityStartPower, GetUtilityEndPower, GetUtilityPagePower, GetUtilityPageSizePower) {
    var uri = powerUri;

    if (GetUtilityTypePower) {
      uri += '/' + GetUtilityTypePower;
    }

    api.get(api.query(uri, {
      meterid: GetUtilityMeterIdPower,
      start: GetUtilityStartPower,
      end: GetUtilityEndPower,
      page: GetUtilityPagePower,
      pagesize: GetUtilityPageSizePower
    }));
  }

  function getStorageData(GetUtilityMeterIdStorage, GetUtilityAggregationStorage, GetUtilityStartStorage, GetUtilityEndStorage, GetUtilityPageStorage, GetUtilityPageSizeStorage) {
    var uri = storageUri;

    api.get(api.query(uri, {
      meterid: GetUtilityMeterIdStorage,
      aggregation: GetUtilityAggregationStorage,
      start: GetUtilityStartStorage,
      end: GetUtilityEndStorage,
      page: GetUtilityPageStorage,
      pagesize: GetUtilityPageSizeStorage
    }));
  }

  function getWaterData(GetUtilitySerialNumberWater, GetUtilityAggregationWater, GetUtilityStartWater, GetUtilityEndWater, GetUtilityPageWater, GetUtilityPageSizeWater) {
    var uri = waterUri;

    api.get(api.query(uri, {
      serialnumber: GetUtilitySerialNumberWater,
      aggregation: GetUtilityAggregationWater,
      start: GetUtilityStartWater,
      end: GetUtilityEndWater,
      page: GetUtilityPageWater,
      pagesize: GetUtilityPageSizeWater
    }));
  }

  function updateApiCommands(bind) {
    bind({
      energyUri: energyUri,
      powerUri: powerUri,
      storageUri: storageUri,
      waterUri: waterUri
    });
  }

  api.extend({
    getEnergyData: getEnergyData,
    getPowerData: getPowerData,
    getStorageData: getStorageData,
    getWaterData: getWaterData,
    updateApiCommands: updateApiCommands,
  });
}(jQuery, ClientApi));