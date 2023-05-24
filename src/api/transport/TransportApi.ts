import { instance } from ".."

export const TransportApi={
    async getAllTransport(){
        const res = await instance.get('loadspaces')
    }
}