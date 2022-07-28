import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {motion} from "framer-motion";

import './css/filters-section.scss';
import {pageTransition, pageVariants} from "../../App";

function FiltersSection(props) {

    return (
        <section className="section-filters">
            <span className="title">FILTROS</span>
            <section className="filters-sort">
                <span className="filter-title fw-bold">ORDENAR POR</span>
                <select
                    value={props.sort}
                    onChange={(e) => props.onChangeSortMode(e.target.value)}
                >
                    <option value="moreRecent">Más recientes</option>
                    <option value="lowestPrice">Más baratos</option>
                    <option value="highestPrice">Más caros</option>
                </select>
            </section>
            <section className="filters-availability">
                <span className="filter-title fw-bold">DISPONIBILIDAD</span>
                <FormControlLabel labelPlacement="start" label="En stock" control={
                    <Checkbox defaultChecked color="primary"
                              onChange={(e) => props.onChangeOnStock(e.target.checked)}
                    />
                }/>
                <FormControlLabel labelPlacement="start" label="No disponible" control={
                    <Checkbox defaultChecked color="primary"
                              onChange={(e) => props.onChangeOutOfStock(e.target.checked)}
                    />
                }/>
            </section>
            <section className="filters-categories">
                {props.categories !== undefined && props.categories.length > 0 &&
                <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}
                            transition={pageTransition} className="row categories-container">
                    <span className="filter-title fw-bold">CATEGORÍAS</span>
                    {props.categories.map(category => (
                        <FormControlLabel key={category.id} labelPlacement="start" label={category.name} control={
                            <Checkbox defaultChecked color="primary"
                                      onChange={
                                          (e) => props.onChangeCategoriesSelection(
                                              e.target.checked, category.id
                                          )
                                      }
                            />
                        }/>
                    ))
                    }
                </motion.div>
                }
            </section>
        </section>
    );
}

export default FiltersSection;