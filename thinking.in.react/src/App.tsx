import './App.css'
import React, { type JSX } from 'react'

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}


// Product CategoryRow
interface ProductCategoryRowProps {
  category: string;
}

function ProductCategoryRow({category}: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  )
}


// Product Row
interface ProductRowProps {
  product: Product;
}

function ProductRow({product}: ProductRowProps) {
  const name = product.stocked ? product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <th>{name}</th>
      <th>{product.price}</th>
    </tr>
  )
}


// Product Table
interface ProductTableProps{
  products: Product[];
}

function ProductTable({products}: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if(product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          key={product.category} 
          category={product.category} 
        />
      )
    }
    rows.push(
      <ProductRow 
        key={product.name} 
        product={product} 
      />
    );
    lastCategory = product.category;
  })
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

// Search Bar
function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}


// Filterable Product Table
interface FilterableProductTableProps {
  products: Product[];
}

function FilterableProductTable({products}: FilterableProductTableProps) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  )
}


function App() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  )
}

export default App
