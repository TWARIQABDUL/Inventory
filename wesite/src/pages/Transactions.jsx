import {useEffect, useState} from "react";
import {Table} from "antd";
import axios from "axios";

export function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://192.168.254.115:1010/api/transactions"
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      width: 120,
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
      width: 120,
    },
    {
      title: "Transaction Code",
      dataIndex: "transactionCode",
      key: "transactionCode",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toFixed(2)}`,
      onCell: (record) => {
        return {
          style: {
            color: record.amount > 0 ? '#52c41a' : '#f5222d'
          }
        };
      }
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "CreatedAt",
      width: 180,
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      width: 120,
      render: (mode) => {
        const colors = {
          'CASH': '#1890ff',
          'CARD': '#722ed1',
          'ONLINE': '#52c41a'
        };
        return <span style={{color: colors[mode] || 'black'}}>{mode}</span>;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
      render: (description) => description ? description : "-",
      ellipsis: true,
    },
  ];

  return (
    <Table
      dataSource={transactions}
      columns={columns}
      loading={loading}
      rowKey="transactionId"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
      scroll={{x: 1000}}
      bordered
      size="middle"
    />
  );
}