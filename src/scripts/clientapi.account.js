(function ($, api) {
  function getAccount () {
    var uri = api.account.url('user');
    api.get(uri);
  }

  function deleteAccount() {
    var uri = api.account.url('user');
    api.remove(uri, '');
  }

  function putAccount(PutUserAccountDataTitle, PutUserAccountDataGender, PutUserAccountDataFname, PutUserAccountDataLname, PutUserAccountDataStreet, PutUserAccountDataNumber, PutUserAccountDataPCode, PutUserAccountDataLocation, PutUserAccountDataTelNo, PutUserAccountDataMTelNo, PutUserAccountDataCulture, PutUserAccountDataMEmail, PutUserAccountDataCCode) {
    var uri = api.account.url('user');
    var payload = {
      data: [
        {
          'name': 'Title',
          'value': PutUserAccountDataTitle
        },
        {
          'name': 'Gender',
          'value': PutUserAccountDataGender
        },
        {
          'name': 'FirstName',
          'value': PutUserAccountDataFname
        },
        {
          'name': 'LastName',
          'value': PutUserAccountDataLname
        },
        {
          'name': 'Street',
          'value': PutUserAccountDataStreet
        },
        {
          'name': 'Number',
          'value': PutUserAccountDataNumber
        },
        {
          'name': 'PostalCode',
          'value': PutUserAccountDataPCode
        },
        {
          'name': 'Location',
          'value': PutUserAccountDataLocation
        },
        {
          'name': 'TelephoneNumber',
          'value': PutUserAccountDataTelNo
        },
        {
          'name': 'MobileTelephoneNumber',
          'value': PutUserAccountDataMTelNo
        },
        {
          'name': 'Culture',
          'value': PutUserAccountDataCulture
        },
        {
          'name': 'EmailAddress',
          'value': PutUserAccountDataMEmail
        },
        {
          'name': 'CountryCode',
          'value': PutUserAccountDataCCode
        }
      ]
    };

    api.update(uri, JSON.stringify(payload));
  }

  function getRelationship() {
    var uri = api.account.url('relationship');
    api.get(uri);
  }

  function deleteRelationship() {
    var uri = api.account.url('relationship');
    api.remove(uri, '');
  }

  function changePassword(ChangePassCurrPass, ChangePassNewPass, ChangePassLang, ChangePassClientId, ChangePassRedUrl) {
    var uri = api.account.url('user', 'password'); 
    var payload = {
      'CurrentPassword': ChangePassCurrPass,
      'NewPassword': ChangePassNewPass,
      'Language': ChangePassLang,
      'ClientRequest': {
        'ClientId': ChangePassClientId,
        'RedirectUrl': ChangePassRedUrl
      }
    };
    api.create(uri, JSON.stringify(payload));
  }

  function postRelationship(PostActionValue, ShcSerialNo, ShcName, PinCode, RestoreConfig) {
    var uri = api.account.url('relationship');
    var value = PostActionValue;

    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }

    var payload = {
      'accountname': '',
      'serialnumber': ShcSerialNo,
      'desc': '',
      'config': [
        {
          'name': 'Name',
          'value': ShcName
        },
        {
          'name': 'Code',
          'value': PinCode
        },
        {
            'name': 'RestoreConfig',
            'value': RestoreConfig === 'true'
        }
      ]
    };

    api.create(uri, JSON.stringify(payload));
  }

  function postConfigRelationship(RelationshipNewName) {
    var uri = api.account.url('relationship', 'config');
    var payload = {
      'name': 'Name',
      'value': RelationshipNewName
    };

    api.create(uri, JSON.stringify(payload));
  }

  function sendResetPasswordLink(SendResetPasswordLinkEmail, SendResetPasswordLinkLanguage, SendResetPassClientId, SendResetPassRedUrl) {
    var uri = api.account.url('user', 'password', 'forgot');
    var payload = {
      'Email': SendResetPasswordLinkEmail,
      'Language': SendResetPasswordLinkLanguage,
      'ClientRequest': {
        'ClientId': SendResetPassClientId,
        'RedirectUrl': SendResetPassRedUrl
      },
      '__RequestVerificationToken': 'dummy'
    }

    api.create(uri, JSON.stringify(payload));
  }

  function removeStoreAccount() {
    var uri = api.account.url('user', 'storeaccountname');
    api.remove(uri, '');
  }

  function updateApiCommands(bind) {
    bind({
      userUri: api.account.url('user'),
      relationshipUri: api.account.url('relationship'),
      relationshipConfigUri: api.account.url('relationship', 'config'),
      changePasswordUri: api.account.url('user', 'password'),
      resetPasswordUri: api.account.url('user', 'password', 'forgot'),
      storeAccountUri: api.account.url('user', 'storeaccountname'),
      tacUri: api.account.url('authorize', 'TaC')
    });
  }

  api.extend({
    getAccount: getAccount,
    putAccount: putAccount,
    deleteAccount: deleteAccount,
    changePassword: changePassword,    
    getRelationship: getRelationship,
    deleteRelationship: deleteRelationship,
    postConfigRelationship: postConfigRelationship,
    postRelationship: postRelationship,
    updateApiCommands: updateApiCommands,
    sendResetPasswordLink: sendResetPasswordLink,
    removeStoreAccount: removeStoreAccount        
  });
}(jQuery, ClientApi));