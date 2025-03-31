# Employee Management
## Doc português
Projeto completo, com uma API desenvolvida em .NET 8, front-end utilizando React JS 18, Next.js 14 e Typescript, todo orquestrado e empacotado com Docker para garantir escalabilidade e facilidade de implantação.

Ideia do projeto é de ter uma aplicação com CRUD simples, porém completo e funcional, seguindo princípios SOLID, tanto na API quanto no front.

Azure Service Bus: Implementado um pequeno exemplo de funcionamento de utilização de eventos com Azure Service Bus (envio de e-mail ao criar usuário).
OBS.: _Necessário fazer configuração de connection string do Azure para que o evento funcione! Mas caso não seja feito a configuração, a aplicação funcionará normalmente, mas sem o evento!_

Testes: Realizado cobertura de testes unitários no front-end.

Banco de dados: SQLite integrado a api (_Alguns dados já foram cadastrados para popular a base._)

Usuário admin para acesso:

User: admin@admin.com

Pass: admin123


Telas da aplicação: Login, Listagem, Cadastro, Edição, Visualização, e Exclusão

## 

## Doc english
Complete project with API made in .net 8 and front end with React JS 18
A complete project with an API built in .NET 8, front-end with React JS 18, Next.js 14, and TypeScript, fully containerized with Docker to ensure scalability and to make it ease to deploy.

The idea of ​​the project is to have an application with simple, yet complete and functional CRUD, following SOLID principles, both in the API and in the front end.

Azure Service Bus: Implemented a small example of events usege with Azure Service Bus (sending an email when creating a user). 
PS.: _Azure connection string configuration required for the event to work! However, if there is no configuration, the application will work as well, but without the event!_

Tests: Coverage of unit tests performed in the front end.

Database: SQLite database integrated with the API (_Some data has already been registered to populate the database._).

Admin user for access:

User: admin@admin.com

Password: admin123


Application screens: Login, Listing, Registration, Editing, Viewing, and Deleting


## 
## Telas / Pages
LOGIN
![Login](https://github.com/user-attachments/assets/ad91bf48-d6af-4558-a6e8-2e256c61d30c)

USER / EMPLOYEE LIST
![List](https://github.com/user-attachments/assets/d3f14ea7-729a-4332-b700-a8f3a8268805)

USER / EMPLOYEE VIEW (Blocked fields)
![View](https://github.com/user-attachments/assets/422219c2-49e3-4194-b4b7-47514c661fa8)

USER / EMPLOYEE REGISTER (Exemple of required fields)
![Create](https://github.com/user-attachments/assets/e7f7c64b-1eaf-475e-893b-bec4e8bd7e8b)

USER / EMPLOYEE UPDATE
![Edit](https://github.com/user-attachments/assets/4a4af088-b5c1-4828-b3dc-01f08237d904)

SWAGGER OVERVIEW
![swagger](https://github.com/user-attachments/assets/a3109375-1837-435d-9560-da588709e28e)
