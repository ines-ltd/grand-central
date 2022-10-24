const users = [
  {
    ein: '9fa67626-6784-4194-a357-88b0021cec8c',
    firstName: 'Lara',
    lastName: 'Croft',
    email: 'lara@hotmail.co.uk'
  },
  {
    firstName: 'Leonardo',
    lastName: 'da Vinci',
    email: 'leo_da_v@gmail.it'
  },
  {
    firstName: 'George',
    lastName: 'Michael',
    email: 'george@yahoo.co.uk'
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

module.exports = {
  users,
  requests,
  projects
}
