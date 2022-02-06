import React from 'react';
import styles from '../../common/styles/Headers.module.scss';
import { useInput } from '../hooks/useInput';
import { useCheckbox } from '../hooks/useCheckbox';
import { useState } from 'react';
function AddProducts(props) {
    const { value: productName, bind: bindProductName, reset: resetProductName } = useInput('');
    const { value: category, bind: bindCategory, reset: resetCategory } = useInput('');
    const { value: isFoodType, bind: bindIsFoodType, reset: resetIsFoodType } = useCheckbox(false);
    const [isFormValidate, setIsFormValidate] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!productName || !category) {
            setIsFormValidate(false);
            return;
        }
        let product = {
            productName: productName,
            category: category,
            isFoodType: isFoodType
        }
        props.handleAddNewProduct(product);
        resetProductName();
        resetCategory();
        resetIsFoodType();
    }

    return (
        <div className={styles.Wrapper}>
            <span> Add new product: </span>
            <form onSubmit={handleSubmit}>
                <label>
                    Product name:
                    <input type="text" {...bindProductName} />
                    {(productName && !isFormValidate) && <label>Product name is required</label>}
                </label>
                <label>
                    Category:
                    <input type="text" {...bindCategory} />
                    {(productName && !isFormValidate) && <label>Category is required</label>}
                </label>
                <input type="checkbox" {...bindIsFoodType} />Is Food Type
                <button value="Add" type="Submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProducts;