import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      fullName: 'Administrator',
      role: 'ADMIN'
    }
  })

  console.log('✅ Admin user created:', adminUser.username)

  // Create sample categories
  const categories = [
    { name: 'Starters', description: 'Appetizers and starters' },
    { name: 'Main Course', description: 'Main dishes' },
    { name: 'Beverages', description: 'Drinks and beverages' },
    { name: 'Desserts', description: 'Sweet treats' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  console.log('✅ Categories created')

  // Create sample menu items
  const starterCategory = await prisma.category.findFirst({ where: { name: 'Starters' } })
  const mainCategory = await prisma.category.findFirst({ where: { name: 'Main Course' } })
  const beverageCategory = await prisma.category.findFirst({ where: { name: 'Beverages' } })
  const dessertCategory = await prisma.category.findFirst({ where: { name: 'Desserts' } })

  if (!starterCategory || !mainCategory || !beverageCategory || !dessertCategory) {
    throw new Error('Categories not found')
  }

  const menuItems = [
    // Starters
    { name: 'Chicken Wings', price: 299, categoryId: starterCategory.id, itemType: 'NON_VEG' as const },
    { name: 'Paneer Tikka', price: 249, categoryId: starterCategory.id, itemType: 'VEG' as const },
    { name: 'Fish Fingers', price: 349, categoryId: starterCategory.id, itemType: 'NON_VEG' as const },
    
    // Main Course
    { name: 'Butter Chicken', price: 399, categoryId: mainCategory.id, itemType: 'NON_VEG' as const },
    { name: 'Dal Makhani', price: 299, categoryId: mainCategory.id, itemType: 'VEG' as const },
    { name: 'Biryani', price: 449, categoryId: mainCategory.id, itemType: 'NON_VEG' as const },
    { name: 'Paneer Makhani', price: 349, categoryId: mainCategory.id, itemType: 'VEG' as const },
    
    // Beverages
    { name: 'Fresh Lime Soda', price: 89, categoryId: beverageCategory.id, itemType: 'BEVERAGE' as const },
    { name: 'Mango Lassi', price: 129, categoryId: beverageCategory.id, itemType: 'BEVERAGE' as const },
    { name: 'Masala Chai', price: 49, categoryId: beverageCategory.id, itemType: 'BEVERAGE' as const },
    
    // Desserts
    { name: 'Gulab Jamun', price: 149, categoryId: dessertCategory.id, itemType: 'DESSERT' as const },
    { name: 'Ice Cream', price: 99, categoryId: dessertCategory.id, itemType: 'DESSERT' as const }
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: {},
      create: item
    })
  }

  console.log('✅ Menu items created')

  // Create sample tables
  for (let i = 1; i <= 12; i++) {
    await prisma.table.upsert({
      where: { number: `T${i.toString().padStart(2, '0')}` },
      update: {},
      create: {
        number: `T${i.toString().padStart(2, '0')}`,
        capacity: i <= 4 ? 2 : i <= 8 ? 4 : 6,
        location: i <= 6 ? 'Ground Floor' : 'First Floor'
      }
    })
  }

  console.log('✅ Tables created')

  // Create default tax settings
  await prisma.taxSetting.upsert({
    where: { name: 'GST' },
    update: {},
    create: {
      name: 'GST',
      rate: 18.0,
      isDefault: true
    }
  })

  // Create app settings
  await prisma.appSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      restaurantName: 'The Great Restaurant',
      address: '123 Food Street, Flavor City',
      phone: '+91 98765 43210',
      email: 'contact@greatrestaurant.com',
      currency: '₹',
      taxRate: 18.0
    }
  })

  console.log('✅ Settings created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })