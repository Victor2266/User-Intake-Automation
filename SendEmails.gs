function DraftSetUpEmail(recipient, newEmail, password) {
  var companyLogoUrl = "URL of Company LOGO";

  var companyLogoBlob = UrlFetchApp
                          .fetch(companyLogoUrl)
                          .getBlob()
                          .setName("companyLogoBlob");



  MailApp.sendEmail({
    to: recipient,
    subject: "How to set up your COMPANY NAME Email Account",
    htmlBody: "<center><img src='cid:companyLogo'></center> <hr>" +
              "<h1>Welcome to COMPANY NAME </h1>" +
              "Login to www.Gmail.com with your new email: " + newEmail + '<br>'+
              'This is the inital password: ' + password + "<br>"+
              "It should prompt you to reset your password after you sign-in.<br><br>"+
              "Stay tuned for additional onboarding information.",
    inlineImages:
      {
        companyLogo: companyLogoBlob // add comma if you add more images
      }
  });

}
