import {coreFailedResponse, coreSuccessResponse} from './api';
import {addNewErrorMsgWithTitle} from './feedback';
import {ErrorType, FailedResponseType, SuccessResponseType} from '../../types/base';
import {methodologiesList} from '../../types/app';

export function isValidUrl(string:string) {
  try {
    // eslint-disable-next-line no-new
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default function validateForm(body:any): FailedResponseType | SuccessResponseType {
  const success = { ...coreSuccessResponse, response: body };
  const e = addNewErrorMsgWithTitle('Form Validation', 'Form has errors!');
  if (body) {
    const errorList = [] as ErrorType[];
    const {
      productName, productOwnerName, scrumMasterName, Developers, startDate, location, methodology
    } = body || {};
    if (!productName) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Name must not be empty.'));
    }
    if (!productOwnerName) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Product Owner Name must not be empty.'));
    }
    if (!scrumMasterName) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Scrum Master Name must not be empty.'));
    }
    if (!isValidUrl(location)) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Location must not be empty.'));
    }
    if (!methodology) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Methodoly must not be empty.'));
    }
    if (!methodologiesList.includes(methodology)) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Methodoly must be selected and should be from Selection list.'));
    }
    if (!startDate) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Start date must not be empty.'));
    }
    if (!Developers) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'At least one developer must be added.'));
    }
    if (Developers.length === 0) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'At least one developer must be added.'));
    }
    if (Developers.length > 5) {
      errorList.push(addNewErrorMsgWithTitle('Form Validation', 'Max five developers can be added.'));
    }
    if (errorList.length === 0) {
      return success;
    }
    return {...coreFailedResponse, error: e, errorList};
  }
  return {...coreFailedResponse, error: e, errorList: [e]};
}
