// import {Button, Form, Input, Modal} from "antd";
//
// export const AddCategoryModal = () => {
//   return (
//     <>
//       <Modal
//         title="Add Category"
//         open={state.isCategoryModalVisible}
//         onCancel={() => dispatch({type: 'TOGGLE_CATEGORY_MODAL', payload: false})}
//         footer={null}
//       >
//         <Form
//           form={categoryForm}
//           layout="vertical"
//           onFinish={(values) => {
//             dispatch({type: 'ADD_CATEGORY', payload: values.categoryName});
//             dispatch({type: 'TOGGLE_CATEGORY_MODAL', payload: false});
//             categoryForm.resetFields();
//           }}
//         >
//           <Form.Item
//             label="Category Name"
//             name="categoryName"
//             rules={[{required: true, message: "Please enter category name"}]}
//           >
//             <Input/>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Add Category
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   )
// }
