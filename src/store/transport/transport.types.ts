interface transportElement {
    id: number,
    title: string,
    text: string,
    type: string,
}

export interface transportProps {
    transport: transportElement[],
    setAddTransport: (data: any) => void,
    setRemoveTransport: (id: number) => void
    getIcon: (id: number) => any
}