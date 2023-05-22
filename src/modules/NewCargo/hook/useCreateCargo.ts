import { CargoApi } from '@/api/cargo/CargoApi'
import { useMutation } from 'react-query'

export const useCreateCargo = () => {
  return useMutation('createCargo', CargoApi.createCargo)
}
