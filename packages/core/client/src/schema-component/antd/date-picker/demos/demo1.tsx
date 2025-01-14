/**
 * title: DatePicker
 */
import { FormItem } from '@formily/antd';
import { DatePicker, SchemaComponent, SchemaComponentProvider } from '@nocobase/client';
import React from 'react';

const schema = {
  type: 'object',
  properties: {
    input: {
      type: 'boolean',
      title: `Editable`,
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        dateFormat: 'YYYY/MM/DD',
        // showTime: true,
      },
      'x-reactions': {
        target: 'read',
        fulfill: {
          state: {
            value: '{{$self.value}}',
          },
        },
      },
    },
    read: {
      type: 'boolean',
      title: `Read pretty`,
      'x-read-pretty': true,
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        dateFormat: 'YYYY/MM/DD',
        // showTime: true,
      },
    },
  },
};

export default () => {
  return (
    <SchemaComponentProvider components={{ DatePicker, FormItem }}>
      <SchemaComponent schema={schema} />
    </SchemaComponentProvider>
  );
};
