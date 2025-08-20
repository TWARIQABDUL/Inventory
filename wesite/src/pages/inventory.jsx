import {useReducer, useState} from "react";
import {Button, Flex, Form, Input, InputNumber, Modal, Select, Space, Switch, Table, Tag, Typography, Steps, message, Card} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useInventory} from "../context/InventoryContext";
const {Option} = Select;
const {Title} = Typography;
const {Step} = Steps;

export default function Inventory() {
  const {items, setItems} = useInventory();
  const initialState = {
    isModalVisible: false,
    isCategoryModalVisible: false,
    filters: {category: null, inStock: null},
    categories: ["Electronics", "Clothing", "Books", "Groceries", "Furniture"]
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_MODAL':
        return {...state, isModalVisible: action.payload};
      case 'TOGGLE_CATEGORY_MODAL':
        return {...state, isCategoryModalVisible: action.payload};
      case 'SET_FILTERS':
        return {...state, filters: action.payload};
      case 'ADD_CATEGORY':
        return {...state, categories: [...state.categories, action.payload]};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [productId, setProductId] = useState(null);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleSubmit = async (values) => {
    try {
      let res;

      if (current === 0) {
        res = await fetch("http://localhost:8080/api/products", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            taxable: values.taxable,
            category: {categoryId: values.categoryId},
          }),
        });
        const data = await res.json();
        if (data.status) {
          message.success(data.message);
          setProductId(data.id);
          next();
        }
      }

      if (current === 1) {
        res = await fetch("http://localhost:8080/api/price-lists", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            price: values.price,
            product: {productId},
          }),
        });
        const data = await res.json();
        message.success(data.message);
        next();
      }

      if (current === 2) {
        res = await fetch("http://localhost:8080/api/stock", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            quantity: values.quantity,
            product: {productId},
          }),
        });
        const data = await res.json();
        message.success(`${data.quantity} units added for ${data.productName}`);
        dispatch({type: 'TOGGLE_MODAL', payload: false});
        form.resetFields();
        setCurrent(0);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong!");
    }
  };

  const steps = [
    {
      title: "Add Product",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Product Name" rules={[{required: true}]}>
            <Input placeholder="Enter product name"/>
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{required: true}]}>
            <Input.TextArea rows={3} placeholder="Enter product description"/>
          </Form.Item>

          <Form.Item name="taxable" label="Taxable" valuePropName="checked">
            <Switch/>
          </Form.Item>

          <Form.Item name="categoryId" label="Category" rules={[{required: true}]}>
            <Select placeholder="Select Category">
              <Option value={1}>Shoes</Option>
              <Option value={2}>Clothes</Option>
              <Option value={3}>Accessories</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">Submit Product</Button>
        </Form>
      ),
    },
    {
      title: "Add Price",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="price" label="Price" rules={[{required: true}]}>
            <InputNumber min={0} step={0.01} style={{width: "100%"}}/>
          </Form.Item>

          <Button type="primary" htmlType="submit">Submit Price</Button>
          <Button style={{marginLeft: 8}} onClick={prev}>Previous</Button>
        </Form>
      ),
    },
    {
      title: "Add Stock",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="quantity" label="Quantity" rules={[{required: true}]}>
            <InputNumber min={1} style={{width: "100%"}}/>
          </Form.Item>

          <Button type="primary" htmlType="submit">Submit Stock</Button>
          <Button style={{marginLeft: 8}} onClick={prev}>Previous</Button>
        </Form>
      ),
    },
  ];

  const filteredItems = items.filter((item) => {
    let categoryMatch = state.filters.category ? item.category === state.filters.category : true;
    let stockMatch = state.filters.inStock !== null ? item.inStock === state.filters.inStock : true;
    return categoryMatch && stockMatch;
  });

  const columns = [
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

  return (
    <div style={{padding: 20, background: "#f5f7fa", minHeight: "100vh"}}>
      <Space direction={"vertical"} size={20} style={{width: "100%"}}>
        <Flex justify={"space-between"}>
          <Title level={2}>Inventory Management</Title>
          <div style={{display: "flex", gap: 10}}>
            <Button type='primary' size={'large'} icon={<PlusOutlined/>} onClick={() => dispatch({type: 'TOGGLE_MODAL', payload: true})}>Add Inventory</Button>
            <Button type='default' size={'large'} icon={<PlusOutlined/>} onClick={() => dispatch({type: 'TOGGLE_CATEGORY_MODAL', payload: true})}>Add Category</Button>
          </div>
        </Flex>

        <Table columns={columns} dataSource={filteredItems} bordered pagination={{pageSize: 8}}/>
      </Space>

      {/* Add Inventory Modal with Steps */}
      <Modal
        title="Add Inventory"
        open={state.isModalVisible}
        footer={null}
        onCancel={() => dispatch({type: 'TOGGLE_MODAL', payload: false})}
        width={600}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title}/>
          ))}
        </Steps>
        <div style={{marginTop: 30}}>{steps[current].content}</div>
      </Modal>
    </div>
  );
}
