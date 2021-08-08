export interface Product {
  "shelf": string,
  "_id"?: any,
  "name": string,
  "description": string,
  "price": number,
  "img": string,
  "starsCount": number,
  "manufactureNotes": ManufactureNotes,
  "specification": Specification,
  "additionalInformation": AdditionalInformation
}

interface ManufactureNotes {
  "sectionName": string,
  "country": string,
  "release": string,
  "warranty": string,
}

interface Specification {
  "sectionName": string,
  "color": string,
  "mass": string,
  "processor"?:string,
  "screenSize"?: string,
}
interface AdditionalInformation {
  "sectionName": string,
  "delay": string
}


export interface RootState {
  laptops: Product[],
  mouses: Product[],
  accessories: Product[],
  clientBasket: number[]
}

