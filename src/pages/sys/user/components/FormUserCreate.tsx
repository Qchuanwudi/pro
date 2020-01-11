import { Drawer } from 'antd';
import React from 'react';

import FormUser from './FormUser';

const { onSubmit: formUserOnSubmit } = FormUser;

interface FormUserCreateProps {
  roles?: any;
  modalVisible: boolean;
  onSubmit: formUserOnSubmit;
  onClose: () => void;
}

const FromUserCreate: React.FC<FormUserCreateProps> = props => {
  const { roles, modalVisible, onSubmit: handleAdd, onClose } = props;

  return (
    <Drawer
      title="新增用户"
      width={600}
      onClose={onClose}
      visible={modalVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <FormUser onSubmit={handleAdd} onClose={onClose} type="create" roles={roles} />
    </Drawer>
  );
};

export default FromUserCreate;
