import { response, rest } from 'msw'
import { setupServer } from 'msw/node'
import axios from 'axios'
import { getAll, getCalender } from '@/features/calenders/calenders.service'

const url = 'http://localhost:3000/api/calenders'

describe('Get Calenders tests', () => {
  const server = setupServer()

  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('Get All Calenders', () => {
    it('should respond with success true', async () => {
      server.use(
        rest.get(url, async (req, res, ctx) => {
          const data = await getAll()
          return res(ctx.json(data))
        })
      )

      const response = await axios.get(url)

      expect(response.data.success).toBe(true)
    })

    it('should return calenders as data', async () => {
      const fakeCalender = {
        id: 4,
        name: 'Julekalender',
        createdAt: '2021-11-03T10:29:30.824Z',
      }

      server.use(
        rest.get(url, async (req, res, ctx) => {
          const data = await getAll()
          return res(ctx.json(data))
        })
      )

      const response = await axios.get(url)

      expect(response.data.data).toContainEqual(fakeCalender)
    })
  })

  describe('Get Calenders with Name', () => {
    it('should return error if no Calender was found', async () => {
      server.use(
        rest.get(url + '/Paaske', async (req, res, ctx) => {
          const data = await getCalender('Paaske')
          return res(ctx.json(data))
        })
      )

      const response = await axios.get(url + '/Paaske')

      expect(response.data.error).toBe(
        'Could not find Calender with name: Paaske'
      )
    })
  })
})
