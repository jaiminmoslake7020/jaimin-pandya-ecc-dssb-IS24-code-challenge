import {coreFailedResponse, coreSuccessResponse} from '../utils/helpers/api';
import {addNewErrorMsgWithTitle} from '../utils/helpers/feedback';
import {FailedResponseType, SuccessResponseType} from '../types/base';
import {Developer, Product} from '../types/app';

export const responseJson = (r:any) => {
  console.log('r', r.status);
  if (r.status !== 200) {
    return undefined;
  }
  return r.json();
}

export const getProducts = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/products')
      .then(r => responseJson(r))
      .then((response) => {
        if (response && Array.isArray(response)) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch(() => {

      });
  })
}

export const getProductById = (id:number) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(r => responseJson(r))
      .then((response) => {
        if (response && response.productId) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch(() => {

      });
  })
}

export const createProduct = (body:Product) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch(() => {

      });
  })
}

export const updateProduct = (id:number, body:Product) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch(() => {

      });
  })
}

export const deleteProduct = (id:number) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(r => responseJson(r))
      .then((response) => {
        console.log('response', response);
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((e) => {
        const error = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        error.caughtError = e;
        resolve({ ...coreFailedResponse, error });
      });
  })
}

export const createDeveloper = (body:Developer) : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/developers', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(r => responseJson(r))
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((e) => {
        const error = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        error.caughtError = e;
        resolve({ ...coreFailedResponse, error });
      });
  })
}

export const getDevelopers = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/developers')
      .then(r => responseJson(r))
      .then((response) => {
        if (response && Array.isArray(response)) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((e) => {
        const error = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        error.caughtError = e;
        resolve({ ...coreFailedResponse, error });
      });
  })
}

export const checkHealth = () : Promise<SuccessResponseType | FailedResponseType> => {
  return new Promise((resolve) => {
    fetch('http://localhost:3000/api/health')
      .then(r => r.text())
      .then((response) => {
        if (response) {
          resolve({ ...coreSuccessResponse, response });
        } else {
          let e = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
          e = { ...e, caughtError: response };
          resolve({ ...coreFailedResponse, error: e });
        }
      }).catch((e) => {
        const error = addNewErrorMsgWithTitle('API Error', 'Response is empty. Please try again later.');
        error.caughtError = e;
        resolve({ ...coreFailedResponse, error });
      });
  })
}

export const upsertProduct = (body:any, id:number | undefined) : Promise<SuccessResponseType | FailedResponseType> => {
  if (id) {
    return updateProduct(id, body);
  }
  return createProduct(body);
}
