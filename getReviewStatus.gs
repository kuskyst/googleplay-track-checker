const SCOPE = 'https://www.googleapis.com/auth/androidpublisher';

function getReviewStatus() {
  const packageName = 'jp.co.example.app';
  const editId = '01234567';
  const url = 'https://www.googleapis.com/androidpublisher/v3/applications/' + packageName + '/edits/' + editId + '/tracks';

  const serviceAccount = {
    "client_email": "EMAIL@EMAIL;",
    "client_id": "123456789",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "private_key": "-----BEGIN PRIVATE KEY-----\naaabbbccc\n-----END PRIVATE KEY-----\n",
  };


  // OAuth2サービスのインスタンスを取得
  const oauth2 = OAuth2.createService('checkTracks')
    .setClientId(serviceAccount.client_id)
    .setScope(SCOPE)
    .setAuthorizationBaseUrl(serviceAccount.auth_uri)
    .setTokenUrl(serviceAccount.token_uri)
    .setPrivateKey(serviceAccount.private_key)
    .setIssuer(serviceAccount.client_email)
    .setPropertyStore(PropertiesService.getUserProperties());

  const options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + oauth2.getAccessToken() },
    contentType: 'application/json',
  };

  try {
    // Google Play Developer API を呼び出して審査状況を取得
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    console.log('バージョン:' + data.tracks[0].releases[0].name);
    console.log('審査状況:' + data.tracks[0].releases[0].status);

    // 例えば、スプレッドシートに書き込むなどの操作を行うことができます

  } catch (e) {
    console.log('エラー:', e.toString());
  }
}
