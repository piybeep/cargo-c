interface transportTemplateElement {
    id: number,
    title: string,
    text: string,
    type: string,
}

export interface transportTemplateProps {
    transportTemplate: transportTemplateElement[],
    setAddTransportTemplate: (data: any) => void,
    setRemoveTransportTemplate: (id: number) => void
    getIcon: (id: number) => any
}