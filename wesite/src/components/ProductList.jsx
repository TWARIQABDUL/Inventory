import React, { useState } from "react";
import { Search } from "lucide-react";
import {Flex, Input, Table, Tag} from "antd";
import { Typography } from "antd";
const { Title } = Typography;
const dashboardColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <Tag color="blue">{text}</Tag>
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (cat) => <Tag color="purple">{cat}</Tag>
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => "$" + Number(price).toFixed(2)
  },
  {
    title: "In Stock",
    dataIndex: "inStock",
    key: "inStock",
    render: (inStock) => inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
  }
];

export function ProductList({items = []}) {
  const [products, setProducts] = useState();
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = items.filter((product) =>
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
        columns={dashboardColumns}
        dataSource={items}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}


