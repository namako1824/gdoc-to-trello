function onFormSubmit(e) {
  Logger.log(e);
  var scriptProperty = PropertiesService.getScriptProperties();

  const boardId = scriptProperty.getProperty("BOARD_ID");  
  const listId　= scriptProperty.getProperty("LIST_ID");
  
  var cardName = "イベント参加者補助申請";
  var mail = e.namedValues["メールアドレス"].toString();
  
  var description = "メールアドレス：" + mail;
  
  createCard(boardId, listId, cardName, description);
}

function getBoard() {
  var scriptProperty = PropertiesService.getScriptProperties();
  
  const trelloKey = scriptProperty.getProperty("TRELLO_KEY");
  const trelloToken = scriptProperty.getProperty("TRELLO_TOKEN");  
  const userName = scriptProperty.getProperty("USER_ID");
 
  var url = 'https://trello.com/1/members/' + userName + '/boards?key=' + trelloKey + '&token=' + trelloToken + '&fields=name';
  res = UrlFetchApp.fetch(url, {'method':'get'});
  Logger.log(res);
}


function createCard(boardId, listId, cardName, description) {
  var scriptProperty = PropertiesService.getScriptProperties();
  
  const trelloKey = scriptProperty.getProperty("TRELLO_KEY");
  const trelloToken = scriptProperty.getProperty("TRELLO_TOKEN");
 
  var URL = 'https://api.trello.com/1/cards/';
 
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  
  var payload =
      {'key':trelloKey,
       'token':trelloToken,
       'idList' : listId,
       'name': cardName,
       'due': dueDate.toString(),
       'desc': description};
  
  Logger.log(payload);
  
  var option =
      {'method':'POST',
       'payload':payload};
    
  UrlFetchApp.fetch(URL,option);
}


function getListId() {
  var scriptProperty = PropertiesService.getScriptProperties();
  
  const trelloKey = scriptProperty.getProperty("TRELLO_KEY");
  const trelloToken = scriptProperty.getProperty("TRELLO_TOKEN");
  const boardId = scriptProperty.getProperty("BOARD_ID");

  var url = "https://trello.com/1/boards/" + boardId + "/lists?key=" + trelloKey + "&token=" + trelloToken + "&fields=name";
  res = UrlFetchApp.fetch(url, {'method':'get'});
  Logger.log(res);
}

function getProperties() {
  var userProperty = PropertiesService.getUserProperties();
  var scriptProperty = PropertiesService.getScriptProperties();
  var trelloKey = scriptProperty.getProperty("TRELLO_KEY");
  Logger.log(userProperty.getProperties());
  Logger.log(scriptProperty.getProperties());
  Logger.log(trelloKey);

}

/*
# 固定の秘匿情報。スクリプトごとに一度だけ実行する
function setProperties() {
  var scriptProperty = PropertiesService.getScriptProperties();
  scriptProperty.setProperty("TRELLO_KEY", "");
  scriptProperty.setProperty("TRELLO_TOKEN", "");
  scriptProperty.setProperty("BOARD_ID", "");
  scriptProperty.setProperty("LIST_ID", "");
  scriptProperty.setProperty("USER_ID", "");

  Logger.log(scriptProperty.getProperties());

}
*/
