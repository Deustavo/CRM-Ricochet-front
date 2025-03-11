# Desafio Ricochet 360 - Frontend

Este projeto é um desafio da empresa Ricochet 360 de criar um sistema CRM de gestão de reuniões.

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

## Dashboard de eventos

### Descrição

Nesta tela é possível visualizar todos os eventos do usuário. Eles são divididos entre os eventos de hoje, os que virão no futuro e os já passados.

![Dashboard](public/img/documentation/dashboard.png)

### Eventos

Cada evento possui título, data de início, horário de início e local. Caso o evento tenha um link, é exibido um botão de acesso à reunião online. No topo do evento, foi colocado um badge que exibe o status do evento, podendo ser "Já terminou", "Em andamento", uma contagem de horas ou uma contagem de dias.

![Evento](public/img/documentation/event.png)

### Estado do evento

Descrição do estado do evento

### Notificações

Descrição das notificações
