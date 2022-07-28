import React from 'react';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';


import './css/products-section.scss'

import Product from './Product';
import {webServiceURL} from "../../App";
import ReactPaginate from "react-paginate";

function ProductsSection(props) {

    return (
        <section className="row section-products">
            {props.products !== undefined && props.products.length > 0 ?
                <>
                    {props.products.map(product => (
                        <Product
                            key={product.id}
                            name={product.name}
                            src={webServiceURL + '/images/' +product.src}
                            amount={product.amount}
                            stock={product.stock}
                        />
                    ))}
                </> :
                <h4 className="products-not-found fw-bold">
                    No se ha encontrado ningún articulo <SentimentDissatisfiedIcon/>
                </h4>
            }
            <ReactPaginate
                previousLabel={"Anterior"} nextLabel={"Siguiente"} pageCount={props.page}
                onPageChange={props.onChangePage} containerClassName={"products-pagination"}
                disabledClassName={"pagination-disabled-button"} activeClassName={"pagination-active"}
                previousLinkClassName={"pagination-previous-button"}
                nextLinkClassName={"pagination-next-button"}
            />
        </section>
    );
}

export default ProductsSection;