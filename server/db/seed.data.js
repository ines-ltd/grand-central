const { faker } = require('@faker-js/faker')

function randomUser () {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    firstName,
    lastName,
    imgUrl: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'customer', 'dev', 'manager', 'admin']),
    email: faker.internet.email(firstName, lastName, 'openreach.com'),
    password: 'password'
  }
}

function randomRequest () {
  return {
    name: `${faker.company.bsBuzz()} ${faker.company.bsNoun()}`,
    description: faker.lorem.paragraph(),
    category: faker.word.noun(),
    rationale: faker.lorem.paragraph(),
    audience: faker.company.name(),
    urgency: 1 + faker.datatype.number(4),
    status: faker.helpers.arrayElement(['Pending', 'Reviewing', 'Approved', 'Assigned', 'Complete'])
  }
}

function randomProject () {
  return {
    holdReason: `${faker.hacker.ingverb} the ${faker.hacker.noun}`,
    status: faker.helpers.arrayElement(['On hold', 'Working']),
    quickWin: faker.datatype.boolean(),
    name: `${faker.company.bsBuzz()} ${faker.company.bsNoun()}`,
    priorityScore: faker.datatype.number(1, 5),
    platform: faker.word.noun(),
    ecd: faker.datatype.datetime(Date.now())
  }
}

function randomComment () {
  return {
    content: faker.hacker.phrase()
  }
}

function createArrayOf (count, func) {
  return new Array(count).fill(null).map(_ => func())
}

scrape = [
  {
    ein: '123456789',
    forename: 'Boris',
    surname: 'Johnson',
    emailAddress: 'iAmCorrupt@gov.co.uk',
    ouc: 'BN3',
    mgrEin: '123123123',
    mgrForename: 'Corporate',
    mgrSurname: 'Elite',
    mgrEmailAddress: 'blackrock@owners.com',
    mgrOuc: 'GOD',
    
  },
    {
    ein: '456456456',
    forename: 'Liz',
    surname: 'Truss',
    emailAddress: 'helpIdontKnowWhatIamDoing@gov.co.uk',
    ouc: 'BN31',
    mgrEin: '123456789',
    mgrForename: 'Borris',
    mgrSurname: 'Johnson',
    mgrEmailAddress: 'iAmCorrupt@gov.com',
    mgrOuc: 'BN3',
    
  },
      {
    ein: '753753753',
    forename: 'Kier',
    surname: 'Starmer',
    emailAddress: 'howAmIstillSoUnpopular@gov.co.uk',
    ouc: 'BN2',
    mgrEin: '852852852',
    mgrForename: 'Tony',
    mgrSurname: 'Blair',
    mgrEmailAddress: 'war@gov.com',
    mgrOuc: 'BN',
    
  },
        {
    ein: '951951951',
    forename: 'Lucifer',
    surname: 'MorningStar',
    emailAddress: 'thisistoohellishforme@gov.co.uk',
    ouc: 'B666',
    mgrEin: '111111111',
    mgrForename: 'Jesus',
    mgrSurname: 'Christ',
    mgrEmailAddress: 'praisebeuponyou@gov.com',
    mgrOuc: 'CROSS',
    
  },
          {
    ein: '654987321',
    forename: 'Tristan',
    surname: 'Aragale',
    emailAddress: 'hello@gov.co.uk',
    ouc: 'BN396',
    mgrEin: '258963147',
    mgrForename: 'Jacob',
    mgrSurname: 'Morest',
    mgrEmailAddress: 'Jacob.M@gov.com',
    mgrOuc: 'BN39',
    
  }
]


module.exports = {
  users: createArrayOf(30, randomUser),
  requests: createArrayOf(50, randomRequest),
  projects: createArrayOf(10, randomProject),
  comments: createArrayOf(100, randomComment),
  scrape
}
