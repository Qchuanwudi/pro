import React, { Component } from 'react';

import { Col, Modal, Row } from 'antd';
import styles from './image_display.less';
interface ImageDisplayProps {
  url: string;
  onDelete: () => void;
}
interface ImageDisplayState {
  modal_visible: boolean;
}
export class ImageDisplayComponent extends Component<ImageDisplayProps, ImageDisplayState> {
  constructor(props: ImageDisplayProps) {
    super(props);
    this.state = { modal_visible: false };
  }
  //   onSuccess=(res, dataUrl)=> {
  //     this.refs.targetViewer.src = dataUrl;
  //     this.props.getImg(res.data.imgurl);
  // };

  render() {
    return (
      <div className={styles.picturerow}>
        <img style={{ width: 102 }} src={this.props.url} alt="图片" className={styles.picture} />
        <Row>
          <Col span={6} className={styles.align1} onClick={this.props.onDelete}>
            删除
          </Col>
          <Col
            span={18}
            className={styles.align2}
            onClick={() => this.setState({ modal_visible: true })}
          >
            查看大图
          </Col>
        </Row>
        <Modal
          title="查看大图"
          visible={this.state.modal_visible}
          footer={null}
          onCancel={() => this.setState({ modal_visible: false })}
        >
          <img src={this.props.url} alt="大图" className={styles.largerimage} />
        </Modal>
      </div>
    );
  }
}
