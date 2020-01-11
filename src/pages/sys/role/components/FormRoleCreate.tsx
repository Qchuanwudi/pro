import { Drawer } from 'antd';
import React from 'react';

import FormRole from './FormRole';

const { onSubmit: formUserOnSubmit } = FormRole;

interface FormRoleCreateProps {
  modalVisible: boolean;
  onSubmit: formUserOnSubmit;
  onClose: () => void;
}

const FormRoleCreate: React.FC<FormRoleCreateProps> = props => {
  const { modalVisible, onSubmit: handleAdd, onClose } = props;

  return (
    <Drawer
      title="新增角色"
      width={600}
      onClose={onClose}
      visible={modalVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <FormRole onSubmit={handleAdd} onClose={onClose} type="create" />
    </Drawer>
  );
};

export default FormRoleCreate;
