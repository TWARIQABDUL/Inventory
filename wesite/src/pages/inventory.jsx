import {useEffect, useReducer, useState} from "react";
import {Button, Flex, Form, Input, InputNumber, message, Modal, Select, Space, Steps, Switch, Table, Tag, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useInventory} from "../context/InventoryContext";

const {Option} = Select;
const {Title} = Typography;
const {Step} = Steps;

export default function Inventory() {
  const {items, setItems} = useInventory();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const initialState = {
    isModalVisible: false,
    isCategoryModalVisible: false,
    filters: {category: null, inStock: null},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_MODAL":
        return {...state, isModalVisible: action.payload};
      case "TOGGLE_CATEGORY_MODAL":
        return {...state, isCategoryModalVisible: action.payload};
      case "SET_FILTERS":
        return {...state, filters: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [productId, setProductId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        message.error("Could not load categories");
      }
    };
    fetchCategories();
  }, []);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleSubmit = async (values) => {
    try {
      let res;
      if (current === 0) {
        res = await fetch(`${baseUrl}/products`, {
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
        res = await fetch(`${baseUrl}/price-lists`, {
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
        res = await fetch(`${baseUrl}/stock`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            quantity: values.quantity,
            product: {productId},
          }),
        });
        const data = await res.json();
        message.success(`${data.quantity} units added for ${data.productName}`);
        dispatch({type: "TOGGLE_MODAL", payload: false});
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
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{required: true}]}
          >
            <Input placeholder="Enter product name"/>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{required: true}]}
          >
            <Input.TextArea rows={3} placeholder="Enter product description"/>
          </Form.Item>

          <Form.Item name="taxable" label="Taxable" valuePropName="checked">
            <Switch/>
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{required: true}]}
          >
            <Select
              placeholder="Select Category"
              loading={categories.length === 0}
            >
              {categories.map((cat) => (
                <Option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit Product
          </Button>
        </Form>
      ),
    },
    {
      title: "Add Price",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{required: true}]}
          >
            <InputNumber min={0} step={0.01} style={{width: "100%"}}/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit Price
          </Button>
          <Button style={{marginLeft: 8}} onClick={prev}>
            Previous
          </Button>
        </Form>
      ),
    },
    {
      title: "Add Stock",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{required: true}]}
          >
            <InputNumber min={1} style={{width: "100%"}}/>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit Stock
          </Button>
          <Button style={{marginLeft: 8}} onClick={prev}>
            Previous
          </Button>
        </Form>
      ),
    },
  ];

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
      render: (cat) => (
        <Tag color="purple">{cat?.name || "No Category"}</Tag>
      ),
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
    <div style={{padding: 20, background: "#f5f7fa", minHeight: "100vh"}}>
      <Space direction="vertical" size={20} style={{width: "100%"}}>
        <Flex justify="space-between">
          <Title level={2}>Inventory Management</Title>
          <div style={{display: "flex", gap: 10}}>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined/>}
              onClick={() =>
                dispatch({type: "TOGGLE_MODAL", payload: true})
              }
            >
              Add Inventory
            </Button>
            <Button
              type="default"
              size="large"
              icon={<PlusOutlined/>}
              onClick={() =>
                dispatch({type: "TOGGLE_CATEGORY_MODAL", payload: true})
              }
            >
              Add Category
            </Button>
          </div>
        </Flex>

        <Table
          columns={columns}
          dataSource={items}
          bordered
          pagination={{pageSize: 8}}
          rowKey="id"
        />
      </Space>

      <Modal
        title="Add Category"
        open={state.isCategoryModalVisible}
        onCancel={() =>
          dispatch({ type: "TOGGLE_CATEGORY_MODAL", payload: false })
        }
        footer={null}
      >
        <Form
          form={categoryForm}
          layout="vertical"
          onFinish={async (values) => {
            try {
              const res = await fetch(`${baseUrl}/category`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: values.categoryName }),
              });

              const data = await res.json();

              if (res.ok) {
                message.success("Category added successfully!");
                // refresh categories
                setCategories((prev) => [...prev, data]);
                dispatch({ type: "TOGGLE_CATEGORY_MODAL", payload: false });
                categoryForm.resetFields();
              } else {
                message.error(data.message || "Failed to add category");
              }
            } catch (err) {
              console.error("Error adding category:", err);
              message.error("Something went wrong while adding category");
            }
          }}
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Inventory"
        open={state.isModalVisible}
        onCancel={() => {
          dispatch({type: "TOGGLE_MODAL", payload: false});
          setCurrent(0);
          form.resetFields();
        }}
        footer={null}
      >
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title}/>
          ))}
        </Steps>
        <div style={{marginTop: 24}}>{steps[current].content}</div>
      </Modal>
    </div>
  );
}