/* eslint-disable no-useless-constructor */
import { Equal, getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Stadium } from '../../../entities/Stadium'
import { ICreateStadiumRequestDTO } from './CreateStadiumDTO'

export class CreateStadiumUseCase {
  static async execute (data: ICreateStadiumRequestDTO) {
    const stadiumsRepository = getRepository(Stadium)

    const stadiumAlreadyExists = await stadiumsRepository.findOne({ name: Equal(data.name) })

    if (stadiumAlreadyExists) {
      throw new Error('Stadium already exists.')
    }

    console.log(data.location)

    if (!data.location) {
      throw new Error('Invalid Location.')
    }

    const stadium = await stadiumsRepository.create(data)

    const errors = await validate(stadium)
    if (errors.length > 0) {
      throw new Error('Validation Error')
    } else {
      await stadiumsRepository.save(stadium)
      return stadium
    }
  }
}
