export interface ISearchLocation {
    text: string
}


export interface ICity {
    id: string
    name: string
}

export interface ILocationResponse {
    'locations': ICity[]
        
}