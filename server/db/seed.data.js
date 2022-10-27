const users = [
  {
    ein: '9fa67626-6784-4194-a357-88b0021cec8c',
    firstName: 'Lara',
    lastName: 'Cruft',
    email: 'lara@hotmail.co.uk',
    password: 'password'
  },
  {
    ein: 'abc123',
    firstName: 'Leonardo',
    lastName: 'da Vinci',
    email: 'leo_da_v@gmail.it',
    password: 'password'
  },
  {
    firstName: 'George',
    lastName: 'Michael',
    email: 'george@yahoo.co.uk',
    password: 'password'
  }
]

const requests = [
  {
    id: 1,
    name: 'Cat report',
    description: 'Some info on all the cats',
    category: 'defcon 6',
    rationale: 'I think they are cute',
    audience: 'me, durrr',
    urgency: 'VERY',
    status: 'snafu'
  }
]

projects = [
  {
    name: 'Cat project',
    quickWin: false,
    projectName: 'Spectre',
    priorityScore: 7,
    platform: 'Sky',
  }
]

scrape = [
  {
    ein: '123456789',
    forename: 'Borris',
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
  users,
  requests,
  projects,
  scrape
}
