import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useState, useEffect } from "react";
import { Table, Card, Button } from "antd";
import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');
  const columns = [
    { title: 'Full Name', dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Address', dataIndex: 'address', key: 'address', fixed: 'left' },
    { title: 'Action', key: 'operation', fixed: 'right', render: () => <a>action</a> },
  ];
  let data = [];
  for (let i = 0; i < 12; i++) {
    data.push({ key: i, name: `Edward ${i}`, age: 32, address: `London Park no. ${i}`, });
  }
  const [dataMap, setDataMap] = useState(data)
  console.log(dataMap);

  const modifyDefaultData = () => {
    dataMap[0].name = 'Jim'
    console.log(dataMap);
    setDataMap(dataMap)
  }

  console.log(dataMap);

  useEffect(() => {
    console.log(32323);
    console.log(dataMap);
    // 不会执行
  }, [dataMap])

  return (
    <PageContainer ghost>
      <Card extra={<>
        <Button onClick={modifyDefaultData}>修改默认数据</Button>
      </>}>
        <Table columns={columns} dataSource={dataMap} />
      </Card>
    </PageContainer>
  );
};

export default HomePage;
