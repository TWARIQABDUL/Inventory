import {Button, Form, Input, InputNumber, Modal, Select, Switch} from "antd";

export function AddProductModal() {
  return (
    <Modal title="Add Inventory Item" open={state.isModalVisible}
           onCancel={() => dispatch({type: 'TOGGLE_MODAL', payload: false})} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleAddItem} initialValues={{inStock: true}}>
        <Form.Item label="ID" name="id" rules={[{required: true, message: "Enter item ID"}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{required: true, message: "Enter item name"}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{required: true, message: "Select category"}]}>
          <Select>
            {state.categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Quantity" name="quantity" rules={[{required: true, message: "Enter quantity"}]}>
          <InputNumber min={0} style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{required: true, message: "Enter price"}]}>
          <InputNumber min={0} step={0.01} style={{width: "100%"}} prefix="$"/>
        </Form.Item>
        <Form.Item label="In Stock" name="inStock" valuePropName="checked">
          <Switch checkedChildren="Yes" unCheckedChildren="No"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>Add Item</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
