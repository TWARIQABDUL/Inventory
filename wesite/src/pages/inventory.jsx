import React, { useEffect, useState } from 'react'
import "../styles/Inventory.css"
function Inventory() {
  
  const items =[
    {"name":"Clean Code",
      "category":"books",
      "stock":18,
      "price":500,
      "status":"in stock",
    },
    {"name":"Clean Code",
      "category":"electronics",
      "stock":18,
      "price":500,
      "status":"in stock",
    },
    {"name":"Clean Code",
      "category":"office-supplies",
      "stock":18,
      "price":500,
      "status":"in stock",
    },
    {"name":"Clean Code",
      "category":"books",
      "stock":18,
      "price":500,
      "status":"in stock",
    },
    {"name":"Clean Code",
      "category":"furniture",
      "stock":18,
      "price":500,
      "status":"in stock",
    },
    {"name":"Clean Code",
      "category":"books",
      "stock":18,
      "price":500,
      "status":"in stock",
    }]
  const [filtereditems,setfiltereditems]=useState(items);
  const filterItems=( condition, value)=>{
    setfiltereditems(items);
    setfiltereditems(items.filter((item) => item[condition] == value));
    console.log(value);
  };
  return (
    <div>
      <div className='Header'>
        <div className="header-title">
          <h1 className='title'>Inventory</h1>
          <p className='subtitle'>Manage your inventory items</p>
        </div>
        <button className='add-item'>+ Add item</button>
      </div>
      <div className="filters">
        <h1 className='filter-header'>Filters and Search</h1>
        <div className="filter-button">
          <div className="filter">
            <h3>Status</h3>
            <select name="category" id="select">
              <option value="in stock">in stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div className="filter">
            <h3>Category</h3>
            <select name="category" id="select" onChange={e => filterItems("category",e.target.value)}>
              <option value="electronics">Electronics</option>
              <option value="office-supplies">Office Supplies</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="filter">
            <h3>Category</h3>
            <select name="category" id="select">
              <option value="electronics">Electronics</option>
              <option value="office-supplies">Office Supplies</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="filter">
            <h3>Category</h3>
            <select name="category" id="select">
              <option value="electronics">Electronics</option>
              <option value="office-supplies">Office Supplies</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
          </div>
        </div>
      </div>
      <div className="items">
        <table>
          <thead>
            <tr>
            <th>Item Details</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {
            filtereditems.map((item,index)=>{
              return(
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.status}</td>
                  <td><button>edit</button> <button>delete</button></td>
                </tr>
              )
            })
          }
          </tbody>
          
          
        </table>
      </div>
    </div>
  )
}

export default Inventory