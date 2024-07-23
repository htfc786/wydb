declare namespace API {
  type BaseResponseListWyCollection_ = {
    code?: number;
    data?: WyCollection[];
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseWyCollection_ = {
    code?: number;
    data?: WyCollection;
    message?: string;
  };

  type deleteUsingDELETEParams = {
    /** id */
    id: number;
  };

  type getByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type putUsingPUTParams = {
    /** id */
    id: number;
  };

  type WyCollection = {
    createdAt?: string;
    description?: string;
    id?: number;
    name?: string;
  };
}
