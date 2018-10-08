import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Breadcrumb, Icon, Button } from 'antd'
import axios from 'axios';
import './index.scss';
import Preview from './preview';
import CreateTask from './createTask';
export default class Task extends React.Component {
  state = {
    preview: true,
    create: false,
    id: 0,
    task: {
      participants: [],
    }
  }
  componentWillMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.getTaskDetail(id, () => {
        this.setState({
          id,
          create: false,
          preview: true,
        });
      });
    } else {
      this.setState({
        preview: false,
        create: true,
      })
    }
  }
  getTaskDetail = (id, cb) => {
    axios.get(`/api/examtasks/${id}/`)
      .then((response) => {
        console.log(response);
        const res = response.data;
        this.setState({
          task: res.data,
        }, () => {
          cb();
        })
      }).catch((response) => {

      })
  }
  edit = () => {
    this.setState({
      preview: false,
    })
  }
  render() {
    const { create, preview, task } = this.state;
    return (
      <div>
        <Header />
        <div className="task container">
          <div className="displayFlx">
            <Sidebar />
            <div className="main-content">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Icon type="home" theme="outlined" style={{ fontSize: '14px', marginRight: '2px' }} />
                  <span>首页</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <i className="iconfont" style={{ fontSize: '12px', marginRight: '5px' }}>&#xe62e;</i>
                  <span>考试任务</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Icon type="edit" style={{ marginRight: '5px' }} />
                  <span>
                    {
                      create === true ?
                        '新建考试任务'
                        :
                        '考试任务详情'
                    }
                  </span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="paper-title">
                {
                  create === true ?
                    '新建考试任务'
                    :
                    '考试任务详情'
                }
                {
                  preview === true &&
                  <Button onClick={this.edit} icon="edit" className="edit-btn">
                    编辑
                  </Button>
                }
              </div>
              {
                preview === true ?
                  <Preview task={task} id={this.props.match.params.id} />
                  :
                  <div>
                    <CreateTask task={task} history={this.props.history} create={create} goback={() => { this.setState({ preview: true }) }} id={this.props.match.params.id} />
                    {/* {
                      create === false &&
                      <Button onClick={() => { this.setState({ preview: true }) }}>
                        返回
                      </Button>
                    } */}
                  </div>
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}