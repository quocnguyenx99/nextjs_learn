import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = RequestInit & {
    baseUrl?: string |undefined

}

const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
  message :string 
  errors : {
    field: string,
    message: string
  }[]
}

class HttpError extends Error {
    status : number;
    payload: {
      message: string,
      [key: string]: any
    }
    constructor({ status, payload}: { status: number, payload: any}) {
        super('HttpError');
        this.status = status;
        this.payload = payload;
    }

}


export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({status, payload} : {status:422, payload: EntityErrorPayload}) {
    super({status, payload})

    if(status !== ENTITY_ERROR_STATUS) {
      throw new Error(`Lỗi xác thực dữ liệu, status: ${status}`)
    }
    this.status = status;
    this.payload = payload;
  }

}

class SessionToken {
  private token ='';
  get value() {
    return this.token;
  }

  // Nếu gọi ở server thì sẽ bị lỗi

  set value(token:string) {
    if(typeof window === undefined) {
      throw new Error('Không thể set token on Server side')
    }
    this.token = token;
  }

}

export const clientSessionToken = new SessionToken();

const request = async <T> (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url:string, options?: CustomOptions | undefined) : Promise<{status: number, payload: T}> => {
    const body = options?.body ? JSON.stringify(options?.body) : undefined 
    const baseHeaders = {
        "Content-Type": "application/json",
        Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
    }

    // Nếu không truyền baseUrl hoặc (baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
    const baseUrl = options?.baseUrl  === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options?.baseUrl


    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options, 
        headers: {
            ...baseHeaders, 
           ...options?.headers
        },
        body,
        method
    } )


  if (!res.ok) {
    const payload= await res.json();
    const data = {
      status: res.status,
      payload,
    };

    if(res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data as {
        status: 422,
        payload: EntityErrorPayload,
      })
    } else {
      throw new HttpError(data);
    }
  }

  try {
    const payload: T = await res.json();
    const data = {
      status: res.status,
      payload,
    };

    if(['/auth/login', '/auth/register'].includes(url)) {
      clientSessionToken.value = (payload as LoginResType).data.token
    } else if('auth/logout'.includes(url)) {
      clientSessionToken.value = ''
    }
    return  data
  } catch (error) {
    throw new HttpError({ status: 500, payload: "Invalid JSON response" });
  }
}   


const http = {
    get: <T>(url: string, options?: Omit<CustomOptions, "body">) =>
      request<T>("GET", url, options),
  
    post: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">| undefined) =>
      request<T>("POST", url, { ...options, body }),
  
    put: <T>(url: string, body: any, options?: Omit<CustomOptions, "body"> | undefined) =>
      request<T>("PUT", url, { ...options, body }),
  
    delete: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">| undefined) =>
      request<T>("DELETE", url, { ...options, body }),
  }

export default http;