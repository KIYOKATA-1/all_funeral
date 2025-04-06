export interface ICompanyPhoto {
    name: string;
    filepath: string;
    thumbpath: string;
    createdAt: string;
  }
  
  export interface ICompanyContract {
    no: string;
    issue_date: string;
  }
  
  export interface ICompany {
    id: string;
    contactId: string;
    name: string;
    shortName: string;
    businessEntity: string;
    contract: ICompanyContract;
    type: string[];
    status: string;
    photos: ICompanyPhoto[];
    createdAt: string;
    updatedAt: string;
  
    responsiblePerson?: string;
    phone?: string;
    email?: string;
  }
  