import ProductsList from './components/ProductsList/ProductsList';
import ShopingList from './components/ShopingList/ShopingList';
import AddProducts from './components/AddProducts/AddProducts';
import ProductsFilters from './components/ProductsFilters/ProductsFilters';
import styles from './App.module.scss';
import produkty from '../src/common/consts/produkty';
import { useEffect, useState } from 'react';

function App() {
  const [productList, setProductList] = useState(produkty);
  const [filterProductList, setFilterProductList] = useState(produkty);
  const [shoppingList, setShoppingList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productNameFilter, setProductNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isFoodTypeFilter, setIsFoodTypeFilter] = useState(false);

  const prepatreCategoryList = () => {
    let categoryHelper = [];
    categoryHelper.push("All")
    productList.forEach(element => {
      if (!categoryHelper.find(elem => elem === element.category))
        categoryHelper.push(element.category);
    });
    return categoryHelper;
  }

  useEffect(() => {
    setCategoryList(prepatreCategoryList);
  }, [productList])


  const setIsElementBuy = (index, value) => {
    shoppingList[index].isElementBuy = value;
    debugger
    setShoppingList([...shoppingList]);
  }


  const handleAddNewProduct = (product) => {
    setProductList([...productList, product]);
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

  const handleFilter = () => {
    let filterList = productList.filter(element => {
      return element.productName.toLowerCase().includes(productNameFilter.toString().toLowerCase())
        && (categoryFilter !== "All" ? element.category === categoryFilter : true)
        && (isFoodTypeFilter ? element.isFoodType : true)
    });
    return filterList;
  }
  useEffect(() => {
    setFilterProductList(handleFilter);
  }, [productNameFilter, categoryFilter, isFoodTypeFilter])

  return (
    <div className={styles.appWrapper}>
      <AddProducts handleAddNewProduct={handleAddNewProduct} />
      <ProductsFilters
        setProductNameFilter={setProductNameFilter}
        setCategoryFilter={setCategoryFilter}
        setIsFoodTypeFilter={setIsFoodTypeFilter}
        categoryList={categoryList} />
      <div className={styles.columnsWrapper}>
        <ProductsList productList={filterProductList} handleAddProductToShoppingList={handleAddProductToShoppingList} />
        <ShopingList shoppingList={shoppingList}
          setIsElementBuy={setIsElementBuy}
          removeFromShoppingList={removeFromShoppingList} />
      </div>
    </ div>
  );
}

export default App;
