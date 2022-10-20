// import { Empty } from "antd"

// function DebriefingScoring() {
//   return (
//     <Empty description='述职评分表' style={{ height: 700 }} />
//   )
// }

// export default DebriefingScoring

import React, { useState, useEffect } from 'react';
import { Table } from 'shineout';
import { fetch } from './user';
const App = () => {
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sorter, setSorter] = useState({ name: 'start', order: 'asc' });
  const fetchData = () => {
    setLoading(true);
    fetch.get('user', { sorter, current, pageSize, username: '' }).then(res => {
      setData(res.data);
      setLoading(false);
      setTotal(res.total);
    });
  };
  const handlePageChange = (c, p) => {
    setCurrent(c);
    setPageSize(p);
  };
  const handleSorter = (name, order) => {
    setSorter({ name, order });
    setCurrent(1);
  };
  const columns = [
    {
      width: 70,
      title: 'id',
      render: 'id',
      sorter: order => handleSorter('id', order),
    },
    { title: 'First Name', group: 'Name', render: 'firstName' },
    { title: 'Last Name', group: 'Name', render: 'lastName' },
    {
      render: 'start',
      title: 'Start Date',
      rowSpan: (a, b) => a.start === b.start,
      sorter: order => handleSorter('start', order),
      colSpan: d => {
        const hour = parseInt(d.time.slice(0, 2), 10);
        if (hour > 21 || hour < 9)
          return 2;
        return 1;
      },
    },
    { title: 'Time', render: 'time' },
    { title: 'Office', render: 'office5', rowSpan: true },
  ];
  useEffect(() => {
    fetchData();
  }, [current, pageSize, sorter]);
  return (<Table bordered keygen="id" data={data} loading={loading} columns={columns} pagination={{
    total,
    current,
    pageSize,
    align: 'center',
    layout: ['links', 'list'],
    onChange: handlePageChange,
    pageSizeList: [10, 15, 20],
  }} />);
};
export default App;