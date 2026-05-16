export interface Buyer {
  id?: string;
  buyerCode: string;
  companyName: string;
  country: string;
  currency: string;
  paymentTerm: string;
  status: boolean;
}

export interface Style {
  id?: string;
  styleCode: string;
  buyerId: string;
  garmentType: string;
  gender: string;
  season: string;
  sampleApproved: boolean;
}

export interface Order {
  id?: string;
  poNumber: string;
  buyerId: string;
  styleId: string;
  quantity: number;
  unitPrice: number;
  shipmentDate: string;
  status: string;
}


export interface Bom {
  id: string;
  styleId: string;
  materialName: string;
  category: string;
  consumption: number;
  wastage: number;
  uom: string;
}

export interface Production {
  id?: string;
  orderId: string;
  styleId: string;
  lineName: string;
  plannedStart: Date
  completedEnd: Date;
  stages:ProductionStage[];
  
}

export interface ProductionStage{
id?:string;
stageType:string; //Cutting, Sewing, Finishing
actualQty:number;
efficiencyPercent: number;

}

export interface Inventory {
  id: number;
  materialName: string;
  category: string;
  qtyOnHand: number;
  reorderPoint: number;
  unitCost: number;
}

export interface Shipment {
  id: number;
  orderId: number;
  vesselName: string;
  containerNo: string;
  shipDate: string;
  status: string;
}

export interface User {
 
    id?: string;

    name: string;

    email: string;

    password: string;

    phone: string;

    image: string;

    role: 'Admin' | 'Marchandiser' | 'Production_Manager' |  'QA_Officer' | 'StoreKepper' |  'User' | '';

}
