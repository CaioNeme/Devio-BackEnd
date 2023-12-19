# Desafio Técnico - Devio-BackEnd

### Deploy

<a href="">Clique Aqui!</a>

###### o server pode estar em stand by dependendo do horario

##

### Funcionalidades e Rotas:

- ###### GET /health

  - Verifica se o servidor esta online.
  - Saida

  ```js
    {
    	"status": "OK"
    }
  ```

- ###### GET /products

  - Traz todos os produtos disponiveis.
  - Saída:
  ```js
  [
    {
      id: number,
      name: string,
      description: string,
      price: number, // Em centavos
      productType: string, 
      soldTimes: number, // Inicialmente 0
      image: string,
      createdAt: string,
      updatedAt: string,
    },{...}
  ]
  ```

- ###### GET /products/:ProductName

  - Busca o produto de nome `ProductName`

  - Saída:

  ```js
  {
    id: number,
    name: string,
    description: string,
    price: number,
    productType: string,
    soldTimes: number,
    image: string, 
    createdAt: string,
    updatedAt: string,
  }
  ```

- ###### GET /extras

  - Traz todos os acompanhamentos possiveis
  - Saída:

  ```js
  [
    {
      id: number,
      name: string,
      description: string,
      price: number,
      productType: string,
      image: string,
      createdAt: string,
      updatedAt: string,
    },{...}
  ]
  ```

- ###### POST /item

  - Cria um item do usuario que poderá ser adiconado ao pedido
  - Entrada:
  ```js
    {
    	note: string,
    	quantity: number,
    	paidPrice: number,
    	productId: number,
    	extraId: number
    }
  ```
  - Retorna o id do item montado pelo usuario
  - Saída:

  ```js
    {
    	id: number,
    }
  ```

- ###### GET /item
  - Retorna todos os itens cadastrados.
  - Saída:
  ```js
    [
      {
        id: number,
        note: string,
        quantity: number,
        paidPrice: number,
        status: number,
        createdAt: string,
        updatedAt: string,
        productId: number,
        productImage: string,
        extraId:number,
      },
      {...}
    ]
  ```
- ###### GET /item/:id

  - Retorna os dados de um item.
  - Saída:
  ```js
      {   
        id: number,
        note: string,
        quantity: number,
        paidPrice: number,
        status: number,
        createdAt: string,
        updatedAt: string,
        productId: number,
        productImage: string,
        extraId:number,
      }
  ```
- ###### PUT /item/cancel/:id

  - Cancela um item que nao tenha sido concluído e nem ja cancelado.
  - Saída:
  ```js
    OK
  ```
- ###### PUT /item/conclude/:id

  - Finaliza um item que nao tenha sido concluído e nem ja cancelado.
  - Saída:
  ```js
    OK
  ```

- ###### POST /orders

  - Cria um item do usuario que poderá ser adiconado ao pedido
  - Entrada:
  ```js
     {
    	clientName: string,
    	paymentMethod: string,
    	itensId: [number, ...]
    }
  ```
  - Retorna o id do item montado pelo usuario
  - Saída:

  ```js
   {
  	id: number,
  	clientName: string,
  	orderStatus: string,
  	paymentMethod: string,
  	itens: [
  		{
  			id: number,
  			note: string,
  			quantity: number,
  			paidPrice: number,
  			status: string,
  			productId: number,
  			productImage: string,
  			productName: string,
  			extraId: number
  		},{...}
  	]
  } 
  ```

- ###### GET /orders

  - Retorna todos os pedidos ja feitos.
  - Saída:
  ```js
    [
      {
      	id: number,
      	clientName: string,
      	orderStatus: string,
      	paymentMethod: string,
      	itens: [
      		{
      			id: number,
      			note: string,
      			quantity: number,
      			paidPrice: number,
      			status: string,
      			productId: number,
      			productImage: string,
      			productName: string,
      			extraId: number
      		},{...}
      	]
      },{...}
    ] 
  ```
- ###### GET /orders/:id

  - Retorna os dados do pedido de `:id`.
  - Saída:
  ```js
      {
      	id: number,
      	clientName: string,
      	orderStatus: string,
      	paymentMethod: string,
      	itens: [
      		{
      			id: number,
      			note: string,
      			quantity: number,
      			paidPrice: number,
      			status: string,
      			productId: number,
      			productImage: string,
      			productName: string,
      			extraId: number
      		},{...}
      	]
      }
  ```

- ###### PUT /orders/cancel/:id

  - Cancela o pedido que não tenha sido concluído e nem já cancelado.
  - Saída:
  ```js
    OK
  ```
- ###### PUT /orders/conclude/:id

  - Finaliza um pedido que não tenha sido concluído e nem já cancelado.
  - Saída:
  ```js
    OK
  ```


##

### Proposta do Projeto:

Um restaurante precisa poder registrar suas vendas de forma fácil e rápida, este trabalha com preparo de comidas rápidas e o método atual por comanda deixa o processo como um todo mais lento. O restaurante gostaria de ter um ambiente intuitivo listando os produtos mais vendidos e possibilitando a fácil inserção desses no checkout, ele também gostaria de um visual simples, porém moderno.

### Requisitos ✅
- As linguagens utilizadas deverão ser PHP e/ou JS.
- O back-end deverá ser separado do front-end.
- Deverá ser desenvolvido utilizando as versões mais recentes.
- Utilizar dos [Padrões Devio](https://github.com/deviobr/code-patterns).
- Seguir o [Protótipo](https://xd.adobe.com/view/426c6e77-3eac-40e9-8262-41ef5a325fce-173f/?fullscreen).
- Ser responsivo.

### Histórias de Usuário 🧑‍🍳
- O usuário poderá ver uma pequena quantidade de produtos na tela para seleção rápida.
- O usuário terá a opção de digitar o nome ou código para encontrar o produto.
- O usuário irá poder adicionar/remover itens e acompanhar o resumo do pedido.
- O usuário poderá ver o total e o troco.
- Deverá poder incluir o nome do cliente para ser entregue o pedido.
- Ao finalizar o pedido este deverá ser impresso em uma via para o cliente (impressora térmica), liberando a tela para o próximo pedido.
  - Obs: A solução é muito mais simples do que se parece.
- O pedido deverá aparecer para a cozinha junto ao nome do cliente.
- A cozinha poderá dar baixa nos pedidos concluídos.

### Histórias Bônus (opcionais) 💘
- Os pedidos devem aparecer para a cozinha em tempo real.
  - Obs: Utilização de Long Pooling ou WebSockets facilitam a solução.
- O usuário poderá incluir uma observação a cozinha.
- O usuário poderá atribuir múltiplas formas de pagamento na finalização do pedido.
- Os pedidos baixados devem aparecer em uma tela com o nome do cliente, apitando para ser feito a retirada.

### Observações 👀
- Não há a necessidade de fazer telas de cadastro, os registros poderão ser vir de uma base fixa.
- Os itens bônus não são obrigatórios, porém se feitos serão bastante relevantes e mostraram o empenho do candidato junto a vaga/empresa.
- Será levado em consideração conceitos diversos, porém o mínimo que se espera aplicação de conceitos de qualidade e manutenção de código.
- Use a criatividade, não tenha medo, isso será um fator crucial na análise.


##

### Tecnologias:

- TypeScript;
- Node(20.9.0) + Express;
- Prisma (ORM);
- Postgres;
- Jest e Supertest.

##

### Como rodar o projeto desenvolvimento:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Execute todas as migrações `npm run dev:migration:run`.
6. Seed do Banco `npm run dev:seed`.
7. Rode o back-end usando o comando `npm run dev`.

##

### Como Rodar os testes:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Aplique as migrações `npm run test:migration:run`.
6. Rode os tests `npm run test`

##

### Como rodar em produção:

```bash
  npm run build
  npm start
```

##

### Colaboradores

- <a href="https://github.com/CaioNeme"> Caio Neme </a>
