import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import {Alert} from '@mui/material';
import {DeveloperName, Product, ProductLabel} from '../../types/app';
import DeveloperLabel from './DeveloperLabel';

export type ProductViewBoxProps = {
  product:Product
};

export default function ProductViewBox(props:ProductViewBoxProps) {
  const {
    product
  } = props;

  const {
    productId, productName, productOwnerName, scrumMasterName, Developers, startDate, location, methodology
  } = product;

  let ghRepoLink = location.toLowerCase();
  if (window.innerWidth < 768) {
    ghRepoLink = ghRepoLink.replace('https://github.com', 'GitHub');
  }

  // @ts-ignore
  return (
    product
      ? (
        <TableContainer className="product-view-table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product list table">
            <TableBody>
              <TableRow
                key="productId"
              >
                <TableCell component="th">{ProductLabel.productId}</TableCell>
                <TableCell scope="row">
                  <Link className="btn btn-link" to={`/view/${productId}`} >
                    {productId}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow
                key="productName"
              >
                <TableCell component="th">{ProductLabel.productName}</TableCell>
                <TableCell scope="row">
                  <Link className="btn btn-link" to={`/view/${productId}`} >
                    {
                      productName
                    }
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow
                key="startDate"
              >
                <TableCell component="th">{ProductLabel.startDate}</TableCell>
                <TableCell scope="row">
                  {(new Date(startDate)).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow
                key="methodology"
              >
                <TableCell component="th">{ProductLabel.methodology}</TableCell>
                <TableCell scope="row">
                  {methodology}
                </TableCell>
              </TableRow>
              <TableRow
                key="scrumMasterName"
              >
                <TableCell component="th">{ProductLabel.scrumMasterName}</TableCell>
                <TableCell scope="row">
                  {scrumMasterName}
                </TableCell>
              </TableRow>
              <TableRow
                key="productOwnerName"
              >
                <TableCell component="th">{ProductLabel.productOwnerName}</TableCell>
                <TableCell scope="row">
                  {productOwnerName}
                </TableCell>
              </TableRow>

              <TableRow
                key="location"
              >
                <TableCell component="th">{ProductLabel.location}</TableCell>
                <TableCell scope="row">
                  <a className="btn btn-link text-sm p-0 m-0 lowercase break-words " href={`https://${location}`} target="_blank" rel="noreferrer" >{ghRepoLink}</a>
                </TableCell>
              </TableRow>

              <TableRow
                key="Developers"
              >
                <TableCell component="th">{ProductLabel.Developers}</TableCell>
                <TableCell scope="row" className="p-2 lg:p-4">
                  <div className="flex flex-col md:flex-row md:flex-wrap" >
                    {Developers.map((d:DeveloperName, index:number) => {
                    // eslint-disable-next-line react/no-array-index-key
                      return <DeveloperLabel key={`${d}-${index}`} developerName={d} />
                    })}
                  </div>
                </TableCell>
              </TableRow>

              <TableRow
                key="Actions"
              >
                <TableCell component="th">Actions</TableCell>
                <TableCell scope="row" className="p-2 lg:p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-end " >
                    <Link className="btn btn-white" to="/">View All</Link>
                    <Link className="btn btn-blue" to={`/update/${product.productId}`}>
                      Edit
                    </Link>
                    <Link className="btn btn-red" to={`/remove/${product.productId}`}>Delete</Link>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : <Alert className="mt-4" severity="info" >There is no product with this ID.</Alert>
  )
}
