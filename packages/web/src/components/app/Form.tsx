import * as React from 'react';
import {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, useNavigate} from 'react-router-dom';
import {InputAdornment, TextField, Alert} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {
  methodologiesList, MethodologyType, Product, ProductLabel
} from '../../types/app';
import DeveloperForm from './DeveloperForm';
import DeveloperSelection from './DeveloperSelection';
import {ErrorType, FailedResponseType, SuccessResponseType} from '../../types/base';
import {addNotification} from '../../redux/reducers/feedback';
import {addNewErrorMsgWithTitle, addNewSuccessMsgWithTitle} from '../../utils/helpers/feedback';
import {useAppDispatch} from '../../redux/store';
import validateForm, {isValidUrl} from '../../utils/helpers/validateForm';
import {upsertProduct} from '../../services/api';
import {addProduct, updateProduct} from '../../redux/reducers/productsData';

export type FormProps = {
  product:Product | undefined
};

export default function Form(props:FormProps) {
  const bcGovUrl = 'https://github.com/bcgov/';
  const {
    product
  } = props;
  const isCreate = !product;

  const navigate = useNavigate();
  const {
    productId, productName, productOwnerName, scrumMasterName, DeveloperIds, startDate, location, methodology
  } = product || {};

  const [inputProductName, setInputProductName] = useState<string>(productName || '');
  const [inputProductOwnerName, setInputProductOwnerName] = useState<string>(productOwnerName || '');
  const [inputScrumMasterName, setInputScrumMasterName] = useState<string>(scrumMasterName || '');
  const [inputStartDate, setInputStartDate] = useState<Dayjs | null>(
    dayjs(startDate || (new Date()))
  );
  const [inputLocation, setInputLocation] = useState<string>(location || '');
  const [inputMethodology, setInputMethodology] = useState<MethodologyType>(methodology || methodologiesList[0]);
  const [inputDevelopers, setInputDevelopers] = useState<string[]>(DeveloperIds || []);

  const dispatch = useAppDispatch();

  const upsertProductFunction = useCallback((id:number | undefined, body:Product) => {
    upsertProduct(body, id).then((r:SuccessResponseType | FailedResponseType) => {
      const { isSuccess, response: data, error } = r;
      if (isSuccess) {
        if (isCreate) {
          dispatch(addProduct(data));
          navigate(`/view/${data.productId}`);
          dispatch(addNotification(addNewSuccessMsgWithTitle('Product Created', `A new product "${data.productName}" has been added.`)));
        } else {
          dispatch(updateProduct(data));
          navigate(`/view/${data.productId}`);
          dispatch(addNotification(addNewSuccessMsgWithTitle('Product Updated', `"${data.productName}" has been updated.`)));
        }
      } else if (error && error.id) {
        dispatch(addNotification(error));
      } else {
        const eTwo = addNewErrorMsgWithTitle();
        dispatch(addNotification(eTwo));
      }
    });
  }, [navigate])

  const upsertProductFunctionValidateAndSubmit = useCallback(() => {
    const body = {
      productName: inputProductName,
      startDate: inputStartDate ? inputStartDate.toDate() : null,
      methodology: inputMethodology,
      scrumMasterName: inputScrumMasterName,
      productOwnerName: inputProductOwnerName,
      location: inputLocation,
      Developers: inputDevelopers
    };
    const validation = validateForm(body);
    const {
      isSuccess, response: data, errorList
    } = validation;
    if (isSuccess) {
      upsertProductFunction(productId, data as Product);
    } else if ((errorList || []).length > 0) {
      errorList.forEach((e:ErrorType) => {
        dispatch(addNotification(e));
      });
    } else {
      dispatch(addNotification(addNewErrorMsgWithTitle('Validation', 'Error while doing validation.')));
    }
  }, [
    inputProductName, inputDevelopers,
    inputLocation, inputProductOwnerName,
    inputMethodology, inputStartDate,
    inputScrumMasterName, inputLocation, productId, isCreate,
    upsertProductFunction
  ]);

  const addDeveloper = useCallback((item:string) => {
    if (inputDevelopers.length <= 4) {
      setInputDevelopers([...inputDevelopers, item]);
    } else {
      dispatch(addNotification(addNewErrorMsgWithTitle('Add Developer', 'New created developer can not be added as max 5 developers are allowed.')))
    }
  }, [inputDevelopers]);

  // @ts-ignore
  return (
    <TableContainer className="form-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product list table">
        <TableBody>
          {
            productId
              ? (
                <TableRow>
                  <TableCell className="hidden md:table-cell" component="th">{ProductLabel.productId}</TableCell>
                  <TableCell scope="row">
                    <Link className="btn btn-link" to={`/view/${productId}`} >
                      {productId}
                    </Link>
                  </TableCell>
                </TableRow>
              ) : null
          }
          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.productName}</TableCell>
            <TableCell scope="row" >
              <TextField
                label="Name"
                name="name"
                value={inputProductName}
                onChange={(e) => {
                  setInputProductName(e.target.value);
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.startDate}</TableCell>
            <TableCell scope="row" >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={inputStartDate}
                    label={ProductLabel.startDate}
                    onChange={(newValue:any) => {
                      setInputStartDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.methodology}</TableCell>
            <TableCell scope="row">
              <FormControl fullWidth>
                <InputLabel id="select-label">{ProductLabel.methodology}</InputLabel>
                <Select
                  labelId="select-label"
                  id="methodology"
                  value={inputMethodology}
                  label={ProductLabel.methodology}
                  onChange={(e:SelectChangeEvent) => {
                    setInputMethodology(e.target.value as MethodologyType);
                  }}
                >
                  {
                    methodologiesList.map((m:MethodologyType) => {
                      return <MenuItem key={m} value={m}>{m}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.scrumMasterName}</TableCell>
            <TableCell scope="row">
              <TextField
                label={ProductLabel.scrumMasterName}
                name="scrumMasterName"
                value={inputScrumMasterName}
                onChange={(e) => {
                  setInputScrumMasterName(e.target.value);
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>
          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.productOwnerName}</TableCell>
            <TableCell scope="row">
              <TextField
                label={ProductLabel.productOwnerName}
                name="productOwnerName"
                value={inputProductOwnerName}
                onChange={(e) => {
                  setInputProductOwnerName(e.target.value);
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>

          <TableRow

          >
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.location}</TableCell>
            <TableCell scope="row">
              <TextField
                label={ProductLabel.location}
                name="location"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{bcGovUrl}</InputAdornment>,
                }}
                value={inputLocation.replace(bcGovUrl, '')}
                onChange={(e) => {
                  const newLocation = `${bcGovUrl}${e.target.value}`;
                  if (isValidUrl(newLocation)) {
                    setInputLocation(newLocation);
                  } else {
                    dispatch(addNotification(addNewErrorMsgWithTitle('Incorrect Location', 'Incorrect Location. Location should be correct URL.')))
                  }
                }}
                fullWidth
                required
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="hidden md:table-cell" component="th">{ProductLabel.Developers}</TableCell>
            <TableCell scope="row">
              <DeveloperSelection
                Developers={inputDevelopers}
                setDevelopers={(value:string[]) => {
                  if (value.length > 5) {
                    dispatch(addNotification(addNewErrorMsgWithTitle('Add Developer', 'Selected developer can not be added as max 5 developers are allowed.')))
                  } else {
                    setInputDevelopers(value)
                  }
                }} />
              {
                inputDevelopers.length < 5
                  ? (
                    <DeveloperForm
                      addDeveloperItem={addDeveloper}
                    />
                  ) : <Alert color="info" className="mt-4" >Maximum allowed developers are added.</Alert>
              }
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell className="hidden md:table-cell" component="td" />
            <TableCell component="td" >
              <div className="w-full flex justify-end item-centere gap-4">
                {
                  isCreate
                    ? <Link className="btn btn-white" to="/">Cancel</Link>
                    : <Link className="btn btn-white" to={`/view/${productId}`}>Cancel</Link>
                }
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    upsertProductFunctionValidateAndSubmit();
                  }}
                >
                  {isCreate ? 'Create New Product' : 'Update'}
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
