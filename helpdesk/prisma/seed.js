import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const issues = [
  {
    title: 'Title one',
    creator: 'Marius Wallin',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
    severity: 1,
    isResolved: false,
    created_at: new Date(2021, 11, 22),
  },
  {
    title: 'Title two',
    creator: 'Patrick Berg Johansen',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
    severity: 2,
    isResolved: false,
    created_at: new Date(2021, 11, 22),
  },
  {
    title: 'Title three',
    creator: 'Kristoffer Beck',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non neque diam. Nam placerat nunc id vulputate pretium. In ac metus sit amet augue suscipit ornare.',
    severity: 3,
    isResolved: false,
    created_at: new Date(2021, 11, 22),
  },
]

const department = [
  {
    name: 'salg',
    created_at: new Date(2021, 11, 22),
  },
  {
    name: 'it',
    created_at: new Date(2021, 11, 22),
  },
  {
    name: 'design',
    created_at: new Date(2021, 11, 22),
  },
]

const createIssue = async () => {
  await Promise.all(
    issues.map(async (issue, index) => {
      await prisma.issue.create({
        data: {
          ...issue,
          department: {
            create: {
              ...department[index],
            },
          },
        },
      })
    })
  )
}
const createDepartment = async () => {
  await Promise.all(
    departments.map(async (department) => {
      await prisma.department.create({
        data: {
          ...department,
        },
      })
    })
  )
}

async function main() {
  console.log('Start seeding ...')
  await createIssue()
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
