# Authentication and authorization

1. Регистрируемся на `/register`, в тело передаем nick и password
2. Логинимся на `/login`, в тело передаем nick и password
3. Получаем accessToken (и refresh в secure cookies на стороне сервера), который прикладываем в header Authorization с
   типом Bearer к запросам требующим авторизации и аутентификации
4. При истечении времени жизни токена отправляем запрос на `/refresh` и получаем новый access и refresh token
5. Если новый токен не выдается (так как истек refresh token) отправляем запрос на `/logout` и очищаем хранилище с
   access token на стороне клиента
6. Просим юзверя перелогиниться.

**Браво! Вы великолепны!**

[И зачем оно все надо?](https://habr.com/ru/company/Voximplant/blog/323160/)