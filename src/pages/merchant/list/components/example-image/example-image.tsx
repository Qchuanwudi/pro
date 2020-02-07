import React, { Component } from 'react';
import { Col, Modal, Row } from 'antd';
import { Dispatch } from 'redux';
import styles from './example-image.less';
interface ExampleImageProps {
  pic_url: string;
}
interface ExampleImageState {
  modal_visible: boolean;
}
export class ExampleImageComponent extends Component<ExampleImageProps, ExampleImageState> {
  constructor(props: Readonly<ExampleImageProps>) {
    super(props);
    this.state = { modal_visible: false };
  }
  render() {
    return (
      <div className={styles.examplerow}>
        <img src={this.props.pic_url} alt="示例图片" />
        <Row>
          <Col span={12} className={styles.alignstart}>
            示例图片
          </Col>
          <Col
            span={12}
            className={styles.alignend}
            onClick={() => this.setState({ modal_visible: true })}
          >
            查看大图
          </Col>
        </Row>
        <Modal
          title="实例图片"
          visible={this.state.modal_visible}
          footer={null}
          onCancel={() => this.setState({ modal_visible: false })}
          className={styles.modelimage}
        >
          <img src={this.props.pic_url} alt="示例图片 大图" className={styles.largerimage} />
        </Modal>
      </div>
    );
  }
}
