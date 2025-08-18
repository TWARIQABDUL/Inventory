import { useState } from "react";
import { Table, Button, Input, Select, InputNumber, Switch, Form, Modal, Tag, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({ category: null, inStock: null });
  const [form] = Form.useForm();

  const handleAddItem = (values) => {
    const newItem = {
      key: Date.now(),
      id: values.id,
      name: values.name,
      category: values.category,
      quantity: values.quantity,
      price: values.price,
      inStock: values.inStock,
    };
    
    const updatedItems = items.concat(newItem);

    setItems(updatedItems);
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredItems = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let categoryMatch = true;
    let stockMatch = true;

    if (filters.category !== null && item.category !== filters.category) {
      categoryMatch = false;
    }
    if (filters.inStock !== null && item.inStock !== filters.inStock) {
      stockMatch = false;
    }

    if (categoryMatch && stockMatch) {
      filteredItems.push(item);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="purple">{cat}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => "$" + Number(price).toFixed(2),
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock) =>
        inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
  ];

  return (
    <div style={{ padding: 20, background: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20}}>Inventory</h1>

      <Space style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Item
        </Button>
        <Select
          allowClear
          placeholder="Filter by Category"
          style={{ width: 180 }}
          onChange={(value) => setFilters({ ...filters, category: value || null })}
        >
          <Option value="Electronics">Electronics</Option>
          <Option value="Clothing">Clothing</Option>
          <Option value="Books">Books</Option>
          <Option value="Groceries">Groceries</Option>
          <Option value="Furniture">Furniture</Option>
        </Select>

        <Select
          allowClear
          placeholder="Filter by Stock"
          style={{ width: 150 }}
          onChange={(value) =>
            setFilters({ ...filters, inStock: value === undefined ? null : value })
          }
        >
          <Option value={true}>In Stock</Option>
          <Option value={false}>Out of Stock</Option>
        </Select>

        <Button icon={<FilterOutlined />} onClick={() => setFilters({ category: null, inStock: null })}>
          Clear Filters
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredItems}
        bordered
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Add Inventory Item"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddItem}
          initialValues={{ inStock: true }}
        >
          <Form.Item label="ID" name="id" rules={[{ required: true, message: "Enter item ID" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Enter item name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Select category" }]}>
            <Select>
              <Option value="Electronics">Electronics</Option>
              <Option value="Clothing">Clothing</Option>
              <Option value="Books">Books</Option>
              <Option value="Groceries">Groceries</Option>
              <Option value="Furniture">Furniture</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Enter quantity" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Enter price" }]}>
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} prefix="$" />
          </Form.Item>
          <Form.Item label="In Stock" name="inStock" valuePropName="checked">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}