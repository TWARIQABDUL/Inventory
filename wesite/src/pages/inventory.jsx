import {useContext, useEffect, useReducer, useState} from "react";
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
  Row,
  Col
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useInventory} from "../context/InventoryContext";
import {AnalyticsContext} from "../context/datacontext";
import FileUpload from "../components/UploadImage.jsx";

const {Option} = Select;
const {Title} = Typography;
const {Step} = Steps;

export default function Inventory() {
  const {apiData, setApiData} = useContext(AnalyticsContext);
  const {setItems} = useInventory();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const initialState = {
    isModalVisible: false,
    isCategoryModalVisible: false,
    currentStep: 0,
    isEditModalVisible: false,
    editingProduct: null,
    categories: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_MODAL":
        return {...state, isModalVisible: action.payload};
      case "TOGGLE_CATEGORY_MODAL":
        return {...state, isCategoryModalVisible: action.payload};
      case "SET_STEP":
        return {...state, currentStep: action.payload};
      case "SET_EDIT_MODAL":
        return {
          ...state,
          isEditModalVisible: action.payload.visible,
          editingProduct: action.payload.product || null,
        };
      case "SET_CATEGORIES":
        return {...state, categories: action.payload};
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/category`);
      const data = await res.json();
      dispatch({type: "SET_CATEGORIES", payload: data});
      return data;
    } catch {
      message.error("Could not load categories");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${baseUrl}/products`);
      const data = await res.json();
      setApiData(data);
      const mapped = data.map((p) => ({
        id: p.productId,
        name: p.productName,
        category: {name: p.categoryName},
        quantity: p.inStock,
        price: p.productCost,
        inStock: p.inStock > 0,
      }));
      setItems(mapped);
      return data;
    } catch {
      message.error("Could not load products");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [baseUrl]);

  const handleSubmit = async (values) => {
    try {
      let res;
      if (state.currentStep === 0) {
        res = await fetch(`${baseUrl}/products`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            taxable: values.taxable,
            productImage: localStorage.getItem("image"),
            category: {categoryId: values.categoryId},
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(data.message || "Product created successfully!");
          form.setFieldValue("productId", data.id);
          dispatch({type: "SET_STEP", payload: 1});
        } else message.error(data.message || "Failed to create product");
      } else if (state.currentStep === 1) {
        res = await fetch(`${baseUrl}/price-lists`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            price: values.price,
            product: {productId: form.getFieldValue("productId")},
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(data.message || "Price added successfully!");
          dispatch({type: "SET_STEP", payload: 2});
        } else message.error(data.message || "Failed to add price");
      } else if (state.currentStep === 2) {
        res = await fetch(`${baseUrl}/stock`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            quantity: values.quantity,
            product: {productId: form.getFieldValue("productId")},
          }),
        });
        const data = await res.json();
        if (res.ok) {
          message.success(`${data.quantity} units added for ${data.productName}`);
          const products = await fetchProducts();
          setApiData(products);
          dispatch({type: "TOGGLE_MODAL", payload: false});
          form.resetFields();
          dispatch({type: "SET_STEP", payload: 0});
        } else message.error(data.message || "Failed to add stock");
      }
    } catch {
      message.error("An unexpected error occurred");
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const {editingProduct} = state;
      const res = await fetch(`${baseUrl}/products/${editingProduct.productId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          category: {categoryId: values.categoryId},
          productImage: localStorage.getItem("image"),
          taxable: values.taxable,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        message.success(data.message || "Product updated successfully");
        const priceRes = await fetch(`${baseUrl}/price-lists/${editingProduct.priceId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            price: values.price,
            productImage: localStorage.getItem("image"),
            product: {productId: editingProduct.productId},
          }),
        });
        if (priceRes.ok) {
          message.success("Price updated successfully!");
          const products = await fetchProducts();
          setApiData(products);
        } else {
          const priceData = await priceRes.json();
          message.error(priceData.message || "Failed to update price");
        }
        dispatch({type: "SET_EDIT_MODAL", payload: {visible: false}});
        editForm.resetFields();
      } else message.error(data.message || "Failed to update product");
    } catch {
      message.error("Something went wrong while updating");
    }
  };

  const handleCategorySubmit = async (values) => {
    try {
      const res = await fetch(`${baseUrl}/category`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: values.categoryName}),
      });
      const data = await res.json();
      if (res.ok) {
        message.success("Category added successfully!");
        const categories = await fetchCategories();
        dispatch({type: "SET_CATEGORIES", payload: categories});
        dispatch({type: "TOGGLE_CATEGORY_MODAL", payload: false});
        categoryForm.resetFields();
      } else message.error(data.message || "Failed to add category");
    } catch {
      message.error("Something went wrong while adding category");
    }
  };

  async function handleDelete(productId) {
    try {
      const res = await fetch(`${baseUrl}/products/${productId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        message.success('Product deleted successfully');
        await fetchProducts();
      } else {
        const data = await res.json();
        message.error(data.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      message.error('An error occurred while deleting');
    }
  }

  const columns = [
    {title: "Product ID", dataIndex: "productId", key: "productId", render: (text) => <Tag color="blue">{text}</Tag>},
    {title: "Product Name", dataIndex: "productName", key: "productName"},
    {
      title: "Product Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (cat) => <Tag color="purple">{cat}</Tag>
    },
    {title: "Product Quantity", dataIndex: "inStock", key: "inStock"},
    {title: "Price", dataIndex: "productCost", key: "productCost", render: (price) => "$" + Number(price).toFixed(2)},
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock) => inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              editForm.setFieldsValue({
                name: record.productName,
                qty: record.inStock,
                description: record.description,
                categoryId: record.category?.id,
                taxable: record.taxed,
                price: record.productCost,
              });
              dispatch({type: "SET_EDIT_MODAL", payload: {visible: true, product: record}});
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

  const steps = [
    {
      title: "Add Product",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Product Name" rules={[{required: true}]}><Input
            placeholder="Enter product name"/></Form.Item>
          <Form.Item name="description" label="Description" rules={[{required: true}]}><Input.TextArea rows={3}
                                                                                                       placeholder="Enter product description"/></Form.Item>
          <Flex justify={"space-between"} align={"center"}>
            <Form.Item name="taxable" label="Taxable" valuePropName="checked"><Switch/></Form.Item>
            <Form.Item>
              <FileUpload/>
            </Form.Item>
          </Flex>
          <Form.Item name="categoryId" label="Category" rules={[{required: true}]}>
            <Select placeholder="Select Category" loading={state.categories.length === 0}>
              {state.categories.map((cat) => (<Option key={cat.categoryId} value={cat.categoryId}>{cat.name}</Option>))}
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
          <Form.Item name="price" label="Price" rules={[{required: true}]}><InputNumber min={0} step={0.01}
                                                                                        style={{width: "100%"}}/></Form.Item>
          <Button type="primary" htmlType="submit">Submit Price</Button>
          <Button style={{marginLeft: 8}}
                  onClick={() => dispatch({type: "SET_STEP", payload: state.currentStep - 1})}>Previous</Button>
        </Form>
      ),
    },
    {
      title: "Add Stock",
      content: (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="quantity" label="Quantity" rules={[{required: true}]}><InputNumber min={1}
                                                                                              style={{width: "100%"}}/></Form.Item>
          <Button type="primary" htmlType="submit">Submit Stock</Button>
          <Button style={{marginLeft: 8}}
                  onClick={() => dispatch({type: "SET_STEP", payload: state.currentStep - 1})}>Previous</Button>
        </Form>
      ),
    },
  ];

  return (
    <div style={{padding: 20, background: "#f5f7fa", minHeight: "100vh"}}>
      <Space direction="vertical" size={20} style={{width: "100%"}}>
        <Flex justify="space-between">
          <Title level={2}>Inventory Management</Title>
          <div style={{display: "flex", gap: 10}}>
            <Button type="primary" size="large" icon={<PlusOutlined/>}
                    onClick={() => dispatch({type: "TOGGLE_MODAL", payload: true})}>Add Inventory</Button>
            <Button type="default" size="large" icon={<PlusOutlined/>}
                    onClick={() => dispatch({type: "TOGGLE_CATEGORY_MODAL", payload: true})}>Add Category</Button>
          </div>
        </Flex>

        <Table columns={columns} dataSource={apiData} bordered pagination={{pageSize: 8}} rowKey="id"/>
      </Space>

      <Modal title="Add Category" open={state.isCategoryModalVisible}
             onCancel={() => dispatch({type: "TOGGLE_CATEGORY_MODAL", payload: false})} footer={null}>
        <Form form={categoryForm} layout="vertical" onFinish={handleCategorySubmit}>
          <Form.Item label="Category Name" name="categoryName"
                     rules={[{required: true, message: "Please enter category name"}]}><Input/></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block>Add Category</Button></Form.Item>
        </Form>
      </Modal>

      <Modal title="Add Inventory" open={state.isModalVisible} onCancel={() => {
        dispatch({type: "TOGGLE_MODAL", payload: false});
        dispatch({type: "SET_STEP", payload: 0});
        form.resetFields();
      }} footer={null}>
        <Steps current={state.currentStep}>{steps.map((item) => (<Step key={item.title} title={item.title}/>))}</Steps>
        <div style={{marginTop: 24}}>{steps[state.currentStep].content}</div>
      </Modal>

      <Modal title="Edit Product" open={state.isEditModalVisible}
             onCancel={() => dispatch({type: "SET_EDIT_MODAL", payload: {visible: false}})} footer={null}>
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Product Name" rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="qty" label="Quantity" rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price" label="Price" rules={[{required: true}]}>
                <Input/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="categoryId" label="Category" rules={[{required: true}]}>
                <Select placeholder="Select Category">
                  {state.categories.map((cat) => (
                    <Option key={cat.categoryId} value={cat.categoryId}>{cat.name}</Option>))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="taxable" label="Taxable" valuePropName="checked">
                <Switch/>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <FileUpload/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description" rules={[{required: true}]}>
            <Input.TextArea rows={3}/>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Update Product</Button>
        </Form>
      </Modal>
    </div>
  );
}