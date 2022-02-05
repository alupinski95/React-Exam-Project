import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function ProductsList(props) {

  const addElementOnLeftClick = (event,product) => {
    if (event.type === 'click') 
      props.handleAddProductToShoppingList(product);
  }

  const getUniqId = (index, productName)=>{
    return "ShoppingList" + productName+index;
  }

  const elementsOfList = props.productList.map(
    (element,index) => 
      <div key={getUniqId(index,element)}>
        <p onClick={(e)=> addElementOnLeftClick(e, element)}>
        {element.productName}
        </p>
      </div>
  );
  
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list:</p>
        {elementsOfList}
      </header>
      
    </div>
  );
}

export default ProductsList;
