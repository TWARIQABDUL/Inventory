import React, { useState } from "react";
import { Search } from "lucide-react";
import { Flex, Input, Table } from "antd";
import { Typography } from "antd";
const { Title } = Typography;
const initialProducts = [
  { id: 1, name: "Webcam", Category: "Accessories", price: 80, quantity: 20 },
  { id: 2, name: "Desk Chair", Category: "Furniture", price: 150, quantity: 8 },
  { id: 3, name: "USB Cable", Category: "Accessories", price: 10, quantity: 100 },
  { id: 4, name: "External HDD", Category: "Storage", price: 90, quantity: 12 },
  { id: 5, name: "Smartphone", Category: "Electronics", price: 700, quantity: 25 },
  { id: 6, name: "Tablet", Category: "Electronics", price: 400, quantity: 18 },
  { id: 7, name: "Printer", Category: "Office", price: 200, quantity: 5 },
  { id: 8, name: "Router", Category: "Networking", price: 60, quantity: 22 },
  { id: 9, name: "Speakers", Category: "Audio", price: 45, quantity: 30 },
  { id: 10, name: "Projector", Category: "Office", price: 350, quantity: 3 },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "Category",
    key: "Category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Stock",
    key: "stock",
    render: (_, record) => (record.quantity > 0 ? "In Stock" : "Out of Stock"),
  },
];

export function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setProducts(filtered);
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <Title level={2}>Product List</Title>
        <Input
          prefix={<Search size={16} />}
          placeholder="Search Products..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: 250 }}
        />
      </Flex>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}


