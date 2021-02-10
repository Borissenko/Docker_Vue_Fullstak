# Стек проекта
Docker
nginx
express
mongoDb
mongoose
session
multer.GridFsStorage - db for files
multer.diskStorage - db for files too, second variant.

Vue-CLI_project (vuex, routing as well)
  grid, flexbox
  SCSS (class inheritance, variables, mixins, functions)
  TypeScript
  validation
  authorization
  jwt token
  localStorage
  Jest


# Перед запуском
Если проект уже ранее билдился (создавались контейнеры), но из другого места на компьютере,
то необходимо предварительно эти контейнеры удалить by

>sudo docker ps -a              //Все контейнеры в системе (включая остановленные контейнеры)
>sudo docker stop $(docker ps -a -q)
>sudo docker rm $(docker ps -a -q)



# Запуск проекта для DEV-разработки.
На компьютере должен быть установлен docker и docker-compose.

В терминале, открытом в корне проекта, необходимо набрать
>sudo docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build

В броузере проект открывается на localhost:80 или localhost.


# Запуск проекта для PRODUCTION_mode.
На компьютере должен быть установлен docker и docker-compose.

В терминале, открытом в корне проекта, необходимо набрать
>sudo docker-compose up --build

В броузере проект открывается на localhost:80 или localhost.


# Остановка докера
>Ctrl + C

# Удаление всех образов и контейнеров.
>sudo docker-compose down   //Остановить и УДАЛИТЬ контейнеры, сети, изображения и тома
>sudo docker-compose stop   //Остановить службы только.
>sudo docker ps -a              //Все контейнеры в системе (включая остановленные контейнеры)



# Для production_mode можно сымитировать доменное имя хостинга, например - sw.ru.
Для этого в nginx.conf.prod необходимо строку
  server_name localhost;
заменить на строку
  server_name sw.ru;

Если при этом мы работаем в разработке, на рабочем компьютере, то дополнительно совершаем следующее:
-открываем на компьютере файл
/etc/hosts
(на windows - c:\windows\system32\drivers\etc\hosts)

-добавляем в него новую строку
127.0.0.1 http://sw.ru
127.0.0.1 sw.ru

-что бы изменить права доступа к файлу необходимо, когда терминал открыт по папке /etc, забить
sudo chmod -R -f 777 ./hosts












