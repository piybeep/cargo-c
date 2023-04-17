interface transportTemplateElement {
    id: number,
    title: string,
    text: string,
    icon: any
}

export interface transportTemplateProps {
    transportTemplate: transportTemplateElement[],
    setAddTransportTemplate: (data: any) => void,
    setRemoveTransportTemplate: (id: number) => void
}