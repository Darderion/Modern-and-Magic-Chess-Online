# Использование webSoket-ов:
- Открываем на клиенте веб-сокет по адресу ws://localhost:5000/home
- Список возможных запросов к серверу и ответов от него (на клиенте это 'message' event у сокета): запрос -> ответ сервера
    1) При открытии сокета: {"type":"connection","data":{"message":"Authorized as guest"},"code":200}
    2) Подписаться на обновления открытых лобби: {"type":"allLobbies"} -> {"type":"allLobbies","data":[{"lobbyID":0,"lobbyName":"MyName","userName":"Mike"}],"code":200} 
    3) Отписаться от открытых лобби: {"type":"unsubAllLobbies"} -> {"type":"unsubAllLobbies","code":200} 
    4) Авторизоваться под user-ом с таким id в БД: {"type":"auth", "id":"1"} - !!! только для тестирования !!! webSocket умеет подцеплять ваш acessToken из кукисов, полученный при авторизации.
    5) Открыть лобби: {"type":"openLobby", "data":{"lobbyName":"MyName"}} -> {"type":"openLobby","data":{"message":"Not authorized user"},"code":400}, {"type":"openLobby","data":{"message":"This user is in game"}, {"type":"openLobby","data":{"lobbyID":13,"lobbyName":"MyName"},"code":200}
    6) Закрыть лобби: {"type":"closeLobby"} -> {"type":"closeLobby","data":"Lobby closed","code":200}, {"type":"closeLobby","data":{"message":"No open lobby"},"code":400}
    7) Присоединиться к лобби с таким id: {"type":"connectToLobby","data":{"message":"Wrond lobbyID"},"code":400}, {"type":"createGame","data":{"gameID":1,"pgn":"[White \"Geo\"]\n[Black \"Mike\"]\n","isFirst":true,"styles":{}},"code":200} - стили тут появяться позже
    8) Сделать ход: {"type":"myStep","data":{"move":{"from":"e2","to":"e4"}}} -> {"type":"myStep","data":{"message":"This user isn't in game or data wasn't sent to server"},"code":400}, {"type":"myStep","data":{"message":"Wrong step or not your step"},"code":400}, {"type":"myStep","data":{"pgn":"[White \"userID1"]\n[Black \"userID2"]\n\n1. e4 e5"},"code":200}
    9) У другого игрока при ходе первого: {"type":"otherStep","data":{"pgn":"[White \"userID1"]\n[Black \"userID2"]\n\n1. e4 e5"},"code":200}
    10) При выходе одного из игроков второму придёт: {"type":"closeGame","data":{"message":"Other user have left"},"code":200}
    11) Закрытие игры: {"type":"closeGame"} -> {"type":"closeGame","data":{"message":"Game was closed"},"code":200}, {"type":"closeGame","data":{"message":"This user isn't in game or data wasn't sent to server"},"code":400}