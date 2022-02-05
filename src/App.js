import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import AddProducts from './components/AddProducts/AddProducts';
import ProductsFilters from './components/ProductsFilters/ProductsFilters';
import styles from './App.module.scss';
import produkty  from '../src/common/consts/produkty';
import { useEffect, useState } from 'react';

function App() {
  const [productList, setProductList] = useState(produkty);
  const [filterProductList, setFilterProductList] = useState(productList);
  const [shoppingList, setShoppingList] = useState([]);
  


  const prepatreCategoryList = () =>{
    let categoryHelper = [];
    categoryHelper["All"] = "All";
    productList.forEach(element => {
      if(!categoryHelper[element.category])
       categoryHelper[element.category] = element.category;
    });
    debugger
    return categoryHelper;
 }
 const [categoryList, setCategoryList] = useState(prepatreCategoryList());



  const handleAddNewProduct = (product) => {
    if(!categoryList[product.category])
      setCategoryList(...categoryList,product.category);
    setProductList([...productList,product]);
  }

  const handleAddProductToShoppingList = (product) => {
    product.isElementBuy = false;
    setShoppingList([...shoppingList,product]);
  }

  const removeFromShoppingList = (index) =>{
    if (index > -1) {
      shoppingList.splice(index,1);
      setShoppingList([...shoppingList]);
    }
  }

  const handleFilter = (filterElement) =>{
    setFilterProductList(productList.filter(element => {
      return element.productName.toLowerCase().includes(filterElement.searchedProductText.toLowerCase())
        && filterElement.category !== "All" ? element.category === filterElement.category : true
        && filterElement.isFoodTypeFilter? element.isFoodType : true
    }));
  }


  return (
    <div className={styles.appWrapper}>
        <AddProducts handleAddNewProduct={handleAddNewProduct}/>
        <ProductsFilters handleFilter={handleFilter} categoryList={categoryList}/>
        <div className={styles.columnsWrapper}>
          <ProductsList productList={filterProductList} handleAddProductToShoppingList={handleAddProductToShoppingList}/>
          <ShopingList shoppingList={shoppingList} removeFromShoppingList={removeFromShoppingList}/>
        </div>
    </ div>
  );
}

export default App;
