import React, {useEffect, useState} from "react";
import {Table, Modal} from "antd";
import axios from "axios";
import {format} from "date-fns";

function Sales() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://192.168.254.115:1010/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const showModal = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a, b) => a.orderId - b.orderId,
    },
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
      filterSearch: true,
      filters: orders.map((order) => ({
        text: order.orderCode,
        value: order.orderCode,
      })),
      onFilter: (value, record) => record.orderCode.includes(value),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Actual Amount",
      dataIndex: "actualAmount",
      key: "actualAmount",
      sorter: (a, b) => a.actualAmount - b.actualAmount,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => format(new Date(text), 'dd/MM/yyyy HH:mm'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {text: "PENDING", value: "PENDING"},
        {text: "COMPLETED", value: "COMPLETED"},
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <a onClick={() => showModal(record)} style={{color: 'blue'}}>View</a>
      ),
    },
  ];

  const orderItemsColumns = [
    {
      title: "Item ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Cost Price",
      dataIndex: "costPrice",
      key: "costPrice",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Actual Amount",
      dataIndex: "actualAmount",
      key: "actualAmount",
    },
  ];

  const modalInfoStyle = {
    display: "flex",
    marginBottom: 10,
    justifyContent: "space-between",
  };

  return (
    <>
      <Table
        dataSource={orders}
        columns={columns}
        loading={loading}
        rowKey="orderId"
        pagination={{
          total: orders.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <Modal
        title={<div style={{fontSize: '24px'}}>Order Details:</div>}
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        {selectedOrder && (
          <div>
            <p style={modalInfoStyle}><b>Order ID:</b> {selectedOrder.orderId}</p>
            <p style={modalInfoStyle}><b>Order Code:</b> {selectedOrder.orderCode}</p>
            <p style={modalInfoStyle}><b>Total Amount:</b> ${selectedOrder.totalAmount}</p>
            <p style={modalInfoStyle}><b>Discount:</b> ${selectedOrder.discount}</p>
            <p style={modalInfoStyle}><b>Actual Amount:</b> ${selectedOrder.actualAmount}</p>
            <p style={modalInfoStyle}><b>Status:</b> {selectedOrder.status}</p>
            <p style={modalInfoStyle}><b>Created At:</b> {format(new Date(selectedOrder.createdAt), 'dd/MM/yyyy HH:mm')}</p>

            {<div style={{fontSize: '24px'}}><b>Order Items:</b></div>}
            {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
              <Table
                dataSource={selectedOrder.orderItems}
                columns={orderItemsColumns}
                rowKey="id"
                bordered
                size="small"
                pagination={{
                  pageSize: 2,
                }}
              />
            ) : (
              <p>No items available.</p>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default Sales;