import {pageTransition, pageVariants} from "../App";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

import './css/store.scss';

import Loading from '../common/components/Loading';
import ProductsSection from './components/ProductsSection';
import FiltersSection from './components/FiltersSection';
import {getProductsData, getCategoriesData} from "../services/store";

function StorePage() {
    const limit = 9;

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(undefined);
    const [categories, setCategories] = useState(undefined);

    // Filtering
    const [sort, setSort] = useState('default');
    const [onStock, setOnStock] = useState(true);
    const [outOfStock, setOutOfStock] = useState(true);
    const [changeCategories, setChangeCategories] = useState(false);
    const [categoryExclusion, setCategoryExclusion] = useState({});

    // Products Pagination
    const [page, setPage] = useState(0);
    const offset = page * limit;
    const displayItems = products !== undefined ? products.slice(offset, offset + limit) : undefined;

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
    const onChangeCategoriesSelection = (selected, categoryID, categoryName) => {
        if (selected && categoryExclusion.hasOwnProperty(categoryName)) {
            delete categoryExclusion[categoryName];
        } else {
            categoryExclusion[categoryName] = categoryID;
        }
        setCategoryExclusion(categoryExclusion);
        setChangeCategories(!changeCategories);
    }

    useEffect(() => {
        setPage(0);
        Promise.all([
            getProductsData(sort, onStock, outOfStock, categoryExclusion)
        ]).then(response => {
            setProducts(response.length > 0 ? response[0] : []);
        }).catch(error => console.log(error)).finally(() => {
            setLoading(false);
        });

        if (categories === undefined) {
            Promise.all([
                getCategoriesData()
            ]).then(response => {
                setCategories(response.length > 0 ? response[0] : []);
            }).catch(error => console.log(error));
        }
    }, [sort, onStock, outOfStock, changeCategories]);

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
                            <ProductsSection products={displayItems} page={page}
                                             pageCount={Math.ceil(products.length/limit)}
                                             onChangePage={onChangePage}/>
                        </section>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default StorePage;