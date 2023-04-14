interface transportElement {
    id: number,
    title: string,
    text: string,
    icon: string
}

export interface transportProps {
    transport: transportElement[],
    setAddTransport: (data: any) => void,
    setRemoveTransport: (id: number) => void
}