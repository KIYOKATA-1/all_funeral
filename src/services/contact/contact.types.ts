export interface IContact {
    id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IUpdateContact {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
  }
  