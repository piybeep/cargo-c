interface transportElement {
    id: number,
    title: string,
    text: string,
    type: string,
}

export interface transportProps {
    transport: transportElement[]
    selectTransport: null | transportElement
    setAddTransport: (data: any) => void
    setRemoveTransport: (id: number) => void
    setSelectTransport: (id: number) => void
    setRemoveSelectTransport: () => void
    getIcon: (id: number) => any
}