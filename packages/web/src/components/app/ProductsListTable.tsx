import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {DeveloperName, Product, ProductLabel} from '../../types/app';
import {useAppSelector} from '../../redux/store';
import DeveloperLabel from './DeveloperLabel';
import SearchBar from './SearchBar';
import ProductViewBox from './ProductViewBox';

export default function ProductsListTable() {
  const {
    products: productsInitials
  } = useAppSelector((store) => store.productsData);

  const [products, setFilteredProducts] = useState<Product[]>(productsInitials);

  useEffect(() => {
    setFilteredProducts(productsInitials);
  }, [productsInitials])

  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <h1 className="my-2">
            List Products (Total
            {' '}
            <strong>{products.length}</strong>
            {' '}
            products.)
          </h1>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3">
          <SearchBar setFilteredProducts={(data:Product[]) => {
            console.log('data', data);
            setFilteredProducts(data);
          }} />
        </div>
      </div>
      <TableContainer className="product-list-table" component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="product list table">
          <TableHead>
            <TableRow>
              <TableCell className=" table-cell lg:hidden " >Product Info</TableCell>
              <TableCell className=" hidden lg:table-cell " >{ProductLabel.productId}</TableCell>
              <TableCell className=" hidden lg:table-cell " >{ProductLabel.productName}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="right">{ProductLabel.scrumMasterName}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="right">{ProductLabel.productOwnerName}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="center">{ProductLabel.Developers}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="right">{ProductLabel.startDate}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="right">{ProductLabel.methodology}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="center">{ProductLabel.location}</TableCell>
              <TableCell className=" hidden lg:table-cell " align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tbody">
            {products.map((product: Product) => (
              <TableRow
                key={product.productId}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell className=" table-cell lg:hidden p-0 " >
                  <ProductViewBox product={product} />
                </TableCell>
                <TableCell className=" hidden lg:table-cell " component="th" scope="row">
                  <Link className="btn btn-link" to={`/view/${product.productId}`}>
                    {product.productId}
                  </Link>
                </TableCell>
                <TableCell className=" hidden lg:table-cell " component="th" scope="row">
                  <Link className="btn btn-link" to={`/view/${product.productId}`}>
                    {product.productName}
                  </Link>
                </TableCell>
                <TableCell className=" hidden lg:table-cell " align="right">{product.scrumMasterName}</TableCell>
                <TableCell className=" hidden lg:table-cell " align="right">{product.productOwnerName}</TableCell>
                <TableCell className=" hidden lg:table-cell p-2 lg:p-4 " align="left">
                  <div className="flex flex-col md:flex-row md:flex-wrap" >
                    {product.Developers.map((d: DeveloperName, index:number) => {
                      return <DeveloperLabel key={`${d}-${index}`} developerName={d} />;
                    })}
                  </div>
                </TableCell>
                <TableCell className=" hidden lg:table-cell " align="right">{(new Date(product.startDate)).toLocaleDateString()}</TableCell>
                <TableCell className=" hidden lg:table-cell " align="right">{product.methodology}</TableCell>
                <TableCell className=" hidden lg:table-cell " align="center">
                  <a className="btn btn-link text-sm p-0 m-0 lowercase break-words" href={`https://${product.location}`} target="_blank" rel="noreferrer" >{product.location.toLowerCase()}</a>
                </TableCell>
                <TableCell className=" hidden lg:table-cell " align="center">
                  <Link className="mr-4" to={`/update/${product.productId}`}>
                    <FontAwesomeIcon icon="pencil-alt" />
                  </Link>
                  <Link to={`/remove/${product.productId}`}><FontAwesomeIcon icon="trash" /></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
