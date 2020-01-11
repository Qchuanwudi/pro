import { Drawer } from 'antd';
import React from 'react';

import FormUser from './FormUser';

const { onSubmit: userSubmit } = FormUser;

interface FormUserUpdateProps {
  entity: any;
  roles: any;
  modalVisible: boolean;
  onSubmit: userSubmit;
  onClose: () => void;
  dispatch: Dispatch;
}

const FormUserUpdate: React.FC<FormUserUpdate> = props => {
  const { modalVisible, onSubmit: handleAdd, onClose, entity, roles } = props;
  return (
    <Drawer
      title="编辑用户"
      width={600}
      onClose={onClose}
      visible={modalVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <FormUser onSubmit={handleAdd} onClose={onClose} entity={entity} roles={roles} />
    </Drawer>
  );
};
export default FormUserUpdate;
