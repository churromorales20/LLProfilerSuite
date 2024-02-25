import { Buffer } from 'buffer';
import { IShoppingRequest } from '@ll-interfaces/IShoppingRequest';
import { IOrderQueryItem } from '@ll-interfaces/IOrderQueryItem';

export class LLShoppingManager {

  createRequestFromQuery(orderQueryString: string, ipAddress: string): string {
    if (orderQueryString !== '') {
      try {
        const request = this.parseOrderQuery(orderQueryString);

        if (!Array.isArray(request.items) || !this.isEachItemValid(request.items)) {
          const error = new Error();
          throw error;
        }

        request.ip_address = ipAddress;

        return this.serializeRequest(request);

      } catch (error) {
        console.log('Invalid order data'); 
      }
    }

    return this.serializeRequest({
      ip_address: ipAddress
    });
  }

  serializeRequest(request: IShoppingRequest) : string {
    const jsonStr = JSON.stringify(request);
    const base64Str = Buffer.from(jsonStr).toString('base64');

    return encodeURIComponent(base64Str);
  }

  private isEachItemValid(items: IOrderQueryItem[]) {
    return items.every((item) => {
      return item.id !== null && 
          item.id !== undefined &&
          item.qty !== null &&
          item.qty !== undefined
    });
  }

  private parseOrderQuery(orderQueryString: string): IShoppingRequest {
    console.log('orderQueryString');
    console.log(orderQueryString);
    
    const decodedUrlEncoded = decodeURIComponent(orderQueryString);
    const decodedBase64 = Buffer.from(decodedUrlEncoded, 'base64').toString('utf-8')
    const request = JSON.parse(decodedBase64) as IShoppingRequest;
    console.log('EL request');
    console.log(request);
    
    if (!request) {
      throw new Error('No se pudo parsear la consulta de orden.');
    }

    return request;
  }
}