import React, { Component } from "react";
import PropTypes from "prop-types";

class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifyCode: "",
      fontSizeMin: {
        type: Number,
        default: 24
      },
      fontSizeMax: {
        type: Number,
        default: 30
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 170
      },
      lineColorMin: {
        type: Number,
        default: 30
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 160
      },
      contentHeight: {
        type: Number,
        default: 40
      }
    };
  }

  componentDidMount() {
    const { identifyCode } = this.props;
    this.setState(
      {
        identifyCode: identifyCode
      },
      () => {
        this.drawPic();
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.identifyCode !== this.props.identifyCode) {
      this.setState(
        {
          identifyCode: nextProps.identifyCode
        },
        () => {
          this.drawPic();
        }
      );
    }
  }

  // 生成一个随机数
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // 生成一个随机的颜色
  randomColor(min, max) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  drawPic() {
    const canvas = document.getElementById("s-canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "bottom";
    // 绘制背景
    ctx.fillStyle = this.randomColor(
      this.state.backgroundColorMin.default,
      this.state.backgroundColorMax.default
    );
    ctx.fillRect(
      0,
      0,
      this.state.contentWidth.default,
      this.state.contentHeight.default
    );
    // 绘制文字
    for (let i = 0; i < this.state.identifyCode.length; i++) {
      this.drawText(ctx, this.state.identifyCode[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  }
  drawText(ctx, txt, i) {
    ctx.fillStyle = this.randomColor(
      this.state.colorMin.default,
      this.state.colorMax.default
    );
    ctx.font =
      this.randomNum(
        this.state.fontSizeMin.default,
        this.state.fontSizeMax.default
      ) + "px SimHei";
    const x = (i + 1) * (160 / (this.state.identifyCode.length + 1));
    const y = this.randomNum(
      this.state.fontSizeMax.default,
      this.state.contentHeight.default - 5
    );
    let deg = this.randomNum(-45, 45);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }
  drawLine(ctx) {
    // 绘制干扰线
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = this.randomColor(
        this.state.lineColorMin.default,
        this.state.lineColorMax.default
      );
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.state.contentWidth.default),
        this.randomNum(0, this.state.contentHeight.default)
      );
      ctx.lineTo(
        this.randomNum(0, this.state.contentWidth.default),
        this.randomNum(0, this.state.contentHeight.default)
      );
      ctx.stroke();
    }
  }
  drawDot(ctx) {
    // 绘制干扰点
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.state.contentWidth.default),
        this.randomNum(0, this.state.contentHeight.default),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
  render() {
    const { contentHeight, contentWidth } = this.state;
    const { onClick } = this.props;
    return (
      <div style={{width:150,height:40}}>
        <canvas
          height={contentHeight.default}
          onClick={() => onClick()}
          id="s-canvas"
          width={contentWidth.default}
        />
      </div>
    );
  }
}

Captcha.propTypes = {
  onRef: PropTypes.func,
  identifyCode: PropTypes.string,
  onClick: PropTypes.func
};

export default Captcha;
