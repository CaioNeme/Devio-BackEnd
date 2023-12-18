import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  if (products.length > 0) {
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        name: "X-Burguer",
        description: "X-Burguer descrição",
        price: 3000,
        productType: "BURGUER",
        image:
          "https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png",
      },
      {
        name: "X-Salada",
        description: "X-Salada descrição",
        price: 3000,
        productType: "BURGUER",
        image:
          "https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png",
      },
      {
        name: "X-Bacon",
        description: "X-Bacon descrição",
        price: 3000,
        productType: "BURGUER",
        image:
          "https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png",
      },
      {
        name: "Suco de laranja",
        description: "Suco de laranja descrição",
        price: 1000,
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png",
      },
      {
        name: "Coca Cola",
        description: "Coca Cola descrição",
        price: 1000,
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png",
      },
      {
        name: "Guaraná",
        description: "Guaraná descrição",
        price: 1000,
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png",
      },
      {
        name: "Pudim",
        description: "Pudim descrição",
        price: 800,
        productType: "DESSERT",
        image:
          "https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png",
      },
      {
        name: "Brigadeiro",
        description: "Brigadeiro descrição",
        price: 800,
        productType: "DESSERT",
        image:
          "https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png",
      },
      {
        name: "Sorvete",
        description: "Sorvete descrição",
        price: 800,
        productType: "DESSERT",
        image:
          "https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png",
      },
    ],
  });

  const extras = await prisma.extra.findMany();

  if (extras.length > 0) {
    return;
  }

  await prisma.extra.createMany({
    data: [
      {
        name: "Bacon",
        price: 200,
        description: "Bacon crocante",
        productType: "BURGUER",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Cebola",
        price: 200,
        description: "Cebola caramelizada",
        productType: "BURGUER",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Pickles",
        price: 200,
        description: "pickles",
        productType: "BURGUER",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Hortelã",
        price: 200,
        description: "Hortelã refrescante",
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Leite",
        price: 200,
        description: "Leite natural",
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Leite condensado",
        price: 200,
        description: "Leite condensado",
        productType: "DRINK",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Morango",
        price: 200,
        description: "Morango natural",
        productType: "DESSERT",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Chocolate derretido",
        price: 200,
        description: "Chocolate cremoso",
        productType: "DESSERT",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
      {
        name: "Granulado",
        price: 200,
        description: "Granulado colorido",
        productType: "DESSERT",
        image:
          "https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
