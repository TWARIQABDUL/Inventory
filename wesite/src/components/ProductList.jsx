import React, { useState } from "react";
import { Search } from "lucide-react";
import { Flex, Input, Table } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

const initialProducts = [
  { id: 1, name: "Laptop", price: 1200, quantity: 10 },
  { id: 2, name: "Mouse", price: 25, quantity: 50 },
  { id: 3, name: "Keyboard", price: 75, quantity: 30 },
  { id: 4, name: "Monitor", price: 300, quantity: 15 },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    render: (_, record) => (
      record.quantity > 0 ? "In Stock" : "Out of Stock"
    ),
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
