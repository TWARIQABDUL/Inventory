import { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Steps,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useInventory } from "../context/InventoryContext";
import { AnalyticsContext } from "../context/datacontext";
import { data } from "autoprefixer";

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

export default function Inventory() {
  const {apiData,setApiData} = useContext(AnalyticsContext)
  const { items, setItems } = useInventory();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiData);

  const initialState = {
    isModalVisible: false,
    isCategoryModalVisible: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_MODAL":
        return { ...state, isModalVisible: action.payload };
      case "TOGGLE_CATEGORY_MODAL":
        return { ...state, isCategoryModalVisible: action.payload };
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);

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
  }, [baseUrl]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseUrl}/products`);
      const data = await res.json();
      console.log(data);
      const mapped = data.map((p) => ({
        id: p.productId,
        name: p.productName,
        category: { name: p.categoryName },
        quantity: p.inStock,
        price: p.productCost,
        inStock: p.inStock > 0,
      }));
      setItems(mapped);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Could not load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [baseUrl]);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleSubmit = async (values) => {
    try {
      let res;
      if (current === 0) {
        res = await fetch(`${baseUrl}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            taxable: values.taxable,
            category: { categoryId: values.categoryId },
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(data.message || "Product created successfully!");
          setProductId(data.id);
          next();
        } else {
          message.error(data.message || "Failed to create product");
        }
      } else if (current === 1) {
        // Step 2: Add price
        res = await fetch(`${baseUrl}/price-lists`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: values.price,
            product: { productId },
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(data.message || "Price added successfully!");
          next();
        } else {
          message.error(data.message || "Failed to add price");
        }
      } else if (current === 2) {
        // Step 3: Add stock
        res = await fetch(`${baseUrl}/stock`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: values.quantity,
            product: { productId },
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(
            `${data.quantity} units added for ${data.productName}`
          );
          await fetchProducts();
          dispatch({ type: "TOGGLE_MODAL", payload: false });
          form.resetFields();
          setCurrent(0);
        } else {
          message.error(data.message || "Failed to add stock");
        }
      }
    } catch (error) {
      console.error(error);
      message.error(data.message+ " holla");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`${baseUrl}/products/${id}`, {
        method: "DELETE",
      });
      const data = res.json();
      console.log(data);
      if (res.ok) {
        message.success(data.message || "Product deleted successfully");
        await fetchProducts();
      } else {
        message.error(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Something went wrong while deleting");
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (values) => {
    console.log(editingProduct);
    
    try {
      const res = await fetch(`${baseUrl}/products/${editingProduct.productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          category: { categoryId: values.categoryId },
          taxable: values.taxable,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        message.success(data.message || "Product updated successfully");
        try {
          console.log("I am about to update ",editingProduct);
          
            const priceRes = await fetch(`${baseUrl}/price-lists/${editingProduct.priceId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    price: values.price,
                    product: { productId: editingProduct.productId },
                }),
            });

            if (priceRes.ok) {
                message.success("Price updated successfully!");
                // setApiData(...)
                // await fetchProducts()

            } else {
                const priceData = await priceRes.json();
                message.error(priceData.message || "Failed to update price");
            }
        } catch (priceError) {
            console.error("Price update failed:", priceError);
            message.error("Something went wrong while updating the price");
        }
        await fetchProducts();
        setIsEditModalVisible(false);
        editForm.resetFields();
      } else {
        message.error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Something went wrong while updating");
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
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item name="taxable" label="Taxable" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
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
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit Price
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={prev}>
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
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit Stock
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={prev}>
            Previous
          </Button>
        </Form>
      ),
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (cat) => <Tag color="purple">{cat}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: "Price",
      dataIndex: "productCost",
      key: "productCost",
      render: (price) => "$" + Number(price).toFixed(2),
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock) =>
        inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              console.log(record);
              
              setEditingProduct(record);
              editForm.setFieldsValue({
                name: record.productName,
                qty:record.inStock,
                description: record.description,
                categoryId: record.category?.id,
                taxable: record.taxed,
                price:record.productCost,
                stock:record.inStock

              });
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.productId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, background: "#f5f7fa", minHeight: "100vh" }}>
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        <Flex justify="space-between">
          <Title level={2}>Inventory Management</Title>
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => dispatch({ type: "TOGGLE_MODAL", payload: true })}
            >
              Add Inventory
            </Button>
            <Button
              type="default"
              size="large"
              icon={<PlusOutlined />}
              onClick={() =>
                dispatch({ type: "TOGGLE_CATEGORY_MODAL", payload: true })
              }
            >
              Add Category
            </Button>
          </div>
        </Flex>

        <Table
          columns={columns}
          dataSource={apiData}
          bordered
          pagination={{ pageSize: 8 }}
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
          dispatch({ type: "TOGGLE_MODAL", payload: false });
          setCurrent(0);
          form.resetFields();
        }}
        footer={null}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>{steps[current].content}</div>
      </Modal>
      <Modal
        title="Edit Product"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
  ll        <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="qty"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="price"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="taxable" label="Taxable" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Category">
              {categories.map((cat) => (
                <Option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Update Product
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
