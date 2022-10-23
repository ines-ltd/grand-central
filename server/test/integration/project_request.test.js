const { Request, Project } = require('../../models')

describe('For projects and tests', () => {

  const data = {
    requests: [
      {
        name: 'Puppy report',
        description: 'Some info on all the puppies',
        category: 'defcon 3',
        rationale: 'We think they are awesome',
        audience: 'Crufts',
        urgency: 'Low',
        status: 'hungry'
      },
      {
        name: 'Puppy report 2',
        description: 'Some info on all the puppies',
        category: 'defcon 3',
        rationale: 'We think they are awesome',
        audience: 'Crufts',
        urgency: 'Low',
        status: 'hungry'
      }
    ],
    projects: [
      {
        status: 'developing',
        quickWin: false,
        projectName: 'Spectre',
        priorityScore: 7,
        platform: 'Sky',
      }
    ]
  }

  beforeAll(() => Promise.all(data.requests.map(r => Request.create(r))))

  afterAll(() => Promise.all(data.requests.map(r => Request.destroy({ where: r }))))

  test('a project can be associated with a test', async () => {
    const request = await Request.findOne({ where: { name: 'Puppy report' } })
    const project = await Project.create(data.projects[0])
    await request.addProject(project)
    const projects = await request.getProjects()
    expect(projects.length).toBeGreaterThan(0)
  })

})
