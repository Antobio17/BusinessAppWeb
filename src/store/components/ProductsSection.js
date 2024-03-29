import React from 'react';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';


import './css/products-section.scss'

import Product from './Product';
import ReactPaginate from "react-paginate";

function ProductsSection(props) {

    return (
        <section className="row section-products">
            {props.products !== undefined && props.products.length > 0 ?
                <>
                    {props.products.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            addToCart={props.addToCart}
                        />
                    ))}
                </> :
                <h4 className="products-not-found fw-bold">
                    No se ha encontrado ningún articulo <SentimentDissatisfiedIcon/>
                </h4>
            }
            <ReactPaginate
                previousLabel={"Anterior"} nextLabel={"Siguiente"} pageCount={props.pageCount}
                onPageChange={props.onChangePage} containerClassName={"products-pagination"}
                disabledClassName={"pagination-disabled-button"} activeClassName={"pagination-active"}
                previousLinkClassName={"pagination-previous-button"}
                nextLinkClassName={"pagination-next-button"}
            />
        </section>
    );
}

export default ProductsSection;