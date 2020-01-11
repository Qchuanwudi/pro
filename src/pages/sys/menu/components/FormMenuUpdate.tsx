import { Drawer } from 'antd';
import React from 'react';

import FormMenu from './FormMenu';

const { onSubmit: userSubmit } = FormMenu;

interface FormMenuUpdateProps {
  entity: any;
  menus: any;
  modalVisible: boolean;
  onSubmit: userSubmit;
  onClose: () => void;
  dispatch: Dispatch;
}

const FormMenuUpdate: React.FC<FormMenuUpdateProps> = props => {
  const { modalVisible, onSubmit: handleAdd, onClose, entity, menus } = props;
  return (
    <Drawer
      title="编辑菜单"
      width={600}
      onClose={onClose}
      visible={modalVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <FormMenu onSubmit={handleAdd} onClose={onClose} entity={entity} menus={menus} />
    </Drawer>
  );
};
export default FormMenuUpdate;
