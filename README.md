# Desafio Ricochet 360 - Frontend

Este projeto é um desafio da empresa Ricochet 360 de criar um sistema CRM de gestão de reuniões.

![Dashboard](public/img/documentation/dashboard.png)

## Arquitetura da solução

Este projeto contém as rotas:

- `/login`: Página de login onde os usuários podem inserir suas credenciais para acessar a aplicação;
- `/register`: Página de registro onde novos usuários podem criar uma conta;
- `/dashboard`: Painel onde os usuários autenticados podem ver, agendar, editar e cancelar reuniões;

As rotas de login e registro são abertas. A rota de dashboard é protegida pelo middleware de autenticação, que só permite acesso caso o usuário já tenha iniciado a sessão nesse dispositivo:

![Arquitetura da Solução](public/img/documentation/arquiteture.png)

## Fluxo de autenticação

FLuxograma que ilustra como o "Auth middleware" e o "User session" funcionam.

![Autenticação](public/img/documentation/auth.png)

## Login e cadastro de usuários

A tela de login possui o campo de email e senha, necssários para fazer o logi. Ao enviar o formulário, é exibido um feedback de carregamento em seu botão. Caso ocorra algum erro login, é exibido um alert de feedback negativo

![login](public/img/documentation/login.png)

![login-error](public/img/documentation/login-error.png)

Seu botão se mantém inativo até que seus campos sejam preenchidos corretamente. Para seguir com o cadastro, é necessário ter um e0mail valido e que as duas senhas se correspondam.

![register](public/img/documentation/register.png)

## Dashboard de eventos

### Descrição

Nesta tela é possível visualizar todos os eventos do usuário. Eles são divididos entre os eventos de hoje, os que virão no futuro e os já passados.

![Dashboard](public/img/documentation/dashboard.png)

A tela possui 2 visualizações dos eventos, sendo uma em grid e outra em lista.

![DashboardList](public/img/documentation/dashboardList.png)

### Responsividade

O conteúdo da tela é responsivo, respeitando os breakpoints de tablet e celular.

Observe que na versão mobile, é adicionado um scroll horizontal para melhor visualização dos eventos. Seguindo boas práticas de UX, os eventos possuem o tamanho de 70% da tela para ser possível visualizar o próximo no scroll lateral.

| Tablet | Celular |
| --- | --- |
| ![DashboardTablet](public/img/documentation/dashboardTablet.png) | ![DashboardCelular](public/img/documentation/dashboardCelular.png) |

### Eventos

Cada evento possui título, data de início, horário de início e local. Caso o evento tenha um link, é exibido um botão de acesso à reunião online. No topo do evento, foi colocado um badge que exibe o status do evento, podendo ser "Já terminou", "Em andamento", uma contagem de horas ou uma contagem de dias.

![Evento-andamento](public/img/documentation/event-andamento.png)

![Evento](public/img/documentation/event.png)

![Evento-expirado](public/img/documentation/event-expirado.png)

### Novo evento

Ao clicar no botão do canto superior direito da tela, é aberta uma modal para o cadastro de um novo evento.

Essa modal permite ao usuário criar um novo evento preenchendo titulo, descrição, inicio, fim link e a lsita dos participantes.

Ao salvar, o evento é adicionado à lista de eventos do usuário e a modal é fechada. Se o usuário optar por cancelar, a modal é fechada sem salvar as informações.

![Eventonovo](public/img/documentation/new-event.png)

A lsita de participantes é dinamica de acordo com os usuários cadastrados no banco.

![convidados](public/img/documentation/event-participants.png)

### Notificações

Descrição das notificações
