/**
 * Lists users in a G Suite domain.
 */
function listUsers() {
  var optionalArgs = {
    customer: 'my_customer',
    orderBy: 'email'
  };
  var response = AdminDirectory.Users.list(optionalArgs);
  var users = response.users;
  if (users && users.length > 0) {
    Logger.log('Users:');
    for (i = 0; i < users.length; i++) {
      var user = users[i];
      Logger.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } else {
    Logger.log('No users found.');
  }
}
function getExistingEmails(){
  var optionalArgs = {
    customer: 'my_customer',
    orderBy: 'email'
  };
  var response = AdminDirectory.Users.list(optionalArgs);
  var users = response.users;
  var returnEmails = [];
  if (users && users.length > 0) {
      for (i = 0; i < users.length; i++) {
        var user = users[i];
        returnEmails[i] = (user.primaryEmail).toLowerCase();
        //Logger.log('%s (%s)', user.primaryEmail, user.name.fullName);
      }
    } else {
    Logger.log('No users found.');
  }
  //Logger.log(returnEmails);
  return returnEmails;
}

/**
 * Adds a new user to the domain, including only the required information. For
 * the full list of user fields, see the API's reference documentation:
 * @see https://developers.google.com/admin-sdk/directory/v1/reference/users/insert
 */
function addUser(FN, LN, NE, RE, WSE, RP, MP, HA, PC) {
  var pass = Math.random().toString(36);
  var user = {
    primaryEmail: NE,
    name: {
      givenName: FN,
      familyName: LN
    },
    recoveryEmail: RE,
    emails: [{
      address: WSE,
      type: "work",
      customType: "",
      primary: false
    }],
    recoveryPhone: '+' + RP,
    phones: [{
      value: '+' + MP,
      type: 'mobile'
    }],
    addresses: [{
      streetAddress: HA,
      type: "home",
      locality: "",
      region: "",
      postalCode: PC,
      formatted: HA + ', ' + PC,
      primary: true
    }],
    // Generate a random password string.
    password: pass,
    changePasswordAtNextLogin: true
  };
  user = AdminDirectory.Users.insert(user);
  Logger.log('User %s created with ID %s.', user.primaryEmail, user.id);
  return pass;
}

/**
 * Creates an alias (nickname) for a user.
 */
function createAlias() {
  var userEmail = 'liz@example.com';
  var alias = {
    alias: 'chica@example.com'
  };
  alias = AdminDirectory.Users.Aliases.insert(alias, userEmail);
  Logger.log('Created alias %s for user %s.', alias.alias, userEmail);
}

