# Short URL API

Bem-vindo à Short URL, uma API para encurtamento de URLs

## Tecnologias Utilizadas

Esta API foi desenvolvida utilizando as tecnologias:

- **NodeJs**: Uma runtime de JavaScript baseada no motor V8 do Chrome, ideal para construir aplicações de rede rápidas e escaláveis.
- **Fastify**: Um framework para Node.js, focado em fornecer a máxima eficiência e velocidade.
- **TypeScript**: Um superset de JavaScript que adiciona tipagem estática, tornando o código mais legível e menos suscetível a erros.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados objeto-relacional poderoso, com suporte a JSON e busca de texto completo.
- **Redis**: Um armazenamento de estrutura de dados em memória, usado como banco de dados, cache, e broker de mensagens.
- **Zod**: Uma biblioteca de validação de dados para TypeScript, garantindo que os dados estejam corretos em runtime.

## Funcionalidades

A API permite:

- **Encurtar Links**: Converta URLs longas em versões mais curtas e amigáveis para compartilhamento.
- **Acessar Links Encurtados**: Consulte todos os links encurtados disponíveis.
- **Redirecionar para o URL Original**: Use o link encurtado para ser redirecionado ao URL original.

### Como Usar

1. **Encurtar um Link**:
   Faça uma requisição POST para `/api/url` com o seguinte corpo:
   ```json
   {
     "code": "google",
     "url": "https://google.com.br"
   }
   ```
   
2. **Acessar Todos os Links Encurtados**:
   Simplesmente faça uma chamada GET para `/api/url`.

3. **Usar um Link Encurtado**:
   Acesse `/{nome do link}` para ser redirecionado ao URL original.

## Execução do Projeto

Para colocar a API em funcionamento, siga estes passos:

1. **Clone o Repositório**:
   Clone o repositório para sua máquina local.

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Configure o Ambiente Virtual com Docker**:
   ```bash
   docker compose up -d
   ```

4. **Faça o Setup do Banco de Dados**:
   ```bash
   npm run setup
   ```

5. **Inicie o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```