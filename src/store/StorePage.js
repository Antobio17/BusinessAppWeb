import {pageTransition, pageVariants, webServiceURL} from "../App";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import axios from "axios";

import './css/store.scss';

import Loading from '../common/components/Loading';
import ProductsSection from './components/ProductsSection';
import FiltersSection from './components/FiltersSection';

function StorePage() {
    const limit = 9;

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(undefined);
    const [categories, setCategories] = useState(undefined);
    const [page, setPage] = useState(1);

    // States for filtering
    const [sort, setSort] = useState(undefined);
    const [onStock, setOnStock] = useState(true);
    const [outOfStock, setOutOfStock] = useState(true);
    const [categoryExclusion, setCategoryExclusion] = useState({});


    async function getProductsData() {
        const params = {
            offset: (page - 1) * limit,
            limit: limit,
            sort: sort,
            onStock: onStock,
            outOfStock: outOfStock,
            categoryExclusion: categoryExclusion,
        };

        await axios.post(webServiceURL + '/api/store/product/get', params, {
            withCredentials: true
        }).then(response => {
            const data = response.data.data;
            setProducts('products' in data ? data.products : undefined);
            setLoading(false);
        });
    }

    async function getCategoriesData() {
        await axios.post(webServiceURL + '/api/store/category/get', {}, {
            withCredentials: true
        }).then(response => {
            const data = response.data.data;
            setCategories('categories' in data ? data.categories : undefined);
        });
    }

    const onChangePage = ({selected}) => {
        setPage(selected);
    }
    const onChangeSortMode = (selected) => {
        setSort(selected);
    }
    const onChangeOnStock = (selected) => {
        setOnStock(selected);
    }
    const onChangeOutOfStock = (selected) => {
        setOutOfStock(selected);
    }
    const onChangeCategoriesSelection = (selected, categoryID) => {
        if (selected && categoryExclusion.hasOwnProperty(categoryID)) {
            delete categoryExclusion[categoryID];
        } else {
            categoryExclusion[categoryID] = selected;
        }
        setCategoryExclusion(categoryExclusion);
    }

    useEffect(() => {
        getProductsData().then().catch(error => {
            console.log('Error al recuperar los productos: ' + error);
        });

        if (categories === undefined) {
            getCategoriesData().then().catch(error => {
                console.log('Error al recuperar las categorías: ' + error);
            });
        }
    }, [sort, page, onStock, outOfStock, categoryExclusion]);

    // noinspection JSUnresolvedVariable
    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <main className="main store">
                <section className="store-intro">
                    <h1>Catálogo</h1>
                    <p>
                        Busca en nuestro catálogo los productos que deseas y ¡disfruta de la mayor calidad con un
                        simple click!
                    </p>
                </section>
                {loading ? <Loading/> : (
                    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                                transition={pageTransition} className="row sections-container">
                        <section className="col-12 col-lg-4">
                            <FiltersSection
                                sort={sort}
                                onChangeSortMode={onChangeSortMode}
                                onChangeOnStock={onChangeOnStock}
                                onChangeOutOfStock={onChangeOutOfStock}
                                onChangeCategoriesSelection={onChangeCategoriesSelection}
                                categories={categories}
                            />
                        </section>
                        <section className="col-12 col-lg-8">
                            <ProductsSection products={products} page={page} onChangePage={onChangePage}/>
                        </section>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default StorePage;