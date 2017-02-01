(function ($, api) {
  function getAvailableProducts(provisioned, isPremiumService, isService, productKind, extensionCulture) {
    var uri = api.product.url() + '/product';
    api.get(api.query(uri, {
      provisioned: provisioned,
      isPremiumService: isPremiumService,
      isService: isService,
      productKind: productKind,
      culture: extensionCulture
    }));
  }

  function getProducts(getProductType) {
    var uri = api.product.url('product', getProductType);
    api.get(uri);
  }

  function provisionProduct(addProductType) {
    var uri = api.product.url('product', 'add', addProductType);
    api.get(uri);
  }

  function updateProduct(updateProductType) {
    var uri = api.product.url('product', 'update', updateProductType);
    api.get(uri);
  }

  function activateProduct(activateProductType) {
    var uri = api.product.url('product', 'activate', activateProductType);
    api.get(uri);
  }

  function deactivateProduct(deactivateProductType) {
    var uri = api.product.url('product', 'deactivate', deactivateProductType);
    api.get(uri);
  }

  function removeProduct(removeProductType) {
    var uri = api.product.url('product', 'remove', removeProductType);
    api.get(uri);
  }
  
  function updateApiCommands(bind) {
    bind({
      productUri: api.product.url('product'),
      productAddUri: api.product.url('product', 'add'),
      productRemoveUri: api.product.url('product', 'remove'),
      productUpdateUri: api.product.url('product', 'update'),
      productActivateUri: api.product.url('product', 'activate'),
      productDeactivateUri: api.product.url('product', 'deactivate')
    });
  };

  api.extend({
    getAvailableProducts: getAvailableProducts,
    getProducts: getProducts,
    provisionProduct:provisionProduct,
    updateProduct: updateProduct,
    deactivateProduct: deactivateProduct,
    activateProduct: activateProduct,
    removeProduct: removeProduct,
    updateApiCommands: updateApiCommands
  });
}(jQuery, ClientApi));