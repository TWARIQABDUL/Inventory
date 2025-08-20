import { useState } from "react";
import { Table, Button, Input, Select, InputNumber, Switch, Form, Modal, Tag, Space, Steps } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useInventory } from "../context/InventoryContext";

const { Option } = Select;

export default function Inventory() {
  const [current, setCurrent] = useState(0);
  const { items, setItems } = useInventory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [filters, setFilters] = useState({category: null, inStock: null});
  const [categories, setCategories] = useState(["Electronics", "Clothing", "Books", "Groceries", "Furniture"]);
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const { Step } = Steps;

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

    setItems((prev) => [...prev, newItem]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredItems = items.filter((item) => {
    let categoryMatch = filters.category ? item.category === filters.category : true;
    let stockMatch = filters.inStock !== null ? item.inStock === filters.inStock : true;
    return categoryMatch && stockMatch;
  });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", render: (text) => <Tag color="blue">{text}</Tag> },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category", render: (cat) => <Tag color="purple">{cat}</Tag> },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => "$" + Number(price).toFixed(2) },
    { title: "In Stock", dataIndex: "inStock", key: "inStock", render: (inStock) => inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag> },
  ];

  // test step form 
   const steps = [
    {
      title: "User Info",
      content: (
        <>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Password",
      content: (
        <>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Review",
      content: (
        <p>
          Click **Submit** to complete registration.
        </p>
      ),
    },
  ];

  const next = async () => {
    try {
      // validate fields of the current step before moving on
      await form.validateFields();
      setCurrent(current + 1);
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    message.success("Form submitted successfully!");
    console.log("Form values:", values);
  };


  return (
    <div style={{ padding: 20, background: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Inventory</h1>

      {/* step form */}
      <Steps current={current} className="mb-6">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {steps[current].content}

        <div style={{ marginTop: 24, marginBottom: 10 }}>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prev}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
      {/* -------------- */}
      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Add Item
        </Button>
        <Select allowClear placeholder="Filter by Category" style={{ width: 180 }}
                onChange={(value) => setFilters({ ...filters, category: value || null })}>
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
        <Select allowClear placeholder="Filter by Stock" style={{ width: 150 }}
                onChange={(value) => setFilters({ ...filters, inStock: value === undefined ? null : value })}>
          <Option value={true}>In Stock</Option>
          <Option value={false}>Out of Stock</Option>
        </Select>
        <Button icon={<FilterOutlined />} onClick={() => setFilters({ category: null, inStock: null })}>
          Clear Filters
        </Button>
        <Button icon={<PlusOutlined/>} onClick={() => setIsCategoryModalVisible(true)}>
          Add Category
        </Button>
      </Space>

      <Table columns={columns} dataSource={filteredItems} bordered pagination={{ pageSize: 8 }} />

      <Modal title="Add Inventory Item" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddItem} initialValues={{ inStock: true }}>
          <Form.Item label="ID" name="id" rules={[{ required: true, message: "Enter item ID" }]}><Input /></Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Enter item name" }]}><Input /></Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Select category" }]}><Select>
            <Option value="Electronics">Electronics</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Groceries">Groceries</Option>
            <Option value="Furniture">Furniture</Option>
          </Select></Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Enter quantity" }]}><InputNumber min={0} style={{ width: "100%" }} /></Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Enter price" }]}><InputNumber min={0} step={0.01} style={{ width: "100%" }} prefix="$" /></Form.Item>
          <Form.Item label="In Stock" name="inStock" valuePropName="checked"><Switch checkedChildren="Yes" unCheckedChildren="No" /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Add Item</Button></Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Category"
        open={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
      >
        <Form
          form={categoryForm}
          layout="vertical"
          onFinish={(values) => {
            setCategories([...categories, values.categoryName]);
            setIsCategoryModalVisible(false);
            categoryForm.resetFields();
          }}
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{required: true, message: "Please enter category name"}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
