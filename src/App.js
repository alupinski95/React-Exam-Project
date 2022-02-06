import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import AddProducts from './components/AddProducts/AddProducts';
import ProductsFilters from './components/ProductsFilters/ProductsFilters';
import styles from './App.module.scss';
import produkty from '../src/common/consts/produkty';
import { useState } from 'react';

function App() {
  const [productList, setProductList] = useState(produkty);
  const [filterProductList, setFilterProductList] = useState(productList);
  const [shoppingList, setShoppingList] = useState([]);

  // const categories = productList.map(element => {
  //   if (!categoryHelper.find(elem => elem === element.category))
  //     categoryHelper.push(element.category);
  // });

  // const prepatreCategoryList = () => {

  //   let categoryHelper = [];
  //   categoryHelper.push("All")
  //   productList.forEach(element => {
  //     if (!categoryHelper.find(elem => elem === element.category))
  //       categoryHelper.push(element.category);
  //   });
  //   return categoryHelper;
  // }
  const [categoryList, setCategoryList] = useState(categories);



  const handleAddNewProduct = (product) => {
    if (!categoryList.find(elem => elem === product.category))
      setCategoryList(...categoryList, product.category);
    debugger
    setProductList([...productList, product]);
    // setFilterProductList([...filterProductList, product]);
  }

  const handleAddProductToShoppingList = (product) => {
    product.isElementBuy = false;
    setShoppingList([...shoppingList, product]);
  }

  const removeFromShoppingList = (index) => {
    if (index > -1) {
      shoppingList.splice(index, 1);
      setShoppingList([...shoppingList]);
    }
  }

  const handleFilter = (filterElement) => {
    let filterList = productList.filter(element => {
      return element.productName.toLowerCase().includes(filterElement.productName.toString().toLowerCase())
        && filterElement.category !== "All" ? element.category === filterElement.category : true
          && filterElement.isFoodTypeFilter ? element.isFoodType : true
    });
    return filterList;
  }


  return (
    <div className={styles.appWrapper}>
      <AddProducts handleAddNewProduct={handleAddNewProduct} />
      <ProductsFilters handleFilter={handleFilter} categoryList={categoryList} />
      <div className={styles.columnsWrapper}>
        <ProductsList productList={handleFilter({ productName: "", category: "All", isFoodType: false })} handleAddProductToShoppingList={handleAddProductToShoppingList} />
        <ShopingList shoppingList={shoppingList} removeFromShoppingList={removeFromShoppingList} />
      </div>
    </ div>
  );
}

export default App;
