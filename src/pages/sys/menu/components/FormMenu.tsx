import { Form, Button, Input, Radio, TreeSelect } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface FormMenuProps extends FormComponentProps {
  onSubmit: (fieldsValue: {}) => void;
  onClose: () => void;
  type: string;
  entity?: any;
  menus?: [];
}

const FormMenu: React.FC<FormMenuProps> = props => {
  const { form, onSubmit: handleAdd, onClose, type, entity, menus } = props;

  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  // 处理menus为treeselect数据
  const treeData = [];
  treeData.push({ title: '根节点', value: '', key: '-1' });
  // 递归处理
  function makeNode(node, item) {
    item.title = node.nameTxt;
    item.value = node.permissionId;
    item.key = node.permissionId;
    if (node && !node.hasOwnProperty('children')) {
      return item;
    }
    item.children = [];
    for (let j = 0; j < node.children.length; j += 1) {
      item.children.push(makeNode(node.children[j], {}));
    }
    return item;
  }

  if (menus) {
    for (let i = 0; i < menus.length; i += 1) {
      treeData.push(makeNode(menus[i], {}));
    }
  }

  return (
    <Form>
      {entity ? (
        <div>
          {getFieldDecorator('permissionId', { initialValue: entity.permissionId })(
            <Input type="hidden" />,
          )}
        </div>
      ) : null}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单类型">
        {form.getFieldDecorator('menuType', {
          initialValue: entity ? String(entity.menuType) : '1',
          rules: [],
        })(
          <Radio.Group>
            <Radio value="1">系统菜单</Radio>
            <Radio value="2">内嵌链接</Radio>
            <Radio value="3">跳出链接</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="父级菜单">
        {form.getFieldDecorator('parentId', {
          initialValue: entity ? entity.parentId : [],
          rules: [],
        })(
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="选择父级菜单"
          />,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单名称">
        {form.getFieldDecorator('nameTxt', {
          initialValue: entity ? entity.nameTxt : '',
          rules: [{ required: true, message: '请输入菜单名称!' }],
        })(<Input placeholder="请输入菜单名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单编码">
        {form.getFieldDecorator('name', {
          initialValue: entity ? entity.name : '',
          rules: [{ required: true, message: '请输入菜单编码!' }],
        })(<Input placeholder="请输入菜单编码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单路径">
        {form.getFieldDecorator('path', {
          initialValue: entity ? entity.path : '',
          rules: [{ required: true, message: '请输入菜单路径!' }],
        })(<Input placeholder="请输入菜单路径" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单组件">
        {form.getFieldDecorator('component', {
          initialValue: entity ? entity.component : '',
          rules: [],
        })(<Input placeholder="请输入菜单组件" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="菜单图标">
        {form.getFieldDecorator('icon', {
          initialValue: entity ? entity.icon : '',
          rules: [],
        })(<Input placeholder="请输入菜单图标" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="排序">
        {form.getFieldDecorator('sortNo', {
          initialValue: entity ? entity.sortNo : '',
          rules: [],
        })(<Input placeholder="请输入排序" />)}
      </FormItem>

      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={okHandle} type="primary">
          {type === 'create' ? '提交' : '保存'}
        </Button>
      </div>
    </Form>
  );
};

export default Form.create<FormMenuProps>()(FormMenu);
