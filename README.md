# todo

### Техническое задание

Средствами Vue.js реализуйте небольшое SPA приложение для заметок.

Каждая заметка имеет название и список задач (todo list), далее - Todo.
Каждый пункт Todo состоит из чекбокса и относящейся к нему текстовой
подписи.

Приложение состоит всего из 2х страниц.

На главной странице отображается список всех заметок.
Для каждой заметки отображается заголовок и Todo, сокращенный до
нескольких пунктов, без возможности отмечать.
Действия на главной:
- перейти к созданию новой заметки
- перейти к изменению
- удалить (необходимо подтверждение)

Страница изменения заметки позволяет определенную заметку
отредактировать, отметить пункты Todo, а после сохранить изменения.
Действия с заметкой:
- сохранить изменения
- отменить редактирование (необходимо подтверждение)
- удалить (необходимо подтверждение)
- отменить внесенное изменение
- повторить отмененное изменение
Действия с пунктами Todo:
- добавить
- удалить
- отредактировать текст
- отметить как выполненный

Требования к функционалу:
- Все действия на сайте должны происходить без перезагрузки страницы.
- Подтверждение действий (удалить заметку) выполняется с помощью
диалогового окна.
- Интерфейс должен отвечать требованиям usability.
- После перезагрузки страницы состояние списка заметок должно
сохраняться.
- Можно пренебречь несоответствием редактирования текста с помощью
кнопок отменить/повторить и аналогичным действиям с помощью комбинацияй
клавиш (Ctrl+Z, Command+Z, etc.).

Технические требования:
- Диалоговые окна должны быть реализованы без использования "alert",
"prompt" и "confirm".
- В качестве языка разработки допускается использовать JavaScript или
TypeScript.
- В качестве сборщика, если это необходимо, используйте Webpack.
- Верстка должна быть выполнена без использования UI библиотек (например
Vuetify).
- Адаптивность не обязательна, но приветствуется.
- Логика приложения должна быть разбита на разумное количество
самодостаточных Vue-компонентов.

Особое внимание стоит обратить на следующие моменты:
- Код должен быть написан понятно и аккуратно, с соблюдением табуляции и
прочих элементов написания, без лишних элементов и функций, не имеющих
отношения к функционалу тестового задания, снабжен понятными
комментариями.
- Читабельность и наличие элементарной архитектуры.
- Чистота и оформление кода — не менее важный фактор. Код должен быть
написан в едином стиле (желательно в рекомендуемом для конкретного
языка). Также к чистоте относятся отсутствие копипаста и дублирования
логики.

Тестовое задание должно быть предоставлено в следующем виде:
- Ссылка на публичный репозиторий (GitHub, BitBucket, GitLab) с исходным
кодом.
- Ссылка на сайт для тестирования функционала. Или Dockerfile и
docker-compose.yaml, позволяющие развернуть локально командой
docker-compose up работоспособную копию сайта.
