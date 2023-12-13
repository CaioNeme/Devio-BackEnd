import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  if (products.length > 0) {
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        name: 'X-Burguer',
        description: 'X-Burguer description',
        price: 3000,
        discount: 0,
        productType: 'BURGUER',
        image: 'https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png',
      },
      {
        name: 'X-Salada',
        description: 'X-Salada description',
        price: 3000,
        discount: 0,
        productType: 'BURGUER',
        image: 'https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png',
      },
      {
        name: 'X-Bacon',
        description: 'X-Bacon description',
        price: 3000,
        discount: 0,
        productType: 'BURGUER',
        image: 'https://padariasantacruz.loji.com.br/storage/uploads/NeDNbSzo4Uk2iSlSqLH2mArQq3JzZfHd7KNLyBAP.png',
      },
      {
        name: 'Orange Juice',
        description: 'Orange Juice description',
        price: 1000,
        discount: 0,
        productType: 'DRINK',
        image: 'https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png',
      },
      {
        name: 'Coca Cola',
        description: 'Coca Cola description',
        price: 1000,
        discount: 0,
        productType: 'DRINK',
        image: 'https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png',
      },
      {
        name: 'Guaraná',
        description: 'Guaraná description',
        price: 1000,
        discount: 0,
        productType: 'DRINK',
        image: 'https://i.pinimg.com/originals/47/54/18/475418e727b8460fc66932472d409ace.png',
      },
      {
        name: 'Pudim',
        description: 'Pudim description',
        price: 8000,
        discount: 0,
        productType: 'DESSERT',
        image:
          'https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png',
      },
      {
        name: 'Brigadeiro',
        description: 'Brigadeiro description',
        price: 8000,
        discount: 0,
        productType: 'DESSERT',
        image:
          'https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png',
      },
      {
        name: 'Sorvete',
        description: 'Sorvete description',
        price: 8000,
        discount: 0,
        productType: 'DESSERT',
        image:
          'https://static.vecteezy.com/system/resources/previews/010/171/321/original/cartoon-juicy-pudding-file-free-png.png',
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
