# Mongo-Express-React-Node PassportJS Authentication Local, Google and VKontakte strategy authorization Skeleton

Данный репозиторий содержит пример реализации аутентификации с помощью `passportjs express`.

Для запуска проекта локально 
- установите БД mongoDB в систему
    https://www.mongodb.com/docs/upcoming/administration/install-community/

- установите зависимости командой `npm run instdepend`
- создайте файл .env на основе env.example
- в панеле разработчика  vk и google создайте 
    googleClientID, googleClientSecret, vkClientID, vkClientSecret
    и пропишите их в .env файд
    
    - https://vk.com/apps?act=manage
    - https://console.cloud.google.com/apis/credentials
    
- укажите в панели разработчика vk и google сервисов соответственные callbackURL 
- запустите проект коммандой `npm run prod` проект скомпилируется и запуститься.
- в браузере перейдите на адрес `localhost:3100`
- `npm run dev` запускает проект в режиме разработки

- при заливке проекта на сервер поменяйте callbackUrl в панелях разработчика. 
    Также смените адрес в файле \client\src\api\urls.js

#MERN #nodejs #React #passportJs
