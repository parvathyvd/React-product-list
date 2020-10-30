import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const SearchBar = (props) => {

    const {filterText, inStockOnly, onInputChange, onCheckBoxChange} = props
    return (
        <form>
            <input type="text" placeholder="Search here.." name="search" 
            value = {filterText} onChange={ event => onInputChange(event.target.value) }/>
            <br/>
            <input type="checkbox" checked = {inStockOnly} onChange={ event => onCheckBoxChange(event.target.checked)}/>{" "}
            <span>Only show items in stock</span>
        </form>
    )
}

const ProductCategoryRow = props => {
	const { product } = props;

	return (
		<tr>
			<th colSpan="2">
				{product.category}
			</th>
		</tr>
	);
};

const ProductRow = props => {
    const {product} = props

    const coloredName = product.stocked ? product.name :  <span style ={{ color:"red" }}>{product.name}</span>;
    return(
        <tr>
            <td align="left">{coloredName}</td>
            <td align="right">{product.price}</td>
        </tr>
    )
}

const ProductTable = props => {
    const {filterText, inStockOnly, products} = props
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
         if(product.name.indexOf(filterText) === -1){
             return
         }
         if(inStockOnly && !product.stocked){
             return
         }
         if(lastCategory !== product.category) {
            rows.push(<ProductCategoryRow product={product} key={product.category}/>)
         }
        rows.push(<ProductRow product={product} key={product.name}/>)
        lastCategory = product.category;
    }); 

    return (
        <table>
            <thead>
                <tr>
                <th align="left">Product Name</th>
                <th align="right">Value</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

const FilterableProductTable = props => {
    const {products} = props
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInstockOnly] = useState(false);

   const handleFilterTextChange = filterText =>{
        setFilterText(filterText)
    }

   const handleInStockOnly = inStockOnly =>{
        setInstockOnly(inStockOnly)
    }

    return (
        <div>
            <SearchBar 
            filterText= {filterText}
            inStockOnly = {inStockOnly}
            onInputChange = {handleFilterTextChange}
            onCheckBoxChange = {handleInStockOnly}/>
            <ProductTable 
            products = {products}
            filterText= {filterText}
            inStockOnly = {inStockOnly}/>
        </div>
    )
}

const PRODUCTS = [
	{	category: "Sporting Goods",
			 price: "$49.99",
		 stocked: true,
				name: "Football" },
	{	category: "Sporting Goods",
			 price: "$9.99",
		 stocked: true,
				name: "Baseball" },
	{	category: "Sporting Goods",
			 price: "$29.99",
		 stocked: false,
				name: "Basketball" },
	{	category: "Electronics",
			 price: "$99.99",
		 stocked: true,
				name: "iPod Touch" },
	{	category: "Electronics",
			 price: "$399.99",
		 stocked: false,
				name: "iPhone 5" },
	{	category: "Electronics",
			 price: "$199.99",
		 stocked: true,
				name: "Nexus 7" }
];

ReactDOM.render(<FilterableProductTable products = {PRODUCTS}/>, document.getElementById('root'))
