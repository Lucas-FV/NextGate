# NextGate ✈️

> Uma plataforma web moderna e Full-Stack para agendamento e gerenciamento de voos, projetada tanto para passageiros quanto para companhias aéreas.

O **NextGate** é a reimaginação de um projeto acadêmico inicial de simulação de agência de viagens. Esta nova versão foi totalmente reescrita e arquitetada do zero, aplicando conceitos avançados de Engenharia de Software, boas práticas de desenvolvimento Full-Stack e uma interface de usuário com design *clean*, totalmente estilizada com CSS puro.

## 🚀 Funcionalidades Principais

O sistema é dividido em dois grandes escopos de atuação (Perfis de Acesso):

**Para Passageiros (B2C):**
- **Pesquisa de Voos:** Busca dinâmica de destinos, horários e companhias aéreas.
- **Seleção Visual de Assentos:** Mapeamento visual da cabine do avião com categorias (Básico e Premium).
- **Checkout e Pagamento:** Fluxo simplificado simulando pagamento por Cartão de Crédito (com máscaras de formatação) e Pix.
- **Painel do Passageiro:** Visualização do histórico de compras e emissão de Cartões de Embarque virtuais.

**Para Companhias Aéreas (B2B):**
- **Dashboard Financeiro (KPIs):** Acompanhamento em tempo real de voos ativos, passageiros totais e receita gerada.
- **Gestão de Malha Aérea:** Criação, edição e exclusão de novos voos diretamente pela interface.

## 🧠 Principais Regras de Negócio Aplicadas

- **Gestão de Capacidade em Tempo Real:** O sistema deduz assentos disponíveis no exato momento da compra, separando fisicamente o conceito de "Capacidade Total" e "Assentos Disponíveis" para evitar corrupção visual da cabine.
- **Geração Dinâmica de Cabines:** O Front-End calcula matematicamente o layout do avião (fileiras e distribuição de assentos Premium) com base na capacidade total registrada no banco de dados.
- **Proteção contra Registros Órfãos:** Tratativas no Front-End e Back-End para garantir que exclusões de voos não quebrem o painel de passageiros que já possuíam passagens compradas.

## 💻 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando a seguinte stack:

**Front-End:**
- [React (via Vite)] - Construção da interface de usuário com alta performance.
- [CSS3] - Estilização desenvolvida do zero sem uso de frameworks externos.
- [JavaScript (ES6+)] - Lógica de interatividade e consumo de APIs.

**Back-End:**
- [Java 17] - Linguagem principal da API.
- [Spring Boot] - Framework para criação da API RESTful.
- [Maven] - Gerenciamento de dependências.

**Banco de Dados:**
- [MongoDB] - Banco de dados NoSQL orientado a documentos.

## ⚙️ Como executar o projeto localmente

Siga os passos abaixo para rodar o NextGate na sua máquina local.

### Pré-requisitos
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas na sua máquina:
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
* [Java JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (ou superior)
* [Maven](https://maven.apache.org/)
* [MongoDB](https://www.mongodb.com/) rodando localmente na porta padrão (`27017`) ou uma URL do MongoDB Atlas.

### 1. Clonando o Repositório

Abra o seu terminal e rode o comando abaixo para clonar o projeto:

```bash
git clone [https://github.com/Lucas-FV/nextgate.git](https://github.com/Lucas-FV/nextgate.git)
```

### 2. Rodando o Back-End (Spring Boot)

Abra um terminal na raiz do projeto e navegue até a pasta do servidor:

```bash
cd back-end
cd backend
```

> **Nota:** Verifique o arquivo `src/main/resources/application.properties` e certifique-se de que a URI do MongoDB (`spring.data.mongodb.uri`) está apontando para o seu banco de dados corretamente.

Execute a aplicação com o Maven:

```bash
mvn spring-boot:run
```
O servidor iniciará e a API estará disponível em: `http://localhost:8080`

### 3. Rodando o Front-End (React)

Abra uma **nova aba** no terminal (mantenha o servidor do Back-End rodando na outra) e navegue até a pasta do front-end:

```bash
cd front-end
```

Instale as dependências do projeto:

```bash
npm install
```

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```
A interface web abrirá automaticamente ou estará disponível em: `http://localhost:5173`
