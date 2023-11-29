import { PageContainer, } from '@ant-design/pro-components';
import { useEffect } from "react";
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { produce } from "immer"

export default function AccessPage() {
  const access = useAccess();
  console.log(produce);

  // 比较两个对象是否相等
  function isObjectEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }
    for (let key of obj1Keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  const baseDate = {
    map1: { name: 'congcong', age: 14, value: 14, map2: { name: 'jie', value: 18 } },
    map3: { name: "uu", address: 'prolly' }
  }
 
  const setNextState = (n, newaddress, targetName) => {
    return produce(baseDate, draft => {
      console.log(Object.getPrototypeOf(draft));
      draft.map3[newaddress]=targetName
      console.log(Object.prototype.toString.call(draft));
      // let newDuce = Object.keys(draft)
      // console.log(newDuce);
      // for (let index = 0; index < newDuce.length; index++) {
      //   console.log(draft[newDuce[index]]);  // 这里其实输出的是一个 proxy 对象 
      //   console.log(draft[newDuce[index]]["name"]);  // 会输出uu & congocng
      //   console.log(draft[newDuce[index]]['name'] ===n);
      //   console.log(draft[newDuce[index]].hasOwnProperty(targetName));
      //   if (draft[newDuce[index]].hasOwnProperty(targetName) && draft[newDuce[index]]['name'] === n) {
      //      draft[newDuce[index]][targetName] = newaddress
      //      console.log(draft[newDuce[index]][targetName]);
      //   }
      // }
    })
  }

  useEffect(() => {
    console.log(baseDate);
    console.log(1111);
  }, [baseDate])

  console.log(baseDate);

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
        <Button onClick={() => setNextState('uu', 'xiahsa', 'address')}>setProduce</Button>
      </Access>
    </PageContainer>
  );
};

AccessPage;
