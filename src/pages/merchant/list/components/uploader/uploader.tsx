import React, { Component } from 'react';
import { Button, Col, Input, Row, Upload } from 'antd';
import styles from './uploader.less';
import { ExampleImageComponent } from '../example-image/example-image';
import svg from './u1498.svg';
import { ImageDisplayComponent } from '../image_display';

import { UploadChangeParam } from 'antd/lib/upload';
import { RcCustomRequestOptions } from 'antd/es/upload/interface';
interface UploaderProps {
  title: string; // 标题
  uploader_url?: string; // 上传图片的网址
  delete_url?: string; // 删除图片的网址
  onChange: (value: string) => void;
  onDelete: () => void;
}
interface UploaderState {
  pic_url: string;
  pending: boolean;
}
export class UploaderComponent extends Component<UploaderProps, UploaderState> {
  constructor(props: Readonly<UploaderProps>) {
    super(props);
    this.state = {
      pic_url: '',
      pending: false,
    };
  }
  componentDidMount(): void {}
  uploadFile = (value: RcCustomRequestOptions) => {
    const params1 = {
      APP_ID: 'beinuo_backend',
      APP_SECRET: '7dd60af4323911eaa6d7d6e90e8984fc',
    };
    const headers = {
      Authorization: localStorage.getItem('authorizotion') || '',
      'APP-ID': params1.APP_ID,
    };
    // todo 在这里实现你的方法,包括错误处理啥的
    this.setState({ pending: true }, () => {
      const formData = new FormData();
      formData.append('file', value.file);
      fetch(value.action, {
        method: 'POST',
        headers: {
          'APP-ID': params1.APP_ID,
          Authorization: localStorage.getItem('authorizotion') || '',
        },

        body: formData,
      }).then(res =>
        res.json().then(json => {
          console.log(res);
          this.setState({ pic_url: json.result, pending: false }, () => {
            console.log('props url');
            console.log(this.state.pic_url);
            this.props.onChange(this.state.pic_url);
          });
        }),
      );
    });
    return;
  };

  deleteFile = () => {
    // todo 在这里实现你的删除方法,包括错误处理
    this.setState({ pic_url: '' });
  };

  render() {
    const uploader = (
      <Upload
        name="file"
        action="/server/api/merchant/app-merchant-file/save"
        listType={'picture'}
        fileList={[]}
        customRequest={this.uploadFile.bind(this)}
      >
        <Button type={'link'} loading={this.state.pending}>
          选择
        </Button>
      </Upload>
    );
    return (
      <Row type="flex" justify="start" align="middle" className={styles.row}>
        <Col span={6} className="title">
          {this.props.title}:
        </Col>
        <Col span={6}>
          {this.state.pic_url ? (
            <ImageDisplayComponent url={this.state.pic_url} onDelete={this.deleteFile} />
          ) : (
            uploader
          )}
        </Col>
        <Col span={12}>
          <ExampleImageComponent pic_url={svg} />
        </Col>
      </Row>
    );
  }
}
