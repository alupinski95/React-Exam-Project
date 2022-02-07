import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import listElementStyles from "../../common/styles/ListElement.module.scss"


class ShopingList extends React.Component {
  handleOnClick = (event, product, index) => {
    event.preventDefault();
    if (event.type === 'click')
      this.props.removeFromShoppingList(index);
    else if (event.type === 'contextmenu') {
      this.props.setIsElementBuy(index, !product.isElementBuy);
    }
  }

  getUniqId = (index, productName) => {
    return "ShoppingList" + productName + index;
  }

  render() {
    const elementsOfList = this.props.shoppingList.map(
      (element, index) =>
        <div key={this.getUniqId(index, element.productName)}>
          <p
            onContextMenu={(e) => { this.handleOnClick(e, element, index) }}
            onClick={(e) => { this.handleOnClick(e, element, index) }}
            className={element.isElementBuy ? listElementStyles.LineThroughElement : null}>
            {element.productName}
          </p>
        </div>
    );
    return (
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Shoping List</p>
          {elementsOfList}
        </header>

      </div>
    );
  }
}


export default ShopingList;