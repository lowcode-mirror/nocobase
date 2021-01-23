import React, { useState } from 'react'
import { connect } from '@formily/react-schema-renderer'
import { Select, Drawer, Button, Space } from 'antd'
import {
  mapStyledProps,
  mapTextComponent,
  compose,
  isStr,
  isArr
} from '../shared'
import ViewFactory from '@/components/views'

function transform({value, multiple, labelField, valueField = 'id'}) {
  let selectedKeys = [];
  let selectedValue = [];
  const values = Array.isArray(value) ? value : [value].filter(Boolean);
  selectedKeys = values.map(item => item[valueField]);
  selectedValue = values.map(item => {
    return {
      value: item[valueField],
      label: item[labelField],
    }
  });
  console.log({selectedKeys, selectedValue, values, labelField, valueField})
  if (!multiple) {
    return [selectedKeys.shift(), selectedValue.shift()];
  }
  return [selectedKeys, selectedValue];
}

export function Scope(props) {
  const { resourceTarget, target, multiple, associatedName, associatedKey, labelField, valueField = 'id', value, onChange } = props;
  const [selectedKeys, selectedValue] = transform({value, multiple, labelField, valueField });
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState(multiple ? selectedKeys : [selectedKeys]);
  const [selectedRows, setSelectedRows] = useState(selectedValue);
  const [options, setOptions] = useState(selectedValue);
  console.log('valuevaluevaluevaluevaluevalue', selectedValue, value);
  return (
    <>
      <Select
        size={'small'}
        open={false}
        mode={multiple ? 'tags' : undefined}
        labelInValue
        allowClear={true}
        value={options}
        placeholder={'默认为全部数据'}
        notFoundContent={''}
        onChange={(data) => {
          setOptions(data);
          if (Array.isArray(data)) {
            const srks = data.map(item => item.value);
            onChange(srks);
            setSelectedRowKeys(srks);
            console.log('datadatadatadata', {data, srks});
          } else if (data && typeof data === 'object') {
            onChange(data.value);
            setSelectedRowKeys([data.value]);
          } else {
            console.log(data);
            onChange(null);
            setSelectedRowKeys([]);
          }
        }}
        onClick={() => {
          setVisible(true);
        }}
      ></Select>
      <Drawer 
        width={'40%'}
        className={'noco-drawer'}
        title={'可操作的数据范围'}
        visible={visible}
        bodyStyle={{padding: 0}}
        onClose={() => {
          setVisible(false);
        }}
        footer={[
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Space>
              <Button onClick={() => setVisible(false)}>取消</Button>
              <Button type={'primary'} onClick={() => {
                setOptions(selectedRows);
                // console.log('valuevaluevaluevaluevaluevalue', {selectedRowKeys});
                onChange(multiple ? selectedRowKeys : selectedRowKeys.shift());
                setVisible(false);
              }}>确定</Button>
            </Space>
          </div>
          
        ]}
      >
        <ViewFactory
          multiple={multiple}
          associatedName={associatedName}
          associatedKey={associatedKey}
          resourceName={target}
          resourceTarget={resourceTarget}
          isFieldComponent={true}
          selectedRowKeys={selectedRowKeys}
          onSelected={(values) => {
            // 需要返回的是 array
            const [selectedKeys, selectedValue] = transform({value: values, multiple: true, labelField, valueField });
            setSelectedRows(selectedValue);
            setSelectedRowKeys(selectedKeys);
            // console.log('valuevaluevaluevaluevaluevalue', {values, selectedKeys, selectedValue});
          }}
          // associatedKey={} 
          // associatedName={associatedName} 
          viewName={'table'}
        />
      </Drawer>
    </>
  );
}