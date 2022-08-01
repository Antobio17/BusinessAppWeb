import {pageTransition, pageVariants} from "../App";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

import './css/store.scss';

import Loading from '../common/components/Loading';
import ShoppingCart from './components/ShoppingCart';
import FiltersSection from './components/FiltersSection';
import ProductsSection from './components/ProductsSection';
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

    //Shopping cart
    const [cartProducts, setCartProducts] = useState(localStorage.getItem('cartProducts') ?
        JSON.parse(localStorage.getItem('cartProducts')) : []);

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

    // Shopping Cart functions
    const addToCart = (product) => {
        const {id, stock} = product;
        const auxCartProducts = cartProducts.slice();
        let alreadyInCart = false;

        auxCartProducts.forEach(cartProd => {
            if (cartProd.id === id) {
                if (cartProd.quantity < stock) {
                    cartProd.quantity++;
                }
                alreadyInCart = true;
            }
        });

        if (!alreadyInCart) {
            auxCartProducts.push({...product, quantity: 1});
        }

        setCartProducts(auxCartProducts);
    }
    const removeFromCart = (product, removeAll) => {
        const auxCartProducts = cartProducts.slice();

        auxCartProducts.forEach(cartProd => {
            if (cartProd.id === product.id) {
                console.log(removeAll);
                if (removeAll) {
                    auxCartProducts.pop();
                    console.log(auxCartProducts);
                } else {
                    cartProd.quantity--;
                }
            }
        });
        setCartProducts(auxCartProducts);
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

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
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
                    <ShoppingCart cartProducts={cartProducts} addToCart={addToCart} removeFromCart={removeFromCart}/>
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
                                             pageCount={Math.ceil(products.length / limit)}
                                             onChangePage={onChangePage}
                                             addToCart={addToCart}/>
                        </section>
                    </motion.div>
                )}
            </main>
        </motion.div>
    );
}

export default StorePage;