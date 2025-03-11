# Desafio Ricochet 360 - Frontend

Esse projeto é um desafio da empresa Ricochet 360 de criar um sistema CRM de gestão de reuniões.

## Arquitetura da solução

Esse projeto contém as rotas:

- `/login`: Página de login onde os usuários podem inserir suas credenciais para acessar a aplicação;
- `/register`: Página de registro onde novos usuários podem criar uma conta;
- `/dashboard`: Painel onde os usuários autenticados podem ver, agendar, editar e cancelar reuniões;

![Arquitetura da Solução](public/img/documentation/arquiteture.png)

## Fluxo de autenticação

![Autenticação](public/img/documentation/auth.png)

## Dashboard de eventos

![Dashboard](public/img/documentation/dashboard.png)

Nessa tela é possível vizualisar todos os eventos do usuário. Eles são divididos entre os eventos de hoje, que virão no fururo e os já passados.

![Evento](public/img/documentation/event.png)

Cada evento possui titulo, data de inicio, horario de inicio e local. Caso o evento tenha um link, é exibido um botão de acesso a reunião online. No topo do evento, foi colocado um badge que exibe o status do evento, podendo ser "Já terminou", "Em andamento", uma contagem de horas ou uma contagem de dias.