const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seed...');

  // Créer un utilisateur admin par défaut
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@amarea.com' },
    update: {},
    create: {
      email: 'admin@amarea.com',
      password: hashedPassword,
      name: 'Administrateur',
      role: 'admin'
    }
  });
  console.log('✅ Utilisateur admin créé:', admin.email);

  // Services par défaut
  const services = [
    {
      number: '01',
      title: 'Organisation Complète',
      description: 'De la vision initiale à l\'exécution finale, nous orchestrons chaque aspect avec une précision horlogère et une sensibilité artistique.',
      order: 0
    },
    {
      number: '02',
      title: 'Direction Artistique',
      description: 'Création d\'une identité visuelle cohérente et raffinée qui reflète votre personnalité et sublime votre histoire d\'amour.',
      order: 1
    },
    {
      number: '03',
      title: 'Coordination Jour J',
      description: 'Une présence discrète et efficace pour que vous viviez pleinement votre journée pendant que nous veillons à la perfection.',
      order: 2
    }
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { number: service.number }
    });
    if (!existing) {
      await prisma.service.create({ data: service });
    }
  }
  console.log('✅ Services créés');

  // Statistiques par défaut
  const stats = [
    { number: '150+', label: 'Mariages organisés', order: 0 },
    { number: '98%', label: 'Clients satisfaits', order: 1 },
    { number: '5', label: 'Années d\'expérience', order: 2 },
    { number: '24/7', label: 'Support dédié', order: 3 }
  ];

  for (const stat of stats) {
    const existing = await prisma.stat.findFirst({
      where: { label: stat.label }
    });
    if (!existing) {
      await prisma.stat.create({ data: stat });
    }
  }
  console.log('✅ Statistiques créées');

  // Valeurs par défaut
  const values = [
    {
      title: 'Passion',
      description: 'Chaque mariage est unique et mérite notre passion et notre dévouement absolu pour créer des moments d\'exception.',
      icon: 'Heart',
      order: 0
    },
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque détail pour créer des moments inoubliables qui dépassent vos attentes.',
      icon: 'Award',
      order: 1
    },
    {
      title: 'Personnalisation',
      description: 'Chaque couple est unique, c\'est pourquoi nous créons des expériences sur mesure qui vous ressemblent.',
      icon: 'Users',
      order: 2
    }
  ];

  for (const value of values) {
    const existing = await prisma.value.findFirst({
      where: { title: value.title }
    });
    if (!existing) {
      await prisma.value.create({ data: value });
    }
  }
  console.log('✅ Valeurs créées');

  // Témoignages par défaut
  const testimonials = [
    {
      text: 'Amarea a transformé notre mariage en un moment absolument magique. Chaque détail était parfait, au-delà de nos rêves les plus fous.',
      author: 'Sophie & Thomas',
      role: 'Mariés en 2023',
      featured: true,
      order: 0
    },
    {
      text: 'Une équipe formidable qui a su comprendre notre vision et la sublimer avec une élégance rare. Merci pour cette journée absolument parfaite.',
      author: 'Emma & Thomas',
      role: 'Mariés en 2023',
      featured: false,
      order: 1
    }
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { author: testimonial.author, text: testimonial.text }
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
  console.log('✅ Témoignages créés');

  // Informations de contact par défaut
  const contactInfos = [
    {
      type: 'Phone',
      title: 'Téléphone',
      details: '+33 1 23 45 67 89',
      description: 'Disponible du lundi au vendredi',
      order: 0
    },
    {
      type: 'Mail',
      title: 'Email',
      details: 'contact@amarea.com',
      description: 'Réponse sous 24h',
      order: 1
    },
    {
      type: 'MapPin',
      title: 'Adresse',
      details: '123 Avenue des Champs-Élysées',
      description: '75008 Paris, France',
      order: 2
    },
    {
      type: 'Clock',
      title: 'Horaires',
      details: '9h - 18h',
      description: 'Du lundi au vendredi',
      order: 3
    }
  ];

  for (const contactInfo of contactInfos) {
    const existing = await prisma.contactInfo.findFirst({
      where: { type: contactInfo.type }
    });
    if (!existing) {
      await prisma.contactInfo.create({ data: contactInfo });
    }
  }
  console.log('✅ Informations de contact créées');

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

