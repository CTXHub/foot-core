/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { CreateLocationUseCase } from './CreateLocationUseCase'

export class CreateLocationController {
  constructor (
   private createLocationUseCase: CreateLocationUseCase
  ) {}

  static async handle (request: Request, response: Response): Promise<Response> {
    const { name, description, country } = request.body

    try {
      const results = await CreateLocationUseCase.execute({
        name,
        description,
        country
      })

      return response.status(201).json({
        message: 'Location creation successfull',
        results: {
          name: results.name,
          description: results.description,
          country: results.country,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/v1/location/' + results.id
          }
        }
      })
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
