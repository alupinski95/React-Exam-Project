import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import { useInput } from '../hooks/useInput';
import { useCheckbox } from '../hooks/useCheckbox';
import { useSelect } from '../hooks/useSelect';


function ProductsFilters(props) {
    const { value: productNameFilter, bind: bindProductNameFilter, reset: resetProductNameFilter } = useInput('', props.setProductNameFilter);
    const { value: categoryFilter, bind: bindCategoryFilter, reset: resetCategoryFilter } = useSelect(props.categoryList[0], props.setCategoryFilter);
    const { value: isFoodTypeFilter, bind: bindIsFoodTypeFilter, reset: resetIsFoodTypeFilter } = useCheckbox(false, props.setIsFoodTypeFilter);

    const resetFilters = () => {
        resetCategoryFilter();
        resetProductNameFilter();
        resetIsFoodTypeFilter();
    }



    const elementsOfDropdown = props.categoryList.map(
        element =>
            <option value={element} key={element}>
                {element}
            </option>
    );


    return (
        <div className={styles.Wrapper}>
            <h3>
                Products Filters
            </h3>
            <label>
                Product name:
                <input type="text" {...bindProductNameFilter} />
            </label>
            <label>
                Category:
                <select
                    {...bindCategoryFilter}
                >
                    {elementsOfDropdown}
                </select>
            </label>
            <input type="checkbox" {...bindIsFoodTypeFilter} />Is Food Type
            <button value="Reset filters" onClick={resetFilters}>Reset filters</button>
        </div>
    );
};

export default ProductsFilters;